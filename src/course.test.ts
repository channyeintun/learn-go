import { describe, expect, it } from "vite-plus/test";
import { loadCourses } from "./courses";
import { getRunnableSnippetCode } from "./playground";
import { runnableSnippetPrograms } from "./snippetRunners";

const courses = await loadCourses();

const diagramAssetIds = Object.keys(
  import.meta.glob("./assets/diagrams/*.{png,webp}", { eager: true }),
)
  .map((assetPath) => assetPath.match(/\/([^/]+)\.(?:png|webp)$/)?.[1])
  .filter((assetId): assetId is string => Boolean(assetId));

describe("course content", () => {
  it("has unique course ids", () => {
    const courseIds = courses.map((course) => course.meta.id);
    expect(new Set(courseIds).size).toBe(courseIds.length);
  });

  it("references existing modules from each course part", () => {
    for (const course of courses) {
      const moduleIds = new Set(course.modules.map((courseModule) => courseModule.id));

      for (const part of course.parts) {
        for (const moduleId of part.moduleIds) {
          expect(
            moduleIds.has(moduleId),
            `${course.meta.id}/${part.id} references missing module ${moduleId}`,
          ).toBe(true);
        }
      }
    }
  });

  it("places every module in an existing course part", () => {
    for (const course of courses) {
      const partIds = new Set(course.parts.map((part) => part.id));
      const moduleIdsByPart = new Map(
        course.parts.map((part) => [part.id, new Set(part.moduleIds)]),
      );

      for (const courseModule of course.modules) {
        expect(
          partIds.has(courseModule.partId),
          `${course.meta.id}/${courseModule.id} has unknown partId`,
        ).toBe(true);
        expect(
          moduleIdsByPart.get(courseModule.partId)?.has(courseModule.id),
          `${course.meta.id}/${courseModule.id} is not listed by its course part`,
        ).toBe(true);
      }
    }
  });

  it("references existing diagram metadata from every lesson", () => {
    for (const course of courses) {
      const diagramIds = new Set(course.diagrams.map((diagram) => diagram.id));

      for (const courseModule of course.modules) {
        for (const lesson of courseModule.lessons) {
          for (const diagramId of lesson.diagramIds) {
            expect(
              diagramIds.has(diagramId),
              `${course.meta.id}/${courseModule.id}/${lesson.id} references missing diagram ${diagramId}`,
            ).toBe(true);
          }
        }
      }
    }
  });

  it("has a project asset for every diagram metadata entry", () => {
    const assetIds = new Set(diagramAssetIds);

    for (const diagram of allDiagrams()) {
      expect(assetIds.has(diagram.id), `${diagram.id} is missing a diagram image asset`).toBe(true);
    }
  });

  it("has diagram metadata for every project diagram asset", () => {
    const diagramIds = new Set(allDiagrams().map((diagram) => diagram.id));

    for (const assetId of diagramAssetIds) {
      expect(diagramIds.has(assetId), `${assetId} has no diagram metadata`).toBe(true);
    }
  });

  it("references existing glossary terms from every module", () => {
    for (const course of courses) {
      const glossaryIds = new Set(course.glossary.map((term) => term.id));

      for (const courseModule of course.modules) {
        for (const termId of courseModule.glossaryIds) {
          expect(
            glossaryIds.has(termId),
            `${course.meta.id}/${courseModule.id} references missing glossary term ${termId}`,
          ).toBe(true);
        }
      }
    }
  });

  it("labels snippets that require newer Go language features", () => {
    for (const example of modernGoExamples()) {
      expect(
        example.minGoVersion,
        `${example.label} uses newer Go syntax without a minimum Go version`,
      ).toBeTruthy();
    }
  });

  it("keeps runnable backing examples attached to existing lesson snippets", () => {
    const snippetTitles = allModules().flatMap((courseModule) =>
      courseModule.lessons.flatMap((lesson) => lesson.snippets.map((snippet) => snippet.title)),
    );
    const uniqueSnippetTitles = new Set(snippetTitles);

    expect(uniqueSnippetTitles.size, "snippet titles key runnable backing examples").toBe(
      snippetTitles.length,
    );
    for (const title of Object.keys(runnableSnippetPrograms)) {
      expect(
        uniqueSnippetTitles.has(title),
        `${title} has runnable code but no lesson snippet`,
      ).toBe(true);
    }
  });

  it("keeps every DSA lesson snippet runnable", () => {
    const dsaCourse = courses.find((course) => course.meta.id === "dsa");
    expect(dsaCourse, "DSA course should be loaded").toBeTruthy();

    for (const courseModule of dsaCourse?.modules ?? []) {
      for (const lesson of courseModule.lessons) {
        for (const snippet of lesson.snippets) {
          expect(
            getRunnableSnippetCode(snippet),
            `${courseModule.id}/${lesson.id}/${snippet.title} is not runnable`,
          ).toBeTruthy();
        }
      }
    }
  });

  it("does not carry known incorrect operator-precedence explanations", () => {
    const serializedCourse = JSON.stringify(courses);

    expect(serializedCourse).not.toContain("x & (mask == 0)");
    expect(serializedCourse).not.toContain("flags & (readyBit != 0)");
    expect(serializedCourse).not.toContain("1 << (n + 1)` because shifts share");
  });
});

function* modernGoExamples() {
  for (const courseModule of allModules()) {
    for (const lesson of courseModule.lessons) {
      for (const snippet of lesson.snippets) {
        if (requiresVersionLabel(snippet.code)) {
          yield {
            label: `${courseModule.id}/${lesson.id}/${snippet.title}`,
            minGoVersion: snippet.minGoVersion,
          };
        }
      }
    }
  }

  for (const item of allCheatSheetItems()) {
    if (requiresVersionLabel(item.code)) {
      yield {
        label: `cheatsheet/${item.title}`,
        minGoVersion: item.minGoVersion,
      };
    }
  }
}

function requiresVersionLabel(code: string) {
  return (
    code.includes("iter.Seq") ||
    code.includes("yield func(") ||
    /for\s+\w+\s*:=\s*range\s+(?:\d+\b|n\b|[A-Z]\w+\b)/.test(code)
  );
}

function allModules() {
  return courses.flatMap((course) => course.modules);
}

function allDiagrams() {
  return courses.flatMap((course) => course.diagrams);
}

function allCheatSheetItems() {
  return courses.flatMap((course) => course.cheatSheet);
}
