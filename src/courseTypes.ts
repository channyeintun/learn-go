export type Level = "beginner" | "intermediate" | "advanced";

export type CoursePart = {
  id: string;
  title: string;
  summary: string;
  moduleIds: string[];
};

export type LessonBlock = {
  title?: string;
  paragraphs: string[];
};

export type CodeExample = {
  title: string;
  summary: string;
  code: string;
  complete?: boolean;
  minGoVersion?: string;
  runCode?: string;
};

export type CheckQuestion = {
  question: string;
  answer: string;
};

export type Exercise = {
  title: string;
  prompt: string;
  goal: string;
};

export type Lesson = {
  id: string;
  title: string;
  teachingGoal: string;
  explanation: LessonBlock[];
  diagramIds: string[];
  snippets: CodeExample[];
  mistakes: string[];
  checks: CheckQuestion[];
  exercises: Exercise[];
};

export type CourseModule = {
  id: string;
  partId: string;
  stage: string;
  level: Level;
  title: string;
  summary: string;
  prerequisites: string[];
  outcomes: string[];
  lessons: Lesson[];
  glossaryIds: string[];
};

export type DiagramAsset = {
  id: string;
  title: string;
  alt: string;
  caption: string;
  transcript: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
};

export type CheatSheetItem = {
  title: string;
  note: string;
  code: string;
  minGoVersion?: string;
};

export type CourseMeta = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  target: string;
  targetDetail: string;
};

export type CourseContent = {
  meta: CourseMeta;
  parts: CoursePart[];
  modules: CourseModule[];
  diagrams: DiagramAsset[];
  glossary: GlossaryTerm[];
  cheatSheet: CheatSheetItem[];
};
