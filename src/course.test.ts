import { describe, expect, it } from "vite-plus/test";
import { cheatSheet, courseModules, courseParts, diagrams, glossary } from "./course";

const diagramAssetIds = Object.keys(
  import.meta.glob("./assets/diagrams/*.{png,webp}", { eager: true }),
)
  .map((assetPath) => assetPath.match(/\/([^/]+)\.(?:png|webp)$/)?.[1])
  .filter((assetId): assetId is string => Boolean(assetId));

describe("course content", () => {
  it("references existing modules from each course part", () => {
    const moduleIds = new Set(courseModules.map((courseModule) => courseModule.id));

    for (const part of courseParts) {
      for (const moduleId of part.moduleIds) {
        expect(moduleIds.has(moduleId), `${part.id} references missing module ${moduleId}`).toBe(
          true,
        );
      }
    }
  });

  it("places every module in an existing course part", () => {
    const partIds = new Set(courseParts.map((part) => part.id));
    const moduleIdsByPart = new Map(courseParts.map((part) => [part.id, new Set(part.moduleIds)]));

    for (const courseModule of courseModules) {
      expect(partIds.has(courseModule.partId), `${courseModule.id} has unknown partId`).toBe(true);
      expect(
        moduleIdsByPart.get(courseModule.partId)?.has(courseModule.id),
        `${courseModule.id} is not listed by its course part`,
      ).toBe(true);
    }
  });

  it("references existing diagram metadata from every lesson", () => {
    const diagramIds = new Set(diagrams.map((diagram) => diagram.id));

    for (const courseModule of courseModules) {
      for (const lesson of courseModule.lessons) {
        for (const diagramId of lesson.diagramIds) {
          expect(
            diagramIds.has(diagramId),
            `${courseModule.id}/${lesson.id} references missing diagram ${diagramId}`,
          ).toBe(true);
        }
      }
    }
  });

  it("has a project asset for every diagram metadata entry", () => {
    const assetIds = new Set(diagramAssetIds);

    for (const diagram of diagrams) {
      expect(assetIds.has(diagram.id), `${diagram.id} is missing a diagram image asset`).toBe(true);
    }
  });

  it("has diagram metadata for every project diagram asset", () => {
    const diagramIds = new Set(diagrams.map((diagram) => diagram.id));

    for (const assetId of diagramAssetIds) {
      expect(diagramIds.has(assetId), `${assetId} has no diagram metadata`).toBe(true);
    }
  });

  it("references existing glossary terms from every module", () => {
    const glossaryIds = new Set(glossary.map((term) => term.id));

    for (const courseModule of courseModules) {
      for (const termId of courseModule.glossaryIds) {
        expect(
          glossaryIds.has(termId),
          `${courseModule.id} references missing glossary term ${termId}`,
        ).toBe(true);
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

  it("does not carry known incorrect operator-precedence explanations", () => {
    const serializedCourse = JSON.stringify({
      cheatSheet,
      courseModules,
      diagrams,
      glossary,
    });

    expect(serializedCourse).not.toContain("x & (mask == 0)");
    expect(serializedCourse).not.toContain("flags & (readyBit != 0)");
    expect(serializedCourse).not.toContain("1 << (n + 1)` because shifts share");
  });
});

function* modernGoExamples() {
  for (const courseModule of courseModules) {
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

  for (const item of cheatSheet) {
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
