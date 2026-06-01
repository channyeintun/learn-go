import type { CourseContent, CourseMeta } from "../courseTypes";

export const defaultCourseId = "go";

export const courseSummaries = [
  {
    id: "go",
    title: "Learn Go",
    shortTitle: "Go",
    summary:
      "A practical Go course from source files and values through concurrency, runtime behavior, and production boundaries.",
    target: "Go 1.23+",
    targetDetail:
      "The core course targets Go 1.23 or newer. Snippets that depend on a newer language feature show their minimum Go version.",
  },
  {
    id: "dsa",
    title: "Data Structures and Algorithms",
    shortTitle: "DSA",
    summary:
      "Practical data structures and algorithms, taught with Go examples, cost budgets, and visual mental models.",
    target: "Practical DSA in Go",
    targetDetail:
      "Examples use Go-shaped implementations and focus on everyday choices: operation cost, memory, workload shape, and maintainability.",
  },
] satisfies CourseMeta[];

const courseLoaders: Record<string, () => Promise<CourseContent>> = {
  dsa: async () => (await import("./dsa")).dsaCourse,
  go: async () => (await import("./go")).goCourse,
};

export function hasCourse(courseId: string) {
  return courseId in courseLoaders;
}

export function loadCourse(courseId: string) {
  return courseLoaders[courseId]?.();
}

export async function loadCourses() {
  return Promise.all(courseSummaries.map((summary) => loadRequiredCourse(summary.id)));
}

async function loadRequiredCourse(courseId: string) {
  const course = await loadCourse(courseId);
  if (!course) {
    throw new Error(`Missing course loader for ${courseId}.`);
  }
  return course;
}
