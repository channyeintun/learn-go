import { useEffect, useState, type ReactNode } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import {
  cheatSheet,
  concurrencyPatterns,
  coverageAreas,
  learningSections,
  learningTracks,
  libraryGroups,
  practiceGuides,
} from "./content";

SyntaxHighlighter.registerLanguage("go", go);

type Theme = "light" | "dark";

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

const codeBlockStyle = {
  margin: 0,
  padding: "1.25rem",
  borderRadius: "1.5rem",
  background: "rgba(10, 17, 22, 0.96)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "0.96rem",
  lineHeight: 1.8,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("learn-go-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme} className="site-shell min-h-screen bg-canvas text-ink">
      <header className="site-header sticky top-0 z-40 border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Learn Go</p>
            <p className="text-sm text-ink/82">
              A structured Go course from first syntax to runtime behavior.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <nav className="hidden flex-wrap items-center gap-4 text-sm font-medium text-ink/84 lg:flex">
              <a href="#coverage" className="transition hover:text-ink">
                Coverage
              </a>
              <a href="#tracks" className="transition hover:text-ink">
                Syllabus
              </a>
              <a href="#curriculum" className="transition hover:text-ink">
                Modules
              </a>
              <a href="#stdlib" className="transition hover:text-ink">
                Stdlib
              </a>
              <a href="#concurrency-lab" className="transition hover:text-ink">
                Concurrency
              </a>
              <a href="#cheatsheet" className="transition hover:text-ink">
                Cheat sheet
              </a>
            </nav>

            <ThemeToggle
              theme={theme}
              onToggle={() =>
                setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pt-12">
        <section className="border-b border-navy/12 pb-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-bronze/20 bg-sand/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                Comprehensive Go curriculum
              </span>
              <div className="space-y-4">
                <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
                  A complete Go course, from first syntax to production systems.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-ink/84">
                  Read it in order like technical documentation, or jump directly to the parts you
                  need: a 25-keyword language core, types, errors, testing, HTTP services,
                  concurrency, scheduler behavior, memory layout, and production design.
                </p>
              </div>

              <div className="grid gap-6 border-y border-navy/12 py-6 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryStat label="Detailed modules" value={String(learningSections.length)} />
                <SummaryStat label="Go keywords" value="25" />
                <SummaryStat label="Coverage areas" value={String(coverageAreas.length)} />
                <SummaryStat label="Stdlib clusters" value={String(libraryGroups.length)} />
                <SummaryStat label="Cheat sheet entries" value={String(cheatSheet.length)} />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#curriculum"
                  className="primary-button rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Read the modules
                </a>
                <a
                  href="#cheatsheet"
                  className="secondary-button rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Open the cheat sheet
                </a>
              </div>
            </div>

            <aside className="lg:border-l lg:border-navy/12 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                Reading order
              </p>
              <ol className="mt-4 space-y-5">
                {learningTracks.map((track, index) => (
                  <li key={track.title} className="space-y-2">
                    <p className="text-sm font-semibold tracking-tight text-ink">
                      {String(index + 1).padStart(2, "0")} {track.title}
                    </p>
                    <p className="text-sm leading-6 text-ink/80">{track.audience}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:pt-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100svh-7rem)] space-y-8 overflow-y-auto overscroll-contain pr-4">
              <nav className="space-y-3 border-b border-navy/12 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                  In this guide
                </p>
                <div className="space-y-2 text-sm leading-6 text-ink/82">
                  <a className="block transition hover:text-ink" href="#coverage">
                    Coverage map
                  </a>
                  <a className="block transition hover:text-ink" href="#tracks">
                    Study tracks
                  </a>
                  <a className="block transition hover:text-ink" href="#curriculum">
                    Modules
                  </a>
                  <a className="block transition hover:text-ink" href="#stdlib">
                    Standard library
                  </a>
                  <a className="block transition hover:text-ink" href="#concurrency-lab">
                    Concurrency
                  </a>
                  <a className="block transition hover:text-ink" href="#cheatsheet">
                    Cheat sheet
                  </a>
                </div>
              </nav>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                  Module index
                </p>
                <div className="space-y-2 text-sm leading-6 text-ink/80">
                  {learningSections.map((section) => (
                    <a
                      key={section.id}
                      className="block transition hover:text-ink"
                      href={`#${section.id}`}
                    >
                      {section.stage} {section.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <article className="min-w-0 space-y-14 pt-10 lg:pt-0">
            <section id="coverage" className="border-b border-navy/12 pb-12">
              <SectionHeader
                eyebrow="Coverage"
                title="What this guide covers"
                description="This section works like a coverage map, not a marketing grid. Each row shows the area of Go the course explains and the concrete topics it includes."
              />

              <div className="mt-8 space-y-8">
                {coverageAreas.map((area) => (
                  <div
                    key={area.title}
                    className="grid gap-4 border-t border-navy/12 pt-6 lg:grid-cols-[15rem_minmax(0,1fr)]"
                  >
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-ink/80">{area.summary}</p>
                    </div>
                    <ul className="grid gap-x-8 gap-y-3 text-sm leading-6 text-ink/86 sm:grid-cols-2">
                      {area.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="tracks" className="border-b border-navy/12 pb-12">
              <SectionHeader
                eyebrow="Study tracks"
                title="Reading order"
                description="Instead of cards, the course now starts with a reading order. Move top to bottom if you are learning from scratch, or jump directly to the track that matches your current gap."
              />

              <div className="mt-8 space-y-8">
                {learningTracks.map((track, index) => (
                  <div
                    key={track.title}
                    className="grid gap-4 border-t border-navy/12 pt-6 lg:grid-cols-[12rem_minmax(0,1fr)]"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                        Track {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                        {track.title}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm leading-7 text-ink/84">{track.audience}</p>
                      <ol className="space-y-3 text-sm leading-6 text-ink/86">
                        {track.modules.map((module) => (
                          <li key={module} className="flex gap-3">
                            <span className="font-semibold text-bronze">/</span>
                            <span>{module}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="curriculum" className="border-b border-navy/12 pb-12">
              <SectionHeader
                eyebrow="Modules"
                title="Full curriculum"
                description="This is the main reading column. Each module now reads like a lesson: summary first, guided explanation next, then the module map, common mistakes, and worked Go examples that actually teach the named concepts."
              />

              <div className="mt-8 space-y-10">
                {learningSections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="grid gap-5 border-t border-navy/12 pt-8 lg:grid-cols-[12rem_minmax(0,1fr)]"
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                        {section.stage}
                      </p>
                      <a
                        href={`#${section.id}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/68 transition hover:text-ink"
                      >
                        #{section.id}
                      </a>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-3">
                        <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
                          {section.title}
                        </h3>
                        <p className="max-w-3xl text-sm leading-7 text-ink/84">{section.summary}</p>
                      </div>

                      <div className="surface-card space-y-6 rounded-3xl border px-5 py-5 sm:px-6">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.title}
                            className="space-y-3 border-t border-navy/10 pt-5 first:border-t-0 first:pt-0"
                          >
                            <h4 className="font-display text-2xl font-semibold tracking-tight text-ink">
                              {lesson.title}
                            </h4>
                            <div className="space-y-3 text-sm leading-7 text-ink/84">
                              {lesson.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                              ))}
                            </div>
                            {lesson.table && (
                              <div className="overflow-x-auto rounded-2xl border border-navy/12">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-navy/12 bg-sand/60">
                                      {lesson.table.headers.map((header) => (
                                        <th
                                          key={header}
                                          className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.18em] text-bronze"
                                        >
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {lesson.table.rows.map((row, rowIndex) => (
                                      <tr
                                        key={rowIndex}
                                        className="border-b border-navy/8 last:border-0 odd:bg-canvas/40 even:bg-sand/20 transition-colors hover:bg-teal/5"
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td
                                            key={cellIndex}
                                            className={`px-4 py-2.5 leading-6 text-ink/84 ${cellIndex === 0 ? "font-semibold text-bronze/90 font-mono text-xs" : ""} ${cellIndex === 1 ? "font-mono text-xs text-ink" : ""}`}
                                          >
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
                        <div className="space-y-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                            Module map
                          </p>
                          <ul className="grid gap-x-8 gap-y-3 text-sm leading-6 text-ink/86 sm:grid-cols-2">
                            {section.topics.map((topic) => (
                              <li key={topic} className="flex items-start gap-3">
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal"></span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <aside className="muted-card rounded-3xl border px-5 py-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                            Common mistakes
                          </p>
                          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/84">
                            {section.pitfalls.map((pitfall) => (
                              <li key={pitfall} className="flex items-start gap-3">
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                                <span>{pitfall}</span>
                              </li>
                            ))}
                          </ul>
                        </aside>
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                          {section.snippetTitle}
                        </p>
                        <CodeBlock code={section.snippet} />
                      </div>

                      {section.examples?.length ? (
                        <div className="space-y-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                            Worked examples
                          </p>
                          <div className="space-y-5">
                            {section.examples.map((example) => (
                              <div
                                key={example.title}
                                className="surface-card rounded-3xl border px-5 py-5"
                              >
                                <div className="space-y-2">
                                  <h4 className="font-display text-2xl font-semibold tracking-tight text-ink">
                                    {example.title}
                                  </h4>
                                  <p className="max-w-3xl text-sm leading-7 text-ink/84">
                                    {example.summary}
                                  </p>
                                </div>
                                <div className="mt-4">
                                  <CodeBlock code={example.snippet} compact />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section id="stdlib" className="border-b border-navy/12 pb-12">
              <SectionHeader
                eyebrow="Standard library"
                title="Packages and habits that matter in real code"
                description="Professional Go learning should explain both the library surface and the coding habits that keep packages obvious, small, and maintainable."
              />

              <div className="mt-8 space-y-8">
                {libraryGroups.map((group) => (
                  <div
                    key={group.title}
                    className="grid gap-4 border-t border-navy/12 pt-6 lg:grid-cols-[15rem_minmax(0,1fr)]"
                  >
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-ink/80">{group.summary}</p>
                    </div>
                    <div className="text-sm leading-7 text-ink/86">
                      {group.packages.map((pkg, index) => (
                        <span key={pkg}>
                          <span className="font-mono text-[0.92rem] text-ink">{pkg}</span>
                          {index < group.packages.length - 1 ? (
                            <span className="px-2 text-ink/45">/</span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-8 border-t border-navy/12 pt-8">
                <SectionHeader
                  eyebrow="Practice rules"
                  title="Professional Go habits"
                  description="These are the engineering rules the course emphasizes repeatedly, because they affect readability more than any visual theme does."
                />

                <div className="space-y-8">
                  {practiceGuides.map((guide) => (
                    <div
                      key={guide.title}
                      className="grid gap-4 border-t border-navy/12 pt-6 lg:grid-cols-[15rem_minmax(0,1fr)]"
                    >
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                          {guide.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-ink/80">{guide.summary}</p>
                      </div>
                      <ul className="space-y-3 text-sm leading-6 text-ink/86">
                        {guide.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="concurrency-lab" className="border-b border-navy/12 pb-12">
              <SectionHeader
                eyebrow="Concurrency"
                title="Coordination patterns and tradeoffs"
                description="Concurrency needs more than one picture. These diagrams show the exact handoffs that matter in Go: receive-before-send for unbuffered channels and cancellation flowing through workers and shutdown paths."
              />

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div className="space-y-8">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <DiagramCard
                      eyebrow="Illustration 01"
                      title="Receive first, then send"
                      summary="This is the exact blocking rule behind unbuffered channels. The listener route has to be present before the send path can complete."
                    >
                      <ChannelHandoffIllustration />
                    </DiagramCard>

                    <DiagramCard
                      eyebrow="Illustration 02"
                      title="Cancellation should fan out cleanly"
                      summary="A single context signal should stop workers, unblock waits, and drive graceful shutdown instead of leaving orphan goroutines behind."
                    >
                      <CancellationIllustration />
                    </DiagramCard>
                  </div>

                  <div className="space-y-8">
                    {concurrencyPatterns.map((pattern) => (
                      <div key={pattern.title} className="border-t border-navy/12 pt-6">
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                          {pattern.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-ink/84">{pattern.summary}</p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/86">
                          {pattern.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="border-t border-navy/12 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                    Quick reminders
                  </p>
                  <div className="mt-4 space-y-6 text-sm leading-6 text-ink/84">
                    <div>
                      <p className="font-semibold text-ink">WaitGroup</p>
                      <p className="mt-1">
                        Use it to prove a known set of goroutines finished. Prefer{" "}
                        <span className="font-mono text-[0.92rem]">WaitGroup.Go</span> when it keeps
                        launch bookkeeping obvious.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">Channel handoff</p>
                      <p className="mt-1">
                        For unbuffered channels, establish the receiving path before the send path,
                        or the sender blocks waiting for a listener.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">Mutex</p>
                      <p className="mt-1">
                        Use it when the problem is shared memory, not message passing.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">Cond</p>
                      <p className="mt-1">
                        Use it when goroutines must sleep until protected state changes.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <section id="cheatsheet" className="pb-6">
              <SectionHeader
                eyebrow="Cheat sheet"
                title="Reference rows for day-to-day coding"
                description="The cheat sheet is now presented like a reference table: concept on the left, explanation and highlighted example on the right."
              />

              <div className="surface-card mt-8 overflow-hidden rounded-3xl border">
                {cheatSheet.map((item, index) => (
                  <div
                    key={item.title}
                    className={`grid gap-5 px-5 py-6 lg:grid-cols-[15rem_minmax(0,1fr)] ${index > 0 ? "border-t border-navy/12" : ""}`}
                  >
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-ink/80">{item.note}</p>
                    </div>
                    <CodeBlock code={item.snippet} compact />
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle-btn"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <div className="theme-toggle-icon-wrapper">
        {/* Sun Icon */}
        <svg
          className="theme-icon theme-icon-sun"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon Icon */}
        <svg
          className="theme-icon theme-icon-moon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      </div>
    </button>
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
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bronze">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-ink/80">{description}</p>
    </div>
  );
}

type SummaryStatProps = {
  label: string;
  value: string;
};

function SummaryStat({ label, value }: SummaryStatProps) {
  return (
    <div className="space-y-1 border-l border-navy/12 pl-4">
      <p className="text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="text-sm text-ink/80">{label}</p>
    </div>
  );
}

type CodeBlockProps = {
  code: string;
  compact?: boolean;
};

function CodeBlock({ code, compact = false }: CodeBlockProps) {
  return (
    <div className={compact ? "code-block code-block-compact" : "code-block"}>
      <SyntaxHighlighter
        language="go"
        style={oneDark}
        customStyle={{
          ...codeBlockStyle,
          padding: compact ? "1rem" : codeBlockStyle.padding,
          fontSize: compact ? "0.88rem" : codeBlockStyle.fontSize,
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
    </div>
  );
}

type DiagramCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
};

function DiagramCard({ eyebrow, title, summary, children }: DiagramCardProps) {
  return (
    <div className="diagram-card overflow-hidden rounded-4xl border p-5 shadow-[0_20px_70px_rgba(16,33,43,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink/82">{summary}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ChannelHandoffIllustration() {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 600 240"
        className="w-full max-w-[500px] h-auto overflow-visible select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid Lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="opacity-[0.03]"
            />
          </pattern>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="600" height="240" rx="16" fill="url(#grid)" className="fill-canvas/10" />

        {/* Lanes / Tracks */}
        {/* Receiver swimlane */}
        <rect
          x="20"
          y="30"
          width="180"
          height="180"
          rx="16"
          className="fill-sand stroke-border-subtle"
          strokeWidth="1.5"
        />
        <text
          x="110"
          y="60"
          textAnchor="middle"
          className="fill-ink/40 font-semibold text-[10px] tracking-[0.2em] uppercase"
        >
          Goroutine 1
        </text>
        <text
          x="110"
          y="80"
          textAnchor="middle"
          className="fill-teal font-semibold text-xs tracking-wide"
        >
          Receiver
        </text>

        {/* Sender swimlane */}
        <rect
          x="400"
          y="30"
          width="180"
          height="180"
          rx="16"
          className="fill-sand stroke-border-subtle"
          strokeWidth="1.5"
        />
        <text
          x="490"
          y="60"
          textAnchor="middle"
          className="fill-ink/40 font-semibold text-[10px] tracking-[0.2em] uppercase"
        >
          Goroutine 2
        </text>
        <text
          x="490"
          y="80"
          textAnchor="middle"
          className="fill-bronze font-semibold text-xs tracking-wide"
        >
          Sender
        </text>

        {/* Channel Portal (Sync gate in the center) */}
        <g transform="translate(265, 80)">
          {/* Channel Cylinder Structure */}
          <rect
            x="0"
            y="0"
            width="70"
            height="80"
            rx="35"
            className="fill-canvas stroke-border-subtle"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="40"
            x2="70"
            y2="40"
            className="stroke-border-subtle"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x="35"
            y="45"
            textAnchor="middle"
            className="fill-ink/80 font-mono text-[10px] font-bold tracking-widest uppercase"
          >
            chan
          </text>
          {/* Sync status glow */}
          <circle
            cx="35"
            cy="40"
            r="10"
            className="fill-teal/10 stroke-teal/40 animate-pulse"
            strokeWidth="1"
          />
        </g>

        {/* Flow Lines */}
        {/* Receiver Wait path */}
        <path
          d="M 200 120 L 265 120"
          className="stroke-teal/40"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* Sender Handoff path */}
        <path
          d="M 400 120 L 335 120"
          className="stroke-bronze/40"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Flowing Data particle */}
        <g className="handoff-particle-group">
          <circle
            cx="300"
            cy="120"
            r="10"
            className="fill-bronze stroke-white"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <text
            x="300"
            y="123"
            textAnchor="middle"
            className="fill-white font-mono text-[9px] font-bold"
          >
            v
          </text>
        </g>

        {/* State Indicators */}
        <g transform="translate(110, 140)">
          <rect
            x="-55"
            y="-12"
            width="110"
            height="24"
            rx="12"
            className="fill-teal/10 stroke-teal/30"
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            y="3"
            className="fill-teal font-semibold text-[9px] tracking-wider uppercase"
          >
            wait-receive
          </text>
        </g>

        <g transform="translate(490, 140)">
          <rect
            x="-55"
            y="-12"
            width="110"
            height="24"
            rx="12"
            className="fill-bronze/10 stroke-bronze/30"
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            y="3"
            className="fill-bronze font-semibold text-[9px] tracking-wider uppercase"
          >
            send-block
          </text>
        </g>

        <text
          x="300"
          y="200"
          textAnchor="middle"
          className="fill-ink/50 text-[10px] tracking-wide italic"
        >
          Blocks until sender and receiver rendezvous
        </text>
      </svg>
    </div>
  );
}

function CancellationIllustration() {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 600 240"
        className="w-full max-w-[500px] h-auto overflow-visible select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-c" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="opacity-[0.03]"
            />
          </pattern>
          <filter id="cancel-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="600" height="240" rx="16" fill="url(#grid-c)" className="fill-canvas/10" />

        {/* Tree Connection Lines */}
        <g className="tree-lines">
          <path
            d="M 120 120 C 180 120, 180 60, 265 60"
            className="stroke-border-subtle"
            strokeWidth="2"
          />
          <path
            d="M 120 120 C 180 120, 180 120, 265 120"
            className="stroke-border-subtle"
            strokeWidth="2"
          />
          <path
            d="M 120 120 C 180 120, 180 180, 265 180"
            className="stroke-border-subtle"
            strokeWidth="2"
          />

          {/* Active Flow pulses running down the channels */}
          <path
            d="M 120 120 C 180 120, 180 60, 265 60"
            className="stroke-teal/30 cancel-pulse-line"
            strokeWidth="2"
          />
          <path
            d="M 120 120 C 180 120, 180 120, 265 120"
            className="stroke-teal/30 cancel-pulse-line"
            strokeWidth="2"
          />
          <path
            d="M 120 120 C 180 120, 180 180, 265 180"
            className="stroke-teal/30 cancel-pulse-line"
            strokeWidth="2"
          />
        </g>

        {/* Parent Context Node */}
        <g transform="translate(20, 80)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            rx="16"
            className="fill-sand stroke-bronze"
            strokeWidth="2"
            filter="url(#cancel-glow)"
          />
          <text
            x="50"
            y="32"
            textAnchor="middle"
            className="fill-ink/40 font-semibold text-[9px] tracking-widest uppercase"
          >
            context
          </text>
          <text
            x="50"
            y="52"
            textAnchor="middle"
            className="fill-bronze font-bold text-sm tracking-wide"
          >
            ctx.Done()
          </text>
          <circle cx="50" cy="65" r="4" className="fill-bronze animate-ping" />
          <circle cx="50" cy="65" r="4" className="fill-bronze" />
        </g>

        {/* Child Worker Nodes (Fan-out) */}
        {/* Worker 1 */}
        <g transform="translate(280, 25)">
          <rect
            x="0"
            y="0"
            width="130"
            height="50"
            rx="12"
            className="worker-rect stroke-border-subtle"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="22"
            textAnchor="middle"
            className="fill-ink font-semibold text-[11px] tracking-wide"
          >
            Worker 1
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-running fill-teal font-semibold text-[8px] tracking-widest uppercase"
          >
            running
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-cancelled fill-bronze font-semibold text-[8px] tracking-widest uppercase"
          >
            cancelled
          </text>
          <circle cx="20" cy="22" r="3" className="worker-dot" />
        </g>

        {/* Worker 2 */}
        <g transform="translate(280, 95)">
          <rect
            x="0"
            y="0"
            width="130"
            height="50"
            rx="12"
            className="worker-rect stroke-border-subtle"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="22"
            textAnchor="middle"
            className="fill-ink font-semibold text-[11px] tracking-wide"
          >
            Worker 2
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-running fill-teal font-semibold text-[8px] tracking-widest uppercase"
          >
            running
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-cancelled fill-bronze font-semibold text-[8px] tracking-widest uppercase"
          >
            cancelled
          </text>
          <circle cx="20" cy="22" r="3" className="worker-dot" />
        </g>

        {/* Worker 3 */}
        <g transform="translate(280, 165)">
          <rect
            x="0"
            y="0"
            width="130"
            height="50"
            rx="12"
            className="worker-rect stroke-border-subtle"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="22"
            textAnchor="middle"
            className="fill-ink font-semibold text-[11px] tracking-wide"
          >
            Worker 3
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-running fill-teal font-semibold text-[8px] tracking-widest uppercase"
          >
            running
          </text>
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="worker-status-cancelled fill-bronze font-semibold text-[8px] tracking-widest uppercase"
          >
            cancelled
          </text>
          <circle cx="20" cy="22" r="3" className="worker-dot" />
        </g>

        {/* Cancellation signal rings */}
        <g className="cancel-rings-group">
          <circle
            cx="120"
            cy="120"
            r="10"
            className="stroke-bronze/60 fill-none cancel-ring"
            strokeWidth="1.5"
          />
          <circle
            cx="120"
            cy="120"
            r="10"
            className="stroke-bronze/40 fill-none cancel-ring-delayed"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

export default App;
