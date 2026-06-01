import type { CourseModule } from "./course";

export const lessonProgressStorageKey = "learn-go:completed-lessons:v1";

export function parseCompletedLessonIds(
  rawValue: string | null,
  orderedLessonIds: readonly string[],
) {
  if (!rawValue) {
    return [];
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    return [];
  }

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  const savedLessonIds = new Set(
    parsedValue.filter((lessonId): lessonId is string => typeof lessonId === "string"),
  );

  return orderedLessonIds.filter((lessonId) => savedLessonIds.has(lessonId));
}

export function addCompletedLessonId(
  currentLessonIds: string[],
  lessonId: string,
  validLessonIds: ReadonlySet<string>,
) {
  if (!validLessonIds.has(lessonId) || currentLessonIds.includes(lessonId)) {
    return currentLessonIds;
  }

  return [...currentLessonIds, lessonId];
}

export function isCourseModuleComplete(
  courseModule: CourseModule,
  completedLessonIds: ReadonlySet<string>,
) {
  return (
    courseModule.lessons.length > 0 &&
    courseModule.lessons.every((lesson) => completedLessonIds.has(lesson.id))
  );
}
