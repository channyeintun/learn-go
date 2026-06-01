import { describe, expect, it } from "vite-plus/test";
import { courseModules } from "./courses/go";
import {
  addCompletedLessonId,
  isCourseModuleComplete,
  lessonProgressStorageKey,
  parseCompletedLessonIds,
} from "./progress";

describe("lesson progress", () => {
  it("parses stored completed lessons in course order", () => {
    const orderedLessonIds = ["first", "second", "third"];
    const rawValue = JSON.stringify(["third", "missing", "first", "first", 42]);

    expect(parseCompletedLessonIds(rawValue, orderedLessonIds)).toEqual(["first", "third"]);
  });

  it("ignores unusable stored progress", () => {
    expect(parseCompletedLessonIds(null, ["first"])).toEqual([]);
    expect(parseCompletedLessonIds("{", ["first"])).toEqual([]);
    expect(parseCompletedLessonIds(JSON.stringify({ first: true }), ["first"])).toEqual([]);
  });

  it("scopes stored progress by course id", () => {
    expect(lessonProgressStorageKey("go")).toBe("learn-go:go:completed-lessons:v1");
    expect(lessonProgressStorageKey("dsa")).toBe("learn-go:dsa:completed-lessons:v1");
  });

  it("only appends valid incomplete lessons", () => {
    const currentLessonIds = ["first"];
    const validLessonIds = new Set(["first", "second"]);

    expect(addCompletedLessonId(currentLessonIds, "second", validLessonIds)).toEqual([
      "first",
      "second",
    ]);
    expect(addCompletedLessonId(currentLessonIds, "first", validLessonIds)).toBe(currentLessonIds);
    expect(addCompletedLessonId(currentLessonIds, "missing", validLessonIds)).toBe(
      currentLessonIds,
    );
  });

  it("marks a module complete only after every lesson is complete", () => {
    const courseModule = courseModules.find((module) => module.lessons.length > 1);

    if (!courseModule) {
      throw new Error("Expected at least one module with multiple lessons.");
    }

    const incompleteLessonIds = new Set(
      courseModule.lessons.slice(0, -1).map((lesson) => lesson.id),
    );
    const completeLessonIds = new Set(courseModule.lessons.map((lesson) => lesson.id));

    expect(isCourseModuleComplete(courseModule, incompleteLessonIds)).toBe(false);
    expect(isCourseModuleComplete(courseModule, completeLessonIds)).toBe(true);
  });
});
