import { useEffect, useMemo, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import channelRendezvous from "./assets/diagrams/channel-rendezvous.png";
import contextTree from "./assets/diagrams/context-tree.png";
import errorChain from "./assets/diagrams/error-chain.png";
import goroutineStacks from "./assets/diagrams/goroutine-stacks.png";
import explicitPointer from "./assets/diagrams/explicit-pointer.png";
import interfaceValue from "./assets/diagrams/interface-value.png";
import iteratorYield from "./assets/diagrams/iterator-yield.png";
import mapIteration from "./assets/diagrams/map-iteration.png";
import operatorPrecedence from "./assets/diagrams/operator-precedence.webp";
import readerWriter from "./assets/diagrams/reader-writer.png";
import schedulerMpg from "./assets/diagrams/scheduler-mpg.png";
import sliceHeader from "./assets/diagrams/slice-header.png";
import sourceFile from "./assets/diagrams/source-file.png";
import stringRunes from "./assets/diagrams/string-runes.png";
import structPadding from "./assets/diagrams/struct-padding.png";
import {
  cheatSheet,
  courseMeta,
  courseModules,
  courseParts,
  diagrams,
  glossary,
  type CodeExample,
  type CourseModule,
  type DiagramAsset,
  type Lesson,
} from "./course";

SyntaxHighlighter.registerLanguage("go", go);

type Theme = "light" | "dark";

const diagramSources: Record<string, string> = {
  "channel-rendezvous": channelRendezvous,
  "context-tree": contextTree,
  "error-chain": errorChain,
  "goroutine-stacks": goroutineStacks,
  "explicit-pointer": explicitPointer,
  "interface-value": interfaceValue,
  "iterator-yield": iteratorYield,
  "map-iteration": mapIteration,
  "operator-precedence": operatorPrecedence,
  "reader-writer": readerWriter,
  "scheduler-mpg": schedulerMpg,
  "slice-header": sliceHeader,
  "source-file": sourceFile,
  "string-runes": stringRunes,
  "struct-padding": structPadding,
};

const generatedDiagramCount = new Set(Object.values(diagramSources)).size;

const codeBlockStyle = {
  margin: 0,
  padding: "1rem",
  borderRadius: "0.75rem",
  background: "rgba(11, 18, 24, 0.98)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "0.9rem",
  lineHeight: 1.75,
};

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("learn-go-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("learn-go-theme", theme);
  }, [theme]);

  const modulesById = useMemo(
    () => new Map(courseModules.map((courseModule) => [courseModule.id, courseModule])),
    [],
  );
  const diagramsById = useMemo(() => new Map(diagrams.map((diagram) => [diagram.id, diagram])), []);
  const glossaryById = useMemo(() => new Map(glossary.map((term) => [term.id, term])), []);

  return (
    <div className="site-shell min-h-screen bg-canvas text-ink">
      <header className="site-header sticky top-0 z-40 border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="#top" className="min-w-0">
            <p className="font-display text-lg font-semibold tracking-tight">Learn Go</p>
            <p className="hidden text-sm text-ink/72 sm:block">
              Visual course from first syntax to runtime behavior
            </p>
          </a>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-sm font-semibold text-ink/76 lg:flex">
              <a href="#curriculum" className="hover:text-ink">
                Curriculum
              </a>
              <a href="#diagrams" className="hover:text-ink">
                Diagrams
              </a>
              <a href="#glossary" className="hover:text-ink">
                Glossary
              </a>
              <a href="#cheatsheet" className="hover:text-ink">
                Cheat sheet
              </a>
            </nav>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() =>
                setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8">
        <section className="hero-grid border-b border-line pb-10">
          <div className="space-y-6">
            <p className="eyebrow">Complete Go teaching course</p>
            <div className="space-y-4">
              <h1 className="max-w-5xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Learn Go with structured lessons, runnable code, and hand-drawn diagrams.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-ink/78">
                The course now teaches concepts in order: source files, values, data ownership,
                explicit pointers, interfaces, errors, the standard library, concurrency, runtime
                behavior, and advanced boundaries.
              </p>
            </div>

            <div className="stats-grid">
              <SummaryStat label="Course parts" value={String(courseParts.length)} />
              <SummaryStat label="Modules" value={String(courseModules.length)} />
              <SummaryStat label="Lessons" value={String(countLessons())} />
              <SummaryStat label="Target Go" value={courseMeta.targetGoVersion} />
              <SummaryStat label="Generated diagrams" value={String(generatedDiagramCount)} />
            </div>
            <p className="max-w-3xl text-sm leading-6 text-ink/70">
              {courseMeta.targetGoVersionDetail}
            </p>

            <div className="flex flex-wrap gap-3">
              <a className="primary-button" href="#curriculum">
                Start curriculum
              </a>
              <a className="secondary-button" href="#diagrams">
                View diagrams
              </a>
            </div>
          </div>

          <aside className="course-map">
            <p className="eyebrow">Reading order</p>
            <ol className="mt-4 space-y-4">
              {courseParts.map((part, index) => (
                <li key={part.id}>
                  <a href={`#${part.id}`} className="group block">
                    <p className="text-sm font-semibold text-ink">
                      {String(index + 1).padStart(2, "0")} {part.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink/72 group-hover:text-ink">
                      {part.summary}
                    </p>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <div className="content-grid pt-10">
          <aside className="toc-panel">
            <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-auto pr-3">
              <p className="eyebrow">Modules</p>
              <nav className="mt-4 space-y-2 text-sm leading-6 text-ink/74">
                {courseModules.map((courseModule) => (
                  <a
                    key={courseModule.id}
                    className="block hover:text-ink"
                    href={`#${courseModule.id}`}
                  >
                    {courseModule.stage} {courseModule.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 space-y-16">
            <section id="curriculum" className="space-y-12">
              <SectionHeader
                eyebrow="Curriculum"
                title="Teach Go as a sequence of concepts"
                description="Each part contains modules, outcomes, focused lessons, visual explanations, code, mistakes, checks, and exercises."
              />

              {courseParts.map((part) => (
                <section key={part.id} id={part.id} className="part-section">
                  <div className="part-heading">
                    <p className="eyebrow">{part.title}</p>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                      {part.summary}
                    </h2>
                  </div>

                  <div className="space-y-10">
                    {part.moduleIds.map((moduleId) => {
                      const courseModule = modulesById.get(moduleId);
                      return courseModule ? (
                        <ModuleView
                          key={courseModule.id}
                          courseModule={courseModule}
                          diagramsById={diagramsById}
                          glossaryById={glossaryById}
                        />
                      ) : null;
                    })}
                  </div>
                </section>
              ))}
            </section>

            <section id="diagrams" className="border-t border-line pt-12">
              <SectionHeader
                eyebrow="Visual library"
                title="Generated hand-drawn teaching pictures"
                description="These project assets are generated bitmap diagrams saved under src/assets/diagrams and referenced by the lesson data."
              />

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                {diagrams
                  .filter((diagram) => diagramSources[diagram.id])
                  .map((diagram) => (
                    <DiagramFigure key={diagram.id} diagram={diagram} />
                  ))}
              </div>
            </section>

            <section id="glossary" className="border-t border-line pt-12">
              <SectionHeader
                eyebrow="Glossary"
                title="Terms learners will see repeatedly"
                description="Short definitions keep repeated concepts consistent across modules."
              />
              <div className="mt-8 glossary-grid">
                {glossary.map((term) => (
                  <div key={term.id} className="surface-card rounded-lg border p-4">
                    <h3 className="font-semibold text-ink">{term.term}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/76">{term.definition}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="cheatsheet" className="border-t border-line pt-12">
              <SectionHeader
                eyebrow="Cheat sheet"
                title="Reference after the lessons"
                description="Compact reminders for the concepts taught in the curriculum."
              />
              <div className="surface-card mt-8 overflow-hidden rounded-lg border">
                {cheatSheet.map((item, index) => (
                  <div
                    key={item.title}
                    className={`grid gap-5 p-5 lg:grid-cols-[14rem_minmax(0,1fr)] ${
                      index > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <VersionPill minGoVersion={item.minGoVersion} />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink/76">{item.note}</p>
                    </div>
                    <CodeBlock code={item.code} compact />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function countLessons() {
  return courseModules.reduce((total, courseModule) => total + courseModule.lessons.length, 0);
}

type ModuleViewProps = {
  courseModule: CourseModule;
  diagramsById: ReadonlyMap<string, DiagramAsset>;
  glossaryById: ReadonlyMap<string, { term: string; definition: string }>;
};

function ModuleView({ courseModule, diagramsById, glossaryById }: ModuleViewProps) {
  return (
    <article id={courseModule.id} className="module-card">
      <div className="min-w-0 space-y-7">
        <div className="space-y-3">
          <div className="module-meta">
            <p className="eyebrow">{courseModule.stage}</p>
            <p className="level-pill">{courseModule.level}</p>
          </div>
          <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {courseModule.title}
          </h3>
          <p className="max-w-3xl text-sm leading-7 text-ink/78">{courseModule.summary}</p>
        </div>

        <div className="module-lists">
          <InfoList title="Prerequisites" items={courseModule.prerequisites} />
          <InfoList title="Outcomes" items={courseModule.outcomes} />
        </div>

        <div className="flex flex-wrap gap-2">
          {courseModule.glossaryIds.map((termId) => {
            const term = glossaryById.get(termId);
            return term ? (
              <a key={termId} href="#glossary" className="term-chip" title={term.definition}>
                {term.term}
              </a>
            ) : null;
          })}
        </div>

        <div className="space-y-8">
          {courseModule.lessons.map((lesson) => (
            <LessonView key={lesson.id} lesson={lesson} diagramsById={diagramsById} />
          ))}
        </div>
      </div>
    </article>
  );
}

type LessonViewProps = {
  lesson: Lesson;
  diagramsById: ReadonlyMap<string, DiagramAsset>;
};

function LessonView({ lesson, diagramsById }: LessonViewProps) {
  return (
    <section id={lesson.id} className="lesson-card">
      <div className="space-y-2">
        <p className="eyebrow">Lesson</p>
        <h4 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {lesson.title}
        </h4>
        <p className="text-sm leading-7 text-ink/78">{lesson.teachingGoal}</p>
      </div>

      {lesson.diagramIds.length ? (
        <div className="grid gap-5">
          {lesson.diagramIds.map((diagramId) => {
            const diagram = diagramsById.get(diagramId);
            return diagram && diagramSources[diagram.id] ? (
              <DiagramFigure key={diagram.id} diagram={diagram} featured />
            ) : null;
          })}
        </div>
      ) : null}

      <div className="space-y-5">
        {lesson.explanation.map((block, index) => (
          <div key={`${lesson.id}-block-${index}`} className="space-y-2">
            {block.title ? <h5 className="font-semibold text-ink">{block.title}</h5> : null}
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-ink/80">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {lesson.snippets.map((snippet) => (
          <ExampleCard key={snippet.title} snippet={snippet} />
        ))}
      </div>

      <div className="lesson-support-grid">
        <InfoList title="Common mistakes" items={lesson.mistakes} tone="warning" />
        <div className="surface-card rounded-lg border p-4">
          <p className="eyebrow">Checks</p>
          <div className="mt-4 space-y-4">
            {lesson.checks.map((check) => (
              <div key={check.question}>
                <p className="text-sm font-semibold text-ink">{check.question}</p>
                <p className="mt-1 text-sm leading-6 text-ink/72">{check.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="surface-card rounded-lg border p-4">
          <p className="eyebrow">Exercises</p>
          <div className="mt-4 space-y-4">
            {lesson.exercises.map((exercise) => (
              <div key={exercise.title}>
                <p className="text-sm font-semibold text-ink">{exercise.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink/76">{exercise.prompt}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Goal: {exercise.goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExampleCard({ snippet }: { snippet: CodeExample }) {
  return (
    <div className="surface-card overflow-hidden rounded-lg border">
      <div className="border-b border-line p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h5 className="font-semibold text-ink">{snippet.title}</h5>
            <p className="mt-1 text-sm leading-6 text-ink/72">{snippet.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {snippet.complete ? <span className="level-pill">complete</span> : null}
            <VersionPill minGoVersion={snippet.minGoVersion} />
          </div>
        </div>
      </div>
      <CodeBlock code={snippet.code} />
    </div>
  );
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
        <p className="font-semibold text-ink">{diagram.title}</p>
        <p className="mt-1 text-sm leading-6 text-ink/72">{diagram.caption}</p>
        <details className="mt-2 text-xs leading-5 text-ink/64">
          <summary className="cursor-pointer font-semibold text-accent">Transcript</summary>
          <p className="mt-1">{diagram.transcript}</p>
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
    <div className="surface-card rounded-lg border p-4">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/78">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                tone === "warning" ? "bg-warning" : "bg-accent"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-ink/76">{description}</p>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-line pl-4">
      <p className="text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="text-sm text-ink/70">{label}</p>
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

export default App;
