export const dsaRunnableSnippetPrograms: Readonly<Record<string, string>> = {
  "Budget the growing work": `package main

import "fmt"

func hasPairWithSum(values []int, target int) bool {
    seen := make(map[int]struct{}, len(values))
    for _, value := range values {
        if _, ok := seen[target-value]; ok {
            return true
        }
        seen[value] = struct{}{}
    }
    return false
}

func main() {
    fmt.Println(hasPairWithSum([]int{3, 7, 9, 11}, 16))
    fmt.Println(hasPairWithSum([]int{3, 7, 9, 11}, 20))
}`,
  "One scan can beat a clever index": `package main

import "fmt"

func maxValue(values []int) (int, bool) {
    if len(values) == 0 {
        return 0, false
    }
    best := values[0]
    for _, value := range values[1:] {
        if value > best {
            best = value
        }
    }
    return best, true
}

func main() {
    best, ok := maxValue([]int{4, 12, 8})
    fmt.Println(best, ok)
}`,
  "Slice delete keeps order": `package main

import "fmt"

func deleteAt(values []int, index int) []int {
    copy(values[index:], values[index+1:])
    return values[:len(values)-1]
}

func main() {
    values := []int{10, 20, 30, 40}
    fmt.Println(deleteAt(values, 1))
}`,
  "Linked node splice": `package main

import "fmt"

type node struct {
    value int
    next  *node
}

func insertAfter(current *node, value int) {
    current.next = &node{value: value, next: current.next}
}

func printList(head *node) {
    for current := head; current != nil; current = current.next {
        fmt.Print(current.value, " ")
    }
    fmt.Println()
}

func main() {
    head := &node{value: 1, next: &node{value: 3}}
    insertAfter(head, 2)
    printList(head)
}`,
  "Stack with a slice": `package main

import "fmt"

func main() {
    stack := []int{}
    stack = append(stack, 10)
    stack = append(stack, 20)

    top := stack[len(stack)-1]
    stack = stack[:len(stack)-1]

    fmt.Println(top, stack)
}`,
  "Queue with a head index": `package main

import "fmt"

type intQueue struct {
    values []int
    head   int
}

func (q *intQueue) Push(value int) {
    q.values = append(q.values, value)
}

func (q *intQueue) Pop() (int, bool) {
    if q.head == len(q.values) {
        return 0, false
    }
    value := q.values[q.head]
    q.head++
    return value, true
}

func main() {
    var q intQueue
    q.Push(10)
    q.Push(20)
    fmt.Println(q.Pop())
    fmt.Println(q.Pop())
    fmt.Println(q.Pop())
}`,
  "Lower bound search": `package main

import "fmt"

func lowerBound(values []int, target int) int {
    lo, hi := 0, len(values)
    for lo < hi {
        mid := lo + (hi-lo)/2
        if values[mid] < target {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
}

func main() {
    values := []int{2, 5, 8, 12, 16}
    fmt.Println(lowerBound(values, 10))
    fmt.Println(lowerBound(values, 12))
}`,
  "Search the answer space": `package main

import "fmt"

func minCapacity(low, high int, feasible func(int) bool) int {
    for low < high {
        mid := low + (high-low)/2
        if feasible(mid) {
            high = mid
        } else {
            low = mid + 1
        }
    }
    return low
}

func main() {
    needed := minCapacity(1, 20, func(capacity int) bool {
        return capacity*3 >= 17
    })
    fmt.Println(needed)
}`,
  "Sort then scan neighbors": `package main

import (
    "fmt"
    "slices"
)

func hasDuplicate(values []int) bool {
    slices.Sort(values)
    for i := 1; i < len(values); i++ {
        if values[i] == values[i-1] {
            return true
        }
    }
    return false
}

func main() {
    fmt.Println(hasDuplicate([]int{4, 1, 9, 4}))
}`,
  "Counting buckets for small keys": `package main

import "fmt"

func frequencies(scores []int) [101]int {
    var counts [101]int
    for _, score := range scores {
        counts[score]++
    }
    return counts
}

func main() {
    counts := frequencies([]int{90, 100, 90, 70})
    fmt.Println(counts[90], counts[100])
}`,
  "Two-sum in a sorted slice": `package main

import "fmt"

func twoSumSorted(values []int, target int) bool {
    left, right := 0, len(values)-1
    for left < right {
        sum := values[left] + values[right]
        switch {
        case sum == target:
            return true
        case sum < target:
            left++
        default:
            right--
        }
    }
    return false
}

func main() {
    fmt.Println(twoSumSorted([]int{1, 3, 4, 8, 12}, 11))
}`,
  "Longest window with bounded sum": `package main

import "fmt"

func longestAtMost(values []int, limit int) int {
    left, sum, best := 0, 0, 0
    for right, value := range values {
        sum += value
        for sum > limit {
            sum -= values[left]
            left++
        }
        best = max(best, right-left+1)
    }
    return best
}

func main() {
    fmt.Println(longestAtMost([]int{2, 1, 3, 2, 1}, 5))
}`,
  "Set with an empty struct value": `package main

import "fmt"

func uniqueWords(words []string) map[string]struct{} {
    seen := make(map[string]struct{}, len(words))
    for _, word := range words {
        seen[word] = struct{}{}
    }
    return seen
}

func main() {
    seen := uniqueWords([]string{"go", "map", "go"})
    _, ok := seen["go"]
    fmt.Println(len(seen), ok)
}`,
  "Group by key": `package main

import "fmt"

type File struct {
    Name  string
    Owner string
}

func groupByOwner(files []File) map[string][]File {
    groups := map[string][]File{}
    for _, file := range files {
        groups[file.Owner] = append(groups[file.Owner], file)
    }
    return groups
}

func main() {
    groups := groupByOwner([]File{{Name: "a.go", Owner: "lin"}, {Name: "b.go", Owner: "lin"}})
    fmt.Println(len(groups["lin"]))
}`,
  "Range sums from a prefix array": `package main

import "fmt"

func prefixSums(values []int) []int {
    prefix := make([]int, len(values)+1)
    for i, value := range values {
        prefix[i+1] = prefix[i] + value
    }
    return prefix
}

func rangeSum(prefix []int, left, right int) int {
    return prefix[right+1] - prefix[left]
}

func main() {
    prefix := prefixSums([]int{3, 1, 4, 2, 5})
    fmt.Println(rangeSum(prefix, 1, 3))
}`,
  "Frequency signature": `package main

import "fmt"

func lowercaseSignature(word string) [26]int {
    var counts [26]int
    for _, r := range word {
        counts[r-'a']++
    }
    return counts
}

func main() {
    signature := lowercaseSignature("goose")
    fmt.Println(signature['o'-'a'])
}`,
  "Depth-first tree size": `package main

import "fmt"

type treeNode struct {
    Value       int
    Left, Right *treeNode
}

func size(root *treeNode) int {
    if root == nil {
        return 0
    }
    return 1 + size(root.Left) + size(root.Right)
}

func main() {
    root := &treeNode{Value: 1, Left: &treeNode{Value: 2}, Right: &treeNode{Value: 3}}
    fmt.Println(size(root))
}`,
  "Breadth-first levels": `package main

import "fmt"

type treeNode struct {
    Value       int
    Left, Right *treeNode
}

func levels(root *treeNode) [][]int {
    if root == nil {
        return nil
    }
    queue := []*treeNode{root}
    result := [][]int{}
    for len(queue) > 0 {
        levelSize := len(queue)
        level := make([]int, 0, levelSize)
        for i := 0; i < levelSize; i++ {
            node := queue[0]
            queue = queue[1:]
            level = append(level, node.Value)
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        result = append(result, level)
    }
    return result
}

func main() {
    root := &treeNode{Value: 1, Left: &treeNode{Value: 2}, Right: &treeNode{Value: 3}}
    fmt.Println(levels(root))
}`,
  "Top-k with a small min-heap": `package main

import (
    "container/heap"
    "fmt"
    "slices"
)

type intMinHeap []int

func (h intMinHeap) Len() int           { return len(h) }
func (h intMinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h intMinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *intMinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *intMinHeap) Pop() any {
    old := *h
    x := old[len(old)-1]
    *h = old[:len(old)-1]
    return x
}

func topK(values []int, k int) []int {
    h := intMinHeap{}
    heap.Init(&h)
    for _, value := range values {
        heap.Push(&h, value)
        if h.Len() > k {
            heap.Pop(&h)
        }
    }
    return []int(h)
}

func main() {
    result := topK([]int{4, 10, 2, 8, 6}, 3)
    slices.Sort(result)
    fmt.Println(result)
}`,
  "Heap interface shell": `package main

import (
    "container/heap"
    "fmt"
)

type intMinHeap []int

func (h intMinHeap) Len() int           { return len(h) }
func (h intMinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h intMinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *intMinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *intMinHeap) Pop() any {
    old := *h
    x := old[len(old)-1]
    *h = old[:len(old)-1]
    return x
}

func main() {
    h := intMinHeap{}
    heap.Push(&h, 5)
    heap.Push(&h, 2)
    heap.Push(&h, 9)
    fmt.Println(heap.Pop(&h))
}`,
  "Adjacency list from edges": `package main

import "fmt"

func buildGraph(edges [][2]int, directed bool) map[int][]int {
    graph := map[int][]int{}
    for _, edge := range edges {
        a, b := edge[0], edge[1]
        graph[a] = append(graph[a], b)
        if !directed {
            graph[b] = append(graph[b], a)
        }
    }
    return graph
}

func main() {
    fmt.Println(buildGraph([][2]int{{1, 2}, {2, 3}}, false))
}`,
  "BFS distance in unweighted graph": `package main

import "fmt"

func distance(graph map[int][]int, start int) map[int]int {
    dist := map[int]int{start: 0}
    queue := []int{start}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, next := range graph[node] {
            if _, seen := dist[next]; seen {
                continue
            }
            dist[next] = dist[node] + 1
            queue = append(queue, next)
        }
    }
    return dist
}

func main() {
    graph := map[int][]int{1: {2, 3}, 2: {4}, 3: {4}}
    fmt.Println(distance(graph, 1))
}`,
  "Relax an edge": `package main

import "fmt"

func relax(dist map[int]int, from, to, weight int) bool {
    candidate := dist[from] + weight
    current, ok := dist[to]
    if !ok || candidate < current {
        dist[to] = candidate
        return true
    }
    return false
}

func main() {
    dist := map[int]int{1: 0, 2: 10}
    fmt.Println(relax(dist, 1, 2, 4), dist[2])
}`,
  "Union-find core": `package main

import "fmt"

type unionFind struct {
    parent []int
    size   []int
}

func newUnionFind(n int) *unionFind {
    uf := &unionFind{parent: make([]int, n), size: make([]int, n)}
    for i := range uf.parent {
        uf.parent[i] = i
        uf.size[i] = 1
    }
    return uf
}

func (uf *unionFind) Find(x int) int {
    if uf.parent[x] != x {
        uf.parent[x] = uf.Find(uf.parent[x])
    }
    return uf.parent[x]
}

func (uf *unionFind) Union(a, b int) bool {
    ra, rb := uf.Find(a), uf.Find(b)
    if ra == rb {
        return false
    }
    if uf.size[ra] < uf.size[rb] {
        ra, rb = rb, ra
    }
    uf.parent[rb] = ra
    uf.size[ra] += uf.size[rb]
    return true
}

func main() {
    uf := newUnionFind(5)
    fmt.Println(uf.Union(1, 2))
    fmt.Println(uf.Find(1) == uf.Find(2))
}`,
  "Greedy interval scheduling": `package main

import (
    "cmp"
    "fmt"
    "math"
    "slices"
)

type Interval struct {
    Start int
    End   int
}

func maxNonOverlapping(intervals []Interval) int {
    slices.SortFunc(intervals, func(a, b Interval) int {
        return cmp.Compare(a.End, b.End)
    })
    count, end := 0, math.MinInt
    for _, interval := range intervals {
        if interval.Start >= end {
            count++
            end = interval.End
        }
    }
    return count
}

func main() {
    meetings := []Interval{{Start: 0, End: 30}, {Start: 5, End: 10}, {Start: 10, End: 20}}
    fmt.Println(maxNonOverlapping(meetings))
}`,
  "One-dimensional DP": `package main

import "fmt"

func waysToClimb(n int) int {
    if n <= 1 {
        return 1
    }
    dp := make([]int, n+1)
    dp[0], dp[1] = 1, 1
    for step := 2; step <= n; step++ {
        dp[step] = dp[step-1] + dp[step-2]
    }
    return dp[n]
}

func main() {
    fmt.Println(waysToClimb(5))
}`,
  "Trie insert shell": `package main

import "fmt"

type trieNode struct {
    children map[rune]*trieNode
    word     bool
}

func (n *trieNode) Insert(word string) {
    current := n
    for _, r := range word {
        if current.children == nil {
            current.children = map[rune]*trieNode{}
        }
        if current.children[r] == nil {
            current.children[r] = &trieNode{}
        }
        current = current.children[r]
    }
    current.word = true
}

func (n *trieNode) Contains(word string) bool {
    current := n
    for _, r := range word {
        if current.children[r] == nil {
            return false
        }
        current = current.children[r]
    }
    return current.word
}

func main() {
    root := &trieNode{}
    root.Insert("go")
    fmt.Println(root.Contains("go"), root.Contains("gone"))
}`,
  "Topological ready queue": `package main

import "fmt"

func readyOrder(graph map[string][]string, indegree map[string]int) ([]string, bool) {
    queue := []string{}
    for node, degree := range indegree {
        if degree == 0 {
            queue = append(queue, node)
        }
    }
    order := []string{}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        order = append(order, node)
        for _, next := range graph[node] {
            indegree[next]--
            if indegree[next] == 0 {
                queue = append(queue, next)
            }
        }
    }
    return order, len(order) == len(indegree)
}

func main() {
    graph := map[string][]string{"parse": {"build"}, "build": {"test"}}
    indegree := map[string]int{"parse": 0, "build": 1, "test": 1}
    order, ok := readyOrder(graph, indegree)
    fmt.Println(order, ok)
}`,
};
