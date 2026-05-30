export type CoverageArea = {
  title: string;
  summary: string;
  items: string[];
};

export type LearningTrack = {
  title: string;
  audience: string;
  modules: string[];
};

export type LearningSection = {
  id: string;
  stage: string;
  title: string;
  summary: string;
  topics: string[];
  lessons: {
    title: string;
    paragraphs: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  pitfalls: string[];
  snippetTitle: string;
  snippet: string;
  examples?: {
    title: string;
    summary: string;
    snippet: string;
  }[];
};

export type LibraryGroup = {
  title: string;
  summary: string;
  packages: string[];
};

export type PatternCard = {
  title: string;
  summary: string;
  highlights: string[];
};

export type PracticeGuide = {
  title: string;
  summary: string;
  bullets: string[];
};

export type CheatSheetItem = {
  title: string;
  note: string;
  snippet: string;
};

export const coverageAreas: CoverageArea[] = [
  {
    title: "Language core",
    summary:
      "The syntax and rules every Go file is built on, centered on a deliberately small 25-keyword language core.",
    items: [
      "packages, imports, exported names, blank identifier",
      "variables, constants, iota enum patterns, zero values, rune and byte",
      "operators, precedence, conversions, for, if, switch, range, defer, labels",
      "UTF-8 strings, runes, strconv.Atoi and strconv.Itoa, and value semantics",
    ],
  },
  {
    title: "Types and data",
    summary: "How data is modeled, copied, shared, and mutated safely.",
    items: [
      "arrays, slices, maps, structs, pointers, embedding, nil pointers",
      "methods, receivers, interfaces, generic constraints",
      "make versus new, address-of, dereference, nil behavior, capacity, append growth",
      "encapsulation through package visibility, comparability, and custom types",
    ],
  },
  {
    title: "Errors and quality",
    summary: "The explicit reliability model that defines idiomatic Go.",
    items: [
      "error returns, wrapping, sentinel errors, errors.Is, errors.As, and errors.AsType",
      "panic, recover, cleanup with defer, resource handling",
      "testing, table tests, sync tests, benchmarks, fuzzing, race detector",
      "go fmt, go vet, go fix, docs, linters, and package design",
    ],
  },
  {
    title: "Concurrency",
    summary: "The primitives that make Go distinct in production systems.",
    items: [
      "goroutines, channels, close semantics, select, timeouts",
      "WaitGroup, WaitGroup.Go, Mutex, RWMutex, Cond, Once, Pool, atomic",
      "context cancellation, deadlines, graceful shutdown",
      "unbuffered channel handoff: establish the receiving path before sending or the sender blocks",
      "scheduler model, GOMAXPROCS, worker pools, pipelines, fan-out and fan-in",
      "anti-patterns: goroutine spam, unnecessary parallelism, and golden-hammer concurrency",
    ],
  },
  {
    title: "Standard library",
    summary: "The packages you use daily before reaching for frameworks.",
    items: [
      "fmt, strings, bytes, strconv, slices, maps, cmp, sort",
      "os, io, bufio, fs, path, filepath, time, log and slog",
      "encoding/json, xml, csv, template packages",
      "net, url, net/http, database/sql, context",
    ],
  },
  {
    title: "Runtime and advanced topics",
    summary: "The material that closes the gap between code and system behavior.",
    items: [
      "Go scheduler model, stacks, heap, escape analysis, GC basics",
      "memory alignment, padding, cache lines, and how CPUs read words",
      "pprof, trace, benchmarking, allocation control",
      "reflection, unsafe boundaries, build tags, cgo awareness",
      "modules, versioning, internal packages, release hygiene",
    ],
  },
];

export const learningTracks: LearningTrack[] = [
  {
    title: "Foundations",
    audience: "Start here if you are new to Go or returning after a long gap.",
    modules: [
      "Source files, packages, declarations, formatting",
      "Operators, precedence, enums with iota, conversions, strings and runes",
      "Arrays, slices, maps, structs, pointers, encapsulation, methods",
    ],
  },
  {
    title: "Code that ships",
    audience: "Use this track to write maintainable packages and services.",
    modules: [
      "Errors, defer, panic boundaries, modules, tooling",
      "Testing, sync tests, benchmarks, fuzzing, documentation, observability",
      "JSON, HTTP, files, streams, and standard library fluency",
    ],
  },
  {
    title: "Concurrency systems",
    audience: "This track covers the parts people usually hand-wave over.",
    modules: [
      "Goroutines, channels, select, cancellation",
      "WaitGroup, Mutex, RWMutex, Cond, Once, Pool, atomic",
      "Pipelines, worker pools, backpressure, graceful shutdown, and when not to add concurrency",
    ],
  },
  {
    title: "Advanced Go",
    audience: "Finish here when you need runtime awareness and edge-case tools.",
    modules: [
      "Scheduler model, memory alignment, escape analysis, profiling",
      "Reflection, unsafe, build constraints, cgo boundaries",
      "Architecture patterns for production services and CLIs",
    ],
  },
];

export const learningSections: LearningSection[] = [
  {
    id: "files-and-declarations",
    stage: "Module 01",
    title: "Files, packages, imports, and declarations",
    summary:
      "Learn the shape of a Go source file, Go's deliberately small 25-keyword syntax surface, export rules, short declarations, constants, encapsulation by naming, and the discipline of formatting-first code.",
    topics: [
      "package clauses, import blocks, and executable versus library packages",
      "var, const, :=, typed versus untyped constants, iota",
      "blank identifier, visibility by casing, exported and unexported names",
      "gofmt-style structure and why layout is not a team debate in Go",
      "comments, docs, constructor functions, and naming that reads cleanly in godoc",
    ],
    lessons: [
      {
        title: "Read the file top-down",
        paragraphs: [
          "A Go file is intentionally shallow. You should be able to open it and immediately see package, imports, declarations, and the small set of exported entry points without hunting through framework conventions or style variants.",
          "That simplicity is part of the language design. Teams do not spend energy debating where braces go, how imports are grouped, or whether declarations belong above or below helpers because gofmt settles the layout and package structure keeps ownership explicit.",
        ],
      },
      {
        title: "Encapsulation starts with naming",
        paragraphs: [
          "Go does not use private or protected keywords. Exporting starts with an uppercase name, and staying package-local starts with a lowercase one. That means your package boundary is the first design decision, not an afterthought layered on later.",
          "Professional Go code keeps those boundaries small. Export only what callers need, keep the rest unexported, and prefer constructor functions or package-level helpers when they make initialization rules obvious.",
        ],
      },
    ],
    pitfalls: [
      "treating package layout like a Java or TypeScript class hierarchy instead of a small public surface with local helpers",
      "exporting names too early and then carrying accidental API commitments forward",
      "hand-formatting files or debating style that gofmt already standardizes",
    ],
    snippetTitle: "Minimal executable file",
    snippet: `package main

import "fmt"

const build = "dev"

func main() {
    message := "hello, go"
    fmt.Println(message, build)
}`,
    examples: [
      {
        title: "Exported versus unexported names",
        summary:
          "Uppercase exports a symbol from the package. Lowercase keeps it local to the package boundary.",
        snippet: `package config

type Settings struct {
    Port int
    env  string
}

func NewSettings() Settings {
    return Settings{Port: 8080, env: "dev"}
}

func (settings Settings) Env() string {
    return settings.env
}`,
      },
      {
        title: "Blank identifier for ignored values",
        summary:
          "The blank identifier makes an unused value explicit when an API returns more than you currently need.",
        snippet: `value, _ := strconv.Atoi("42")

if _, err := io.Copy(dst, src); err != nil {
    return err
}

fmt.Println(value)`,
      },
    ],
  },
  {
    id: "control-flow-and-values",
    stage: "Module 02",
    title: "Operators, precedence, conversions, strings, runes, and control flow",
    summary:
      "This module covers the operator rules people trip over first: precedence, type conversions, enum-style constants with iota, string and rune handling, and Go's compact control flow.",
    topics: [
      "arithmetic, comparison, logical, bitwise, shift, and assignment operators",
      "Go's five precedence levels: unary (highest), then */% <<>> & &^, then +-|^, then == != < <= > >=, then &&, then || (lowest)",
      "why * and & share a level and how that affects pointer expressions",
      "bitwise operators (&, |, ^, &^) and how they interact with comparison operators",
      "operator precedence, explicit parentheses, and why mixed expressions should stay readable",
      "typed enum patterns with iota and conversion helpers like strconv.Atoi and strconv.Itoa",
      "counted loops, while-style loops, infinite loops, continue and break",
      "if with short statements and expression versus type switches",
      "defer ordering and cleanup semantics",
      "strings as bytes, rune iteration, UTF-8, len versus rune count",
      "zero values and why they simplify initialization",
    ],
    lessons: [
      {
        title: "Prefer clarity over operator cleverness",
        paragraphs: [
          "Go keeps the operator set compact, but compact syntax still becomes unreadable when several precedence levels are mixed into one expression. In production code, the rule is simple: if a reader has to stop and re-evaluate the expression tree, add parentheses or split the work into named steps.",
          "That same rule applies to control flow. Go favors short, local control structures such as `if err != nil`, small switches, and one looping keyword that covers most cases. The goal is to keep branches explicit rather than compressing intent into dense syntax.",
        ],
      },
      {
        title: "Go's operator precedence levels in detail",
        paragraphs: [
          "Go defines five binary operator precedence levels, listed below from highest to lowest. Unary operators (+, -, !, ^, *, &, <-) are not listed here because they always bind tighter than any binary operator and are applied right to left.",
          "The most common surprise is that bitwise AND (&) sits at level 5 — the same level as * and / — while comparison operators like == and != sit at level 3. That means x & mask == 0 is parsed as x & (mask == 0), which compares a bool to an integer and does not compile. You almost always need parentheses: (x & mask) == 0.",
          "Shift operators (<< and >>) also share level 5 with multiplication, so 1 << 3 + 1 parses as 1 << (3+1) = 16, not 9. The bit-clear operator &^ is unique to Go: it clears bits in the left operand that are set in the right. Add parentheses any time you mix levels to remove ambiguity for readers.",
        ],
        table: {
          headers: ["Level", "Operators", "Binds tighter than", "Common trap"],
          rows: [
            [
              "5 (highest)",
              "*  /  %  <<  >>  &  &^",
              "everything below",
              "& and << share this level — (x & mask) == 0, not x & mask == 0",
            ],
            [
              "4",
              "+  -  |  ^",
              "comparisons, &&, ||",
              "| and ^ here, not at level 5 — easy to mix with &",
            ],
            [
              "3",
              "==  !=  <  <=  >  >=",
              "&&  ||",
              "x & mask == 0 is x & (mask==0) — wrap bitwise first",
            ],
            ["2", "&&", "||", "a || b && c means a || (b && c) — && always wins over ||"],
            ["1 (lowest)", "||", "nothing", "lowest of all binary ops — always evaluated last"],
          ],
        },
      },
      {
        title: "Strings and runes are different views of text",
        paragraphs: [
          "A string is a read-only byte sequence. That is why `len` reports bytes, slicing works at byte offsets, and invalid UTF-8 is still representable. When you care about Unicode code points, iterate with `range` or convert to `[]rune` deliberately.",
          "This distinction matters in APIs, validation, and UI-facing code. A module that handles text professionally must know when raw bytes are enough and when user-visible characters need rune-aware logic.",
        ],
      },
    ],
    pitfalls: [
      "assuming `len(text)` means character count instead of byte count",
      "using iota without a named type and ending up with weakly described constants",
      "writing `x & mask == 0` expecting bitwise-and-then-compare, but getting a type error because `==` binds before `&` in many minds but after it in Go — always write `(x & mask) == 0`",
      "mixing `&&` and `||` in a single expression without parentheses and relying on precedence the reader has to look up",
      "writing `1 << n + 1` expecting `(1 << n) + 1` but getting `1 << (n + 1)` because `+` has higher precedence than `<<` at the same level ... actually they share level 5 — just use parentheses",
      "compressing precedence-heavy expressions until the meaning is no longer obvious",
    ],
    snippetTitle: "Enums, conversion, and rune iteration",
    snippet: `type Status int

const (
    StatusUnknown Status = iota
    StatusReady
    StatusRunning
)

value, err := strconv.Atoi("42")
if err != nil {
    return err
}

text := "Go語"

for index, r := range text {
    fmt.Println(index, string(r))
}

switch {
case value+2*3 > 40:
    fmt.Println("non-empty")
default:
    fmt.Println("empty")
}`,
    examples: [
      {
        title: "Precedence table in practice",
        summary:
          "Go's five binary precedence levels from highest (5) to lowest (1). Unary operators are always tighter. Parentheses make intent explicit regardless of level.",
        snippet: `// Level 5 (highest binary): * / % << >> & &^
// Level 4:                    + - | ^
// Level 3:                    == != < <= > >=
// Level 2:                    &&
// Level 1 (lowest binary):    ||

// * binds tighter than +
result := 2 + 3*4           // 14, not 20

// & (level 5) binds tighter than == (level 3)
// WRONG reading: x & (mask == 0)  — type error
// CORRECT:       (x & mask) == 0
const mask = 0b0111
x := 0b1010
fmt.Println((x & mask) == 0) // false

// && (level 2) binds tighter than || (level 1)
// a || b && c  ==  a || (b && c)
a, b, c := true, false, true
fmt.Println(a || b && c) // true: b&&c evaluated first

// << shares level 5 with *; + is level 4 (lower!)
// 1 << 3 + 1  ==  1 << (3+1)  ==  16, not 9
fmt.Println(1 << (3 + 1)) // 16
fmt.Println((1 << 3) + 1) // 9 — use parens to get this`,
      },
      {
        title: "Precedence traps and their fixes",
        summary:
          "The most common Go precedence bugs come from bitwise operators mixing with comparisons and from forgetting that shift lives at the same level as multiplication.",
        snippet: `flags := 0b1100
readyBit := 2

// TRAP: & has higher precedence than !=
// flags & readyBit != 0 parses as flags & (readyBit != 0)
// 'readyBit != 0' is bool — cannot use & on bool — compile error

// FIX: parenthesise the bitwise sub-expression first
isReady := (flags & (1 << readyBit)) != 0
fmt.Println(isReady) // true

// TRAP: mixed && and || without parentheses
// err != nil || retries > 3 && !done
// reads as: err != nil || (retries > 3 && !done)

// FIX: make grouping explicit regardless of precedence rules
err := error(nil)
retries := 5
done := false
shouldAbort := (err != nil) || (retries > 3 && !done)
fmt.Println(shouldAbort) // true

// TRAP: unary minus on a multiplication
// -x * y  is  (-x) * y  — unary binds tightest
// safe here, but -x/y and -(x/y) can differ for negative x
neg := -6
fmt.Println(-neg * 2)  // 12
fmt.Println(-(neg * 2)) // 12 — same here but always be explicit`,
      },
      {
        title: "Bit-clear operator &^",
        summary:
          "The &^ operator (bit-clear / AND NOT) clears bits in the left operand that are set in the right operand. It lives at the same precedence level as & and *.",
        snippet: `permissions := 0b1111 // all four bits set
writeBit := 0b0010

// Clear the write bit
permissions = permissions &^ writeBit
fmt.Printf("%04b\n", permissions) // 1101

// Mix with | to set another bit atomically
executeBit := 0b0001
updated := (permissions &^ writeBit) | executeBit
fmt.Printf("%04b\n", updated) // 1101 -> clear write, keep execute`,
      },
      {
        title: "Precedence made explicit with named steps",
        summary:
          "When an expression mixes multiple precedence levels, splitting it into named variables beats adding parentheses alone — it also documents intent.",
        snippet: `subtotal := left + right       // level 4 addition first
scaled := subtotal * factor    // level 5 multiplication

// Instead of:
// allowed := (flags&(1<<readyBit) != 0) && retries < 3

// Prefer named steps:
bitSet := (flags & (1 << readyBit)) != 0
underLimit := retries < 3
allowed := bitSet && underLimit

fmt.Println(scaled, allowed)`,
      },
      {
        title: "Type switch with interface values",
        summary:
          "A type switch is the direct way to branch on concrete dynamic types stored in an interface.",
        snippet: `func describe(value any) string {
    switch v := value.(type) {
    case string:
        return "string: " + v
    case int:
        return strconv.Itoa(v)
    case fmt.Stringer:
        return v.String()
    default:
        return "unknown"
    }
}`,
      },
    ],
  },
  {
    id: "collections-and-structs",
    stage: "Module 03",
    title: "Arrays, slices, maps, structs, pointers, and encapsulation",
    summary:
      "Most Go programs spend their time shaping data. The key is knowing which types copy values, which share backing storage, how pointers behave, and how Go encapsulates state through package boundaries.",
    topics: [
      "array values versus slice windows and capacity growth",
      "maps, missing keys, delete, comparability, and zero values",
      "struct literals, anonymous fields, embedding, composition, field ordering",
      "make versus new, &, *, nil pointers, and pointer updates without obscuring ownership",
      "encapsulation with exported types, unexported fields, and constructor functions",
      "slice aliasing and cloning before cross-goroutine sharing",
    ],
    lessons: [
      {
        title: "Understand who owns the data",
        paragraphs: [
          "Arrays copy their full value, slices describe a window onto backing storage, and maps are reference-like handles to runtime-managed state. If you do not know which of those behaviors you are relying on, you will eventually share or copy data by accident.",
          "Professional Go code is explicit about ownership. If a slice may outlive its producer or cross a goroutine boundary, clone it. If a map is shared, protect it. If a struct models important invariants, expose behavior through methods instead of letting callers mutate every field directly.",
        ],
      },
      {
        title: "Pointers are about mutation and identity, not status",
        paragraphs: [
          "Pointers are common in Go, but they are not a mark of advanced code. Use them when a method must mutate state, when copying would be too expensive, or when nil is a meaningful state. Avoid them when a value copy is clearer and cheaper to reason about.",
          "Encapsulation comes from package design, not pointer usage. An exported type with unexported fields and narrow methods communicates far more than a public struct whose state any caller can rewrite.",
        ],
      },
    ],
    pitfalls: [
      "forgetting that slices can alias the same backing array and accidentally sharing mutable data",
      "using pointers by default even when value semantics would be clearer",
      "publishing structs with public fields that bypass package invariants",
    ],
    snippetTitle: "Constructor plus pointer receiver",
    snippet: `type Counter struct {
    value int
}

func NewCounter() *Counter {
    return &Counter{}
}

func (counter *Counter) Inc() {
    counter.value++
}

func (counter *Counter) Value() int {
    return counter.value
}`,
    examples: [
      {
        title: "Embedding composes behavior",
        summary:
          "Embedding promotes fields and methods from one type into another without pretending Go has inheritance.",
        snippet: `type Logger struct{}

func (Logger) Println(message string) {
    fmt.Println(message)
}

type Service struct {
    Logger
    Name string
}

func main() {
    svc := Service{Name: "api"}
    svc.Println("starting " + svc.Name)
}`,
      },
      {
        title: "Slice aliasing versus cloning",
        summary:
          "Sub-slices share backing storage. Clone before handing data to a different owner or goroutine.",
        snippet: `raw := []string{"go", "gin", "grpc"}
window := raw[:2]
window[0] = "gopher"

fmt.Println(raw) // [gopher gin grpc]

safe := slices.Clone(window)
safe[1] = "fiber"

fmt.Println(window) // [gopher gin]
fmt.Println(safe)   // [gopher fiber]`,
      },
    ],
  },
  {
    id: "functions-methods-and-interfaces",
    stage: "Module 04",
    title: "Functions, methods, interfaces, and generics",
    summary:
      "This is where Go code becomes composable. Small functions, clear method sets, and tiny interfaces are far more important than clever abstractions.",
    topics: [
      "multiple return values, named results, variadic parameters",
      "value versus pointer receivers and method sets",
      "interfaces defined at the point of use",
      "generic helpers, constraints, and when not to use generics",
      "function values, closures, and dependency injection without frameworks",
    ],
    lessons: [
      {
        title: "Small functions carry most of the design",
        paragraphs: [
          "Go code stays maintainable when behavior is composed out of short functions with obvious inputs and outputs. The language gives you multiple return values, first-class functions, and methods, but the real discipline is resisting giant helper objects and overly abstract layers.",
          "A good Go function usually does one thing, returns early on failure, and leaves the next decision to its caller. That is how packages remain easy to test, reuse, and document.",
        ],
      },
      {
        title: "Interfaces belong near the consumer",
        paragraphs: [
          "In Go, concrete types come first. You define an interface when a caller truly needs to depend on behavior instead of an implementation. That is why many idiomatic interfaces are tiny and live in the package that consumes them rather than the package that implements them.",
          "Generics follow the same rule: use them when they remove real duplication in containers or algorithms, not when they merely make a simple concrete function look more sophisticated.",
        ],
      },
    ],
    pitfalls: [
      "creating large interfaces before there are multiple concrete users",
      "using pointer receivers and value receivers inconsistently so method sets become surprising",
      "adding generics to business logic that is already clear with concrete types",
    ],
    snippetTitle: "Composability with methods and generics",
    snippet: `type Counter int

func (c Counter) Next() Counter {
    return c + 1
}

func Map[T any, U any](items []T, fn func(T) U) []U {
    out := make([]U, 0, len(items))
    for _, item := range items {
        out = append(out, fn(item))
    }
    return out
}`,
    examples: [
      {
        title: "Interfaces at the point of use",
        summary:
          "The consumer owns the abstraction. The implementation type stays concrete until a caller needs behavior-only dependency.",
        snippet: `type Clock interface {
    Now() time.Time
}

func Expired(clock Clock, deadline time.Time) bool {
    return clock.Now().After(deadline)
}

type RealClock struct{}

func (RealClock) Now() time.Time {
    return time.Now()
}`,
      },
      {
        title: "Generic constraint with a real purpose",
        summary:
          "Use generics when they remove duplication in a reusable algorithm, not just to make code look more advanced.",
        snippet: `type Number interface {
    ~int | ~int64 | ~float64
}

func Sum[T Number](items []T) T {
    var total T
    for _, item := range items {
        total += item
    }
    return total
}`,
      },
    ],
  },
  {
    id: "errors-and-defer",
    stage: "Module 05",
    title: "Errors, defer, panic, and recover",
    summary:
      "Go's reliability model is explicit. You return errors directly, wrap them with context, clean up with defer, and recover only at the edges of a process.",
    topics: [
      "error as a regular value and why that matters for API design",
      "wrapping with %w, errors.Is, errors.As, errors.AsType, sentinel and typed errors",
      "defer immediately after resource acquisition",
      "panic for broken invariants, not routine control flow",
      "recover in HTTP middleware, worker boundaries, and supervisors",
    ],
    lessons: [
      {
        title: "Errors are part of the API contract",
        paragraphs: [
          "Go treats failure as a value that moves through normal control flow. That pushes designers to be explicit: what can fail, what context should be attached, and what a caller can safely branch on with `errors.Is`, `errors.As`, or `errors.AsType`.",
          "The professional standard is not just returning an error. It is returning an error that explains the failing operation, preserves the original cause when useful, and does not force callers to parse arbitrary strings.",
        ],
      },
      {
        title: "Use panic sparingly and recover at the edge",
        paragraphs: [
          "Most Go code should never panic during ordinary error handling. Panic is reserved for impossible states, broken invariants, or process-level failures where local recovery would hide corruption.",
          "When recovery exists, it belongs at process boundaries such as HTTP middleware, worker supervisors, or CLI command wrappers. Inner layers should return errors and let outer layers decide how to log, retry, or stop.",
        ],
      },
    ],
    pitfalls: [
      "dropping context when returning an error from a lower-level dependency",
      "using panic for expected input or network failures",
      "deferring cleanup late instead of immediately after acquiring the resource",
    ],
    snippetTitle: "Wrapping an operational failure",
    snippet: `func loadConfig(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("read config: %w", err)
    }
    if len(data) == 0 {
        return errors.New("empty config")
    }
    return nil
}`,
    examples: [
      {
        title: "Branch on wrapped causes",
        summary:
          "`errors.Is` and `errors.AsType` let callers inspect meaningful error behavior without parsing strings.",
        snippet: `err := loadConfig("missing.yaml")

if errors.Is(err, os.ErrNotExist) {
    fmt.Println("create default config")
}

pathErr, ok := errors.AsType[*fs.PathError](err)
if ok {
    fmt.Println(pathErr.Path)
}`,
      },
      {
        title: "Recover at the process edge",
        summary:
          "Recover belongs in an outer boundary where the process can log the panic and return a controlled failure.",
        snippet: `func RecoverHTTP(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if recovered := recover(); recovered != nil {
                http.Error(w, "internal error", http.StatusInternalServerError)
            }
        }()

        next.ServeHTTP(w, r)
    })
}`,
      },
    ],
  },
  {
    id: "packages-modules-and-layout",
    stage: "Module 06",
    title: "Packages, modules, layout, and the toolchain",
    summary:
      "Professional Go code stays obvious because package boundaries are small, modules are explicit, and the toolchain is part of daily practice.",
    topics: [
      "go mod init, tidy, require, replace, version selection",
      "internal packages, cmd directories, package responsibility, and encapsulation",
      "go fmt, go vet, go fix modernizers, go doc, go list, go env",
      "module versioning, semantic import versioning, release hygiene",
      "practical project layout without cargo-cult folder trees",
    ],
    lessons: [
      {
        title: "Use the toolchain every day",
        paragraphs: [
          "Professional Go projects lean on the built-in toolchain instead of replacing it. `go fmt`, `go vet`, `go test`, `go doc`, `go list`, and now the modernized `go fix` are part of normal engineering flow, not optional clean-up commands somebody runs before release day.",
          "That matters because Go codebases age best when the team keeps the defaults in service. The more you align with the language toolchain, the less custom project ceremony you have to explain to every new engineer.",
        ],
      },
      {
        title: "Package layout should reflect responsibility",
        paragraphs: [
          "A professional module layout is not a folder tree copied from another repo. It is the smallest structure that makes responsibilities clear: commands under `cmd`, internal implementation behind `internal`, and extra packages only when they earn their keep.",
          "If a directory exists just because many blog posts use it, it is probably noise. Good Go projects prefer fewer layers and sharper package names over fashionable scaffolding.",
        ],
      },
    ],
    pitfalls: [
      "copying cargo-cult repository layouts that add folders without adding meaning",
      "treating `replace` directives as permanent production configuration",
      "ignoring `go fix` and leaving old idioms in place after the toolchain evolves",
    ],
    snippetTitle: "Module file and toolchain cues",
    snippet: `module example.com/learn-go

go 1.25

require golang.org/x/sync v0.17.0

// go fix ./...
// cmd/api, internal/store, pkg/optional only when it earns its keep.`,
    examples: [
      {
        title: "Minimal package layout",
        summary:
          "Keep package roles obvious. `cmd` owns entry points and `internal` hides implementation details from external imports.",
        snippet: `example.com/app/
├── cmd/api/main.go
├── internal/store/store.go
├── internal/service/service.go
└── go.mod`,
      },
      {
        title: "Daily toolchain loop",
        summary:
          "The normal workflow is mechanical: format, vet, modernize when needed, and test the package tree.",
        snippet: `go fmt ./...
go vet ./...
go fix ./...
go test ./...`,
      },
    ],
  },
  {
    id: "testing-and-quality",
    stage: "Module 07",
    title: "Testing, benchmarks, fuzzing, and code quality",
    summary:
      "A serious Go curriculum must cover how code is verified, profiled, and kept readable under change.",
    topics: [
      "table-driven tests and subtests",
      "testing synchronized code with channels, WaitGroup, and deterministic handoff",
      "go test, go test ./..., go test -race, and choosing timeouts carefully",
      "benchmarks, allocation reporting, and realistic workloads",
      "fuzz tests for parser and boundary-heavy code",
      "race detector, coverage, and CI-quality command loops",
      "examples and docs as executable teaching material",
    ],
    lessons: [
      {
        title: "Tests should make behavior obvious",
        paragraphs: [
          "The best Go tests read like small behavior tables. Inputs, expectations, and edge cases are all visible in one place, which keeps growth manageable as a package accumulates more scenarios.",
          "That style is not just aesthetic. It reduces duplication, makes failures easier to compare, and helps you add a new case without inventing a whole new test harness every time.",
        ],
      },
      {
        title: "Concurrency tests must prove completion",
        paragraphs: [
          "Testing synchronized code means controlling handoff explicitly with channels, contexts, or `WaitGroup`, not hoping the scheduler behaves a certain way. `time.Sleep` only hides races until another machine or CI runner exposes them.",
          "Use `go test -race`, bounded waits, and explicit ownership signals so the test proves that work finished, not merely that nothing failed during a lucky timing window.",
        ],
      },
    ],
    pitfalls: [
      "writing one large test function per scenario instead of letting data drive the cases",
      "sleeping in tests to wait for goroutines instead of using a deterministic signal",
      "treating the race detector as optional on code that shares state",
    ],
    snippetTitle: "Deterministic result handoff in a test",
    snippet: `func TestWorkerPublishesResult(t *testing.T) {
    results := make(chan int, 1)

    go func() {
        results <- 42
        close(results)
    }()

    select {
    case got := <-results:
        if got != 42 {
            t.Fatalf("got %d want 42", got)
        }
    case <-time.After(time.Second):
        t.Fatal("worker timed out")
    }
  }`,
    examples: [
      {
        title: "Table test with subtests",
        summary:
          "Subtests give each case a name and isolate failures without duplicating the outer test harness.",
        snippet: `func TestParsePort(t *testing.T) {
    cases := []struct {
      name  string
      input string
      want  int
    }{
      {name: "http", input: "80", want: 80},
      {name: "https", input: "443", want: 443},
    }

    for _, tc := range cases {
      t.Run(tc.name, func(t *testing.T) {
        got, err := strconv.Atoi(tc.input)
        if err != nil || got != tc.want {
          t.Fatalf("got %d err %v want %d", got, err, tc.want)
        }
      })
    }
  }`,
      },
      {
        title: "Benchmark with realistic setup",
        summary:
          "Benchmarks should isolate the operation under test and report allocations when memory behavior matters.",
        snippet: `func BenchmarkEncodeUser(b *testing.B) {
    user := User{Name: "gopher", Age: 12}
    b.ReportAllocs()

    for b.Loop() {
      if _, err := json.Marshal(user); err != nil {
        b.Fatal(err)
      }
    }
  }`,
      },
    ],
  },
  {
    id: "io-files-and-data",
    stage: "Module 08",
    title: "Files, streams, encoding, and standard data flows",
    summary:
      "Go's standard library is strongest when you understand the core I/O interfaces and compose packages around them.",
    topics: [
      "io.Reader, io.Writer, io.Copy, bytes.Buffer, bufio",
      "os, fs, path, filepath, temporary files and directories",
      "encoding/json, csv, xml, gob, and streaming encoders",
      "flags, environment variables, and CLI-friendly input handling",
      "log, slog, and structured output at boundaries",
    ],
    lessons: [
      {
        title: "Learn the I/O interfaces first",
        paragraphs: [
          "Much of the standard library snaps together because `io.Reader` and `io.Writer` appear everywhere. Once you understand those interfaces, files, network connections, buffers, compressors, and encoders all start to feel like variations on the same data flow.",
          "That is why professional Go developers often reach for composition before wrappers. If the types already satisfy the interfaces you need, the cleanest solution is often to connect them directly.",
        ],
      },
      {
        title: "Streaming beats over-buffering",
        paragraphs: [
          "A mature Go module handles data as a stream whenever possible. That reduces peak memory, improves latency, and keeps pipelines simple when files or responses become large.",
          "Decode from readers, encode to writers, and buffer only with a purpose. Accumulating everything in memory first is usually the least robust option unless the data is known to stay small.",
        ],
      },
    ],
    pitfalls: [
      "reading whole inputs into memory when a stream-based decoder would be simpler",
      "mixing path manipulation and I/O responsibilities into one large function",
      "using logging as a substitute for returning structured errors at package boundaries",
    ],
    snippetTitle: "Streaming JSON from a file",
    snippet: `file, err := os.Open("data.json")
if err != nil {
    return err
}
defer file.Close()

var payload map[string]any
if err := json.NewDecoder(file).Decode(&payload); err != nil {
    return err
}`,
    examples: [
      {
        title: "Reader to writer composition",
        summary:
          "The I/O interfaces let you stream data through the standard library without inventing wrappers first.",
        snippet: `src, err := os.Open("input.txt")
if err != nil {
    return err
}
defer src.Close()

dst, err := os.Create("output.txt")
if err != nil {
    return err
}
defer dst.Close()

_, err = io.Copy(dst, bufio.NewReader(src))
return err`,
      },
      {
        title: "CSV streaming example",
        summary:
          "Encoding packages follow the same streaming model: read or write rows incrementally instead of building everything in memory first.",
        snippet: `reader := csv.NewReader(file)
for {
    record, err := reader.Read()
    if errors.Is(err, io.EOF) {
        break
    }
    if err != nil {
        return err
    }
    fmt.Println(record)
}`,
      },
    ],
  },
  {
    id: "http-and-services",
    stage: "Module 09",
    title: "HTTP, APIs, middleware, and service boundaries",
    summary:
      "Go becomes immediately practical once you can build HTTP handlers, clients, and service boundaries with the standard library.",
    topics: [
      "net/http handlers, clients, transports, timeouts, and request contexts",
      "JSON APIs, status codes, middleware, and request-scoped dependencies",
      "graceful shutdown with http.Server and context",
      "database/sql basics, transaction boundaries, and connection lifetimes",
      "templates for simple server-rendered pages when React is unnecessary",
    ],
    lessons: [
      {
        title: "The standard library is already a service toolkit",
        paragraphs: [
          "You can build a serious HTTP service with `net/http`, `context`, `database/sql`, and the encoding packages before adding a framework. That is one of Go's strengths: the defaults are already production-shaped.",
          "Handlers, middleware, transports, and request-scoped timeouts become easier to reason about when they stay close to the standard types instead of disappearing behind framework magic.",
        ],
      },
      {
        title: "Boundaries matter more than endpoints",
        paragraphs: [
          "A professional service module explains where request validation happens, where business logic lives, where persistence starts, and which layer owns retries or timeouts. Without those boundaries, handlers grow until every change is risky.",
          "Keep HTTP concerns near the handler, move reusable rules into small packages or functions, and make shutdown and cancellation part of the design from the start.",
        ],
      },
    ],
    pitfalls: [
      "putting transport logic, business rules, and persistence in the same handler",
      "forgetting request deadlines and letting slow downstream calls hang the server",
      "reaching for a framework before understanding the standard library service model",
    ],
    snippetTitle: "Basic health endpoint with net/http",
    snippet: `mux := http.NewServeMux()
mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte("ok"))
})

server := &http.Server{Addr: ":8080", Handler: mux}
log.Fatal(server.ListenAndServe())`,
    examples: [
      {
        title: "Middleware keeps transport concerns local",
        summary:
          "Cross-cutting HTTP behavior such as logging or panic recovery belongs in middleware around handlers, not duplicated inside every endpoint.",
        snippet: `func Logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
    })
}`,
      },
      {
        title: "HTTP client with timeout-bound context",
        summary:
          "Clients should carry context deadlines outward to network calls so slow dependencies do not hang the caller indefinitely.",
        snippet: `ctx, cancel := context.WithTimeout(r.Context(), 500*time.Millisecond)
defer cancel()

req, err := http.NewRequestWithContext(ctx, http.MethodGet, upstreamURL, nil)
if err != nil {
    return err
}

resp, err := http.DefaultClient.Do(req)
if err != nil {
    return err
}
defer resp.Body.Close()`,
      },
    ],
  },
  {
    id: "goroutines-and-channels",
    stage: "Module 10",
    title: "Goroutines, channels, close semantics, and select",
    summary:
      "This is the entry to Go concurrency. You need the mental model, not just the syntax: who owns a channel, when it closes, and what select is choosing between.",
    topics: [
      "goroutine lifetime and the scheduler as a shared runtime resource",
      "unbuffered versus buffered channels and ownership transfer",
      "send, receive, close, range, zero-value receive on closed channels",
      "for unbuffered channels, start the receiving goroutine or select path before sending so the handoff can complete",
      "select with timeout, cancellation, and fan-in",
      "leak prevention and how blocked goroutines accumulate",
    ],
    lessons: [
      {
        title: "A goroutine is not free",
        paragraphs: [
          "Launching a goroutine is easy, but every goroutine has lifetime, scheduling, and coordination cost. Professional concurrency design starts by asking what owns that goroutine, how it stops, and what it is allowed to block on.",
          "If you cannot answer those questions, you do not yet have a concurrency design. You only have parallel-looking code.",
        ],
      },
      {
        title: "Channels are handoff points",
        paragraphs: [
          "Unbuffered channels synchronize sender and receiver. That means the receive path must be ready before the send can complete. If no listener is in place, the sender blocks forever — and if every goroutine is blocked, the Go runtime detects the situation and crashes the program with `fatal error: all goroutines are asleep - deadlock!`. This is not a network timeout or a slow operation; it is an immediate, unrecoverable crash.",
          "The rule is simple: for an unbuffered channel, start the goroutine that will receive before you write the send. That one ordering requirement is the most common mistake beginners make with channels, and the deadlock error is the clearest sign they got it backwards.",
          "Professional Go modules say clearly who writes, who reads, who closes, and whether a channel is signaling completion, transferring work, or carrying results.",
        ],
      },
    ],
    pitfalls: [
      "sending on an unbuffered channel before starting the receiving goroutine — this causes `fatal error: all goroutines are asleep - deadlock!`",
      "closing channels from the consumer side or from multiple goroutines",
      "starting background goroutines without a cancellation or drain path",
    ],
    snippetTitle: "Unbuffered channel handoff",
    snippet: `results := make(chan int)

go func() {
    total := <-results
    fmt.Println(total)
}()

results <- 21 + 21`,
    examples: [
      {
        title: "Producer closes, consumer ranges",
        summary: "The sending side owns close. Consumers can range until the stream is complete.",
        snippet: `jobs := make(chan int)

go func() {
    defer close(jobs)
    for _, job := range []int{1, 2, 3} {
        jobs <- job
    }
}()

for job := range jobs {
    fmt.Println(job)
}`,
      },
      {
        title: "Listener must come before the send",
        summary:
          "On an unbuffered channel, the receiving goroutine must be launched before the send executes. Reversing the order causes an immediate deadlock crash.",
        snippet: `// BROKEN: send happens before any listener exists — deadlock!
results := make(chan int)
results <- 42          // blocks forever, runtime panics
go func() {
    fmt.Println(<-results)
}()

// CORRECT: start the listener goroutine first, then send
results2 := make(chan int)
go func() {
    fmt.Println(<-results2) // receiver is ready and waiting
}()
results2 <- 42             // handoff completes successfully`,
      },
      {
        title: "Select with timeout or cancellation",
        summary:
          "Select expresses which event wins: a result, a timeout, or a context cancellation signal.",
        snippet: `select {
case result := <-results:
    fmt.Println(result)
case <-ctx.Done():
    return ctx.Err()
case <-time.After(500 * time.Millisecond):
    return errors.New("worker timeout")
}`,
      },
    ],
  },
  {
    id: "sync-primitives",
    stage: "Module 11",
    title: "WaitGroup, Mutex, RWMutex, Cond, Once, Pool, and atomic",
    summary:
      "Shared state demands exact coordination. This module focuses on when to protect data, when to block on conditions, and when low-level atomics are warranted.",
    topics: [
      "WaitGroup for known work sets and channel closure coordination",
      "WaitGroup.Go in newer Go versions to pair launch and bookkeeping in one place",
      "Mutex and RWMutex for critical sections and shared maps",
      "Cond for queues, state transitions, and wake-up handoff",
      "Once, Pool, sync.Map, and atomic counters or flags",
      "testing sync code with explicit handoff instead of flaky sleeps",
      "memory visibility and why locks are also synchronization points",
    ],
    lessons: [
      {
        title: "Choose the primitive that matches the problem",
        paragraphs: [
          "Use `WaitGroup` when the question is completion, `Mutex` when the question is shared state, `Cond` when goroutines must sleep until protected state changes, and atomics only when the state is truly narrow and you understand the memory model implications.",
          "The mistake professionals avoid is forcing every concurrency problem into channels. Channels are excellent for ownership transfer. They are not automatically the best tool for protecting mutable memory.",
        ],
      },
      {
        title: "Keep synchronization bookkeeping obvious",
        paragraphs: [
          "`WaitGroup.Go` is useful because it keeps task launch and completion bookkeeping together. Even when you still use `Add` and `Done`, the main rule is the same: write the coordination so a reviewer can see exactly when work starts and when it is proven finished.",
          "That clarity matters in tests as much as in production code. A synchronization primitive should reduce ambiguity, not hide it.",
        ],
      },
    ],
    pitfalls: [
      "using a mutex around too much code and turning a concurrent path into serialized work",
      "calling `WaitGroup.Add` after the goroutine can already be running",
      "using atomics where a simple lock would be easier and safer to reason about",
    ],
    snippetTitle: "WaitGroup.Go with protected shared state",
    snippet: `var (
    wg sync.WaitGroup
    mu sync.Mutex
    hits = map[string]int{}
)

for _, word := range []string{"go", "go", "gopher"} {
    word := word
    wg.Go(func() {
        mu.Lock()
        hits[word]++
        mu.Unlock()
    })
}

wg.Wait()`,
    examples: [
      {
        title: "RWMutex for read-heavy state",
        summary:
          "Use `RWMutex` when many readers can proceed together and writes are relatively rare.",
        snippet: `type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (cache *Cache) Get(key string) (string, bool) {
    cache.mu.RLock()
    defer cache.mu.RUnlock()
    value, ok := cache.data[key]
    return value, ok
}

func (cache *Cache) Set(key, value string) {
    cache.mu.Lock()
    cache.data[key] = value
    cache.mu.Unlock()
}`,
      },
      {
        title: "Cond for state changes",
        summary:
          "A `Cond` lets waiters sleep until protected state changes instead of polling in a loop with sleeps.",
        snippet: `type Queue struct {
    mu    sync.Mutex
    cond  *sync.Cond
    items []string
}

func NewQueue() *Queue {
    queue := &Queue{}
    queue.cond = sync.NewCond(&queue.mu)
    return queue
}

func (queue *Queue) Pop() string {
    queue.mu.Lock()
    defer queue.mu.Unlock()
    for len(queue.items) == 0 {
        queue.cond.Wait()
    }
    item := queue.items[0]
    queue.items = queue.items[1:]
    return item
}`,
      },
    ],
  },
  {
    id: "context-and-cancellation",
    stage: "Module 12",
    title: "Context, deadlines, cancellation, and graceful shutdown",
    summary:
      "Context is the lifetime signal for work in servers, workers, and clients. Professional Go code propagates it consistently and stops work promptly.",
    topics: [
      "context.Background, TODO, WithCancel, WithTimeout, WithDeadline",
      "request-scoped work in HTTP handlers and external clients",
      "select with ctx.Done inside loops and workers",
      "graceful shutdown for servers, queues, and worker pools",
      "avoiding context misuse as a dependency container",
    ],
    lessons: [
      {
        title: "Context is a lifetime signal",
        paragraphs: [
          "`context.Context` tells work when it no longer matters. That is its core role. A professional codebase passes it consistently through request-scoped work so downstream operations can stop early, free resources, and return meaningful cancellation errors.",
          "This is especially important in services. If an HTTP client disconnects or a deadline expires, the rest of the call chain should know promptly rather than continuing useless work in the background.",
        ],
      },
      {
        title: "Do not turn context into a parameter bag",
        paragraphs: [
          "Context should not become a hiding place for loggers, database handles, or arbitrary application state. That makes dependencies implicit and harder to test.",
          "Use explicit parameters for dependencies and reserve context values for truly request-scoped metadata that must travel across API boundaries.",
        ],
      },
    ],
    pitfalls: [
      "creating a new background context in the middle of a request path and breaking cancellation propagation",
      "ignoring `ctx.Done` in loops or worker code that claims to be cancellable",
      "storing ordinary dependencies in context instead of passing them explicitly",
    ],
    snippetTitle: "Timeout-bound outbound request",
    snippet: `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()

req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
if err != nil {
    return err
}

resp, err := http.DefaultClient.Do(req)
if err != nil {
    return err
}
defer resp.Body.Close()`,
    examples: [
      {
        title: "Worker loop that respects cancellation",
        summary:
          "Long-running workers should watch `ctx.Done` so they stop promptly when the caller no longer needs the work.",
        snippet: `func worker(ctx context.Context, jobs <-chan Job) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        case job, ok := <-jobs:
            if !ok {
                return nil
            }
            process(job)
        }
    }
}`,
      },
      {
        title: "Graceful shutdown signal fan-out",
        summary:
          "One cancellation context can coordinate HTTP shutdown, workers, and cleanup paths together.",
        snippet: `ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
defer stop()

go runWorkers(ctx, jobs)

<-ctx.Done()
shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

return server.Shutdown(shutdownCtx)`,
      },
    ],
  },
  {
    id: "patterns-and-architecture",
    stage: "Module 13",
    title: "Worker pools, pipelines, and service architecture",
    summary:
      "Once you know the primitives, you need the repeatable patterns that keep services understandable under load.",
    topics: [
      "fan-out and fan-in pipelines with clear ownership",
      "bounded worker pools with backpressure",
      "separating handlers, use cases, stores, and infrastructure",
      "obvious code over clever code and small reusable packages over giant abstractions",
      "idempotency, retries, and timeout boundaries",
      "avoiding the golden-hammer mistake of adding goroutines everywhere",
      "choosing composition over inheritance every time",
    ],
    lessons: [
      {
        title: "Patterns should simplify reasoning, not impress reviewers",
        paragraphs: [
          "Worker pools, pipelines, retries, and service layers are useful because they make load, ownership, and boundaries predictable. The moment a pattern becomes more complicated than the problem it solves, it stops being professional and starts becoming ceremony.",
          "This module emphasizes obvious code over clever code because long-lived services are maintained under pressure. Clear boundaries win when debugging incidents, onboarding new teammates, or making partial rewrites.",
        ],
      },
      {
        title: "Concurrency is not the default answer",
        paragraphs: [
          "A common Go mistake is turning every loop into goroutines because the language makes it easy. Real systems need bounded concurrency, backpressure, and shutdown behavior, not maximum fan-out by default.",
          "The professional mindset is to add concurrency only when work can overlap meaningfully and you can describe the resulting ownership and failure model in plain language.",
        ],
      },
    ],
    pitfalls: [
      "adding goroutines everywhere and calling it architecture",
      "building broad utility packages instead of small packages with one clear responsibility",
      "mixing retries, logging, timeouts, and business logic into the same orchestration layer",
    ],
    snippetTitle: "Bounded worker pool shell",
    snippet: `jobs := make(chan Job)
results := make(chan Result)

for worker := 0; worker < 4; worker++ {
    go startWorker(ctx, jobs, results)
}

go feedJobs(ctx, jobs)
consumeResults(ctx, results)`,
    examples: [
      {
        title: "Fan-out and fan-in shell",
        summary:
          "A pipeline should make ownership explicit: one stage feeds work, a bounded set of workers processes it, and a final stage merges results.",
        snippet: `inputs := make(chan Job)
outputs := make(chan Result)

for worker := 0; worker < 3; worker++ {
    go func() {
        for job := range inputs {
            outputs <- handle(job)
        }
    }()
}`,
      },
      {
        title: "Small service boundary",
        summary:
          "Handlers should delegate to small use-case and store interfaces instead of owning the whole program stack themselves.",
        snippet: `type Store interface {
    Save(context.Context, User) error
}

type Service struct {
    store Store
}

func (service Service) CreateUser(ctx context.Context, user User) error {
    return service.store.Save(ctx, user)
}`,
      },
    ],
  },
  {
    id: "runtime-and-performance",
    stage: "Module 14",
    title: "Go scheduler, runtime behavior, and the scheduling model",
    summary:
      "Performance work starts with understanding the Go runtime itself: the M:P:G scheduler, work stealing, preemption, stack growth, escape analysis, and garbage collection.",
    topics: [
      "the M:P:G scheduler model, GOMAXPROCS, netpoller, and asynchronous preemption",
      "stack versus heap and what escape analysis is telling you",
      "goroutine parking, work stealing, slice growth, map allocation, pooling, and copy costs",
      "pprof CPU and heap profiles, runtime trace, and benchmark discipline",
      "atomics versus locks and when each is correct",
      "optimize only after measuring realistic workloads",
    ],
    lessons: [
      {
        title: "Know the runtime before tuning the code",
        paragraphs: [
          "The Go scheduler decides how goroutines run across operating system threads and processors. Understanding M, P, and G is useful because performance issues often come from blocked goroutines, too much runnable work, poor batching, or over-allocation rather than from one obviously slow line of code.",
          "A professional performance module teaches you to see the runtime as part of the program, not a hidden black box underneath it.",
        ],
      },
      {
        title: "Measure before you optimize",
        paragraphs: [
          "Escape analysis, allocation behavior, stack growth, and pooling all matter, but only after you confirm a real bottleneck. Profiling and tracing tell you whether CPU, memory, or synchronization is actually the limiting factor.",
          "Optimization that is not tied to measurement usually trades clarity for imaginary speed. Go rewards engineers who profile first and simplify second.",
        ],
      },
    ],
    pitfalls: [
      "changing data structures for performance without measuring a real bottleneck",
      "assuming atomics are always faster or better than locks",
      "reading escape analysis output without relating it to actual profiles or benchmarks",
    ],
    snippetTitle: "Small allocation-aware example",
    snippet: `buffer := make([]byte, 0, 1024)
buffer = append(buffer, []byte("hello")...)

snapshot := slices.Clone(buffer)

var hits atomic.Int64
hits.Add(1)
fmt.Println(len(snapshot), hits.Load())`,
    examples: [
      {
        title: "sync.Pool for reusable buffers",
        summary:
          "Pooling is a performance tool for high-churn temporary objects, not a default replacement for ordinary allocation.",
        snippet: `var bufPool = sync.Pool{
    New: func() any {
        return new(bytes.Buffer)
    },
}

buf := bufPool.Get().(*bytes.Buffer)
buf.Reset()
defer bufPool.Put(buf)`,
      },
      {
        title: "Benchmark the allocation question",
        summary:
          "Performance decisions should be attached to measurement, usually through benchmarks and profiles.",
        snippet: `func BenchmarkCloneBuffer(b *testing.B) {
    src := bytes.Repeat([]byte("go"), 512)
    b.ReportAllocs()

    for b.Loop() {
        dst := slices.Clone(src)
        _ = dst
    }
}`,
      },
    ],
  },
  {
    id: "memory-layout-and-alignment",
    stage: "Module 15",
    title: "Memory layout, alignment, cache lines, and how CPUs read data",
    summary:
      "Go data structures live on real hardware. Field order affects padding, CPUs prefer aligned reads, and cache line behavior can make or break concurrent code.",
    topics: [
      "word size, alignment requirements, and why the compiler inserts padding",
      "struct field ordering to reduce wasted space and false sharing risk",
      "cache lines, sequential access, and why CPUs fetch nearby bytes together",
      "unsafe.Alignof, unsafe.Sizeof, and measuring before assuming",
      "coordination costs when hot counters live on the same cache line",
    ],
    lessons: [
      {
        title: "Data layout affects real machines",
        paragraphs: [
          "Go structs are not abstract blobs. Field order changes padding, alignment changes how many memory operations the CPU performs, and neighboring hot fields can fight over the same cache line under contention.",
          "That does not mean every struct needs manual tuning. It means performance-sensitive code should understand that memory layout is part of the design surface, especially when concurrency and large datasets are involved.",
        ],
      },
      {
        title: "Measure layout before acting on intuition",
        paragraphs: [
          "Tools such as `unsafe.Sizeof` and `unsafe.Alignof` help you verify how the compiler laid out a type. That is more trustworthy than guessing from source order alone.",
          "The professional habit is to change field order or isolate hot counters when measurement or contention data shows it matters, not because every struct must be micro-optimized by default.",
        ],
      },
    ],
    pitfalls: [
      "assuming field order is cosmetic when it can change padding and locality",
      "optimizing for cache lines in code that has no measured contention problem",
      "using `unsafe` to inspect layout and then letting those assumptions leak across package boundaries",
    ],
    snippetTitle: "Compare struct layouts",
    snippet: `type BadLayout struct {
    flag  bool
    total int64
    code  bool
}

type BetterLayout struct {
    total int64
    flag  bool
    code  bool
}

fmt.Println(unsafe.Sizeof(BadLayout{}), unsafe.Sizeof(BetterLayout{}))`,
    examples: [
      {
        title: "Field order changes padding",
        summary:
          "The compiler inserts padding to satisfy alignment. Reordering fields can shrink a struct without changing meaning.",
        snippet: `fmt.Println(unsafe.Alignof(BadLayout{}.total))
fmt.Println(unsafe.Sizeof(BadLayout{}))
fmt.Println(unsafe.Sizeof(BetterLayout{}))`,
      },
      {
        title: "Separate hot counters to avoid false sharing",
        summary:
          "Concurrent hot fields can fight over the same cache line. Padding or struct separation is one way to isolate them in performance-critical code.",
        snippet: `type CounterSlot struct {
    value int64
    _     [56]byte
}

var slots [2]CounterSlot`,
      },
    ],
  },
  {
    id: "advanced-boundaries",
    stage: "Module 16",
    title: "Reflection, unsafe, build tags, and cgo boundaries",
    summary:
      "You do not need these tools every day, but a complete Go resource should explain what they are for and when to stay away from them.",
    topics: [
      "reflect.Type and reflect.Value for framework or codec-style code",
      "unsafe.Pointer and layout assumptions at carefully isolated edges",
      "build constraints for platform-specific code and integration points",
      "cgo costs, deployment tradeoffs, and portability concerns",
      "keeping advanced tools fenced off behind small APIs",
    ],
    lessons: [
      {
        title: "Advanced tools belong at narrow boundaries",
        paragraphs: [
          "Reflection, unsafe operations, build tags, and cgo are legitimate parts of Go, but they are boundary tools. They help when portability, interoperability, or framework-style plumbing genuinely requires them.",
          "A professional module explains both the capability and the containment strategy: keep the sharp tool behind a small API so the rest of the codebase stays ordinary Go.",
        ],
      },
      {
        title: "Preserve simplicity around complex edges",
        paragraphs: [
          "The right way to use advanced features is usually to isolate them, document the invariant they rely on, and let most callers interact with simple typed functions. That keeps the codebase explainable even when one small corner has to be low-level.",
          "If `reflect` or `unsafe` starts spreading through business logic, the design has already drifted too far.",
        ],
      },
    ],
    pitfalls: [
      "letting reflection-heavy code leak into ordinary application paths",
      "using `unsafe` as a shortcut instead of isolating it behind carefully checked boundaries",
      "adding cgo dependencies without accounting for build, deployment, and portability cost",
    ],
    snippetTitle: "Platform-specific boundary",
    snippet: `//go:build darwin

func platformName() string {
    return runtime.GOOS
}

// Reach for reflect or unsafe only when simpler code is no longer enough.`,
    examples: [
      {
        title: "Reflection at a boundary",
        summary:
          "Reflection is useful for boundary code such as validation or serialization helpers, not as a replacement for ordinary typed business logic.",
        snippet: `func exportedFields(input any) []string {
    typ := reflect.TypeOf(input)
    if typ.Kind() == reflect.Pointer {
        typ = typ.Elem()
    }

    var names []string
    for index := range typ.NumField() {
        field := typ.Field(index)
        if field.IsExported() {
            names = append(names, field.Name)
        }
    }
    return names
}`,
      },
      {
        title: "Unsafe kept in one place",
        summary:
          "If you must inspect layout details, keep that code fenced off behind a tiny function instead of spreading assumptions across the package.",
        snippet: `func layoutReport[T any]() (uintptr, uintptr) {
    var zero T
    return unsafe.Sizeof(zero), unsafe.Alignof(zero)
}

size, align := layoutReport[struct {
    Count int64
    Flag  bool
}]()

fmt.Println(size, align)`,
      },
      {
        title: "Build-tagged implementation boundary",
        summary:
          "Build constraints let you select platform-specific files while keeping the exported API stable for the rest of the package.",
        snippet: `//go:build linux

package platform

func defaultSocketPath() string {
    return "/run/app.sock"
}`,
      },
      {
        title: "cgo isolated behind a small wrapper",
        summary:
          "If you need cgo, keep it in a narrow adapter package so the rest of the program still depends on ordinary Go functions.",
        snippet: `package native

// import "C"

func Version() string {
    return C.GoString(C.library_version())
}`,
      },
    ],
  },
];

export const libraryGroups: LibraryGroup[] = [
  {
    title: "Text, numbers, and collections",
    summary: "Daily packages for manipulating strings, bytes, numbers, and ordered data.",
    packages: [
      "fmt",
      "strings",
      "bytes",
      "strconv",
      "unicode/utf8",
      "slices",
      "maps",
      "cmp",
      "sort",
    ],
  },
  {
    title: "Files, paths, and streaming I/O",
    summary: "The packages behind CLIs, data processing, and local tools.",
    packages: [
      "os",
      "io",
      "bufio",
      "io/fs",
      "path",
      "path/filepath",
      "archive/zip",
      "compress/gzip",
    ],
  },
  {
    title: "Time, context, and coordination",
    summary: "Time and lifetime management across services and background work.",
    packages: ["time", "context", "sync", "sync/atomic", "runtime", "log/slog"],
  },
  {
    title: "Encoding and templating",
    summary: "Built-in serialization and server-rendered output tools.",
    packages: ["encoding/json", "encoding/csv", "encoding/xml", "html/template", "text/template"],
  },
  {
    title: "Networking and services",
    summary: "Core packages for HTTP services, clients, and lower-level networking.",
    packages: ["net", "net/url", "net/http", "crypto/tls", "database/sql"],
  },
  {
    title: "Introspection and tooling",
    summary: "Packages that help explain or inspect program behavior.",
    packages: ["runtime/pprof", "runtime/trace", "testing", "reflect", "unsafe"],
  },
];

export const concurrencyPatterns: PatternCard[] = [
  {
    title: "Channel ownership",
    summary:
      "The goroutine that creates and writes a channel should usually own its close decision.",
    highlights: [
      "use directional channel types to show intent",
      "for unbuffered channels, make sure the receiving path is in place before the send path tries to hand off a value",
      "close from the producer side, not from arbitrary receivers",
      "range over a channel when completion matters more than single values",
    ],
  },
  {
    title: "WaitGroup plus result channel",
    summary: "Separate completion tracking from result transport so the design stays obvious.",
    highlights: [
      "call Add before launching workers",
      "use WaitGroup.Go when it makes the launch bookkeeping easier to read",
      "close result channels after Wait returns",
      "use buffering only when the capacity has a clear purpose",
    ],
  },
  {
    title: "Mutex versus Cond",
    summary:
      "A Mutex protects shared memory. A Cond lets goroutines sleep until protected state changes.",
    highlights: [
      "check the condition in a loop every time",
      "hold the lock while reading and mutating shared state",
      "Signal for one waiter and Broadcast for global state changes",
    ],
  },
  {
    title: "Context as lifecycle control",
    summary:
      "Context is the cancellation and deadline bus for trees of work, not a generic bag of dependencies.",
    highlights: [
      "accept context as the first parameter",
      "watch ctx.Done inside workers, loops, and network calls",
      "return ctx.Err when cancellation is the reason work stopped",
    ],
  },
];

export const practiceGuides: PracticeGuide[] = [
  {
    title: "Idiomatic Go rules",
    summary: "The code should stay obvious even six months later.",
    bullets: [
      "prefer obvious code over clever code, especially in public APIs and concurrency paths",
      "prefer short, composable functions over large OO-style layers",
      "prefer small reusable packages with one job over broad utility buckets",
      "keep interfaces small and define them where they are consumed",
      "encapsulate through package boundaries and unexported fields, not class-style privacy",
      "return explicit errors instead of hiding failure behind abstractions",
      "design packages around responsibilities, not folder aesthetics",
    ],
  },
  {
    title: "Concurrency rules",
    summary: "Most bugs here are ownership bugs in disguise.",
    bullets: [
      "choose channels for ownership transfer and locks for shared memory",
      "for unbuffered channels, arrange the receiving goroutine or select case before the send path so the sender does not block forever",
      "do not reach for goroutines everywhere; concurrency only helps when work can overlap meaningfully",
      "treat goroutines as a cost with scheduling, memory, and coordination overhead",
      "avoid starting goroutines without a shutdown path",
      "do not use time.Sleep as a test synchronization strategy when channels or WaitGroup can prove completion",
      "protect maps unless all access is single-threaded",
      "assume leaks and races until the design proves otherwise",
    ],
  },
  {
    title: "Service design rules",
    summary: "Production Go code is more about boundaries than syntax.",
    bullets: [
      "pass context through every request-scoped call chain",
      "make timeout, retry, and logging boundaries explicit",
      "measure before optimizing and profile before rewriting",
      "keep database, HTTP, and worker logic separated by plain interfaces",
    ],
  },
];

export const cheatSheet: CheatSheetItem[] = [
  {
    title: "Program shell",
    note: "Executables use package main and a main function.",
    snippet: `package main

import "fmt"

func main() {
    fmt.Println("hello")
}`,
  },
  {
    title: "Declarations",
    note: "Use short declarations inside functions and const for compile-time values.",
    snippet: `const port = 8080

var ready bool
message := "go"
count := 3`,
  },
  {
    title: "Operators and precedence",
    note: "Go follows normal operator precedence, but parentheses are still the clearest way to show intent.",
    snippet: `result := 2 + 3*4
masked := flags&(1<<bit) != 0
total := (left + right) * scale`,
  },
  {
    title: "Enums with iota",
    note: "Go does not have enums as a keyword; the usual pattern is a typed constant block with iota.",
    snippet: `type State int

const (
    StateUnknown State = iota
    StateReady
    StateRunning
)`,
  },
  {
    title: "Conversions with strconv",
    note: "Use strconv for string-number conversions instead of hand-rolled parsing.",
    snippet: `count, err := strconv.Atoi("42")
if err != nil {
    return err
}

label := strconv.Itoa(count)`,
  },
  {
    title: "Control flow",
    note: "Go has one loop keyword and simple switches.",
    snippet: `for index, value := range items {
    fmt.Println(index, value)
}

switch state {
case "ready":
    fmt.Println("start")
default:
    fmt.Println("wait")
}`,
  },
  {
    title: "Pointers and encapsulation",
    note: "Go encapsulates with package visibility and unexported fields, while pointer receivers mutate state explicitly.",
    snippet: `type Counter struct {
    value int
  }

  func NewCounter() *Counter {
    return &Counter{}
  }

  func (counter *Counter) Inc() {
    counter.value++
  }`,
  },
  {
    title: "Structs and methods",
    note: "Methods are functions with a receiver attached to a named type.",
    snippet: `type User struct {
    Name string
}

func (user User) Greeting() string {
    return "hi " + user.Name
}`,
  },
  {
    title: "Interfaces and generics",
    note: "Keep interfaces small and use generics for reusable containers or algorithms.",
    snippet: `type Stringer interface {
    String() string
}

func First[T any](items []T) T {
    return items[0]
}`,
  },
  {
    title: "Errors and defer",
    note: "Return the error, then defer cleanup immediately after acquiring the resource.",
    snippet: `file, err := os.Open(name)
if err != nil {
    return err
}
defer file.Close()`,
  },
  {
    title: "errors.AsType",
    note: "Go 1.26 adds errors.AsType as a generic, type-safe alternative to errors.As.",
    snippet: `pathErr, ok := errors.AsType[*fs.PathError](err)
if ok {
    fmt.Println(pathErr.Path)
}`,
  },
  {
    title: "go fix",
    note: "Go 1.26 turns go fix into the home of modernizers that update code to current idioms and standard-library APIs.",
    snippet: `go fix ./...
go vet ./...`,
  },
  {
    title: "JSON and HTTP",
    note: "The standard library is enough for a lot of API work.",
    snippet: `w.Header().Set("Content-Type", "application/json")
if err := json.NewEncoder(w).Encode(data); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
}`,
  },
  {
    title: "Goroutine and channel",
    note: "With unbuffered channels, set up the receiving goroutine before the send path, or the sender blocks waiting for a listener.",
    snippet: `done := make(chan string)

go func() {
    fmt.Println(<-done)
}()

done <- "finished"`,
  },
  {
    title: "Select with timeout",
    note: "Timeouts are usually expressed with select and time.After or context.",
    snippet: `select {
case value := <-results:
    fmt.Println(value)
case <-time.After(time.Second):
    return errors.New("timeout")
}`,
  },
  {
    title: "WaitGroup and Mutex",
    note: "Wait for worker completion and guard shared state explicitly.",
    snippet: `var wg sync.WaitGroup
var mu sync.Mutex

wg.Add(1)
go func() {
    defer wg.Done()
    mu.Lock()
    defer mu.Unlock()
}()

wg.Wait()`,
  },
  {
    title: "WaitGroup.Go",
    note: "In newer Go toolchains, WaitGroup.Go keeps the launch site and bookkeeping together.",
    snippet: `var wg sync.WaitGroup

for _, task := range tasks {
    task := task
    wg.Go(func() {
        process(task)
    })
}

wg.Wait()`,
  },
  {
    title: "Context timeout",
    note: "Tie slow work to a deadline so callers can recover quickly.",
    snippet: `ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()

select {
case <-ctx.Done():
    return ctx.Err()
}`,
  },
  {
    title: "Scheduler and alignment",
    note: "The runtime scheduler moves goroutines across threads, and field order can change the bytes a CPU has to read.",
    snippet: `runtime.GOMAXPROCS(runtime.NumCPU())

type Stats struct {
    total int64
    flag  bool
}

fmt.Println(unsafe.Sizeof(Stats{}))`,
  },
  {
    title: "Testing sync code",
    note: "Test concurrency with explicit synchronization and `go test -race`, not with fragile sleeps.",
    snippet: `func TestCounterInc(t *testing.T) {
    var wg sync.WaitGroup
    counter := NewCounter()

    for range 10 {
      wg.Add(1)
      go func() {
        defer wg.Done()
        counter.Inc()
      }()
    }

    wg.Wait()

    if got := counter.Value(); got != 10 {
      t.Fatalf("got %d want 10", got)
    }
  }`,
  },
  {
    title: "Table tests",
    note: "Go tests scale well when cases are data, not copy-pasted functions.",
    snippet: `func TestAdd(t *testing.T) {
    cases := []struct {
        a, b int
        want int
    }{{1, 2, 3}, {2, 5, 7}}

    for _, tc := range cases {
        if got := Add(tc.a, tc.b); got != tc.want {
            t.Fatalf("got %d want %d", got, tc.want)
        }
    }
}`,
  },
];
