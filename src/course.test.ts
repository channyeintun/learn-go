import { describe, expect, it } from "vite-plus/test";
import { courseModules, courseParts, diagrams, glossary } from "./course";

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
});
