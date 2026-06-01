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

export const courseMeta = {
  targetGoVersion: "Go 1.23+",
  targetGoVersionDetail:
    "The core course targets Go 1.23 or newer. Snippets that depend on a newer language feature show their minimum Go version.",
};

export const courseParts: CoursePart[] = [
  {
    id: "language-core",
    title: "Language Core",
    summary: "Syntax, values, control flow, text, and functions.",
    moduleIds: ["orientation", "values-control-text"],
  },
  {
    id: "types-memory",
    title: "Types, Data, and Memory",
    summary: "Collections, structs, pointers, methods, interfaces, and generics.",
    moduleIds: ["collections-pointers", "methods-interfaces-generics"],
  },
  {
    id: "quality",
    title: "Errors, Packages, and Quality",
    summary: "Errors, defer, modules, package design, testing, and tooling.",
    moduleIds: ["errors-packages-quality"],
  },
  {
    id: "stdlib",
    title: "Standard Library Fluency",
    summary: "I/O, encoding, HTTP, context, time, logging, and databases.",
    moduleIds: ["standard-library"],
  },
  {
    id: "concurrency",
    title: "Concurrency",
    summary: "Goroutines, channels, synchronization, cancellation, and worker patterns.",
    moduleIds: ["concurrency-primitives", "concurrency-systems"],
  },
  {
    id: "runtime",
    title: "Runtime and Advanced Go",
    summary:
      "Scheduler, allocation, profiling, memory layout, reflection, unsafe, and cgo boundaries.",
    moduleIds: ["runtime-performance", "advanced-boundaries"],
  },
];

export const diagrams: DiagramAsset[] = [
  {
    id: "source-file",
    title: "Go Source File Anatomy",
    alt: "Hand-drawn diagram showing package declaration, imports, constants, functions, and exported versus unexported names in a Go source file.",
    caption:
      "A Go file reads top-down: package, imports, declarations, then small functions and methods.",
    transcript:
      "The diagram separates package clause, import block, constants, exported symbols, unexported helpers, and main or test entry points.",
  },
  {
    id: "string-runes",
    title: "String Bytes and Runes",
    alt: "Hand-drawn grid showing a Go string as bytes, with range decoding UTF-8 into runes.",
    caption: "`len` counts bytes. `range` decodes runes.",
    transcript:
      "The diagram shows ASCII bytes taking one cell and a non-ASCII rune taking multiple bytes while range reports the starting byte index.",
  },
  {
    id: "operator-precedence",
    title: "Go Operator Precedence",
    alt: "Hand-drawn ladder showing Go unary operators and the five binary operator precedence levels, with examples and common traps.",
    caption:
      "Go has fixed precedence rules, but readable code still uses parentheses and named steps when expressions mix levels.",
    transcript:
      "The diagram lists unary operators as highest precedence, then binary levels from multiplication, shifts, bitwise AND and bit clear down to logical OR. It highlights traps with bitwise comparisons, shifts plus addition, and mixed logical operators.",
  },
  {
    id: "slice-header",
    title: "Slice Header and Backing Array",
    alt: "Hand-drawn diagram showing a slice header with pointer, length, and capacity pointing to a backing array.",
    caption: "A slice value is a small header. Copying it still points at the same backing array.",
    transcript:
      "The diagram shows a slice header on the stack containing ptr, len, and cap, with an arrow to heap or array storage containing elements.",
  },
  {
    id: "map-iteration",
    title: "Go Map Iteration Order",
    alt: "Hand-drawn diagram showing a Go map header pointing to hash buckets, range producing different valid orders, and sorted keys producing deterministic output.",
    caption:
      "Map iteration order is unspecified. Collect and sort keys before iterating when stable output matters.",
    transcript:
      "The diagram shows a map header pointing to hash buckets. Two range loops can produce key value pairs in different orders. The stable recipe is to collect keys, sort keys with slices.Sort, then index the map in sorted key order.",
  },
  {
    id: "explicit-pointer",
    title: "Explicit Pointer",
    alt: "Hand-drawn diagram showing p as a pointer variable with its own address storing the address of n, and star p dereferencing to mutate n.",
    caption: "A pointer stores an address. Dereferencing follows that address to the value.",
    transcript:
      "The diagram shows n equals 42 at address 0x1000 and p at address 0x2000 storing 0x1000. The ampersand operator gets n's address, and star p reaches the value.",
  },
  {
    id: "interface-value",
    title: "Interface Dynamic Type and Value",
    alt: "Hand-drawn diagram showing an interface value as a pair of dynamic type and dynamic value.",
    caption: "An interface value carries a dynamic type and dynamic value.",
    transcript:
      "The diagram shows interface value slots for type and value. A nil concrete pointer inside an interface can make the interface itself non-nil.",
  },
  {
    id: "iterator-yield",
    title: "Go Iterators and the Yield Pattern",
    alt: "Hand-drawn diagram showing Go range-over-function iterator forms, a push iterator calling yield, a for range loop receiving values, and notes that yield is a callback parameter name, not a keyword.",
    caption:
      "Range-over-function iterators use a callback pattern commonly named `yield`; `yield` is a parameter name, not a Go keyword.",
    transcript:
      "The diagram lists the three function shapes accepted by range-over-function, shows Count calling yield with values 0, 1, and 2, and explains that yield returns false after a break so the iterator must stop.",
  },
  {
    id: "error-chain",
    title: "Error Wrapping Chain",
    alt: "Hand-drawn diagram showing operation context wrapping a lower-level filesystem error.",
    caption: "`%w` preserves a cause so callers can use `errors.Is` and `errors.As`.",
    transcript:
      "The diagram shows read config wrapping open file wrapping fs path error, with errors.Is and errors.As inspecting the chain.",
  },
  {
    id: "reader-writer",
    title: "Reader Writer Pipeline",
    alt: "Hand-drawn stream diagram showing io.Reader flowing through buffers, decoders, encoders, and io.Writer.",
    caption: "`io.Reader` and `io.Writer` let packages compose without custom adapters.",
    transcript:
      "The diagram shows file reader to buffered reader to JSON decoder, and encoder to response writer.",
  },
  {
    id: "channel-rendezvous",
    title: "Unbuffered Channel Rendezvous",
    alt: "Hand-drawn diagram showing sender and receiver meeting at an unbuffered channel.",
    caption: "An unbuffered send completes only when a receiver is ready.",
    transcript:
      "The diagram shows a receiver waiting on the left, sender on the right, and the value moving through the channel only when both sides are present.",
  },
  {
    id: "context-tree",
    title: "Context Cancellation Tree",
    alt: "Hand-drawn diagram showing one context cancellation signal fanning out to workers, HTTP shutdown, and database work.",
    caption: "Cancellation should flow through the whole request or worker tree.",
    transcript:
      "The diagram shows ctx.Done branching to workers, HTTP client calls, and graceful shutdown cleanup.",
  },
  {
    id: "scheduler-mpg",
    title: "Scheduler M P G Model",
    alt: "Hand-drawn diagram showing goroutines scheduled onto processors and operating system threads.",
    caption:
      "The runtime schedules goroutines across Ps and Ms, parking blocked work and running ready work.",
    transcript:
      "The diagram shows G goroutines queued on P processors, with M operating system threads executing them and a netpoller waking blocked goroutines.",
  },
  {
    id: "goroutine-stacks",
    title: "Goroutine Stacks and OS Thread Stacks",
    alt: "Hand-drawn comparison of small growable goroutine stacks against larger platform-dependent OS thread stacks.",
    caption:
      "Goroutines start with small growable stacks managed by the Go runtime; OS thread stacks are much larger platform-dependent reservations.",
    transcript:
      "The diagram compares goroutine stacks with a runtime minimum of 2 KB and adaptive starting size against OS thread stacks commonly measured in megabytes, and warns that goroutines still require memory, scheduling, and cleanup.",
  },
  {
    id: "struct-padding",
    title: "Struct Padding and Cache Lines",
    alt: "Hand-drawn memory layout showing struct fields, padding bytes, and two hot counters sharing a cache line.",
    caption: "Field order and hot shared memory can affect allocation size and contention.",
    transcript:
      "The diagram compares bool int64 bool layout with reordered int64 bool bool layout and shows hot counters on a cache line.",
  },
];

export const courseModules: CourseModule[] = [
  {
    id: "orientation",
    partId: "language-core",
    stage: "Module 01",
    level: "beginner",
    title: "Files, Packages, Imports, and Tooling",
    summary:
      "Start by reading Go the way the toolchain reads it: package first, imports next, declarations after that, and simple commands for running, testing, and documenting code.",
    prerequisites: ["Basic command-line comfort"],
    outcomes: [
      "Recognize executable versus library packages",
      "Use exported and unexported names deliberately",
      "Explain why unused local variables and imports are compile-time errors",
      "Run the daily Go command loop",
    ],
    glossaryIds: ["package", "exported-name", "unused-code-error", "zero-value"],
    lessons: [
      {
        id: "file-anatomy",
        title: "Read a Go File Top-Down",
        teachingGoal: "Understand the structural order shared by nearly every Go file.",
        diagramIds: ["source-file"],
        explanation: [
          {
            paragraphs: [
              "A Go source file starts with one package clause. That package boundary is the first design decision: it controls visibility, ownership, and how other code imports the file.",
              "Imports and declarations come next. Uppercase names are exported from the package; lowercase names stay package-local. There is no `private` keyword, so naming is part of the API.",
              "Go also keeps files honest by rejecting unused imports and unused local variables at compile time. These are errors, not warnings. The rule keeps code from accumulating dead dependencies and half-finished local state.",
            ],
          },
        ],
        snippets: [
          {
            title: "Minimal executable file",
            summary: "`package main` plus `func main` makes an executable program.",
            complete: true,
            code: `package main

import "fmt"

const build = "dev"

func main() {
    message := "hello, go"
    fmt.Println(message, build)
}`,
          },
          {
            title: "Unused local variables and imports fail compilation",
            summary:
              "Go requires local variables and imports to be used. Delete them or make intentional ignores explicit.",
            code: `package main

import (
    "fmt"
    "strings" // compile error: imported and not used
)

func main() {
    message := "hello"
    unused := 42 // compile error: declared and not used

    fmt.Println(message)
}`,
          },
          {
            title: "Intentional ignore uses the blank identifier",
            summary: "`_` says the unused result is deliberate.",
            code: `value, _ := strconv.Atoi("42")
fmt.Println(value)

// Better when the error matters:
value, err := strconv.Atoi("42")
if err != nil {
    return err
}`,
          },
        ],
        mistakes: [
          "Creating Java-style package hierarchies before responsibilities are clear",
          "Exporting names before callers need them",
          "Hand-formatting code instead of letting `gofmt` settle layout",
          "Leaving unused imports or local variables and expecting only a warning",
          "Using `_` to hide an error that should be handled",
        ],
        checks: [
          {
            question: "What makes a Go name exported from a package?",
            answer: "The identifier starts with an uppercase letter.",
          },
          {
            question: "Are unused imports and unused local variables warnings in Go?",
            answer: "No. They are compilation errors.",
          },
        ],
        exercises: [
          {
            title: "Create a tiny package",
            prompt: "Write a package with one exported constructor and one unexported helper.",
            goal: "Practice using package visibility as the first encapsulation tool.",
          },
        ],
      },
    ],
  },
  {
    id: "values-control-text",
    partId: "language-core",
    stage: "Module 02",
    level: "beginner",
    title: "Values, Operators, Control Flow, Strings, and Runes",
    summary:
      "Learn Go's compact value model: zero values, typed constants, explicit conversions, one loop keyword, simple switches, and strings as byte sequences.",
    prerequisites: ["Module 01"],
    outcomes: [
      "Use zero values and constants correctly",
      "Write readable expressions with explicit grouping",
      "Handle UTF-8 text without confusing bytes and runes",
    ],
    glossaryIds: ["zero-value", "operator-precedence", "rune", "byte"],
    lessons: [
      {
        id: "operator-precedence",
        title: "Operator Precedence: What Binds First",
        teachingGoal:
          "Learn Go's unary operators and five binary precedence levels, then use parentheses where they make intent clearer.",
        diagramIds: ["operator-precedence"],
        explanation: [
          {
            title: "The fixed ladder",
            paragraphs: [
              "Unary operators bind tighter than every binary operator. After that, Go has five binary precedence levels: multiplicative and bitwise AND at the top, then additive and bitwise OR/XOR, then comparisons, then logical AND, then logical OR.",
              "The rules are fixed by the language, but readable Go does not force readers to remember the full ladder. When bitwise, comparison, shift, and boolean operators mix, add parentheses or split the expression into named facts.",
            ],
          },
          {
            title: "The traps worth teaching",
            paragraphs: [
              "`flags & mask != 0` is parsed as `(flags & mask) != 0`, because `&` binds tighter than `!=`. That is legal, but the parentheses are still better because they show the intended bit test.",
              "`1 << n + 1` is parsed as `(1 << n) + 1`, because shifts bind tighter than addition. If you mean to shift by `n + 1`, write `1 << (n + 1)`.",
              "`a || b && c` is parsed as `a || (b && c)`. The code compiles, but parentheses keep the condition readable.",
            ],
          },
        ],
        snippets: [
          {
            title: "Bitwise and comparison",
            summary: "Wrap the bitwise operation to make the test obvious.",
            code: `ready := (flags & mask) != 0
cleared := flags &^ mask
allowed := ready && retries < 3`,
          },
          {
            title: "Shift and boolean grouping",
            summary: "Use parentheses when two readings are plausible.",
            code: `shiftThenAdd := (1 << n) + 1
shiftByNext := 1 << (n + 1)

if a || (b && c) {
    doWork()
}`,
          },
        ],
        mistakes: [
          "Relying on readers to remember every precedence level",
          "Writing shift expressions without parentheses when `(1 << n) + 1` and `1 << (n + 1)` are both plausible to a reader",
          "Mixing `&&` and `||` without parentheses in business rules",
          "Using clever one-line expressions where named boolean steps would teach intent",
        ],
        checks: [
          {
            question: "Which binds tighter: `&&` or `||`?",
            answer: "`&&` binds tighter, so `a || b && c` means `a || (b && c)`.",
          },
          {
            question: "How should you write a bit mask test for readability?",
            answer: "Use parentheses around the bitwise operation: `(flags & mask) != 0`.",
          },
        ],
        exercises: [
          {
            title: "Make grouping explicit",
            prompt:
              "Rewrite three mixed expressions with parentheses and then split one into named boolean variables.",
            goal: "Practice making precedence visible to the next reader.",
          },
        ],
      },
      {
        id: "operators-and-control",
        title: "Values, Constants, and Control Flow",
        teachingGoal: "Use Go's small syntax surface without making dense code.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "Go keeps control flow compact: one loop keyword, simple `if` statements, `switch`, `range`, and `defer`. The syntax is small, so the code should stay direct.",
              "Typed constants and zero values also remove ceremony. Use them to describe valid states, then let simple branches make program behavior obvious.",
            ],
          },
        ],
        snippets: [
          {
            title: "Typed constants and switch",
            summary: "Go enum-style values are usually typed constants with `iota`.",
            code: `type State int

const (
    StateUnknown State = iota
    StateReady
    StateRunning
)

switch state {
case StateReady:
    start()
default:
    wait()
}`,
          },
        ],
        mistakes: [
          "Using `iota` constants without a named type",
          "Compressing branches until the behavior is harder to scan",
          "Forgetting that zero values should often be useful",
        ],
        checks: [
          {
            question: 'What does `len("Go語")` count?',
            answer: "Bytes, not user-visible characters or runes.",
          },
        ],
        exercises: [
          {
            title: "Decode a string",
            prompt: "Print each byte index and rune in `Go語` using `range`.",
            goal: "See how UTF-8 decoding differs from byte indexing.",
          },
        ],
      },
      {
        id: "strings-runes",
        title: "Strings Are Bytes; Range Decodes Runes",
        teachingGoal: "Separate byte-oriented APIs from Unicode-aware APIs.",
        diagramIds: ["string-runes"],
        explanation: [
          {
            paragraphs: [
              "A string is an immutable byte sequence. Slicing a string uses byte offsets, and invalid UTF-8 can still exist inside a string.",
              "When you need code points, use `range` or convert deliberately to `[]rune`. That decision should be visible in code that validates names, truncates labels, or displays text.",
            ],
          },
        ],
        snippets: [
          {
            title: "Byte length versus rune iteration",
            summary: "`range` returns the starting byte index for each decoded rune.",
            code: `text := "Go語"
fmt.Println(len(text))

for index, r := range text {
    fmt.Println(index, r, string(r))
}`,
          },
        ],
        mistakes: [
          "Slicing in the middle of a multi-byte rune",
          "Validating UI text with byte counts only",
        ],
        checks: [
          {
            question: "Why can the indexes printed by `range` skip numbers?",
            answer:
              "A non-ASCII rune can occupy multiple bytes, so the next rune starts after those bytes.",
          },
        ],
        exercises: [
          {
            title: "Rune-aware limit",
            prompt: "Write a function that keeps only the first five runes of a string.",
            goal: "Practice choosing rune-aware logic only where it is needed.",
          },
        ],
      },
      {
        id: "functions-and-closures",
        title: "Functions, Multiple Returns, and Closures",
        teachingGoal:
          "Use functions as small boundaries with explicit inputs, outputs, and captured state.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "Go functions commonly return more than one value, especially a useful result plus an error. That keeps the success path and failure path visible at the call site.",
              "Functions are also values. You can pass behavior into helpers, return closures, and keep small bits of state private without inventing a framework or class hierarchy.",
            ],
          },
        ],
        snippets: [
          {
            title: "Multiple returns with early error handling",
            summary: "Return the parsed value and the reason parsing failed.",
            code: `func parsePort(input string) (int, error) {
    port, err := strconv.Atoi(input)
    if err != nil {
        return 0, fmt.Errorf("parse port %q: %w", input, err)
    }
    if port <= 0 || port > 65535 {
        return 0, fmt.Errorf("port out of range: %d", port)
    }
    return port, nil
}`,
          },
          {
            title: "Closure over private state",
            summary: "A closure can keep state local to the function that creates it.",
            code: `func counter() func() int {
    value := 0
    return func() int {
        value++
        return value
    }
}`,
          },
        ],
        mistakes: [
          "Returning sentinel values instead of an error when callers need to know why work failed",
          "Using named result parameters when they make the return path less obvious",
          "Capturing mutable state in a closure and then sharing it across goroutines without synchronization",
        ],
        checks: [
          {
            question: "Why do many Go functions return `(value, error)`?",
            answer:
              "The caller can handle success and failure explicitly without hidden exceptions.",
          },
        ],
        exercises: [
          {
            title: "Validate a port",
            prompt:
              "Write `parsePort` with table tests for empty, non-numeric, low, high, and valid inputs.",
            goal: "Practice small function boundaries with branchable failures.",
          },
        ],
      },
    ],
  },
  {
    id: "collections-pointers",
    partId: "types-memory",
    stage: "Module 03",
    level: "beginner",
    title: "Arrays, Slices, Maps, Structs, and Explicit Pointers",
    summary:
      "Most Go bugs at this stage are ownership bugs. Learn which values copy data, which values point at shared backing storage, and how explicit pointers mutate caller-owned state.",
    prerequisites: ["Modules 01-02"],
    outcomes: [
      "Explain array values versus slice headers",
      "Use maps without relying on iteration order",
      "Use structs with clear ownership",
      "Read and write pointer code with `&` and `*`",
      "Explain why slices, maps, and channels are reference-like built-ins",
    ],
    glossaryIds: [
      "pointer",
      "address",
      "slice-header",
      "backing-array",
      "map-iteration-order",
      "nil",
    ],
    lessons: [
      {
        id: "slice-ownership",
        title: "Slices Copy Headers, Not Backing Arrays",
        teachingGoal: "Predict when two slices share the same data.",
        diagramIds: ["slice-header"],
        explanation: [
          {
            paragraphs: [
              "An array is a value containing all its elements. A slice is a small descriptor with a pointer, length, and capacity. Copying a slice copies the descriptor, not the backing array.",
              "That is why sub-slices can alias the same storage. Clone before handing a slice to a new owner or goroutine if mutation would be surprising.",
            ],
          },
        ],
        snippets: [
          {
            title: "Aliasing and cloning",
            summary: "Sub-slices share storage until you deliberately clone.",
            code: `raw := []string{"go", "gin", "grpc"}
window := raw[:2]
window[0] = "gopher"

safe := slices.Clone(window)
safe[1] = "fiber"`,
          },
        ],
        mistakes: [
          "Assuming assigning a slice copies the elements",
          "Sharing mutable slices across goroutines without ownership rules",
          "Appending to a sub-slice while relying on old capacity behavior",
        ],
        checks: [
          {
            question: "What are the three fields in the usual slice mental model?",
            answer: "Pointer, length, and capacity.",
          },
        ],
        exercises: [
          {
            title: "Find the alias",
            prompt:
              "Write a small program where mutating a sub-slice changes the original slice, then fix it with `slices.Clone`.",
            goal: "Make slice ownership visible.",
          },
        ],
      },
      {
        id: "map-iteration-order",
        title: "Maps: Missing Keys, Ownership, and Unspecified Iteration Order",
        teachingGoal:
          "Use maps as fast key/value storage without accidentally depending on bucket iteration order.",
        diagramIds: ["map-iteration"],
        explanation: [
          {
            title: "Map order is not part of the contract",
            paragraphs: [
              "A Go map is a reference-like handle to runtime hash-table storage. It is excellent for lookup, insertion, deletion, and membership checks, but it is not an ordered collection.",
              "When you write `for k, v := range m`, the order is intentionally unspecified. It can vary between iterations, between runs, after map growth or deletion, and across Go versions. Treat any observed order as an implementation detail.",
            ],
          },
          {
            title: "Sort keys when order matters",
            paragraphs: [
              "Stable output is a separate step: collect the keys, sort them, and then index the map in that sorted key order. This is common for CLI output, tests, documentation examples, and deterministic serialization outside `encoding/json`.",
              "Also remember the zero-value lookup rule: reading a missing key returns the value type's zero value. Use the comma-ok form when missing and present-with-zero are different states.",
            ],
          },
        ],
        snippets: [
          {
            title: "Map iteration order is unspecified",
            summary: "Do not write tests or program logic that assumes this loop order.",
            code: `scores := map[string]int{
    "go":    1,
    "map":   2,
    "range": 3,
}

for key, value := range scores {
    fmt.Println(key, value)
}`,
          },
          {
            title: "Stable map output",
            summary: "Collect, sort, then index the map.",
            code: `keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

slices.Sort(keys)

for _, key := range keys {
    fmt.Println(key, scores[key])
}`,
          },
          {
            title: "Missing key versus zero value",
            summary: "Use comma-ok when zero is a valid stored value.",
            code: `count, ok := scores["missing"]
if !ok {
    fmt.Println("no score")
}
fmt.Println(count) // 0, the zero value for int`,
          },
        ],
        mistakes: [
          "Assuming map range order is random but stable enough for tests",
          "Rendering map output directly when deterministic order matters",
          "Confusing a missing key with a present key whose value is the zero value",
          "Sharing a map across goroutines without synchronization",
        ],
        checks: [
          {
            question: "Can Go code rely on the order produced by `for range` over a map?",
            answer: "No. The order is unspecified and can vary.",
          },
          {
            question: "What is the standard recipe for deterministic map output?",
            answer: "Collect keys, sort the keys, then index the map in sorted key order.",
          },
        ],
        exercises: [
          {
            title: "Make map output deterministic",
            prompt:
              "Write a program that prints a `map[string]int` twice, then change it to print keys in sorted order.",
            goal: "Separate hash-table storage from ordered presentation.",
          },
        ],
      },
      {
        id: "structs-and-value-ownership",
        title: "Structs and Arrays Are Values",
        teachingGoal:
          "Model data with structs while staying clear about value copies, invariants, and ownership.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "A struct value contains its fields. Assigning a struct copies those fields, which is often exactly what you want for small immutable facts. Arrays behave the same way: assigning an array copies every element.",
              "Use unexported fields and constructor functions when a type has invariants. Public fields are fine for plain data, but they let every caller rewrite state directly.",
            ],
          },
        ],
        snippets: [
          {
            title: "Constructor protects invariants",
            summary: "Export behavior while keeping representation details package-local.",
            code: `type Port struct {
    value int
}

func NewPort(value int) (Port, error) {
    if value <= 0 || value > 65535 {
        return Port{}, fmt.Errorf("invalid port: %d", value)
    }
    return Port{value: value}, nil
}

func (port Port) Value() int {
    return port.value
}`,
          },
          {
            title: "Array assignment copies elements",
            summary: "Arrays are values; slices are windows onto backing storage.",
            code: `a := [3]string{"go", "test", "ship"}
b := a
b[0] = "copy"

fmt.Println(a[0]) // "go"
fmt.Println(b[0]) // "copy"`,
          },
        ],
        mistakes: [
          "Exporting every struct field before you know the package API",
          "Expecting array assignment to behave like slice assignment",
          "Using pointers only to avoid thinking about the ownership model",
        ],
        checks: [
          {
            question: "What happens when you assign one array variable to another?",
            answer: "The array value is copied, including all of its elements.",
          },
        ],
        exercises: [
          {
            title: "Hide an invariant",
            prompt:
              "Create a small `Email` or `Port` type with an unexported field, a constructor, and one exported method.",
            goal: "Practice using package visibility to protect valid state.",
          },
        ],
      },
      {
        id: "explicit-pointers",
        title: "Explicit Pointers: Address, Dereference, Nil, and Mutation",
        teachingGoal: "Understand pointer variables as ordinary values that store addresses.",
        diagramIds: ["explicit-pointer"],
        explanation: [
          {
            title: "The two operators",
            paragraphs: [
              "`&x` means address of `x`. `*p` means follow pointer `p` to the value it points at. A pointer variable has its own address and stores another address as its value.",
              "Go has explicit pointers, but it does not have C-style pointer arithmetic. You use pointers to share identity, allow mutation, avoid large copies, or represent nil.",
            ],
          },
          {
            title: "Passing a pointer is still pass-by-value",
            paragraphs: [
              "Every Go argument is passed by value. When the argument is a pointer, Go copies the address. That copied address still points to the same caller-owned value, so dereferencing it can mutate caller state.",
              "Slices, maps, and channels are different: they are reference-like built-ins. Passing them copies a header or handle that still points to shared runtime storage.",
            ],
          },
        ],
        snippets: [
          {
            title: "Address and dereference",
            summary: "`p` stores the address of `n`; `*p` reaches `n`.",
            complete: true,
            code: `package main

import "fmt"

func main() {
    n := 42
    p := &n

    fmt.Println(n)
    fmt.Println(*p)

    *p = 99
    fmt.Println(n)
}`,
          },
          {
            title: "Value copy versus pointer copy",
            summary: "The pointer argument is copied, but it still reaches the caller's integer.",
            code: `func doubleValue(n int) {
    n *= 2
}

func doublePointer(n *int) {
    *n *= 2
}`,
          },
          {
            title: "Nil pointer guard",
            summary: "A nil pointer points to no value. Do not dereference it.",
            code: `var p *int
if p == nil {
    fmt.Println("no int yet")
}`,
          },
        ],
        mistakes: [
          "Saying Go has references like C++ references",
          "Dereferencing a nil pointer",
          "Using pointer receivers by default when value semantics are clearer",
          "Forgetting that pointer arguments are copied too",
        ],
        checks: [
          {
            question: "If `p := &n`, what does `p` contain?",
            answer: "The address of `n`.",
          },
          {
            question: "What does `*p = 99` change?",
            answer: "The value stored at the address inside `p`, which is `n` in this example.",
          },
        ],
        exercises: [
          {
            title: "Write a swap",
            prompt: "Write `func swap(a, b *int)` that swaps two caller-owned integers.",
            goal: "Practice mutation through copied pointer values.",
          },
        ],
      },
    ],
  },
  {
    id: "methods-interfaces-generics",
    partId: "types-memory",
    stage: "Module 04",
    level: "intermediate",
    title: "Methods, Interfaces, and Generics",
    summary:
      "Go composition depends on named types, receiver choices, tiny interfaces, and generics that remove real duplication rather than adding ceremony.",
    prerequisites: ["Module 03"],
    outcomes: [
      "Choose value or pointer receivers deliberately",
      "Define interfaces at the consumer boundary",
      "Use generics for reusable algorithms and containers",
      "Explain range-over-function iterators and the yield callback pattern",
    ],
    glossaryIds: [
      "receiver",
      "method-set",
      "interface-value",
      "type-parameter",
      "iterator",
      "yield-pattern",
    ],
    lessons: [
      {
        id: "methods-and-receivers",
        title: "Methods Attach Behavior to Named Types",
        teachingGoal:
          "Choose value and pointer receivers based on mutation, copying, and method sets.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "A method is a function with a receiver. The receiver is just another parameter, but placing it before the function name attaches behavior to a named type and makes the call read naturally.",
              "Use a pointer receiver when the method must mutate the receiver, avoid copying a large value, or keep a consistent method set with other pointer methods. Use a value receiver when copying is cheap and value semantics are the point.",
            ],
          },
        ],
        snippets: [
          {
            title: "Value receiver for immutable behavior",
            summary: "The method reads a copy and leaves the original value unchanged.",
            code: `type Celsius float64

func (temperature Celsius) Fahrenheit() float64 {
    return float64(temperature)*9/5 + 32
}`,
          },
          {
            title: "Pointer receiver for mutation",
            summary: "The method changes caller-owned state through the receiver pointer.",
            code: `type Counter struct {
    value int
}

func (counter *Counter) Inc() {
    counter.value++
}

func (counter Counter) Value() int {
    return counter.value
}`,
          },
        ],
        mistakes: [
          "Mixing value and pointer receivers accidentally instead of by design",
          "Using pointer receivers for tiny immutable values where value semantics are clearer",
          "Forgetting that methods can be declared only on named types in the same package",
        ],
        checks: [
          {
            question: "When is a pointer receiver the obvious choice?",
            answer: "When the method must mutate receiver state or avoid copying a large value.",
          },
        ],
        exercises: [
          {
            title: "Pick the receiver",
            prompt:
              "Add methods to a `Counter` and a `Point` type, then explain which receivers should be values and which should be pointers.",
            goal: "Practice connecting receiver choice to ownership and mutation.",
          },
        ],
      },
      {
        id: "interfaces",
        title: "Interfaces Carry Dynamic Type and Value",
        teachingGoal: "Reason about interface values, small interfaces, and nil traps.",
        diagramIds: ["interface-value"],
        explanation: [
          {
            paragraphs: [
              "A concrete type implements an interface implicitly by having the required methods. You do not declare the relationship in the type definition.",
              "The consumer should usually define the interface it needs. Keep it small: one or two methods often communicate more clearly than a broad abstraction.",
            ],
          },
        ],
        snippets: [
          {
            title: "Consumer-owned interface",
            summary: "The caller owns the abstraction it needs.",
            code: `type Clock interface {
    Now() time.Time
}

func Expired(clock Clock, deadline time.Time) bool {
    return clock.Now().After(deadline)
}`,
          },
          {
            title: "Generic helper with a real purpose",
            summary: "Use type parameters when they remove repeated algorithm code.",
            code: `func Map[T any, U any](items []T, fn func(T) U) []U {
    out := make([]U, 0, len(items))
    for _, item := range items {
        out = append(out, fn(item))
    }
    return out
}`,
          },
        ],
        mistakes: [
          "Creating broad interfaces before a caller needs them",
          "Mixing pointer and value receivers accidentally",
          "Adding generics to business logic that is already clear with concrete types",
        ],
        checks: [
          {
            question: "Where should many Go interfaces be defined?",
            answer:
              "Near the consumer that needs behavior, not necessarily near the implementation.",
          },
        ],
        exercises: [
          {
            title: "Extract a tiny interface",
            prompt:
              "Given a function that needs only `Read`, accept `io.Reader` instead of a concrete file.",
            goal: "Practice depending on behavior instead of implementation.",
          },
        ],
      },
      {
        id: "iterators-and-yield",
        title: "Iterators and the Yield Pattern",
        teachingGoal:
          "Understand Go range-over-function iterators and why `yield` is a callback convention, not a keyword.",
        diagramIds: ["iterator-yield"],
        explanation: [
          {
            title: "Range over a function",
            paragraphs: [
              "Go 1.23 added range-over-function iterators. A `for range` loop can range over a function when that function has one of the accepted shapes: it receives a callback that takes zero, one, or two values and returns `bool`.",
              "The callback is commonly named `yield`, so people often describe this as the yield pattern. That name is a convention, not a reserved word. You could name the parameter differently, but `yield` communicates the iterator contract clearly.",
            ],
          },
          {
            title: "What the bool means",
            paragraphs: [
              "The iterator calls `yield` for each value it wants to provide to the loop. If the loop stops early with `break`, `yield` returns false, and the iterator function must stop calling it.",
              "The standard `iter` package names the common shapes `iter.Seq[V]` and `iter.Seq2[K, V]`. These are push iterators: the iterator pushes values into the loop by calling the callback.",
            ],
          },
        ],
        snippets: [
          {
            title: "Push iterator function",
            summary: "The iterator calls `yield`; the loop receives each value.",
            minGoVersion: "1.23",
            code: `func Count(yield func(int) bool) {
    for i := range 3 {
        if !yield(i) {
            return
        }
    }
}

for value := range Count {
    fmt.Println(value)
}`,
          },
          {
            title: "Named iterator type",
            summary: "`iter.Seq` is the standard one-value iterator shape.",
            minGoVersion: "1.23",
            code: `func CountTo(n int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := range n {
            if !yield(i) {
                return
            }
        }
    }
}`,
          },
        ],
        mistakes: [
          "Calling `yield` a Go keyword",
          "Continuing to call `yield` after it returns false",
          "Using an iterator where a plain slice or map loop would be clearer",
          "Assuming any arbitrary function can appear on the right side of `range`",
        ],
        checks: [
          {
            question: "Is `yield` a reserved Go keyword?",
            answer: "No. It is a conventional callback parameter name used by iterator functions.",
          },
          {
            question: "What must an iterator do when `yield` returns false?",
            answer: "Stop iteration and return.",
          },
        ],
        exercises: [
          {
            title: "Stop on break",
            prompt:
              "Write an iterator that prints a cleanup message when a loop breaks early after `yield` returns false.",
            goal: "Practice the iterator contract instead of treating yield as syntax magic.",
          },
        ],
      },
    ],
  },
  {
    id: "errors-packages-quality",
    partId: "quality",
    stage: "Module 05",
    level: "intermediate",
    title: "Errors, Defer, Packages, Modules, and Testing",
    summary:
      "Professional Go code makes failure explicit, keeps package boundaries small, tests behavior with data, and uses the toolchain every day.",
    prerequisites: ["Modules 01-04"],
    outcomes: [
      "Wrap errors with context while preserving causes",
      "Use defer for cleanup at the acquisition site",
      "Write table tests, benchmarks, and package layouts that age well",
    ],
    glossaryIds: ["error-chain", "defer", "module"],
    lessons: [
      {
        id: "errors-defer",
        title: "Errors Are Values in the API",
        teachingGoal: "Return errors that callers can inspect without parsing strings.",
        diagramIds: ["error-chain"],
        explanation: [
          {
            paragraphs: [
              "Go treats failure as a normal value. That pushes error handling into the API contract: what can fail, what context should be attached, and what callers can branch on.",
              "Use `%w` to wrap causes when the caller may need `errors.Is` or `errors.As`. Use `defer` immediately after acquiring resources so cleanup stays attached to ownership.",
            ],
          },
        ],
        snippets: [
          {
            title: "Wrap a lower-level failure",
            summary: "Attach operation context while preserving the original cause.",
            code: `func loadConfig(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("read config %q: %w", path, err)
    }
    if len(data) == 0 {
        return errors.New("empty config")
    }
    return nil
}`,
          },
          {
            title: "Table test shell",
            summary: "Behavior tables keep cases easy to scan and extend.",
            code: `func TestAdd(t *testing.T) {
    cases := []struct {
        name string
        a, b int
        want int
    }{
        {name: "positive", a: 1, b: 2, want: 3},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            if got := Add(tc.a, tc.b); got != tc.want {
                t.Fatalf("got %d want %d", got, tc.want)
            }
        })
    }
}`,
          },
        ],
        mistakes: [
          "Returning errors without operation context",
          "Using panic for ordinary input or network failures",
          "Deferring cleanup far from resource acquisition",
          "Copying fashionable folder layouts instead of designing package responsibilities",
        ],
        checks: [
          {
            question: "Why use `%w` instead of `%v` when wrapping an error?",
            answer: "`%w` preserves the cause for `errors.Is` and `errors.As`.",
          },
        ],
        exercises: [
          {
            title: "Add branchable errors",
            prompt:
              "Wrap an `os.ReadFile` error and write a caller that checks `errors.Is(err, os.ErrNotExist)`.",
            goal: "Practice preserving causes across package boundaries.",
          },
        ],
      },
      {
        id: "packages-modules-tests",
        title: "Packages, Modules, and the Quality Loop",
        teachingGoal:
          "Use modules, small package boundaries, and tests as part of the normal development loop.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "A Go module gives a package tree a versioned dependency boundary through `go.mod`. Inside that module, packages should exist because they own a clear responsibility, not because a template said every project needs more folders.",
              "The daily quality loop is mechanical: format, vet or lint, test, and run the race detector when shared state is involved. That loop should be easy enough to run before every meaningful change.",
            ],
          },
        ],
        snippets: [
          {
            title: "Small module shape",
            summary:
              "`cmd` owns entry points; `internal` hides implementation from outside imports.",
            code: `module example.com/app

go 1.23

// example.com/app/
//   cmd/server/main.go
//   internal/store/store.go
//   internal/service/service.go`,
          },
          {
            title: "Quality loop commands",
            summary: "Run the same checks locally that CI will expect.",
            code: `go fmt ./...
go vet ./...
go test ./...
go test -race ./...`,
          },
        ],
        mistakes: [
          "Copying a large folder layout before the package responsibilities exist",
          "Letting `replace` directives become permanent release configuration",
          "Skipping race tests for code that shares mutable state between goroutines",
        ],
        checks: [
          {
            question: "What should decide whether a new package exists?",
            answer: "A clear responsibility and API boundary, not a fashionable folder layout.",
          },
        ],
        exercises: [
          {
            title: "Refactor one package boundary",
            prompt:
              "Move a persistence detail behind an `internal/store` package and test the caller through a small interface.",
            goal: "Practice using packages to make responsibilities explicit.",
          },
        ],
      },
    ],
  },
  {
    id: "standard-library",
    partId: "stdlib",
    stage: "Module 06",
    level: "intermediate",
    title: "I/O, Encoding, HTTP, Time, Context, Logging, and Databases",
    summary:
      "The standard library is a production toolkit. Learn the interfaces and packages that compose before reaching for frameworks.",
    prerequisites: ["Modules 01-05"],
    outcomes: [
      "Compose `io.Reader` and `io.Writer` pipelines",
      "Build HTTP handlers and clients with timeouts",
      "Use encoding, time, logging, and database APIs at boundaries",
    ],
    glossaryIds: ["reader", "writer", "context"],
    lessons: [
      {
        id: "reader-writer-composition",
        title: "Readers and Writers Make Packages Snap Together",
        teachingGoal: "Use the I/O interfaces before inventing wrappers.",
        diagramIds: ["reader-writer"],
        explanation: [
          {
            paragraphs: [
              "Files, network connections, buffers, compressors, encoders, and HTTP bodies share the same small I/O interfaces. Once you understand `io.Reader` and `io.Writer`, the standard library becomes more composable.",
              "Stream data when possible. Reading everything into memory first is usually less robust unless you know the input is small.",
            ],
          },
        ],
        snippets: [
          {
            title: "Stream JSON from a file",
            summary: "Decode from a reader instead of buffering the full file first.",
            code: `file, err := os.Open("data.json")
if err != nil {
    return err
}
defer file.Close()

var payload map[string]any
return json.NewDecoder(file).Decode(&payload)`,
          },
          {
            title: "HTTP client with request deadline",
            summary: "Carry context deadlines into network calls.",
            code: `ctx, cancel := context.WithTimeout(r.Context(), 500*time.Millisecond)
defer cancel()

req, err := http.NewRequestWithContext(ctx, http.MethodGet, upstreamURL, nil)
if err != nil {
    return err
}

resp, err := http.DefaultClient.Do(req)`,
          },
        ],
        mistakes: [
          "Reading whole files when a streaming decoder is simpler",
          "Creating HTTP clients without timeouts or context",
          "Mixing transport, business logic, and persistence in one handler",
        ],
        checks: [
          {
            question: "What interface does `json.NewDecoder` need?",
            answer: "An `io.Reader`.",
          },
        ],
        exercises: [
          {
            title: "Build a streaming endpoint",
            prompt: "Write an HTTP handler that encodes a response with `json.NewEncoder(w)`.",
            goal: "Practice using standard library boundaries directly.",
          },
        ],
      },
      {
        id: "http-time-logging-database",
        title: "HTTP, Time, Logging, and Database Boundaries",
        teachingGoal:
          "Carry deadlines, structured logs, and database calls through explicit standard-library boundaries.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "`net/http`, `time`, `context`, `log/slog`, and `database/sql` are designed to meet at boundaries. A handler should accept a request context, pass it to downstream calls, log useful facts, and keep persistence details behind a small API.",
              "Timeouts belong close to the work they bound. Databases and HTTP clients should receive contexts so cancellation can travel through slow or abandoned work instead of leaving background operations behind.",
            ],
          },
        ],
        snippets: [
          {
            title: "Handler with structured logging",
            summary: "Keep transport concerns local and pass context into application work.",
            code: `func handleUser(logger *slog.Logger, users UserStore) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        user, err := users.Find(r.Context(), r.PathValue("id"))
        if err != nil {
            logger.ErrorContext(r.Context(), "find user", "error", err)
            http.Error(w, "not found", http.StatusNotFound)
            return
        }

        _ = json.NewEncoder(w).Encode(user)
    }
}`,
          },
          {
            title: "Database call with caller lifetime",
            summary: "`database/sql` methods accept context at query and transaction boundaries.",
            code: `func (store Store) Find(ctx context.Context, id string) (User, error) {
    var user User
    err := store.db.QueryRowContext(
        ctx,
        "select id, name from users where id = ?",
        id,
    ).Scan(&user.ID, &user.Name)
    return user, err
}`,
          },
        ],
        mistakes: [
          "Using `http.DefaultClient` for production calls without an explicit timeout plan",
          "Creating a fresh background context inside request-scoped database work",
          "Logging errors but returning no structured error to the caller that needs to decide",
        ],
        checks: [
          {
            question: "Why should database calls usually receive the request context?",
            answer:
              "So cancellation and deadlines propagate when the caller goes away or times out.",
          },
        ],
        exercises: [
          {
            title: "Add a timeout boundary",
            prompt:
              "Wrap an outbound HTTP request or database query with a context deadline and test the timeout path.",
            goal: "Practice making slow dependencies bounded and observable.",
          },
        ],
      },
    ],
  },
  {
    id: "concurrency-primitives",
    partId: "concurrency",
    stage: "Module 07",
    level: "intermediate",
    title: "Goroutines, Channels, Select, and Synchronization",
    summary:
      "Concurrency starts with lifetime and ownership. Learn when channels transfer ownership, when locks protect memory, and how to prove work completed.",
    prerequisites: ["Modules 01-06"],
    outcomes: [
      "Explain unbuffered channel rendezvous",
      "Use `select` for result, timeout, and cancellation choices",
      "Choose between channels, mutexes, conds, atomics, and WaitGroups",
    ],
    glossaryIds: ["goroutine", "channel", "mutex", "race"],
    lessons: [
      {
        id: "channel-rendezvous",
        title: "Unbuffered Channels Are Handoff Points",
        teachingGoal: "Avoid the beginner deadlock: sending before any receiver can run.",
        diagramIds: ["channel-rendezvous"],
        explanation: [
          {
            paragraphs: [
              "An unbuffered channel synchronizes sender and receiver. The send cannot complete until a receiver is ready. If every goroutine is blocked, the runtime reports a deadlock.",
              "Write down who sends, who receives, who closes, and how the goroutines stop. Without those answers, you do not have a concurrency design yet.",
            ],
          },
        ],
        snippets: [
          {
            title: "Start receiver before send",
            summary: "The receive path is ready before the handoff.",
            code: `results := make(chan int)

go func() {
    fmt.Println(<-results)
}()

results <- 42`,
          },
          {
            title: "Select with timeout and cancellation",
            summary: "Select says which event wins.",
            code: `select {
case result := <-results:
    fmt.Println(result)
case <-ctx.Done():
    return ctx.Err()
case <-time.After(500 * time.Millisecond):
    return errors.New("worker timeout")
}`,
          },
        ],
        mistakes: [
          "Sending on an unbuffered channel before any receiver exists",
          "Closing channels from the consumer side",
          "Starting goroutines without a cancellation or drain path",
          "Using `time.Sleep` as test synchronization",
        ],
        checks: [
          {
            question: "Who should usually close a channel?",
            answer: "The producer or owner of the send side.",
          },
        ],
        exercises: [
          {
            title: "Fix a deadlock",
            prompt:
              "Write a broken send-before-receive example, observe the deadlock, then reorder it safely.",
            goal: "Internalize unbuffered channel handoff semantics.",
          },
        ],
      },
      {
        id: "sync-primitives",
        title: "WaitGroups, Mutexes, and Race Detection",
        teachingGoal:
          "Choose synchronization primitives based on whether you need completion, memory protection, or event choice.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "`sync.WaitGroup` answers one question: when is a known set of work finished? A `Mutex` answers a different question: who may read or write this shared memory right now?",
              "Channels, locks, condition variables, and atomics are not interchangeable decorations. Channels fit ownership transfer and event selection; locks fit shared memory; atomics fit very narrow counters or flags after you understand the memory model.",
            ],
          },
        ],
        snippets: [
          {
            title: "Wait for workers and protect a map",
            summary: "Call `Add` before launch, `Done` on exit, and lock around shared state.",
            code: `var (
    wg   sync.WaitGroup
    mu   sync.Mutex
    hits = map[string]int{}
)

for _, word := range []string{"go", "go", "gopher"} {
    word := word
    wg.Add(1)
    go func() {
        defer wg.Done()
        mu.Lock()
        defer mu.Unlock()
        hits[word]++
    }()
}

wg.Wait()`,
          },
          {
            title: "Race detector command",
            summary: "Use the race detector whenever concurrent code shares memory.",
            code: `go test -race ./...`,
          },
        ],
        mistakes: [
          "Calling `WaitGroup.Add` after a goroutine can already call `Done`",
          "Protecting writes with a mutex but leaving reads unprotected",
          "Using atomics to avoid a simple lock in code that needs multiple fields to stay consistent",
        ],
        checks: [
          {
            question: "What does a mutex protect?",
            answer: "A critical section around shared memory, not a goroutine by itself.",
          },
        ],
        exercises: [
          {
            title: "Make a race disappear",
            prompt:
              "Write a test that increments a shared map from goroutines, observe `go test -race`, then fix it with a mutex.",
            goal: "Connect the race detector output to a concrete synchronization choice.",
          },
        ],
      },
    ],
  },
  {
    id: "concurrency-systems",
    partId: "concurrency",
    stage: "Module 08",
    level: "advanced",
    title: "Context, Worker Pools, Pipelines, and Graceful Shutdown",
    summary:
      "Real systems need bounded concurrency, backpressure, cancellation propagation, and deterministic shutdown instead of unlimited goroutine fan-out.",
    prerequisites: ["Module 07"],
    outcomes: [
      "Propagate context through request and worker trees",
      "Build bounded worker pools with backpressure",
      "Test concurrent code with explicit handoff",
    ],
    glossaryIds: ["context", "backpressure", "goroutine-leak"],
    lessons: [
      {
        id: "context-cancellation",
        title: "Context Is a Lifetime Signal",
        teachingGoal: "Stop work promptly when the caller no longer needs it.",
        diagramIds: ["context-tree"],
        explanation: [
          {
            paragraphs: [
              "`context.Context` tells work when it no longer matters. Pass it as the first parameter through request-scoped work, external calls, and long-running worker loops.",
              "Do not turn context into a dependency container. Databases, loggers, and services should be explicit dependencies; context values are for request-scoped metadata that must cross API boundaries.",
            ],
          },
        ],
        snippets: [
          {
            title: "Worker loop that stops",
            summary: "Long-running workers should watch `ctx.Done`.",
            code: `func worker(ctx context.Context, jobs <-chan Job) error {
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
        ],
        mistakes: [
          "Creating `context.Background()` inside a request path",
          "Ignoring `ctx.Done` in loops that claim to be cancellable",
          "Adding goroutines everywhere without bounded capacity",
        ],
        checks: [
          {
            question: "What should a worker usually return when context cancellation stops it?",
            answer: "`ctx.Err()`.",
          },
        ],
        exercises: [
          {
            title: "Bound a worker pool",
            prompt:
              "Build a worker pool with a fixed worker count, a jobs channel, and context cancellation.",
            goal: "Practice backpressure and shutdown together.",
          },
        ],
      },
      {
        id: "bounded-worker-pools",
        title: "Bounded Worker Pools and Graceful Shutdown",
        teachingGoal:
          "Limit concurrency, close outputs deterministically, and let cancellation stop the pipeline.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "A worker pool is useful when it makes load predictable. The point is not to start as many goroutines as possible; it is to bound parallel work and create backpressure when producers outrun consumers.",
              "Every pipeline needs an ownership story. Know who closes each channel, how workers observe cancellation, and how the final consumer learns no more results are coming.",
            ],
          },
        ],
        snippets: [
          {
            title: "Bounded pool shell",
            summary:
              "A fixed worker count limits parallelism and closes results after all workers finish.",
            code: `func runPool(ctx context.Context, jobs <-chan Job, workers int) <-chan Result {
    results := make(chan Result)
    var wg sync.WaitGroup

    for worker := 0; worker < workers; worker++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return
                case job, ok := <-jobs:
                    if !ok {
                        return
                    }
                    result := process(job)
                    select {
                    case results <- result:
                    case <-ctx.Done():
                        return
                    }
                }
            }
        }()
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    return results
}`,
          },
        ],
        mistakes: [
          "Leaving the result channel open after every worker has exited",
          "Letting producers enqueue unlimited work when consumers are slower",
          "Canceling the context but still blocking forever while sending a result",
        ],
        checks: [
          {
            question: "Who closes the result channel in a worker pool?",
            answer: "The coordinator that knows all sending workers have finished.",
          },
        ],
        exercises: [
          {
            title: "Add backpressure",
            prompt:
              "Build a fixed-size worker pool and make the producer block when the jobs channel is full.",
            goal: "Practice bounded concurrency instead of unbounded fan-out.",
          },
        ],
      },
    ],
  },
  {
    id: "runtime-performance",
    partId: "runtime",
    stage: "Module 09",
    level: "advanced",
    title: "Scheduler, Escape Analysis, GC, Profiling, and Memory Layout",
    summary:
      "Performance work starts with measurement and a concrete model of what the runtime, allocator, garbage collector, and CPU are doing.",
    prerequisites: ["Modules 01-08"],
    outcomes: [
      "Explain the M:P:G scheduler model",
      "Compare goroutine stack behavior with OS thread stack reservations",
      "Use benchmarks, pprof, and trace before optimizing",
      "Recognize layout, padding, and cache-line concerns",
    ],
    glossaryIds: [
      "scheduler",
      "goroutine-stack",
      "os-thread-stack",
      "escape-analysis",
      "cache-line",
    ],
    lessons: [
      {
        id: "runtime-model",
        title: "The Runtime Is Part of the Program",
        teachingGoal:
          "Connect goroutine scheduling, allocation, and profiling to real bottlenecks.",
        diagramIds: ["scheduler-mpg", "struct-padding"],
        explanation: [
          {
            paragraphs: [
              "The scheduler maps goroutines onto processors and operating system threads. Blocked goroutines park; runnable goroutines wait for execution; the netpoller wakes network work when it is ready.",
              "Struct layout and allocation behavior matter only when measurement shows they matter. Use benchmarks, allocation reports, pprof, and trace before trading clarity for speed.",
            ],
          },
        ],
        snippets: [
          {
            title: "Compare layout size",
            summary: "Use `unsafe.Sizeof` to verify, not guess.",
            code: `type BadLayout struct {
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
          },
        ],
        mistakes: [
          "Optimizing without a benchmark or profile",
          "Assuming atomics are automatically better than locks",
          "Using `unsafe` assumptions outside a small boundary",
        ],
        checks: [
          {
            question: "What should happen before performance-driven rewrites?",
            answer: "Measure with realistic benchmarks or profiles.",
          },
        ],
        exercises: [
          {
            title: "Benchmark a clone",
            prompt: "Write a benchmark that reports allocations while cloning a byte slice.",
            goal: "Attach performance decisions to measured allocation behavior.",
          },
        ],
      },
      {
        id: "measurement-loop",
        title: "Benchmark, Profile, Then Change",
        teachingGoal:
          "Use benchmarks, allocation reports, escape analysis, pprof, and trace before rewriting code.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "Escape analysis and garbage collection explain where allocations come from, but they are only useful when tied to a measured problem. Start with a benchmark or profile that represents the workload you care about.",
              "`pprof` shows CPU and heap behavior, `trace` shows scheduler and blocking behavior, and benchmark allocation reports show whether a change reduced allocation pressure. Use those tools before trading clear code for clever code.",
            ],
          },
        ],
        snippets: [
          {
            title: "Allocation-aware benchmark",
            summary: "Use `b.ReportAllocs` and the classic `b.N` loop for broad toolchain support.",
            code: `func BenchmarkCloneBytes(b *testing.B) {
    src := bytes.Repeat([]byte("go"), 512)
    b.ReportAllocs()

    for i := 0; i < b.N; i++ {
        dst := slices.Clone(src)
        _ = dst
    }
}`,
          },
          {
            title: "Profile commands",
            summary: "Collect evidence before changing data structures or synchronization.",
            code: `go test -bench=. -benchmem ./...
go test -bench=. -cpuprofile=cpu.out ./...
go tool pprof cpu.out
go test -run=TestName -trace=trace.out ./...`,
          },
        ],
        mistakes: [
          "Optimizing a path that does not appear in realistic profiles",
          "Reading escape analysis output without measuring whether the allocation matters",
          "Using `sync.Pool` before proving allocation churn is a bottleneck",
        ],
        checks: [
          {
            question: "Which tool should usually come before a performance rewrite?",
            answer: "A benchmark or profile that represents the real workload.",
          },
        ],
        exercises: [
          {
            title: "Profile before changing",
            prompt:
              "Benchmark a function that allocates, capture `-benchmem`, make one change, and explain the result with numbers.",
            goal: "Practice evidence-driven performance work.",
          },
        ],
      },
      {
        id: "goroutine-stack-economics",
        title: "Goroutine Stack Economics",
        teachingGoal:
          "Understand why goroutines are much cheaper than OS threads without treating them as free.",
        diagramIds: ["goroutine-stacks"],
        explanation: [
          {
            title: "Small, growable stacks",
            paragraphs: [
              "A goroutine starts with a small stack managed by the Go runtime. The runtime source defines a 2 KB minimum stack, and modern Go can use an adaptive starting stack size based on recent stack usage. When a goroutine needs more stack space, the runtime grows the stack by allocating a larger one and copying frames.",
              "That is very different from an OS thread stack, which is a platform-dependent reservation commonly measured in megabytes, often around 1 MB to 8 MB by default depending on the operating system, runtime, and thread attributes.",
            ],
          },
          {
            title: "Cheap does not mean free",
            paragraphs: [
              "This stack model is one reason Go can support many goroutines, but each goroutine still costs memory, scheduler work, and lifetime management. A leaked goroutine is still a leaked resource.",
              "The practical lesson is not to replace every loop with goroutines. Launch goroutines when work can overlap meaningfully and when you can explain how they stop.",
            ],
          },
        ],
        snippets: [
          {
            title: "Goroutines still need a stop path",
            summary: "Small stacks do not remove the need for cancellation and ownership.",
            code: `func worker(ctx context.Context, jobs <-chan Job) error {
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
        ],
        mistakes: [
          "Saying goroutines are free because their stacks are small",
          "Forgetting that stack sizes are runtime and platform details, not API contracts",
          "Comparing goroutines to OS threads only by memory and ignoring scheduling and shutdown",
        ],
        checks: [
          {
            question:
              "What is the runtime minimum goroutine stack size commonly cited from Go source?",
            answer: "2 KB, with modern adaptive starting behavior layered on top.",
          },
          {
            question: "Why are OS thread stacks usually more expensive?",
            answer:
              "They are platform-dependent stack reservations commonly measured in megabytes.",
          },
        ],
        exercises: [
          {
            title: "Find a leak",
            prompt:
              "Write a goroutine that blocks forever on a channel, then add context cancellation so it can exit.",
            goal: "Connect goroutine cheapness with explicit lifetime control.",
          },
        ],
      },
    ],
  },
  {
    id: "advanced-boundaries",
    partId: "runtime",
    stage: "Module 10",
    level: "advanced",
    title: "Reflection, Unsafe, Build Tags, cgo, and Production Boundaries",
    summary:
      "Advanced features are legitimate, but they should be isolated behind small APIs so most of the codebase remains ordinary Go.",
    prerequisites: ["Module 09"],
    outcomes: [
      "Use reflection for boundary code instead of business logic",
      "Contain unsafe assumptions",
      "Recognize build tag and cgo tradeoffs",
    ],
    glossaryIds: ["reflection", "unsafe", "build-tag", "cgo"],
    lessons: [
      {
        id: "advanced-fences",
        title: "Fence Off Sharp Tools",
        teachingGoal: "Use advanced features without letting them spread through the codebase.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "Reflection is useful for serializers, validators, and frameworks. `unsafe` is useful at narrow layout or interoperability edges. Build tags and cgo help with platform-specific and native integration work.",
              "The professional habit is containment: document the invariant, test the boundary, and expose simple typed functions to the rest of the program.",
            ],
          },
        ],
        snippets: [
          {
            title: "Build-tagged file",
            summary:
              "Keep the exported package API stable while swapping platform implementations.",
            code: `//go:build linux

package platform

func defaultSocketPath() string {
    return "/run/app.sock"
}`,
          },
        ],
        mistakes: [
          "Using reflection as a substitute for simple typed code",
          "Letting unsafe conversions leak across package boundaries",
          "Adding cgo without accounting for build and deployment cost",
        ],
        checks: [
          {
            question: "Where should unsafe code live?",
            answer: "Behind a small, documented, tested boundary.",
          },
        ],
        exercises: [
          {
            title: "Boundary wrapper",
            prompt:
              "Sketch an adapter package that hides a platform-specific implementation behind one exported function.",
            goal: "Practice containing advanced tools.",
          },
        ],
      },
      {
        id: "boundary-tools",
        title: "Reflection, Unsafe, and cgo Stay Small",
        teachingGoal:
          "Recognize the job each advanced tool can do and keep the rest of the program typed and ordinary.",
        diagramIds: [],
        explanation: [
          {
            paragraphs: [
              "Reflection is appropriate for boundary code such as serializers, validators, command mappers, and test helpers. It should not spread into business logic that could be plain typed code.",
              "`unsafe` and cgo are even narrower. Use them when layout, interoperability, or native integration requires it, then hide that requirement behind a documented package API and focused tests.",
            ],
          },
        ],
        snippets: [
          {
            title: "Reflection at a boundary",
            summary:
              "Inspect tags in one helper instead of passing reflect values through the program.",
            code: `func exportedFieldNames(value any) []string {
    typ := reflect.TypeOf(value)
    if typ.Kind() == reflect.Pointer {
        typ = typ.Elem()
    }

    names := make([]string, 0, typ.NumField())
    for index := 0; index < typ.NumField(); index++ {
        field := typ.Field(index)
        if field.IsExported() {
            names = append(names, field.Name)
        }
    }
    return names
}`,
          },
          {
            title: "Unsafe assumption behind a helper",
            summary: "Expose the checked result, not the low-level operation.",
            code: `func layoutReport[T any]() (size uintptr, align uintptr) {
    var zero T
    return unsafe.Sizeof(zero), unsafe.Alignof(zero)
}`,
          },
        ],
        mistakes: [
          "Passing `reflect.Value` through ordinary application code",
          "Using `unsafe` as a shortcut around a type design problem",
          "Adding cgo without accounting for cross-compilation and deployment constraints",
        ],
        checks: [
          {
            question: "What should callers see when a package uses unsafe internally?",
            answer:
              "A small typed API with the unsafe invariant documented and tested inside the package.",
          },
        ],
        exercises: [
          {
            title: "Fence a reflection helper",
            prompt:
              "Write a helper that reads struct tags, then keep all reflection inside that helper and test it directly.",
            goal: "Practice containing advanced boundary code.",
          },
        ],
      },
    ],
  },
];

export const glossary: GlossaryTerm[] = [
  { id: "address", term: "Address", definition: "A location where a value lives in memory." },
  {
    id: "backing-array",
    term: "Backing array",
    definition: "The storage a slice header points into.",
  },
  {
    id: "backpressure",
    term: "Backpressure",
    definition: "A limit that prevents producers from overwhelming consumers.",
  },
  {
    id: "build-tag",
    term: "Build tag",
    definition: "A file-level constraint that selects code for a target build.",
  },
  {
    id: "byte",
    term: "Byte",
    definition: "An alias for uint8, commonly used for raw string and file data.",
  },
  {
    id: "cache-line",
    term: "Cache line",
    definition: "A block of nearby memory the CPU reads together.",
  },
  {
    id: "cgo",
    term: "cgo",
    definition: "Go's bridge for calling C code, with build and portability costs.",
  },
  {
    id: "channel",
    term: "Channel",
    definition: "A typed conduit used to synchronize or transfer values between goroutines.",
  },
  {
    id: "context",
    term: "Context",
    definition: "A cancellation, deadline, and request-scoped metadata signal.",
  },
  {
    id: "defer",
    term: "defer",
    definition:
      "A statement that schedules a function call to run when the surrounding function returns.",
  },
  {
    id: "error-chain",
    term: "Error chain",
    definition: "A wrapped sequence of errors that preserves lower-level causes.",
  },
  {
    id: "escape-analysis",
    term: "Escape analysis",
    definition:
      "Compiler analysis that decides whether values can stay on stack or must move to heap.",
  },
  {
    id: "exported-name",
    term: "Exported name",
    definition: "An identifier visible outside its package because it starts uppercase.",
  },
  {
    id: "goroutine",
    term: "Goroutine",
    definition: "A lightweight function execution managed by the Go runtime.",
  },
  {
    id: "goroutine-stack",
    term: "Goroutine stack",
    definition:
      "A small growable stack managed by the Go runtime, with a 2 KB runtime minimum and adaptive starting behavior in modern Go.",
  },
  {
    id: "goroutine-leak",
    term: "Goroutine leak",
    definition: "A goroutine that remains blocked or running after its work no longer matters.",
  },
  {
    id: "interface-value",
    term: "Interface value",
    definition: "A runtime pair of dynamic type and dynamic value.",
  },
  {
    id: "iterator",
    term: "Iterator",
    definition:
      "A rangeable function shape that pushes zero, one, or two values through a callback.",
  },
  {
    id: "method-set",
    term: "Method set",
    definition: "The methods available on a type or pointer to that type.",
  },
  {
    id: "map-iteration-order",
    term: "Map iteration order",
    definition:
      "The unspecified order produced when ranging over a map; collect and sort keys when order matters.",
  },
  {
    id: "module",
    term: "Module",
    definition: "A versioned collection of Go packages with a `go.mod` file.",
  },
  {
    id: "mutex",
    term: "Mutex",
    definition: "A synchronization primitive that protects shared memory.",
  },
  {
    id: "nil",
    term: "nil",
    definition: "The zero value for pointers, slices, maps, channels, functions, and interfaces.",
  },
  {
    id: "operator-precedence",
    term: "Operator precedence",
    definition: "The fixed order that decides which operators bind first in an expression.",
  },
  {
    id: "os-thread-stack",
    term: "OS thread stack",
    definition: "A platform-dependent thread stack reservation commonly measured in megabytes.",
  },
  { id: "package", term: "Package", definition: "A named unit of Go code and visibility." },
  {
    id: "pointer",
    term: "Pointer",
    definition: "A value that stores the address of another value.",
  },
  {
    id: "race",
    term: "Race",
    definition: "Unsynchronized concurrent access where at least one access writes.",
  },
  { id: "reader", term: "Reader", definition: "An interface for streaming bytes from a source." },
  { id: "receiver", term: "Receiver", definition: "The value a method is attached to." },
  {
    id: "reflection",
    term: "Reflection",
    definition: "Runtime inspection and manipulation of values and types.",
  },
  {
    id: "rune",
    term: "Rune",
    definition: "An alias for int32, conventionally a Unicode code point.",
  },
  {
    id: "scheduler",
    term: "Scheduler",
    definition: "The runtime component that maps goroutines onto processors and OS threads.",
  },
  {
    id: "slice-header",
    term: "Slice header",
    definition: "The pointer, length, and capacity descriptor of a slice value.",
  },
  {
    id: "type-parameter",
    term: "Type parameter",
    definition: "A generic placeholder constrained by a type set or interface.",
  },
  {
    id: "unsafe",
    term: "unsafe",
    definition: "A package for operations outside Go's ordinary type and memory guarantees.",
  },
  {
    id: "unused-code-error",
    term: "Unused code error",
    definition:
      "Go rejects unused imports and unused local variables during compilation instead of treating them as warnings.",
  },
  {
    id: "writer",
    term: "Writer",
    definition: "An interface for streaming bytes to a destination.",
  },
  {
    id: "yield-pattern",
    term: "Yield pattern",
    definition:
      "The common iterator callback convention where an iterator calls a function usually named `yield` and stops when it returns false.",
  },
  {
    id: "zero-value",
    term: "Zero value",
    definition: "The default usable value Go gives a variable when no explicit value is provided.",
  },
];

export const cheatSheet: CheatSheetItem[] = [
  {
    title: "Program shell",
    note: "Executables use `package main` and `func main`.",
    code: `package main

func main() {
    fmt.Println("hello")
}`,
  },
  {
    title: "Unused names",
    note: "Unused imports and unused local variables are compilation errors, not warnings.",
    code: `import "strings" // error if unused

func main() {
    unused := 42 // error if unused
}`,
  },
  {
    title: "Pointers",
    note: "`&` gets an address. `*` dereferences a pointer.",
    code: `n := 42
p := &n
*p = 99`,
  },
  {
    title: "Slices",
    note: "Copying a slice copies a header, not the backing array.",
    code: `copyOfHeader := items
safeCopy := slices.Clone(items)`,
  },
  {
    title: "Map order",
    note: "Map iteration order is unspecified. Sort keys when stable output matters.",
    code: `keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}
slices.Sort(keys)`,
  },
  {
    title: "Iterator yield pattern",
    note: "`yield` is a callback parameter convention, not a keyword.",
    minGoVersion: "1.23",
    code: `func Count(yield func(int) bool) {
    for i := range 3 {
        if !yield(i) {
            return
        }
    }
}`,
  },
  {
    title: "Goroutine stacks",
    note: "Goroutines use small growable stacks; OS thread stacks are platform-dependent MB-scale reservations.",
    code: `go worker(ctx, jobs)

// Cheap does not mean free:
// always know how the goroutine stops.`,
  },
  {
    title: "Errors",
    note: "Wrap with `%w` when callers need the cause.",
    code: `return fmt.Errorf("read config: %w", err)`,
  },
  {
    title: "Channel handoff",
    note: "For unbuffered channels, arrange the receiver before the send.",
    code: `go func() { fmt.Println(<-done) }()
done <- "ok"`,
  },
  {
    title: "Context",
    note: "Pass cancellation through request-scoped work.",
    code: `select {
case <-ctx.Done():
    return ctx.Err()
}`,
  },
];
