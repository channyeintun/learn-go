import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
  type To,
} from "react-router";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import { courseSummaries, defaultCourseId, hasCourse, loadCourse } from "./courses";
import type {
  CodeExample,
  CourseContent,
  CourseModule,
  CoursePart,
  DiagramAsset,
  GlossaryTerm,
  Lesson,
} from "./courseTypes";
import {
  getRunnableSnippetCode,
  getSnippetDisplayCode,
  runGoSnippet,
  type PlaygroundRunResult,
} from "./playground";
import {
  addCompletedLessonId,
  isCourseModuleComplete,
  lessonProgressStorageKey,
  parseCompletedLessonIds,
} from "./progress";

SyntaxHighlighter.registerLanguage("go", go);

const GO_LOGO_URL = "https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png";

const diagramSourceModules = import.meta.glob("./assets/diagrams/*.{png,webp}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

type CourseIndex = {
  course: CourseContent;
  partsById: ReadonlyMap<string, CoursePart>;
  modulesById: ReadonlyMap<string, CourseModule>;
  modulesByPartId: ReadonlyMap<string, CourseModule[]>;
  diagramsById: ReadonlyMap<string, DiagramAsset>;
  glossaryById: ReadonlyMap<string, GlossaryTerm>;
  lessonRecords: LessonRecord[];
  lessonsById: ReadonlyMap<string, LessonRecord>;
};

type LessonRecord = {
  lesson: Lesson;
  module: CourseModule;
  part: CoursePart;
  sequence: number;
};

type CompleteLessonHandler = (lessonId: string) => void;

type RunState =
  | {
      status: "idle";
    }
  | {
      status: "running";
    }
  | {
      result: PlaygroundRunResult;
      status: "complete";
    }
  | {
      message: string;
      status: "failed";
    };

type RunStateView = {
  ariaLive: "assertive" | "polite";
  label: string;
  output: string;
  role: "alert" | "status";
  tone: "error" | "neutral" | "success";
};

type CourseLoadState =
  | {
      courseId: string;
      status: "loading";
    }
  | {
      courseId: string;
      courseIndex: CourseIndex;
      status: "loaded";
    }
  | {
      courseId: string;
      message: string;
      status: "failed";
    };

const diagramSources = Object.fromEntries(
  Object.entries(diagramSourceModules)
    .map(([assetPath, source]) => [assetPath.match(/\/([^/]+)\.(?:png|webp)$/)?.[1], source])
    .filter((entry): entry is [string, string] => Boolean(entry[0])),
);

function countAvailableDiagrams(course: CourseContent) {
  return course.diagrams.filter((diagram) => Boolean(diagramSources[diagram.id])).length;
}

const codeBlockStyle: CSSProperties = {
  margin: 0,
  padding: "1rem",
  borderRadius: "0.5rem",
  background: "rgba(11, 18, 24, 0.98)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "0.9rem",
  lineHeight: 1.75,
};

const idleRunState: RunState = { status: "idle" };

function App() {
  const location = useLocation();
  const routeCourseId = getRouteCourseId(location.pathname);
  const activeCourseId = routeCourseId ?? defaultCourseId;
  const routeCourseIsUnknown = Boolean(routeCourseId && !hasCourse(routeCourseId));
  const [courseLoadState, setCourseLoadState] = useState<CourseLoadState>({
    courseId: activeCourseId,
    status: "loading",
  });

  useEffect(() => {
    if (routeCourseIsUnknown) {
      return;
    }

    let isCurrent = true;
    setCourseLoadState((currentState) =>
      currentState.courseId === activeCourseId && currentState.status === "loaded"
        ? currentState
        : { courseId: activeCourseId, status: "loading" },
    );

    void loadCourse(activeCourseId)
      .then((course) => {
        if (!isCurrent) {
          return;
        }

        if (!course) {
          setCourseLoadState({
            courseId: activeCourseId,
            message: `Course ${activeCourseId} is not available.`,
            status: "failed",
          });
          return;
        }

        setCourseLoadState({
          courseId: activeCourseId,
          courseIndex: buildCourseIndex(course),
          status: "loaded",
        });
      })
      .catch((error: unknown) => {
        if (!isCurrent) {
          return;
        }

        setCourseLoadState({
          courseId: activeCourseId,
          message: error instanceof Error ? error.message : "Could not load the course.",
          status: "failed",
        });
      });

    return () => {
      isCurrent = false;
    };
  }, [activeCourseId, routeCourseIsUnknown]);

  if (routeCourseIsUnknown) {
    return <StaticCourseFrame activeCourseId={defaultCourseId} body={<NotFoundPage />} />;
  }

  if (courseLoadState.status !== "loaded" || courseLoadState.courseId !== activeCourseId) {
    return (
      <StaticCourseFrame
        activeCourseId={activeCourseId}
        body={
          courseLoadState.status === "failed" && courseLoadState.courseId === activeCourseId ? (
            <CourseLoadFailedPage message={courseLoadState.message} />
          ) : (
            <CourseLoadingPage />
          )
        }
      />
    );
  }

  return (
    <CourseExperience
      key={courseLoadState.courseIndex.course.meta.id}
      courseIndex={courseLoadState.courseIndex}
    />
  );
}

function CourseExperience({ courseIndex }: { courseIndex: CourseIndex }) {
  const { completedLessonIds, markLessonComplete } = useLessonProgress(courseIndex);
  const location = useLocation();
  const activeModuleId = getActiveModuleId(location.pathname, courseIndex);
  const courseId = courseIndex.course.meta.id;

  return (
    <div className="site-shell min-h-screen bg-canvas text-ink">
      <ScrollToTop />
      <header className="site-header">
        <div className="header-inner">
          <Link to={routeForCourse(courseId)} className="brand-link header-brand-link">
            <span className="brand-mark" aria-hidden="true">
              <img src={GO_LOGO_URL} alt="" />
            </span>
            <span>
              <span className="brand-title">Learn Go</span>
            </span>
          </Link>

          <div className="header-actions">
            <CourseSwitcher activeCourseId={courseId} />
            <nav className="top-nav" aria-label="Reference pages">
              <NavLink
                className={({ isActive }) => (isActive ? "is-active" : "")}
                to={routeForCourse(courseId)}
                end
              >
                Course
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "is-active" : "")}
                to={routeForDiagrams(courseId)}
              >
                Diagrams
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "is-active" : "")}
                to={routeForGlossary(courseId)}
              >
                Glossary
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "is-active" : "")}
                to={routeForCheatSheet(courseId)}
              >
                Cheat sheet
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="course-layout">
        <CourseSidebar
          courseIndex={courseIndex}
          activeModuleId={activeModuleId}
          completedLessonIds={completedLessonIds}
        />

        <div className="course-main">
          <MobileCourseIndex courseIndex={courseIndex} activeModuleId={activeModuleId} />
          <Routes>
            <Route index element={<Navigate to={routeForCourse(defaultCourseId)} replace />} />
            <Route
              path="parts/:partId"
              element={<LegacyPartRedirect routeFor={(partId) => routeForPart(courseId, partId)} />}
            />
            <Route
              path="modules/:moduleId"
              element={
                <LegacyPartRedirect routeFor={(moduleId) => routeForModule(courseId, moduleId)} />
              }
            />
            <Route
              path="lessons/:lessonId"
              element={
                <LegacyPartRedirect routeFor={(lessonId) => routeForLesson(courseId, lessonId)} />
              }
            />
            <Route path="diagrams" element={<Navigate to={routeForDiagrams(courseId)} replace />} />
            <Route path="glossary" element={<Navigate to={routeForGlossary(courseId)} replace />} />
            <Route
              path="cheatsheet"
              element={<Navigate to={routeForCheatSheet(courseId)} replace />}
            />
            <Route path="courses/:courseId" element={<OverviewPage courseIndex={courseIndex} />} />
            <Route
              path="courses/:courseId/parts/:partId"
              element={<PartRoute courseIndex={courseIndex} />}
            />
            <Route
              path="courses/:courseId/modules/:moduleId"
              element={<ModuleRoute courseIndex={courseIndex} />}
            />
            <Route
              path="courses/:courseId/lessons/:lessonId"
              element={
                <LessonRoute courseIndex={courseIndex} onCompleteLesson={markLessonComplete} />
              }
            />
            <Route
              path="courses/:courseId/diagrams"
              element={<DiagramsPage courseIndex={courseIndex} />}
            />
            <Route
              path="courses/:courseId/glossary"
              element={<GlossaryPage courseIndex={courseIndex} />}
            />
            <Route
              path="courses/:courseId/cheatsheet"
              element={<CheatSheetPage courseIndex={courseIndex} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function StaticCourseFrame({ activeCourseId, body }: { activeCourseId: string; body: ReactNode }) {
  return (
    <div className="site-shell min-h-screen bg-canvas text-ink">
      <ScrollToTop />
      <header className="site-header">
        <div className="header-inner">
          <Link to={routeForCourse(activeCourseId)} className="brand-link header-brand-link">
            <span className="brand-mark" aria-hidden="true">
              <img src={GO_LOGO_URL} alt="" />
            </span>
            <span>
              <span className="brand-title">Learn Go</span>
            </span>
          </Link>

          <div className="header-actions">
            <CourseSwitcher activeCourseId={activeCourseId} />
          </div>
        </div>
      </header>

      <main className="course-layout">
        <div className="course-main">{body}</div>
      </main>
    </div>
  );
}

function CourseLoadingPage() {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Loading</p>
        <h1>Loading course content.</h1>
        <p className="lede">The selected course is being loaded.</p>
      </header>
    </article>
  );
}

function CourseLoadFailedPage({ message }: { message: string }) {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Load failed</p>
        <h1>Could not load this course.</h1>
        <p className="lede">{message}</p>
      </header>
      <Link className="primary-button" to={routeForCourse(defaultCourseId)}>
        Go to overview
      </Link>
    </article>
  );
}

function useLessonProgress(courseIndex: CourseIndex) {
  const courseId = courseIndex.course.meta.id;
  const orderedLessonIds = useMemo(
    () => courseIndex.lessonRecords.map((record) => record.lesson.id),
    [courseIndex],
  );
  const validLessonIds = useMemo(() => new Set(orderedLessonIds), [orderedLessonIds]);
  const [storedCompletedLessonIds, setStoredCompletedLessonIds] = useState(() =>
    readStoredCompletedLessonIds(courseId, orderedLessonIds),
  );
  const completedLessonIds = useMemo(
    () => new Set(storedCompletedLessonIds),
    [storedCompletedLessonIds],
  );

  useEffect(() => {
    writeStoredCompletedLessonIds(courseId, storedCompletedLessonIds);
  }, [courseId, storedCompletedLessonIds]);

  const markLessonComplete = useCallback(
    (lessonId: string) => {
      setStoredCompletedLessonIds((currentLessonIds) =>
        addCompletedLessonId(currentLessonIds, lessonId, validLessonIds),
      );
    },
    [validLessonIds],
  );

  return { completedLessonIds, markLessonComplete };
}

function readStoredCompletedLessonIds(courseId: string, orderedLessonIds: readonly string[]) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return parseCompletedLessonIds(
      window.localStorage.getItem(lessonProgressStorageKey(courseId)),
      orderedLessonIds,
    );
  } catch {
    return [];
  }
}

function writeStoredCompletedLessonIds(courseId: string, completedLessonIds: readonly string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      lessonProgressStorageKey(courseId),
      JSON.stringify(completedLessonIds),
    );
  } catch {
    // Local storage can be unavailable in private mode or strict browser settings.
  }
}

function buildCourseIndex(course: CourseContent): CourseIndex {
  const partsById = new Map(course.parts.map((part) => [part.id, part]));
  const modulesById = new Map(
    course.modules.map((courseModule) => [courseModule.id, courseModule]),
  );
  const diagramsById = new Map(course.diagrams.map((diagram) => [diagram.id, diagram]));
  const glossaryById = new Map(course.glossary.map((term) => [term.id, term]));
  const modulesByPartId = new Map<string, CourseModule[]>();
  const lessonRecords: LessonRecord[] = [];

  for (const part of course.parts) {
    const partModules = part.moduleIds
      .map((moduleId) => modulesById.get(moduleId))
      .filter((courseModule): courseModule is CourseModule => Boolean(courseModule));

    modulesByPartId.set(part.id, partModules);

    for (const courseModule of partModules) {
      for (const lesson of courseModule.lessons) {
        lessonRecords.push({
          lesson,
          module: courseModule,
          part,
          sequence: lessonRecords.length + 1,
        });
      }
    }
  }

  return {
    course,
    partsById,
    modulesById,
    modulesByPartId,
    diagramsById,
    glossaryById,
    lessonRecords,
    lessonsById: new Map(lessonRecords.map((record) => [record.lesson.id, record])),
  };
}

function getRouteCourseId(pathname: string) {
  const [, section, courseId] = pathname.split("/");
  return section === "courses" && courseId ? decodeURIComponent(courseId) : undefined;
}

function CourseSwitcher({ activeCourseId }: { activeCourseId: string }) {
  return (
    <nav className="course-switcher" aria-label="Courses">
      {courseSummaries.map((course) => (
        <Link
          key={course.id}
          className={course.id === activeCourseId ? "is-active" : undefined}
          to={routeForCourse(course.id)}
        >
          {course.shortTitle}
        </Link>
      ))}
    </nav>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [pathname]);

  return null;
}

function getActiveModuleId(pathname: string, courseIndex: CourseIndex) {
  const segments = pathname.split("/");
  const section = segments[1] === "courses" ? segments[3] : segments[1];
  const id = segments[1] === "courses" ? segments[4] : segments[2];

  if (section === "modules" && id) {
    return decodeURIComponent(id);
  }

  if (section === "lessons" && id) {
    return courseIndex.lessonsById.get(decodeURIComponent(id))?.module.id;
  }

  return undefined;
}

function PartRoute({ courseIndex }: { courseIndex: CourseIndex }) {
  const { partId } = useParams();
  const part = courseIndex.partsById.get(partId ?? "");
  return part ? <PartPage part={part} courseIndex={courseIndex} /> : <NotFoundPage />;
}

function ModuleRoute({ courseIndex }: { courseIndex: CourseIndex }) {
  const { moduleId } = useParams();
  const courseModule = courseIndex.modulesById.get(moduleId ?? "");
  return courseModule ? (
    <ModulePage courseModule={courseModule} courseIndex={courseIndex} />
  ) : (
    <NotFoundPage />
  );
}

function LessonRoute({
  courseIndex,
  onCompleteLesson,
}: {
  courseIndex: CourseIndex;
  onCompleteLesson: CompleteLessonHandler;
}) {
  const { lessonId } = useParams();
  const record = courseIndex.lessonsById.get(lessonId ?? "");
  return record ? (
    <LessonPage record={record} courseIndex={courseIndex} onCompleteLesson={onCompleteLesson} />
  ) : (
    <NotFoundPage />
  );
}

function LegacyPartRedirect({ routeFor }: { routeFor: (id: string) => To }) {
  const { partId, moduleId, lessonId } = useParams();
  const id = partId ?? moduleId ?? lessonId;
  return id ? <Navigate to={routeFor(id)} replace /> : <NotFoundPage />;
}

function CourseSidebar({
  courseIndex,
  activeModuleId,
  completedLessonIds,
}: {
  courseIndex: CourseIndex;
  activeModuleId?: string;
  completedLessonIds: ReadonlySet<string>;
}) {
  const outlineModules = useMemo(
    () =>
      courseIndex.course.parts.flatMap((part) => courseIndex.modulesByPartId.get(part.id) ?? []),
    [courseIndex],
  );
  const courseId = courseIndex.course.meta.id;

  return (
    <aside className="course-sidebar">
      <div className="sidebar-scroll">
        <Link to={routeForCourse(courseId)} className="sidebar-course-title">
          <span className="brand-mark" aria-hidden="true">
            <img src={GO_LOGO_URL} alt="" />
          </span>
          <span>
            <span className="sidebar-title">Learn Go</span>
          </span>
        </Link>

        <nav aria-label="Course outline">
          <ol className="sidebar-module-list">
            {outlineModules.map((courseModule, moduleIndex) => {
              const isActive = activeModuleId === courseModule.id;
              const isComplete = isCourseModuleComplete(courseModule, completedLessonIds);
              const marker = isComplete ? "" : String(moduleIndex + 1);

              return (
                <li
                  key={courseModule.id}
                  className={`sidebar-module-item ${isActive ? "is-active" : ""} ${
                    isComplete ? "is-complete" : ""
                  }`}
                >
                  <Link
                    className="sidebar-module-link"
                    aria-label={`${courseModule.title}${isComplete ? ", complete" : ""}`}
                    to={routeForModule(courseId, courseModule.id)}
                  >
                    <span className="sidebar-module-marker" aria-hidden="true">
                      {marker}
                    </span>
                    <span className="sidebar-module-title">{courseModule.title}</span>
                  </Link>

                  {isActive ? (
                    <div className="sidebar-lessons">
                      {courseModule.lessons.map((lesson) => (
                        <NavLink
                          key={lesson.id}
                          className={({ isActive: isLessonActive }) =>
                            `sidebar-lesson-link ${isLessonActive ? "is-active" : ""}`
                          }
                          to={routeForLesson(courseId, lesson.id)}
                        >
                          {lesson.title}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}

function MobileCourseIndex({
  courseIndex,
  activeModuleId,
}: {
  courseIndex: CourseIndex;
  activeModuleId?: string;
}) {
  const courseId = courseIndex.course.meta.id;

  return (
    <details className="mobile-course-index">
      <summary>Course outline</summary>
      <div className="mobile-course-index-body">
        {courseIndex.course.parts.map((part) => (
          <div key={part.id}>
            <Link className="mobile-part-link" to={routeForPart(courseId, part.id)}>
              {part.title}
            </Link>
            <div>
              {(courseIndex.modulesByPartId.get(part.id) ?? []).map((courseModule) => (
                <Link
                  key={courseModule.id}
                  className={`mobile-module-link ${
                    activeModuleId === courseModule.id ? "is-active" : ""
                  }`}
                  to={routeForModule(courseId, courseModule.id)}
                >
                  {courseModule.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

function OverviewPage({ courseIndex }: { courseIndex: CourseIndex }) {
  const firstLesson = courseIndex.lessonRecords[0];
  const { course } = courseIndex;
  const courseId = course.meta.id;

  return (
    <article className="reader-page overview-page">
      <section className="course-hero">
        <p className="eyebrow">Tutorials /</p>
        <h1>{course.meta.title}</h1>
        <p className="lede">{course.meta.summary}</p>

        <div className="stat-strip" aria-label="Course summary">
          <SummaryStat label="Parts" value={String(course.parts.length)} />
          <SummaryStat label="Modules" value={String(course.modules.length)} />
          <SummaryStat label="Lessons" value={String(courseIndex.lessonRecords.length)} />
          <SummaryStat label="Target" value={course.meta.target} />
          <SummaryStat label="Diagrams" value={String(countAvailableDiagrams(course))} />
        </div>

        <p className="fine-print">{course.meta.targetDetail}</p>
        {courseId === defaultCourseId ? (
          <p className="fine-print">
            If this course feels hard to digest, try{" "}
            <a href="https://go.dev/tour/welcome/1" target="_blank" rel="noreferrer">
              A Tour of Go
            </a>{" "}
            first.
          </p>
        ) : null}

        <div className="action-row">
          {firstLesson ? (
            <Link className="primary-button" to={routeForLesson(courseId, firstLesson.lesson.id)}>
              Start first lesson
            </Link>
          ) : null}
          <Link className="secondary-button" to={routeForDiagrams(courseId)}>
            View diagrams
          </Link>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader eyebrow="Reading path" title="Course contents" />

        <div className="part-list">
          {course.parts.map((part, index) => (
            <PartOutline
              key={part.id}
              part={part}
              partIndex={index}
              modules={courseIndex.modulesByPartId.get(part.id) ?? []}
              courseId={courseId}
            />
          ))}
        </div>
      </section>
    </article>
  );
}

function PartPage({ part, courseIndex }: { part: CoursePart; courseIndex: CourseIndex }) {
  const modules = courseIndex.modulesByPartId.get(part.id) ?? [];
  const courseId = courseIndex.course.meta.id;

  return (
    <article className="reader-page">
      <Breadcrumbs
        items={[{ label: "Overview", to: routeForCourse(courseId) }, { label: part.title }]}
      />

      <header className="reader-header">
        <p className="eyebrow">Course part</p>
        <h1>{part.title}</h1>
        <p className="lede">{part.summary}</p>
      </header>

      <section className="page-section">
        <SectionHeader eyebrow="Modules" title="Chapter sequence" />

        <div className="module-row-list">
          {modules.map((courseModule) => (
            <ModuleRow key={courseModule.id} courseId={courseId} courseModule={courseModule} />
          ))}
        </div>
      </section>
    </article>
  );
}

function ModulePage({
  courseModule,
  courseIndex,
}: {
  courseModule: CourseModule;
  courseIndex: CourseIndex;
}) {
  const part = courseIndex.partsById.get(courseModule.partId);
  const courseId = courseIndex.course.meta.id;

  return (
    <article className="reader-page">
      <Breadcrumbs
        items={[
          { label: "Overview", to: routeForCourse(courseId) },
          part ? { label: part.title, to: routeForPart(courseId, part.id) } : undefined,
          { label: courseModule.title },
        ]}
      />

      <header className="reader-header">
        <div className="module-meta">
          <p className="eyebrow">{courseModule.stage}</p>
          <p className="level-pill">{courseModule.level}</p>
        </div>
        <h1>{courseModule.title}</h1>
        <p className="lede">{courseModule.summary}</p>
      </header>

      <div className="module-overview">
        <InfoList title="Prerequisites" items={courseModule.prerequisites} />
        <InfoList title="Outcomes" items={courseModule.outcomes} />
        <GlossaryLinks
          courseId={courseId}
          courseModule={courseModule}
          glossaryById={courseIndex.glossaryById}
        />
      </div>

      <section className="page-section">
        <SectionHeader eyebrow="Lessons" title="Study order" />

        <ol className="lesson-row-list">
          {courseModule.lessons.map((lesson, index) => (
            <li key={lesson.id}>
              <Link to={routeForLesson(courseId, lesson.id)} className="lesson-row">
                <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="row-title">{lesson.title}</span>
                  <span className="row-summary">{lesson.teachingGoal}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

function LessonPage({
  record,
  courseIndex,
  onCompleteLesson,
}: {
  record: LessonRecord;
  courseIndex: CourseIndex;
  onCompleteLesson: CompleteLessonHandler;
}) {
  const previousLesson = courseIndex.lessonRecords[record.sequence - 2];
  const nextLesson = courseIndex.lessonRecords[record.sequence];
  const { lesson } = record;
  const courseId = courseIndex.course.meta.id;
  const [snippetRunStates, setSnippetRunStates] = useState<Record<string, RunState>>({});
  const [activeSnippetTitle, setActiveSnippetTitle] = useState<string | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const consoleId = useId();

  useEffect(() => {
    const abortControllers = abortControllersRef.current;

    return () => {
      abortControllers.forEach((controller) => controller.abort());
      abortControllers.clear();
    };
  }, []);

  const updateSnippetRunState = useCallback((snippetTitle: string, runState: RunState) => {
    setSnippetRunStates((currentRunStates) => ({
      ...currentRunStates,
      [snippetTitle]: runState,
    }));
  }, []);

  const handleRunSnippet = useCallback(
    (snippetTitle: string, runnableCode: string) => {
      abortControllersRef.current.get(snippetTitle)?.abort();

      const controller = new AbortController();
      abortControllersRef.current.set(snippetTitle, controller);
      setActiveSnippetTitle(snippetTitle);
      setIsConsoleOpen(true);
      updateSnippetRunState(snippetTitle, { status: "running" });

      void runGoSnippet(runnableCode, controller.signal)
        .then((result) => {
          if (abortControllersRef.current.get(snippetTitle) !== controller) {
            return;
          }

          abortControllersRef.current.delete(snippetTitle);
          updateSnippetRunState(snippetTitle, { result, status: "complete" });
        })
        .catch((error: unknown) => {
          if (abortControllersRef.current.get(snippetTitle) !== controller) {
            return;
          }

          abortControllersRef.current.delete(snippetTitle);

          if (isAbortError(error)) {
            return;
          }

          updateSnippetRunState(snippetTitle, {
            message: error instanceof Error ? error.message : "Could not reach the Go Playground.",
            status: "failed",
          });
        });
    },
    [updateSnippetRunState],
  );

  const handleOpenSnippetOutput = useCallback((snippetTitle: string) => {
    setActiveSnippetTitle(snippetTitle);
    setIsConsoleOpen(true);
  }, []);

  const handleCloseConsole = useCallback(() => {
    setIsConsoleOpen(false);
  }, []);

  const handleCompleteLesson = useCallback(() => {
    onCompleteLesson(lesson.id);
  }, [lesson.id, onCompleteLesson]);

  const activeRunState = activeSnippetTitle
    ? (snippetRunStates[activeSnippetTitle] ?? idleRunState)
    : idleRunState;

  return (
    <article className={`reader-page lesson-page ${isConsoleOpen ? "has-playground-console" : ""}`}>
      <Breadcrumbs
        items={[
          { label: "Overview", to: routeForCourse(courseId) },
          { label: record.part.title, to: routeForPart(courseId, record.part.id) },
          { label: record.module.title, to: routeForModule(courseId, record.module.id) },
          { label: lesson.title },
        ]}
      />

      <header className="reader-header">
        <p className="eyebrow">Lesson {String(record.sequence).padStart(2, "0")}</p>
        <h1>{lesson.title}</h1>
        <p className="lede">{lesson.teachingGoal}</p>
      </header>

      {lesson.diagramIds.length ? (
        <section className="lesson-section">
          <SectionHeader eyebrow="Diagram" title="Visual model" />
          <div className="lesson-diagrams">
            {lesson.diagramIds.map((diagramId) => {
              const diagram = courseIndex.diagramsById.get(diagramId);
              return diagram && diagramSources[diagram.id] ? (
                <DiagramFigure key={diagram.id} diagram={diagram} featured />
              ) : null;
            })}
          </div>
        </section>
      ) : null}

      <section className="lesson-section">
        <SectionHeader eyebrow="Explanation" title="Core idea" />
        <div className="prose-flow">
          {lesson.explanation.map((block, index) => (
            <section key={`${lesson.id}-block-${index}`}>
              {block.title ? <h3>{block.title}</h3> : null}
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <SectionHeader eyebrow="Code" title="Runnable examples" />
        <div className="code-example-list">
          {lesson.snippets.map((snippet) => (
            <ExampleBlock
              key={snippet.title}
              consoleId={consoleId}
              isConsoleActive={isConsoleOpen && activeSnippetTitle === snippet.title}
              runState={snippetRunStates[snippet.title] ?? idleRunState}
              snippet={snippet}
              onOpenOutput={handleOpenSnippetOutput}
              onRun={handleRunSnippet}
            />
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <SectionHeader eyebrow="Practice" title="Mistakes, checks, and exercises" />
        <div className="practice-grid">
          <InfoList title="Common mistakes" items={lesson.mistakes} tone="warning" />
          <CheckList checks={lesson.checks} />
          <ExerciseList exercises={lesson.exercises} />
        </div>
      </section>

      <LessonNavigation
        courseId={courseId}
        previousLesson={previousLesson}
        nextLesson={nextLesson}
        onCompleteLesson={handleCompleteLesson}
      />
      <PlaygroundConsole
        consoleId={consoleId}
        isOpen={isConsoleOpen}
        runState={activeRunState}
        snippetTitle={activeSnippetTitle}
        onClose={handleCloseConsole}
      />
    </article>
  );
}

function DiagramsPage({ courseIndex }: { courseIndex: CourseIndex }) {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Visual library</p>
        <h1>{courseIndex.course.meta.shortTitle} hand-drawn teaching pictures</h1>
        <p className="lede">
          These project assets are generated bitmap diagrams saved under src/assets/diagrams and
          referenced by the lesson data.
        </p>
      </header>

      <div className="diagram-gallery">
        {courseIndex.course.diagrams
          .filter((diagram) => diagramSources[diagram.id])
          .map((diagram) => (
            <DiagramFigure key={diagram.id} diagram={diagram} />
          ))}
      </div>
    </article>
  );
}

function GlossaryPage({ courseIndex }: { courseIndex: CourseIndex }) {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Glossary</p>
        <h1>Terms learners will see repeatedly</h1>
        <p className="lede">Short definitions keep repeated concepts consistent across modules.</p>
      </header>

      <dl className="glossary-list">
        {courseIndex.course.glossary.map((term) => (
          <div key={term.id}>
            <dt>{term.term}</dt>
            <dd>{term.definition}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function CheatSheetPage({ courseIndex }: { courseIndex: CourseIndex }) {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Cheat sheet</p>
        <h1>Reference after the lessons</h1>
        <p className="lede">Compact reminders for the concepts taught in the curriculum.</p>
      </header>

      <div className="cheatsheet-list">
        {courseIndex.course.cheatSheet.map((item) => (
          <section key={item.title} className="cheatsheet-item">
            <div>
              <div className="inline-heading">
                <h2>{item.title}</h2>
                <VersionPill minGoVersion={item.minGoVersion} />
              </div>
              <p>{item.note}</p>
            </div>
            <CodeBlock code={item.code} compact />
          </section>
        ))}
      </div>
    </article>
  );
}

function NotFoundPage() {
  return (
    <article className="reader-page">
      <header className="reader-header">
        <p className="eyebrow">Not found</p>
        <h1>This course page is not available.</h1>
        <p className="lede">Return to the overview and choose a module from the course outline.</p>
      </header>
      <Link className="primary-button" to={routeForCourse(defaultCourseId)}>
        Go to overview
      </Link>
    </article>
  );
}

function PartOutline({
  courseId,
  part,
  partIndex,
  modules,
}: {
  courseId: string;
  part: CoursePart;
  partIndex: number;
  modules: CourseModule[];
}) {
  return (
    <section className="part-outline">
      <div className="part-outline-heading">
        <p className="outline-number">{String(partIndex + 1).padStart(2, "0")}</p>
        <div>
          <h3>
            <Link to={routeForPart(courseId, part.id)}>{part.title}</Link>
          </h3>
          <p>{part.summary}</p>
        </div>
      </div>

      <div className="module-row-list">
        {modules.map((courseModule) => (
          <ModuleRow key={courseModule.id} courseId={courseId} courseModule={courseModule} />
        ))}
      </div>
    </section>
  );
}

function ModuleRow({ courseId, courseModule }: { courseId: string; courseModule: CourseModule }) {
  return (
    <Link className="module-row" to={routeForModule(courseId, courseModule.id)}>
      <span className="row-kicker">{courseModule.stage}</span>
      <span>
        <span className="row-title">{courseModule.title}</span>
        <span className="row-summary">{courseModule.summary}</span>
      </span>
      <span className="row-meta">{courseModule.lessons.length} lessons</span>
    </Link>
  );
}

function LessonNavigation({
  courseId,
  previousLesson,
  nextLesson,
  onCompleteLesson,
}: {
  courseId: string;
  previousLesson?: LessonRecord;
  nextLesson?: LessonRecord;
  onCompleteLesson: () => void;
}) {
  return (
    <nav className="lesson-nav" aria-label="Lesson navigation">
      {previousLesson ? (
        <Link to={routeForLesson(courseId, previousLesson.lesson.id)}>
          <span>Previous</span>
          {previousLesson.lesson.title}
        </Link>
      ) : (
        <span />
      )}
      {nextLesson ? (
        <Link to={routeForLesson(courseId, nextLesson.lesson.id)} onClick={onCompleteLesson}>
          <span>Next</span>
          {nextLesson.lesson.title}
        </Link>
      ) : null}
    </nav>
  );
}

type BreadcrumbItem = {
  label: string;
  to?: To;
};

function Breadcrumbs({ items }: { items: Array<BreadcrumbItem | undefined> }) {
  const visibleItems = items.filter((item): item is BreadcrumbItem => Boolean(item));

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {visibleItems.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function GlossaryLinks({
  courseId,
  courseModule,
  glossaryById,
}: {
  courseId: string;
  courseModule: CourseModule;
  glossaryById: ReadonlyMap<string, GlossaryTerm>;
}) {
  return (
    <section className="info-section">
      <p className="eyebrow">Glossary links</p>
      <div className="term-link-list">
        {courseModule.glossaryIds.map((termId) => {
          const term = glossaryById.get(termId);
          return term ? (
            <Link
              key={termId}
              to={routeForGlossary(courseId)}
              className="term-chip"
              title={term.definition}
            >
              {term.term}
            </Link>
          ) : null;
        })}
      </div>
    </section>
  );
}

function ExampleBlock({
  consoleId,
  isConsoleActive,
  onOpenOutput,
  onRun,
  runState,
  snippet,
}: {
  consoleId: string;
  isConsoleActive: boolean;
  onOpenOutput: (snippetTitle: string) => void;
  onRun: (snippetTitle: string, runnableCode: string) => void;
  runState: RunState;
  snippet: CodeExample;
}) {
  const runnableCode = getRunnableSnippetCode(snippet);
  const displayCode = getSnippetDisplayCode(snippet, runnableCode);

  const handleRun = useCallback(() => {
    if (!runnableCode) {
      return;
    }

    onRun(snippet.title, runnableCode);
  }, [onRun, runnableCode, snippet.title]);

  const handleOpenOutput = useCallback(() => {
    onOpenOutput(snippet.title);
  }, [onOpenOutput, snippet.title]);

  return (
    <section className={`code-example ${isConsoleActive ? "is-console-active" : ""}`}>
      <div className="code-example-heading">
        <div>
          <h3>{snippet.title}</h3>
          <p>{snippet.summary}</p>
        </div>
        <div className="code-example-actions">
          <div className="pill-row">
            {snippet.complete ? <span className="level-pill">complete</span> : null}
            <VersionPill minGoVersion={snippet.minGoVersion} />
          </div>
          {runnableCode ? (
            <button
              type="button"
              className="run-button"
              aria-controls={consoleId}
              aria-expanded={isConsoleActive}
              disabled={runState.status === "running"}
              onClick={handleRun}
            >
              {runState.status === "running" ? "Running" : "Run"}
            </button>
          ) : null}
        </div>
      </div>
      <CodeBlock code={displayCode} />
      <SnippetRunSummary
        isConsoleActive={isConsoleActive}
        runState={runState}
        onOpenOutput={handleOpenOutput}
      />
    </section>
  );
}

function SnippetRunSummary({
  isConsoleActive,
  onOpenOutput,
  runState,
}: {
  isConsoleActive: boolean;
  onOpenOutput: () => void;
  runState: RunState;
}) {
  if (runState.status === "idle") {
    return null;
  }

  const view = getRunStateView(runState);

  return (
    <div className={`snippet-run-summary snippet-run-summary-${view.tone}`}>
      <span>{getSnippetRunSummaryLabel(runState)}</span>
      <button type="button" onClick={onOpenOutput}>
        {isConsoleActive ? "Console open" : "View console"}
      </button>
    </div>
  );
}

function PlaygroundConsole({
  consoleId,
  isOpen,
  onClose,
  runState,
  snippetTitle,
}: {
  consoleId: string;
  isOpen: boolean;
  onClose: () => void;
  runState: RunState;
  snippetTitle: string | null;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const view = getRunStateView(runState);

  useEffect(() => {
    if (!isOpen || !bodyRef.current) {
      return;
    }

    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [isOpen, snippetTitle, view.output]);

  if (!isOpen || !snippetTitle) {
    return null;
  }

  return (
    <aside
      id={consoleId}
      className={`playground-console playground-console-${view.tone}`}
      aria-label={`Output for ${snippetTitle}`}
    >
      <div className="playground-console-header">
        <div className="playground-console-title">
          <span>Console</span>
          <h2>{snippetTitle}</h2>
        </div>
        <div className="playground-console-actions">
          <span className="playground-console-status">{view.label}</span>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div
        ref={bodyRef}
        className="playground-console-body"
        role={view.role}
        aria-live={view.ariaLive}
      >
        <pre>{view.output}</pre>
      </div>
    </aside>
  );
}

function getRunStateView(runState: RunState): RunStateView {
  if (runState.status === "running") {
    return {
      ariaLive: "polite",
      label: "Running",
      output: "Waiting for the Go Playground...",
      role: "status",
      tone: "neutral",
    };
  }

  if (runState.status === "failed") {
    return {
      ariaLive: "assertive",
      label: "Request failed",
      output: runState.message,
      role: "alert",
      tone: "error",
    };
  }

  if (runState.status === "complete") {
    return {
      ariaLive: runState.result.tone === "error" ? "assertive" : "polite",
      label: runState.result.label,
      output: runState.result.output,
      role: runState.result.tone === "error" ? "alert" : "status",
      tone: runState.result.tone,
    };
  }

  return {
    ariaLive: "polite",
    label: "Console",
    output: "Run a snippet to see output.",
    role: "status",
    tone: "neutral",
  };
}

function getSnippetRunSummaryLabel(runState: RunState) {
  if (runState.status === "running") {
    return "Running in console";
  }

  if (runState.status === "failed") {
    return "Request failed";
  }

  if (runState.status === "complete") {
    return runState.result.tone === "error" ? "Run error in console" : "Output ready in console";
  }

  return "";
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function VersionPill({ minGoVersion }: { minGoVersion?: string }) {
  return minGoVersion ? <span className="level-pill">Go {minGoVersion}+</span> : null;
}

function DiagramFigure({
  diagram,
  featured = false,
}: {
  diagram: DiagramAsset;
  featured?: boolean;
}) {
  return (
    <figure className={`diagram-frame ${featured ? "diagram-frame-featured" : ""}`}>
      <a href={diagramSources[diagram.id]} target="_blank" rel="noreferrer">
        <img src={diagramSources[diagram.id]} alt={diagram.alt} loading="lazy" />
      </a>
      <figcaption>
        <p>{diagram.title}</p>
        <p>{diagram.caption}</p>
        <details>
          <summary>Transcript</summary>
          <p>{diagram.transcript}</p>
        </details>
      </figcaption>
    </figure>
  );
}

function InfoList({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: string[];
  tone?: "default" | "warning";
}) {
  return (
    <section className={`info-section ${tone === "warning" ? "info-section-warning" : ""}`}>
      <p className="eyebrow">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function CheckList({ checks }: { checks: Array<{ question: string; answer: string }> }) {
  return (
    <section className="info-section">
      <p className="eyebrow">Checks</p>
      <div className="qa-list">
        {checks.map((check) => (
          <div key={check.question}>
            <h3>{check.question}</h3>
            <p>{check.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExerciseList({
  exercises,
}: {
  exercises: Array<{ title: string; prompt: string; goal: string }>;
}) {
  return (
    <section className="info-section">
      <p className="eyebrow">Exercises</p>
      <div className="qa-list">
        {exercises.map((exercise) => (
          <div key={exercise.title}>
            <h3>{exercise.title}</h3>
            <p>{exercise.prompt}</p>
            <p className="exercise-goal">Goal: {exercise.goal}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p>{value}</p>
      <p>{label}</p>
    </div>
  );
}

function CodeBlock({ code, compact = false }: { code: string; compact?: boolean }) {
  return (
    <SyntaxHighlighter
      language="go"
      style={oneDark}
      customStyle={{
        ...codeBlockStyle,
        padding: compact ? "0.85rem" : codeBlockStyle.padding,
        fontSize: compact ? "0.84rem" : codeBlockStyle.fontSize,
      }}
      codeTagProps={{
        style: {
          fontFamily: '"IBM Plex Mono", monospace',
        },
      }}
      wrapLongLines
      showLineNumbers={false}
    >
      {code}
    </SyntaxHighlighter>
  );
}

function routeForCourse(courseId: string) {
  return `/courses/${encodeURIComponent(courseId)}`;
}

function routeForPart(courseId: string, partId: string) {
  return `${routeForCourse(courseId)}/parts/${encodeURIComponent(partId)}`;
}

function routeForModule(courseId: string, moduleId: string) {
  return `${routeForCourse(courseId)}/modules/${encodeURIComponent(moduleId)}`;
}

function routeForLesson(courseId: string, lessonId: string) {
  return `${routeForCourse(courseId)}/lessons/${encodeURIComponent(lessonId)}`;
}

function routeForDiagrams(courseId: string) {
  return `${routeForCourse(courseId)}/diagrams`;
}

function routeForGlossary(courseId: string) {
  return `${routeForCourse(courseId)}/glossary`;
}

function routeForCheatSheet(courseId: string) {
  return `${routeForCourse(courseId)}/cheatsheet`;
}

export default App;
