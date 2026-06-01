export const runnableSnippetPrograms: Readonly<Record<string, string>> = {
  "Intentional ignore uses the blank identifier": `package main

import (
    "fmt"
    "strconv"
)

func readValue() error {
    value, _ := strconv.Atoi("42")
    fmt.Println(value)

    // Better when the error matters:
    value, err := strconv.Atoi("42")
    if err != nil {
        return err
    }
    fmt.Println(value)
    return nil
}

func main() {
    if err := readValue(); err != nil {
        fmt.Println(err)
    }
}`,
  "Bitwise and comparison": `package main

import "fmt"

func main() {
    flags := 0b1011
    mask := 0b0010
    retries := 1

    ready := (flags & mask) != 0
    cleared := flags &^ mask
    allowed := ready && retries < 3

    fmt.Println(ready, cleared, allowed)
}`,
  "Shift and boolean grouping": `package main

import "fmt"

func doWork() {
    fmt.Println("work")
}

func main() {
    n := 2
    shiftThenAdd := (1 << n) + 1
    shiftByNext := 1 << (n + 1)
    fmt.Println(shiftThenAdd, shiftByNext)

    a, b, c := false, true, true
    if a || (b && c) {
        doWork()
    }
}`,
  "Typed constants and switch": `package main

import "fmt"

type State int

const (
    StateUnknown State = iota
    StateReady
    StateRunning
)

func start() {
    fmt.Println("start")
}

func wait() {
    fmt.Println("wait")
}

func main() {
    state := StateReady

    switch state {
    case StateReady:
        start()
    default:
        wait()
    }
}`,
  "Byte length versus rune iteration": `package main

import "fmt"

func main() {
    text := "Go語"
    fmt.Println(len(text))

    for index, r := range text {
        fmt.Println(index, r, string(r))
    }
}`,
  "Multiple returns with early error handling": `package main

import (
    "fmt"
    "strconv"
)

func parsePort(input string) (int, error) {
    port, err := strconv.Atoi(input)
    if err != nil {
        return 0, fmt.Errorf("parse port %q: %w", input, err)
    }
    if port <= 0 || port > 65535 {
        return 0, fmt.Errorf("port out of range: %d", port)
    }
    return port, nil
}

func main() {
    for _, input := range []string{"8080", "70000"} {
        port, err := parsePort(input)
        fmt.Println(port, err)
    }
}`,
  "Closure over private state": `package main

import "fmt"

func counter() func() int {
    value := 0
    return func() int {
        value++
        return value
    }
}

func main() {
    next := counter()
    fmt.Println(next(), next(), next())
}`,
  "Aliasing and cloning": `package main

import (
    "fmt"
    "slices"
)

func main() {
    raw := []string{"go", "gin", "grpc"}
    window := raw[:2]
    window[0] = "gopher"

    safe := slices.Clone(window)
    safe[1] = "fiber"

    fmt.Println(raw)
    fmt.Println(window)
    fmt.Println(safe)
}`,
  "Map iteration order is unspecified": `package main

import "fmt"

func main() {
    scores := map[string]int{
        "go":    1,
        "map":   2,
        "range": 3,
    }

    for key, value := range scores {
        fmt.Println(key, value)
    }
}`,
  "Stable map output": `package main

import (
    "fmt"
    "slices"
)

func main() {
    scores := map[string]int{
        "go":    1,
        "map":   2,
        "range": 3,
    }

    keys := make([]string, 0, len(scores))
    for key := range scores {
        keys = append(keys, key)
    }

    slices.Sort(keys)

    for _, key := range keys {
        fmt.Println(key, scores[key])
    }
}`,
  "Missing key versus zero value": `package main

import "fmt"

func main() {
    scores := map[string]int{
        "go": 1,
    }

    count, ok := scores["missing"]
    if !ok {
        fmt.Println("no score")
    }
    fmt.Println(count) // 0, the zero value for int
}`,
  "Constructor protects invariants": `package main

import "fmt"

type Port struct {
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
}

func main() {
    port, err := NewPort(8080)
    fmt.Println(port.Value(), err)

    _, err = NewPort(-1)
    fmt.Println(err)
}`,
  "Array assignment copies elements": `package main

import "fmt"

func main() {
    a := [3]string{"go", "test", "ship"}
    b := a
    b[0] = "copy"

    fmt.Println(a[0]) // "go"
    fmt.Println(b[0]) // "copy"
}`,
  "Value copy versus pointer copy": `package main

import "fmt"

func doubleValue(n int) {
    n *= 2
}

func doublePointer(n *int) {
    *n *= 2
}

func main() {
    n := 10
    doubleValue(n)
    fmt.Println(n)

    doublePointer(&n)
    fmt.Println(n)
}`,
  "Nil pointer guard": `package main

import "fmt"

func main() {
    var p *int
    if p == nil {
        fmt.Println("no int yet")
    }
}`,
  "Value receiver for immutable behavior": `package main

import "fmt"

type Celsius float64

func (temperature Celsius) Fahrenheit() float64 {
    return float64(temperature)*9/5 + 32
}

func main() {
    fmt.Println(Celsius(100).Fahrenheit())
}`,
  "Pointer receiver for mutation": `package main

import "fmt"

type Counter struct {
    value int
}

func (counter *Counter) Inc() {
    counter.value++
}

func (counter Counter) Value() int {
    return counter.value
}

func main() {
    var counter Counter
    counter.Inc()
    fmt.Println(counter.Value())
}`,
  "Consumer-owned interface": `package main

import (
    "fmt"
    "time"
)

type Clock interface {
    Now() time.Time
}

func Expired(clock Clock, deadline time.Time) bool {
    return clock.Now().After(deadline)
}

type fixedClock struct {
    now time.Time
}

func (clock fixedClock) Now() time.Time {
    return clock.now
}

func main() {
    deadline := time.Date(2026, 6, 1, 12, 0, 0, 0, time.UTC)
    clock := fixedClock{now: deadline.Add(time.Second)}
    fmt.Println(Expired(clock, deadline))
}`,
  "Generic helper with a real purpose": `package main

import "fmt"

func Map[T any, U any](items []T, fn func(T) U) []U {
    out := make([]U, 0, len(items))
    for _, item := range items {
        out = append(out, fn(item))
    }
    return out
}

func main() {
    labels := Map([]int{1, 2, 3}, func(item int) string {
        return fmt.Sprintf("#%d", item)
    })
    fmt.Println(labels)
}`,
  "Push iterator function": `package main

import "fmt"

func Count(yield func(int) bool) {
    for i := range 3 {
        if !yield(i) {
            return
        }
    }
}

func main() {
    for value := range Count {
        fmt.Println(value)
    }
}`,
  "Named iterator type": `package main

import (
    "fmt"
    "iter"
)

func CountTo(n int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := range n {
            if !yield(i) {
                return
            }
        }
    }
}

func main() {
    for value := range CountTo(3) {
        fmt.Println(value)
    }
}`,
  "Wrap a lower-level failure": `package main

import (
    "errors"
    "fmt"
    "os"
)

func loadConfig(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("read config %q: %w", path, err)
    }
    if len(data) == 0 {
        return errors.New("empty config")
    }
    return nil
}

func main() {
    path := "/tmp/config.txt"
    _ = os.WriteFile(path, []byte("port=8080"), 0o644)
    fmt.Println(loadConfig(path))

    _ = os.WriteFile(path, nil, 0o644)
    fmt.Println(loadConfig(path))
}`,
  "Table test shell": `package main

import "testing"

func Add(a int, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
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
  "Stream JSON from a file": `package main

import (
    "encoding/json"
    "fmt"
    "os"
)

func load(path string) error {
    file, err := os.Open(path)
    if err != nil {
        return err
    }
    defer file.Close()

    var payload map[string]any
    if err := json.NewDecoder(file).Decode(&payload); err != nil {
        return err
    }
    fmt.Println(payload["name"])
    return nil
}

func main() {
    path := "/tmp/data.json"
    _ = os.WriteFile(path, []byte("{\\"name\\":\\"gopher\\"}"), 0o644)

    if err := load(path); err != nil {
        fmt.Println(err)
    }
}`,
  "HTTP client with request deadline": `package main

import (
    "context"
    "fmt"
    "net/http"
    "net/http/httptest"
    "time"
)

func fetch(r *http.Request, upstreamURL string) error {
    ctx, cancel := context.WithTimeout(r.Context(), 500*time.Millisecond)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, upstreamURL, nil)
    if err != nil {
        return err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    fmt.Println(resp.StatusCode)
    return nil
}

func main() {
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "ok")
    }))
    defer server.Close()

    request := httptest.NewRequest(http.MethodGet, "/", nil)
    if err := fetch(request, server.URL); err != nil {
        fmt.Println(err)
    }
}`,
  "Handler with structured logging": `package main

import (
    "context"
    "encoding/json"
    "fmt"
    "io"
    "log/slog"
    "net/http"
    "net/http/httptest"
)

type User struct {
    ID   string
    Name string
}

type UserStore interface {
    Find(context.Context, string) (User, error)
}

type memoryUsers map[string]User

func (users memoryUsers) Find(ctx context.Context, id string) (User, error) {
    user, ok := users[id]
    if !ok {
        return User{}, fmt.Errorf("missing user %s", id)
    }
    return user, nil
}

func handleUser(logger *slog.Logger, users UserStore) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        user, err := users.Find(r.Context(), r.PathValue("id"))
        if err != nil {
            logger.ErrorContext(r.Context(), "find user", "error", err)
            http.Error(w, "not found", http.StatusNotFound)
            return
        }

        _ = json.NewEncoder(w).Encode(user)
    }
}

func main() {
    logger := slog.New(slog.NewTextHandler(io.Discard, nil))
    users := memoryUsers{"42": {ID: "42", Name: "Ada"}}
    handler := handleUser(logger, users)

    request := httptest.NewRequest(http.MethodGet, "/users/42", nil)
    request.SetPathValue("id", "42")
    response := httptest.NewRecorder()

    handler.ServeHTTP(response, request)
    fmt.Print(response.Body.String())
}`,
  "Database call with caller lifetime": `package main

import (
    "context"
    "fmt"
)

type User struct {
    ID   string
    Name string
}

type Store struct {
    db fakeDB
}

type fakeDB struct{}

type fakeRow struct {
    user User
}

func (fakeDB) QueryRowContext(ctx context.Context, query string, args ...any) fakeRow {
    return fakeRow{user: User{ID: fmt.Sprint(args[0]), Name: "Ada"}}
}

func (row fakeRow) Scan(dest ...any) error {
    id := dest[0].(*string)
    name := dest[1].(*string)
    *id = row.user.ID
    *name = row.user.Name
    return nil
}

func (store Store) Find(ctx context.Context, id string) (User, error) {
    var user User
    err := store.db.QueryRowContext(
        ctx,
        "select id, name from users where id = ?",
        id,
    ).Scan(&user.ID, &user.Name)
    return user, err
}

func main() {
    user, err := (Store{db: fakeDB{}}).Find(context.Background(), "42")
    fmt.Println(user, err)
}`,
  "Start receiver before send": `package main

import "fmt"

func main() {
    results := make(chan int)
    done := make(chan struct{})

    go func() {
        defer close(done)
        fmt.Println(<-results)
    }()

    results <- 42
    <-done
}`,
  "Select with timeout and cancellation": `package main

import (
    "context"
    "errors"
    "fmt"
    "time"
)

func wait(ctx context.Context, results <-chan int) error {
    select {
    case result := <-results:
        fmt.Println(result)
    case <-ctx.Done():
        return ctx.Err()
    case <-time.After(500 * time.Millisecond):
        return errors.New("worker timeout")
    }
    return nil
}

func main() {
    results := make(chan int, 1)
    results <- 42

    if err := wait(context.Background(), results); err != nil {
        fmt.Println(err)
    }
}`,
  "Wait for workers and protect a map": `package main

import (
    "fmt"
    "sync"
)

func main() {
    var (
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

    wg.Wait()
    fmt.Println(hits["go"], hits["gopher"])
}`,
  "Worker loop that stops": `package main

import (
    "context"
    "fmt"
)

type Job string

func process(job Job) {
    fmt.Println(job)
}

func worker(ctx context.Context, jobs <-chan Job) error {
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
}

func main() {
    jobs := make(chan Job, 1)
    jobs <- "parse"
    close(jobs)

    fmt.Println(worker(context.Background(), jobs))
}`,
  "Bounded pool shell": `package main

import (
    "context"
    "fmt"
    "sync"
)

type Job int
type Result int

func process(job Job) Result {
    return Result(job * 2)
}

func runPool(ctx context.Context, jobs <-chan Job, workers int) <-chan Result {
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
}

func main() {
    jobs := make(chan Job)
    results := runPool(context.Background(), jobs, 2)

    go func() {
        defer close(jobs)
        for _, job := range []Job{1, 2, 3} {
            jobs <- job
        }
    }()

    for result := range results {
        fmt.Println(result)
    }
}`,
  "Compare layout size": `package main

import (
    "fmt"
    "unsafe"
)

type BadLayout struct {
    flag  bool
    total int64
    code  bool
}

type BetterLayout struct {
    total int64
    flag  bool
    code  bool
}

func main() {
    fmt.Println(unsafe.Sizeof(BadLayout{}), unsafe.Sizeof(BetterLayout{}))
}`,
  "Allocation-aware benchmark": `package main

import (
    "bytes"
    "fmt"
    "slices"
    "testing"
)

func BenchmarkCloneBytes(b *testing.B) {
    src := bytes.Repeat([]byte("go"), 512)
    b.ReportAllocs()

    for i := 0; i < b.N; i++ {
        dst := slices.Clone(src)
        _ = dst
    }
}

func main() {
    sample := testing.B{N: 5}
    BenchmarkCloneBytes(&sample)

    src := bytes.Repeat([]byte("go"), 512)
    allocs := testing.AllocsPerRun(10, func() {
        dst := slices.Clone(src)
        _ = dst
    })

    fmt.Println("sample iterations:", sample.N)
    fmt.Printf("%.0f allocs/run\\n", allocs)
}`,
  "Goroutines still need a stop path": `package main

import (
    "context"
    "fmt"
)

type Job string

func process(job Job) {
    fmt.Println(job)
}

func worker(ctx context.Context, jobs <-chan Job) error {
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
}

func main() {
    jobs := make(chan Job, 1)
    jobs <- "ship"
    close(jobs)

    fmt.Println(worker(context.Background(), jobs))
}`,
  "Build-tagged file": `//go:build linux

package main

import "fmt"

func defaultSocketPath() string {
    return "/run/app.sock"
}

func main() {
    fmt.Println(defaultSocketPath())
}`,
  "Reflection at a boundary": `package main

import (
    "fmt"
    "reflect"
)

func exportedFieldNames(value any) []string {
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
}

type User struct {
    ID    string
    name  string
    Email string
}

func main() {
    fmt.Println(exportedFieldNames(User{}))
    fmt.Println(exportedFieldNames(&User{}))
}`,
  "Unsafe assumption behind a helper": `package main

import (
    "fmt"
    "unsafe"
)

func layoutReport[T any]() (size uintptr, align uintptr) {
    var zero T
    return unsafe.Sizeof(zero), unsafe.Alignof(zero)
}

type Header struct {
    Flag  bool
    Total int64
}

func main() {
    size, align := layoutReport[Header]()
    fmt.Println(size, align)
}`,
};
