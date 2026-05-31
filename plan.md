# Learn Go Teaching Site Plan

## Goal

Turn the current site into a structured Go teaching resource instead of a long text-heavy overview. The end result should guide learners from first syntax through production Go, with clear lesson progression, runnable examples, common mistakes, exercises, and hand-drawn-style diagrams for abstract concepts like pointers, slices, interfaces, concurrency, and runtime behavior.

This file is a plan only. No implementation should start until the plan is reviewed.

## Current Findings

- `src/course.ts` now contains the rendered curriculum with course parts, modules, lessons, outcomes, checks, exercises, glossary terms, cheat-sheet entries, and reusable diagram metadata.
- `src/App.tsx` renders the course as one guided page with a curriculum hierarchy, diagrams, glossary, and cheat sheet.
- Diagrams are reusable bitmap assets under `src/assets/diagrams` and are referenced by lesson data.
- Version-sensitive content should stay labeled before publishing; future additions that mention newer Go APIs or syntax such as `errors.AsType`, `WaitGroup.Go`, `testing.B.Loop`, integer `range`, or range-over-function iterators need explicit version notes.

## Teaching Structure

Use a layered curriculum:

1. Course part: broad unit such as "Language Core" or "Concurrency".
2. Module: a teachable chapter with prerequisites and outcomes.
3. Lesson: one focused concept with explanation, diagram, code, mistakes, and practice.
4. Example: a runnable snippet or mini-program.
5. Exercise: a learner task with expected behavior and optional solution notes.
6. Reference: concise cheat-sheet entry for later lookup.

The site should support both modes:

- Guided learning: read from Module 01 forward.
- Reference lookup: jump to pointers, slices, errors, channels, testing, HTTP, etc.

## Proposed Content Model

Replace or extend the current `LearningSection` shape with content that can teach lesson-by-lesson:

```ts
type CoursePart = {
  id: string;
  title: string;
  summary: string;
  moduleIds: string[];
};

type CourseModule = {
  id: string;
  partId: string;
  stage: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  summary: string;
  prerequisites: string[];
  outcomes: string[];
  lessons: Lesson[];
  labs?: Lab[];
  glossaryIds?: string[];
};

type Lesson = {
  id: string;
  title: string;
  teachingGoal: string;
  explanation: LessonBlock[];
  diagramIds?: string[];
  snippets: CodeExample[];
  mistakes: string[];
  checks: CheckQuestion[];
  exercises: Exercise[];
};

type DiagramAsset = {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  transcript?: string;
  relatedLessonIds: string[];
};
```

Recommended file layout for implementation:

- `src/course.ts`: currently exports assembled course data.
- Future split option: `src/content/parts.ts`, `src/content/modules/*.ts`, `src/content/diagrams.ts`, and `src/content/glossary.ts` if the single file becomes too large.
- `src/assets/diagrams/`: generated or drawn bitmap diagrams.

## Curriculum Map

### Part 1: Orientation and Language Core

Modules to teach:

- Why Go exists, where it fits, and how to read Go code.
- Installing/running Go, `go version`, `go env`, `go run`, `go test`, `go doc`.
- Source files, packages, imports, exported names, comments, docs.
- Variables, constants, zero values, typed/untyped constants, `iota`.
- Operators, precedence, explicit conversions, short declarations.
- Control flow: `if`, `for`, `range`, `switch`, `defer`, labels.
- Strings, bytes, runes, UTF-8, `len`, slicing strings safely.
- Functions, multiple returns, variadic parameters, closures.

Needed improvements over current content:

- Add beginner-friendly "read this code" walkthroughs.
- Add small runnable examples before advanced idioms.
- Add diagrams for source-file anatomy, zero values, operator precedence, and string bytes versus runes.

### Part 2: Types, Data, and Memory

Modules to teach:

- Arrays versus slices, slice headers, length/capacity, append growth, aliasing, cloning.
- Maps: missing keys, comma-ok, delete, nil maps, comparability, concurrent map risk.
- Structs: literals, tags, embedding, composition, field order.
- Pointers: address-of, dereference, nil, mutation, identity, pass-by-value versus pointer values.
- `new` versus `make`.
- Methods, pointer/value receivers, method sets, receiver naming.
- Interfaces: implicit implementation, small interfaces, dynamic type/value, nil interface traps.
- Generics: type parameters, constraints, type sets, when not to use generics.

Needed improvements over current content:

- Split pointers out of the broad "collections and structs" module into its own lesson sequence.
- Add the explicit-pointer visual requested by the user.
- Explain Go has pointers, but no C-style pointer arithmetic.
- Explain that slices, maps, and channels are reference-like built-ins because their copied values contain runtime pointers or headers.

### Part 3: Errors, Packages, and Quality

Modules to teach:

- Error values, wrapping, sentinel errors, typed errors, `errors.Is`, `errors.As`.
- `defer`: execution order, argument evaluation, cleanup immediately after acquisition.
- `panic` and `recover`: when they are appropriate and where recovery belongs.
- Modules: `go mod init`, `go mod tidy`, minimal version selection, `replace`, semantic import versioning.
- Package layout: `cmd`, `internal`, package responsibility, avoiding cargo-cult folders.
- Testing: table tests, subtests, examples, coverage, race detector.
- Benchmarks, allocations, fuzzing, test fixtures, temporary files.
- Formatting, vetting, docs, linting, release hygiene.

Needed improvements over current content:

- Add exercises that ask learners to wrap errors, write table tests, and refactor packages.
- Verify version-specific claims against the target Go version before publishing.
- Add a "quality loop" panel with local commands and expected use.

### Part 4: Standard Library Fluency

Modules to teach:

- `fmt`, `strings`, `bytes`, `strconv`, `unicode/utf8`, `slices`, `maps`, `cmp`, `sort`.
- `os`, `io`, `bufio`, `io/fs`, `path`, `filepath`, temp files.
- `encoding/json`, `encoding/csv`, `encoding/xml`, `gob`.
- `time`, timers, tickers, durations, parsing/formatting.
- `log/slog`, structured logging boundaries.
- `net/http`: handlers, clients, transports, middleware, timeouts.
- `context` in request-scoped work.
- `database/sql`: connection pools, queries, transactions, scanning.
- Templates and `go:embed` for small server-rendered apps and CLIs.

Needed improvements over current content:

- Add task-oriented mini-lessons: read a file, stream JSON, write CSV, build a handler, call an HTTP API, run a transaction.
- Add diagrams for reader/writer composition and HTTP request lifecycle.

### Part 5: Concurrency

Modules to teach:

- Goroutine lifetime, scheduler basics, blocking, leaks.
- Channels: unbuffered handoff, buffered queues, direction types, close ownership, ranging.
- `select`: cancellation, timeout, fan-in, default cases.
- `sync.WaitGroup`, `Mutex`, `RWMutex`, `Cond`, `Once`, `Pool`, `sync.Map`.
- `sync/atomic`: counters, flags, memory-ordering caution.
- Context cancellation, deadlines, graceful shutdown.
- Worker pools, pipelines, fan-out/fan-in, backpressure.
- Testing concurrent code without `time.Sleep`.
- Race detector and diagnosing leaked goroutines.

Needed improvements over current content:

- Keep existing concurrency content, but turn each primitive into a focused lesson with diagrams and exercises.
- Add diagrams for unbuffered rendezvous, buffered channel capacity, close/range, select race, mutex-protected memory, condition wait, context fan-out, and worker pool backpressure.

### Part 6: Runtime, Performance, and Advanced Boundaries

Modules to teach:

- M:P:G scheduler model, GOMAXPROCS, netpoller, preemption.
- Stack growth, heap allocation, escape analysis.
- Garbage collection basics and allocation pressure.
- Profiling with pprof, trace, benchmark discipline.
- Memory layout, alignment, padding, cache lines, false sharing.
- Reflection: `reflect.Type`, `reflect.Value`, tags, boundary use.
- `unsafe`: layout assumptions, pointer conversions, containment.
- Build tags, platform files, cgo tradeoffs.
- Production design: observability, configuration, graceful shutdown, small packages.

Needed improvements over current content:

- Use diagrams heavily. Runtime topics need visual models more than prose alone.
- Add "measure before optimizing" exercises with benchmark/profile interpretation.

## Pointer Lesson Plan

The pointer module should use the attached visual style as a reference: `/Users/channyeintun/Desktop/books/pointer-vs-reference.png`.

Teach in this order:

1. A normal variable has a value and an address.
2. `&x` produces the address of `x`.
3. `var p *int` means `p` can hold the address of an `int`.
4. `p = &x` stores `x`'s address in `p`.
5. `*p` dereferences the pointer and reaches the pointed-to value.
6. `*p = 99` mutates the same value that `x` names.
7. A pointer can be `nil`; dereferencing nil panics.
8. Function arguments are passed by value, including pointer arguments. Passing a pointer copies the address, not the target value.
9. Go has explicit pointers but no pointer arithmetic.
10. Slices, maps, and channels are reference-like values, not C++ references. Passing them copies a header/handle that still points at shared backing data.

Minimum code examples:

```go
n := 42
p := &n

fmt.Println(n)  // 42
fmt.Println(*p) // 42

*p = 99
fmt.Println(n) // 99
```

```go
func doubleValue(n int) {
    n *= 2
}

func doublePointer(n *int) {
    *n *= 2
}
```

```go
var p *int
if p == nil {
    fmt.Println("no int yet")
}
```

Pointer diagram requirements:

- Show stack boxes for `n` and `p`.
- Show `p` has its own address and stores another address.
- Show the pointed-to integer value separately.
- Use color coding: pointer variable, address arrow, actual value, nil warning.
- Include `&` and `*` labels directly on the arrows.
- Include a pass-by-value versus pass-pointer comparison.
- Include a separate "reference-like built-ins" panel for slice/map/channel headers.

## Hand-Drawn Diagram System

Use generated or drawn bitmap diagrams for major concepts, stored as assets rather than hard-coded inside `App.tsx`.

Style guide:

- Off-white paper background.
- Slightly imperfect black outlines.
- Handwritten-looking labels while preserving readability.
- Consistent accent colors:
  - Purple: explicit pointer or address.
  - Green: actual value/data.
  - Orange: backing data or heap/runtime storage.
  - Blue: comparison/table/flow.
  - Red: mistake, panic, deadlock, warning.
- Keep diagrams dense enough to teach, but split overloaded topics into multiple images.
- Every diagram needs alt text and a text transcript for accessibility.

Priority diagrams:

- Source file anatomy and package boundary.
- Zero values memory boxes.
- Operator precedence ladder.
- String byte/rune grid.
- Array versus slice header/backing array.
- Slice append and aliasing.
- Map handle to buckets.
- Explicit pointer: address, dereference, mutation, nil.
- Pass by value versus pointer value.
- Method receiver and method set.
- Interface dynamic type/value and nil interface trap.
- Error wrapping chain.
- Defer stack.
- Reader/writer stream pipeline.
- HTTP request lifecycle.
- Goroutine/channel rendezvous.
- Buffered channel queue.
- Select choosing among result, timeout, and cancellation.
- WaitGroup completion.
- Mutex/RWMutex protecting a map.
- Context cancellation tree.
- Worker pool with backpressure.
- Scheduler M:P:G.
- Stack versus heap and escape.
- GC marking.
- Struct padding/alignment and cache line false sharing.
- Reflection/unsafe boundary.

## UI and Navigation Plan

Keep the Vite+ React app, but make the page structure course-oriented:

- Hero becomes a course dashboard, not a marketing block.
- Add a clear table of contents by part and module.
- Add module pages or collapsible sections with lesson-level anchors.
- Each lesson should render in this order:
  - learning goal
  - visual explanation
  - short explanation
  - runnable code
  - common mistakes
  - check questions
  - exercise
  - reference links inside the site
- Keep the existing cheat sheet, but make it a compact reference generated from the same concepts as the lessons.
- Add glossary tooltips or a glossary section for repeated terms.
- Make diagrams responsive, with a larger view on click/tap if needed.

## Content Quality Rules

- Teach from concrete code before abstract rules.
- Each module should answer "when do I use this?" and "what mistake does this prevent?"
- Every code snippet should compile when possible or be clearly marked as partial.
- Prefer small complete examples over fragments for beginner modules.
- Include common mistakes directly after the concept they belong to.
- Avoid implying Go has references like C++ references. Use "reference-like built-ins" for slices, maps, and channels.
- Verify all version-sensitive APIs and syntax against the chosen Go version before implementation.

## Implementation Phases

### Phase 1: Content Architecture

- Split `src/course.ts` into smaller content files if editing the single course file becomes cumbersome.
- Add `CoursePart`, `CourseModule`, `Lesson`, `DiagramAsset`, `Exercise`, and `GlossaryTerm` types.
- Keep backwards-compatible exports temporarily if needed so the site can be migrated safely.

### Phase 2: Core Curriculum Rewrite

- Rewrite modules into the part/module/lesson structure.
- Start with the most foundational modules: files, values, control flow, collections, pointers, methods, interfaces, errors.
- Add outcomes, prerequisites, mistakes, exercises, and check questions.

### Phase 3: Diagram Assets

- Create `src/assets/diagrams/`.
- Generate the first hand-drawn diagrams:
  - explicit pointers
  - array versus slice
  - interface value
  - channel handoff
  - context cancellation
  - scheduler M:P:G
- Add metadata, alt text, captions, and transcripts.

### Phase 4: UI Migration

- Update `App.tsx` to render the new course model.
- Replace hard-coded diagram components with data-driven diagram rendering.
- Add lesson navigation, module anchors, and responsive diagram display.

### Phase 5: Practice and Reference

- Add exercises and check questions to each lesson.
- Generate the cheat sheet from the same concept list where practical.
- Add glossary rendering and cross-links.

### Phase 6: Verification

- Run the project validation commands:
  - `vp check`
  - `vp test`
  - `vp build`
- If package/runtime behavior looks wrong, run `vp env doctor`.
- Manually inspect the site in desktop and mobile widths.
- Verify diagrams are readable, non-overlapping, and accessible.
- Verify Go snippets against the selected Go version. For complete snippets, extract and compile/test them where practical.

## Definition of Done

- The site has a clear course hierarchy from beginner to advanced Go.
- Pointers are taught with an explicit visual model like the attached reference image.
- Every major abstract Go topic has at least one diagram or visual explanation.
- Each module has outcomes, lessons, examples, mistakes, and exercises.
- The cheat sheet and glossary support lookup after learners finish lessons.
- All version-sensitive claims have been checked.
- The Vite+ validation commands pass.

## Assumptions to Confirm Before Implementation

- Keep this as a single Vite+ React site unless routing is explicitly requested.
- Use generated hand-drawn-style bitmap diagrams, with source prompts and alt text tracked in the repo.
- Write the course in English.
- Target beginners through intermediate Go developers, while still covering advanced runtime and production topics.
