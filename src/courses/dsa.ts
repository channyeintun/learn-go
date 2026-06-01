import type {
  CheatSheetItem,
  CodeExample,
  CourseContent,
  CourseModule,
  CoursePart,
  DiagramAsset,
  GlossaryTerm,
} from "../courseTypes";
import { dsaRunnableSnippetPrograms } from "./dsaRunCode";

export const dsaCourseParts: CoursePart[] = [
  {
    id: "dsa-analysis-core",
    title: "Practical Analysis and Core Sequences",
    summary: "Use runtime budgets, arrays, lists, stacks, queues, binary search, and sorting.",
    moduleIds: ["dsa-analysis-sequences", "dsa-search-sort"],
  },
  {
    id: "dsa-indexing-trees",
    title: "Hashing, Trees, and Priority Queues",
    summary: "Build fast lookup tables, prefix summaries, tree traversals, and heap schedulers.",
    moduleIds: ["dsa-hashing-prefix", "dsa-trees-heaps"],
  },
  {
    id: "dsa-graphs-patterns",
    title: "Graphs and Advanced Problem Patterns",
    summary:
      "Solve traversal, shortest path, connectivity, greedy, dynamic programming, and index problems.",
    moduleIds: ["dsa-graphs-connectivity", "dsa-dp-greedy-advanced"],
  },
];

export const dsaDiagrams: DiagramAsset[] = [
  {
    id: "dsa-big-o-growth",
    title: "Growth Curves as Runtime Budgets",
    alt: "Hand-drawn chart comparing constant, logarithmic, linear, n log n, quadratic, and exponential growth against input size.",
    caption:
      "Big-O is most useful when it becomes a budget conversation about realistic input sizes.",
    transcript:
      "The diagram plots common growth curves and marks which ones stay practical as input size moves from hundreds to millions.",
  },
  {
    id: "dsa-array-list-ops",
    title: "Array Slice and Linked List Tradeoffs",
    alt: "Hand-drawn comparison of a contiguous array slice and pointer-linked nodes with lookup, insert, and scan notes.",
    caption:
      "Arrays and slices win on cache-friendly scans; linked lists win only when pointer splicing is the actual bottleneck.",
    transcript:
      "The diagram shows contiguous cells for a slice and separated nodes for a list. Labels compare indexing, appending, insertion, and traversal cost.",
  },
  {
    id: "dsa-stack-queue",
    title: "Stack Queue and Deque Ends",
    alt: "Hand-drawn boxes showing LIFO stack operations, FIFO queue operations, and a deque with both ends active.",
    caption: "Choose the structure by the end or ends that the workflow touches.",
    transcript:
      "The diagram labels push and pop on the same stack end, enqueue and dequeue on opposite queue ends, and a deque supporting both ends.",
  },
  {
    id: "dsa-binary-search-window",
    title: "Binary Search Window Invariant",
    alt: "Hand-drawn array with low, mid, and high markers narrowing around the first value that satisfies a predicate.",
    caption: "Binary search is a window invariant, not a memorized midpoint formula.",
    transcript:
      "The diagram starts with the whole sorted range, tests the midpoint, and keeps the half where the answer can still live.",
  },
  {
    id: "dsa-sort-tradeoffs",
    title: "Sorting Strategy Tradeoffs",
    alt: "Hand-drawn worksheet comparing full ordering, top-k heap selection, stable equal-key handling, and counting buckets.",
    caption:
      "Sorting choices depend on the real output requirement: full order, top-k, stable ties, or a small key range.",
    transcript:
      "The diagram has four panels. Full order sorts once and scans neighbors. Top-k keeps a heap of candidates. Equal keys need stable order. Small integer ranges can use counting buckets.",
  },
  {
    id: "dsa-two-pointers-window",
    title: "Two Pointers and Sliding Window",
    alt: "Hand-drawn sorted array with inward two pointers and a contiguous sliding window whose left and right boundaries move forward.",
    caption:
      "Two pointers and sliding windows are practical when boundary movement has a clear direction.",
    transcript:
      "The diagram compares two pointers moving inward on sorted values with a sliding window where each item enters once and leaves once.",
  },
  {
    id: "dsa-hash-collisions",
    title: "Hash Table Collisions and Load",
    alt: "Hand-drawn hash table buckets with keys colliding into one bucket and a resize arrow reducing load.",
    caption: "Hash maps are average O(1) when hashing spreads keys and the table controls load.",
    transcript:
      "The diagram shows keys passing through a hash function into buckets, collisions in one bucket, and resizing into a wider table.",
  },
  {
    id: "dsa-prefix-sums",
    title: "Prefix Sum Range Queries",
    alt: "Hand-drawn array and prefix array showing a range sum computed by subtracting two prefix values.",
    caption: "Precompute once when many range queries ask the same kind of question.",
    transcript:
      "The diagram labels values, cumulative prefix totals, and range sum left..right as prefix[right+1] minus prefix[left].",
  },
  {
    id: "dsa-tree-traversal",
    title: "Tree Traversal Orders",
    alt: "Hand-drawn binary tree with preorder, inorder, postorder, and breadth-first visit paths.",
    caption:
      "Traversal order is a promise about when a node is processed relative to its children.",
    transcript:
      "The diagram traces depth-first orders around a small binary tree and a breadth-first queue across levels.",
  },
  {
    id: "dsa-heap-invariant",
    title: "Heap Shape and Priority Invariant",
    alt: "Hand-drawn binary heap as a tree and array, with parent values ordered before children.",
    caption: "A heap gives fast access to the next priority item without fully sorting everything.",
    transcript:
      "The diagram connects heap tree positions to array indexes and marks the top as the smallest priority.",
  },
  {
    id: "dsa-graph-traversal",
    title: "BFS and DFS Frontier",
    alt: "Hand-drawn graph showing BFS expanding by layers and DFS following one path before backtracking.",
    caption:
      "The frontier data structure changes the traversal behavior: queue for BFS, stack or recursion for DFS.",
    transcript:
      "The diagram marks BFS layers from a start node and a DFS path that backtracks after reaching a dead end.",
  },
  {
    id: "dsa-shortest-path",
    title: "Dijkstra Relaxation Loop",
    alt: "Hand-drawn weighted graph with tentative distances, a priority queue, and edge relaxation updates.",
    caption:
      "Dijkstra repeatedly settles the cheapest known frontier node and relaxes outgoing edges.",
    transcript:
      "The diagram shows a source node, tentative distances beside nodes, a priority queue, and arrows updating cheaper paths.",
  },
  {
    id: "dsa-union-find",
    title: "Union Find Parent Forest",
    alt: "Hand-drawn disjoint-set forest with parent pointers, path compression, and union by size.",
    caption: "Union-find answers dynamic connectivity questions with near-constant practical cost.",
    transcript:
      "The diagram shows two parent trees, a union operation attaching the smaller tree, and find compressing a path to the root.",
  },
  {
    id: "dsa-dp-table",
    title: "Dynamic Programming Table",
    alt: "Hand-drawn grid where each cell depends on smaller neighboring subproblems.",
    caption: "DP is useful when overlapping subproblems can be named, stored, and reused.",
    transcript:
      "The diagram marks base cases along a table edge and arrows from previous cells into the current cell.",
  },
  {
    id: "dsa-trie-segment-tree",
    title: "Trie and Segment Tree Indexes",
    alt: "Hand-drawn trie for prefix lookup beside a segment tree for interval aggregation.",
    caption:
      "Advanced indexes are worth their complexity only when the workload repeatedly asks prefix or range questions.",
    transcript:
      "The diagram compares a trie path for word prefixes and a segment tree that answers range aggregate queries from covered intervals.",
  },
];

const dsaCourseModulesWithoutRunCode: CourseModule[] = [
  {
    id: "dsa-analysis-sequences",
    partId: "dsa-analysis-core",
    stage: "Module 01",
    level: "beginner",
    title: "Practical Complexity, Arrays, Lists, Stacks, and Queues",
    summary:
      "Start with the structures used in daily programming and learn to estimate cost from loops, growth, memory layout, and touched ends.",
    prerequisites: ["Comfort reading small Go functions"],
    outcomes: [
      "Turn input size into a practical runtime and memory budget",
      "Choose slices, lists, stacks, queues, and deques by operation pattern",
      "Recognize when an O(n) scan is better than a complex structure",
    ],
    glossaryIds: [
      "dsa-complexity",
      "dsa-input-size",
      "dsa-amortized-cost",
      "dsa-array",
      "dsa-linked-list",
      "dsa-stack",
      "dsa-queue",
    ],
    lessons: [
      {
        id: "dsa-complexity-budget",
        title: "Algorithm Analysis as a Runtime Budget",
        teachingGoal:
          "Use Big-O, constants, memory, and input size to decide whether an approach is practical.",
        diagramIds: ["dsa-big-o-growth"],
        explanation: [
          {
            title: "Start with the input, not the notation",
            paragraphs: [
              "Practical analysis asks how many items can appear, how often the operation runs, and what resource is tight. Big-O then becomes a budget language instead of a proof exercise.",
              "For a one-time job over 500 items, a clear O(n^2) loop may be fine. For a request path over 100000 items, the same shape can dominate latency. Constants, allocation, cache behavior, and I/O boundaries still matter.",
            ],
          },
          {
            title: "Count the loops that scale",
            paragraphs: [
              "Look for loops whose count grows with input. Nested loops over the same collection are a warning. Loops over fixed-size alphabets, small buckets, or capped retries often behave like constants in the real workload.",
              "Also count memory. An O(n) extra index can be a good trade when it turns repeated scans into lookups, but it is wasteful if you only ask one question once.",
            ],
          },
        ],
        snippets: [
          {
            title: "Budget the growing work",
            summary:
              "Count work that grows with the input, then compare it to the real input size.",
            code: `func hasPairWithSum(values []int, target int) bool {
    seen := make(map[int]struct{}, len(values))
    for _, value := range values {
        if _, ok := seen[target-value]; ok {
            return true
        }
        seen[value] = struct{}{}
    }
    return false
}`,
          },
          {
            title: "One scan can beat a clever index",
            summary: "Build an index only when the workload will reuse it.",
            code: `func maxValue(values []int) (int, bool) {
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
}`,
          },
        ],
        mistakes: [
          "Calling one approach faster without naming the input size and operation count",
          "Ignoring memory growth when an index duplicates the input",
          "Treating Big-O as a replacement for benchmarks on hot production paths",
        ],
        checks: [
          {
            question: "When is O(n^2) sometimes acceptable?",
            answer:
              "When n is small, the operation is rare, and the simpler code keeps the real system easier to maintain.",
          },
          {
            question: "What question should come before building an O(n) helper index?",
            answer:
              "Will the workload reuse that index enough to pay for the memory and build cost?",
          },
        ],
        exercises: [
          {
            title: "Estimate before coding",
            prompt:
              "For n = 1000 and n = 100000, compare a nested pair search with a hash-set pair search. Include memory cost.",
            goal: "Practice turning complexity into an engineering decision.",
          },
        ],
      },
      {
        id: "dsa-arrays-lists",
        title: "Arrays, Slices, and Linked Lists",
        teachingGoal:
          "Choose contiguous storage or linked nodes based on lookup, scan, and splice patterns.",
        diagramIds: ["dsa-array-list-ops"],
        explanation: [
          {
            paragraphs: [
              "A slice is the default sequence structure in Go. It is compact, cache-friendly, indexable, and works well with append. Most everyday lists should start as slices.",
              "A linked list removes element shifting when you already have the node to splice, but it gives up direct indexing and cache-friendly scans. In practice, that trade is narrower than many tutorials imply.",
            ],
          },
        ],
        snippets: [
          {
            title: "Slice delete keeps order",
            summary: "Deleting from the middle shifts the tail left.",
            code: `func deleteAt(values []int, index int) []int {
    copy(values[index:], values[index+1:])
    return values[:len(values)-1]
}`,
          },
          {
            title: "Linked node splice",
            summary: "A list splice is cheap only when you already hold the neighboring node.",
            code: `type node struct {
    value int
    next  *node
}

func insertAfter(current *node, value int) {
    current.next = &node{value: value, next: current.next}
}`,
          },
        ],
        mistakes: [
          "Choosing a linked list because inserts exist, without asking how you find the insertion point",
          "Forgetting that slice deletes may keep old references in the backing array",
          "Optimizing away O(n) movement before measuring whether it matters",
        ],
        checks: [
          {
            question: "Why do slices usually beat linked lists for scans?",
            answer: "Contiguous storage is cache-friendly and has no pointer chase per element.",
          },
        ],
        exercises: [
          {
            title: "Implement both deletes",
            prompt:
              "Delete an item from a slice and from a singly linked list, then write down how each finds the item.",
            goal: "Separate lookup cost from mutation cost.",
          },
        ],
      },
      {
        id: "dsa-stacks-queues",
        title: "Stacks, Queues, and Deques",
        teachingGoal: "Pick the structure that matches the workflow's active end or ends.",
        diagramIds: ["dsa-stack-queue"],
        explanation: [
          {
            paragraphs: [
              "A stack is last-in, first-out. It fits undo history, parsing, depth-first traversal, and matching delimiters. A queue is first-in, first-out. It fits breadth-first traversal, scheduling, and producer-consumer buffers.",
              "A deque touches both ends. It is useful for sliding-window maximums and monotonic queues, where removing old values and adding new values happen together.",
            ],
          },
        ],
        snippets: [
          {
            title: "Stack with a slice",
            summary: "The end of the slice is the cheap push and pop end.",
            code: `stack := []int{}
stack = append(stack, 10)
stack = append(stack, 20)

top := stack[len(stack)-1]
stack = stack[:len(stack)-1]`,
          },
          {
            title: "Queue with a head index",
            summary: "Avoid repeatedly shifting every element left.",
            code: `type intQueue struct {
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
}`,
          },
        ],
        mistakes: [
          "Using `values = values[1:]` forever without thinking about retained backing arrays",
          "Using a queue where a stack would naturally model backtracking",
          "Implementing a deque before a simple two-index queue is proven insufficient",
        ],
        checks: [
          {
            question: "Which structure does BFS usually need?",
            answer: "A queue, because BFS expands older frontier nodes before newer ones.",
          },
        ],
        exercises: [
          {
            title: "Validate brackets",
            prompt:
              "Use a stack to validate strings containing `()`, `[]`, and `{}`. Return the first invalid index.",
            goal: "Practice mapping a workflow to the active end of a structure.",
          },
        ],
      },
    ],
  },
  {
    id: "dsa-search-sort",
    partId: "dsa-analysis-core",
    stage: "Module 02",
    level: "beginner",
    title: "Binary Search, Sorting, Two Pointers, and Sliding Windows",
    summary:
      "Use order and contiguous windows to avoid unnecessary repeated scans in arrays and strings.",
    prerequisites: ["Module 01"],
    outcomes: [
      "Write binary search from a clear invariant",
      "Choose sorting, partial selection, or buckets by workload",
      "Use two-pointer and sliding-window patterns on ordered or contiguous data",
    ],
    glossaryIds: [
      "dsa-binary-search",
      "dsa-invariant",
      "dsa-stable-sort",
      "dsa-two-pointer",
      "dsa-sliding-window",
    ],
    lessons: [
      {
        id: "dsa-binary-search",
        title: "Binary Search Is an Invariant",
        teachingGoal: "Write lower-bound style binary search without off-by-one guessing.",
        diagramIds: ["dsa-binary-search-window"],
        explanation: [
          {
            paragraphs: [
              "Binary search works when the answer splits the input into false then true, or true then false. The implementation should preserve a window where the answer can still live.",
              "A practical pattern is half-open `[lo, hi)`: `lo` is still possible, `hi` is one past the last possible index. Each midpoint test removes a half that cannot contain the first true value.",
            ],
          },
        ],
        snippets: [
          {
            title: "Lower bound search",
            summary: "Find the first index whose value is at least target.",
            code: `func lowerBound(values []int, target int) int {
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
}`,
          },
          {
            title: "Search the answer space",
            summary: "Binary search can minimize a capacity when feasibility is monotonic.",
            code: `func minCapacity(low, high int, feasible func(int) bool) int {
    for low < high {
        mid := low + (high-low)/2
        if feasible(mid) {
            high = mid
        } else {
            low = mid + 1
        }
    }
    return low
}`,
          },
        ],
        mistakes: [
          "Using binary search on data that is not sorted or not monotonic",
          "Changing both bounds without preserving the meaning of the search window",
          "Computing a midpoint with a formula copied from memory instead of checking the invariant",
        ],
        checks: [
          {
            question: "What must be true before binary search is valid?",
            answer: "The predicate or data order must be monotonic across the searched range.",
          },
        ],
        exercises: [
          {
            title: "Find first bad build",
            prompt:
              "Given `isBad(version) bool`, return the first bad version using a half-open binary search.",
            goal: "Practice naming the invariant before writing the loop.",
          },
        ],
      },
      {
        id: "dsa-sorting-selection",
        title: "Sorting, Partial Selection, and Buckets",
        teachingGoal:
          "Avoid full sorting when the workload only needs a top-k, stable order, or small key range.",
        diagramIds: ["dsa-sort-tradeoffs"],
        explanation: [
          {
            paragraphs: [
              "Sorting is often the simplest good answer: it turns many problems into neighbor checks, merging, deduplication, or greedy passes. But full sorting is not always required.",
              "If you only need the largest k items, a heap can keep a small frontier. If keys are small integers, counting buckets can be linear. If equal keys must keep input order, stability matters more than raw comparison count.",
            ],
          },
        ],
        snippets: [
          {
            title: "Sort then scan neighbors",
            summary: "Sorting can turn repeated pair checks into one linear pass.",
            code: `func hasDuplicate(values []int) bool {
    slices.Sort(values)
    for i := 1; i < len(values); i++ {
        if values[i] == values[i-1] {
            return true
        }
    }
    return false
}`,
          },
          {
            title: "Counting buckets for small keys",
            summary: "A small bounded key range can remove comparison sorting.",
            code: `func frequencies(scores []int) [101]int {
    var counts [101]int
    for _, score := range scores {
        counts[score]++
    }
    return counts
}`,
          },
        ],
        mistakes: [
          "Sorting a whole collection when a top-k heap or single scan would answer the question",
          "Forgetting whether equal items must preserve their original order",
          "Using counting buckets when the key range is not actually bounded and small",
        ],
        checks: [
          {
            question: "When is a counting bucket attractive?",
            answer:
              "When keys are integers in a small known range and the range memory is acceptable.",
          },
        ],
        exercises: [
          {
            title: "Pick the strategy",
            prompt:
              "For full leaderboard, top 10 leaderboard, and score histogram, choose sort, heap, or buckets and explain the budget.",
            goal: "Practice matching the strategy to the actual question.",
          },
        ],
      },
      {
        id: "dsa-two-pointers-windows",
        title: "Two Pointers and Sliding Windows",
        teachingGoal:
          "Use moving boundaries when a sorted array or contiguous window lets each item enter and leave once.",
        diagramIds: ["dsa-two-pointers-window"],
        explanation: [
          {
            paragraphs: [
              "Two pointers work when movement is directional. On sorted data, moving the left or right pointer can make a sum smaller or larger without trying every pair.",
              "A sliding window works when the answer depends on a contiguous span. If each item enters and leaves the window once, the total work is linear even though there is a nested-looking loop.",
            ],
          },
        ],
        snippets: [
          {
            title: "Two-sum in a sorted slice",
            summary: "Move the side that can still improve the sum.",
            code: `func twoSumSorted(values []int, target int) bool {
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
}`,
          },
          {
            title: "Longest window with bounded sum",
            summary: "Each value enters and leaves the window at most once.",
            code: `func longestAtMost(values []int, limit int) int {
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
}`,
          },
        ],
        mistakes: [
          "Using two pointers when moving a pointer does not predictably improve the state",
          "Forgetting to remove the left item when a window shrinks",
          "Assuming every nested while loop is O(n^2) without counting item movement",
        ],
        checks: [
          {
            question: "Why is the sliding-window example O(n)?",
            answer:
              "Each index moves forward only; every item enters and leaves the window at most once.",
          },
        ],
        exercises: [
          {
            title: "Limit a window",
            prompt:
              "Find the shortest contiguous subarray with sum at least target for non-negative inputs.",
            goal: "Practice proving the window only moves forward.",
          },
        ],
      },
    ],
  },
  {
    id: "dsa-hashing-prefix",
    partId: "dsa-indexing-trees",
    stage: "Module 03",
    level: "intermediate",
    title: "Hash Tables, Sets, Prefix Sums, and Frequency Indexes",
    summary:
      "Trade memory for repeated lookup, membership, grouping, counting, and range-query speed.",
    prerequisites: ["Modules 01-02"],
    outcomes: [
      "Use maps and sets for membership, grouping, and counting",
      "Explain average hash-table cost and collision risk in practical terms",
      "Apply prefix sums when many range queries reuse the same input",
    ],
    glossaryIds: [
      "dsa-hash-table",
      "dsa-collision",
      "dsa-load-factor",
      "dsa-set",
      "dsa-prefix-sum",
      "dsa-frequency-map",
    ],
    lessons: [
      {
        id: "dsa-hash-tables",
        title: "Hash Tables and Sets",
        teachingGoal:
          "Use maps for fast average lookup without forgetting collisions, load, and key design.",
        diagramIds: ["dsa-hash-collisions"],
        explanation: [
          {
            paragraphs: [
              "A hash table maps a key through a hash function to storage buckets. With good hashing and controlled load, lookup, insert, and delete are average O(1). That is an average contract, not a magic guarantee.",
              "The practical work is choosing keys that represent equality correctly, avoiding mutation of key fields after insertion, and building the map only when repeated membership or grouping pays for the memory.",
            ],
          },
        ],
        snippets: [
          {
            title: "Set with an empty struct value",
            summary: "A Go map can represent membership directly.",
            code: `func uniqueWords(words []string) map[string]struct{} {
    seen := make(map[string]struct{}, len(words))
    for _, word := range words {
        seen[word] = struct{}{}
    }
    return seen
}`,
          },
          {
            title: "Group by key",
            summary: "Hash maps turn repeated grouping scans into one pass.",
            code: `func groupByOwner(files []File) map[string][]File {
    groups := map[string][]File{}
    for _, file := range files {
        groups[file.Owner] = append(groups[file.Owner], file)
    }
    return groups
}`,
          },
        ],
        mistakes: [
          "Building a map for a single tiny scan where a slice would be clearer",
          "Using a key that does not match the real equality rule",
          "Assuming hash-table average O(1) removes the need to think about memory",
        ],
        checks: [
          {
            question: "What do collisions mean for a hash table?",
            answer:
              "Different keys landed in the same bucket or probe path, so the table needs a collision-resolution strategy.",
          },
        ],
        exercises: [
          {
            title: "Deduplicate and count",
            prompt:
              "Given a slice of events, return unique users and a count per user. Explain when the map memory is worth it.",
            goal: "Practice lookup, membership, and counting as one-pass indexes.",
          },
        ],
      },
      {
        id: "dsa-prefix-frequency",
        title: "Prefix Sums and Frequency Maps",
        teachingGoal:
          "Precompute reusable summaries when many queries ask the same kind of question.",
        diagramIds: ["dsa-prefix-sums"],
        explanation: [
          {
            paragraphs: [
              "A prefix sum stores the cumulative total before each index. Once built, a range sum is one subtraction. This is useful when there are many range queries over mostly unchanged data.",
              "Frequency maps do the same kind of trade for counts. They make repeated count and anagram-style questions cheap after a single pass over the input.",
            ],
          },
        ],
        snippets: [
          {
            title: "Range sums from a prefix array",
            summary: "Use one extra leading zero so ranges are easy to subtract.",
            code: `func prefixSums(values []int) []int {
    prefix := make([]int, len(values)+1)
    for i, value := range values {
        prefix[i+1] = prefix[i] + value
    }
    return prefix
}

func rangeSum(prefix []int, left, right int) int {
    return prefix[right+1] - prefix[left]
}`,
          },
          {
            title: "Frequency signature",
            summary: "A fixed alphabet count can be a compact grouping key.",
            code: `func lowercaseSignature(word string) [26]int {
    var counts [26]int
    for _, r := range word {
        counts[r-'a']++
    }
    return counts
}`,
          },
        ],
        mistakes: [
          "Using prefix sums when the underlying data changes after every query",
          "Forgetting the leading zero and creating off-by-one range formulas",
          "Using a fixed alphabet signature on input that can contain other characters",
        ],
        checks: [
          {
            question: "Why does the prefix array have length `len(values)+1`?",
            answer:
              "The leading zero lets the sum of `[left, right]` be `prefix[right+1] - prefix[left]`.",
          },
        ],
        exercises: [
          {
            title: "Many range questions",
            prompt:
              "Build prefix sums for daily revenue and answer 10 date-range totals without rescanning the raw slice.",
            goal: "Practice paying one preprocessing cost for many queries.",
          },
        ],
      },
    ],
  },
  {
    id: "dsa-trees-heaps",
    partId: "dsa-indexing-trees",
    stage: "Module 04",
    level: "intermediate",
    title: "Trees, Traversals, Binary Search Trees, and Heaps",
    summary:
      "Use hierarchy, ordered search, and priority queues for nested data and next-best selection.",
    prerequisites: ["Modules 01-03"],
    outcomes: [
      "Choose traversal order by when a node should be processed",
      "Use binary search tree invariants where ordered lookup matters",
      "Use heaps for priority scheduling and top-k problems",
    ],
    glossaryIds: ["dsa-tree", "dsa-traversal", "dsa-bst", "dsa-heap", "dsa-priority-queue"],
    lessons: [
      {
        id: "dsa-tree-traversals",
        title: "Trees and Traversal Orders",
        teachingGoal: "Pick preorder, inorder, postorder, or BFS based on the processing contract.",
        diagramIds: ["dsa-tree-traversal"],
        explanation: [
          {
            paragraphs: [
              "A tree models containment or hierarchy: files, DOM nodes, organization charts, parse trees, and decision paths. The traversal order determines when parent and child work happens.",
              "Preorder handles a node before children. Postorder handles children before the parent. Inorder is special for binary search trees because it visits keys in sorted order. BFS visits by levels.",
            ],
          },
        ],
        snippets: [
          {
            title: "Depth-first tree size",
            summary:
              "Postorder naturally computes a value from children before returning to the parent.",
            code: `type treeNode struct {
    Value       int
    Left, Right *treeNode
}

func size(root *treeNode) int {
    if root == nil {
        return 0
    }
    return 1 + size(root.Left) + size(root.Right)
}`,
          },
          {
            title: "Breadth-first levels",
            summary: "A queue visits shallow nodes before deeper nodes.",
            code: `func levels(root *treeNode) [][]int {
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
}`,
          },
        ],
        mistakes: [
          "Using recursion on trees without considering worst-case height",
          "Assuming inorder is meaningful for non-BST trees",
          "Using BFS when the task requires child summaries before parent work",
        ],
        checks: [
          {
            question: "Which traversal is natural for deleting a tree bottom-up?",
            answer: "Postorder, because children are handled before the parent.",
          },
        ],
        exercises: [
          {
            title: "Pick traversal by task",
            prompt:
              "For printing folders, computing directory size, and finding the shallowest match, choose preorder, postorder, or BFS.",
            goal: "Practice linking traversal order to a concrete workflow.",
          },
        ],
      },
      {
        id: "dsa-heaps-priority",
        title: "Heaps and Priority Queues",
        teachingGoal: "Use a heap when you repeatedly need the next smallest or largest item.",
        diagramIds: ["dsa-heap-invariant"],
        explanation: [
          {
            paragraphs: [
              "A heap keeps a weak order: the root is the next priority item, but the rest is not fully sorted. That weak order is exactly why push and pop can be O(log n).",
              "Heaps are common in schedulers, top-k reports, merge-k sorted streams, and shortest-path algorithms. Use them when repeated next-best selection matters more than full ordering.",
            ],
          },
        ],
        snippets: [
          {
            title: "Top-k with a small min-heap",
            summary: "Keep only k candidates instead of sorting the full input.",
            code: `func topK(values []int, k int) []int {
    h := intMinHeap{}
    heap.Init(&h)
    for _, value := range values {
        heap.Push(&h, value)
        if h.Len() > k {
            heap.Pop(&h)
        }
    }
    return []int(h)
}`,
          },
          {
            title: "Heap interface shell",
            summary: "Go's heap package asks you to define the ordering operations.",
            code: `type intMinHeap []int

func (h intMinHeap) Len() int           { return len(h) }
func (h intMinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h intMinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *intMinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *intMinHeap) Pop() any {
    old := *h
    x := old[len(old)-1]
    *h = old[:len(old)-1]
    return x
}`,
          },
        ],
        mistakes: [
          "Using a heap when a single max scan would answer one query",
          "Expecting heap array order to be sorted",
          "Forgetting that the comparison defines min-heap versus max-heap behavior",
        ],
        checks: [
          {
            question: "What does a heap guarantee about its root?",
            answer: "The root is the next item according to the heap's priority order.",
          },
        ],
        exercises: [
          {
            title: "Keep the busiest k",
            prompt:
              "Given server request counts, keep the k highest counts without sorting every server.",
            goal: "Practice partial selection with bounded memory.",
          },
        ],
      },
    ],
  },
  {
    id: "dsa-graphs-connectivity",
    partId: "dsa-graphs-patterns",
    stage: "Module 05",
    level: "advanced",
    title: "Graphs, Traversal, Shortest Paths, and Connectivity",
    summary:
      "Model relationships explicitly, then choose queues, recursion, heaps, or union-find based on the question.",
    prerequisites: ["Modules 01-04"],
    outcomes: [
      "Represent graphs with adjacency lists and clear directionality",
      "Choose BFS, DFS, Dijkstra, or union-find by the operation needed",
      "Avoid revisiting nodes and control graph memory growth",
    ],
    glossaryIds: [
      "dsa-graph",
      "dsa-adjacency-list",
      "dsa-bfs",
      "dsa-dfs",
      "dsa-dijkstra",
      "dsa-union-find",
    ],
    lessons: [
      {
        id: "dsa-bfs-dfs",
        title: "Graph Representation, BFS, and DFS",
        teachingGoal: "Use the frontier structure to control traversal order and visited state.",
        diagramIds: ["dsa-graph-traversal"],
        explanation: [
          {
            paragraphs: [
              "A graph is a set of nodes and edges. The first practical choice is representation: adjacency lists are usually best for sparse graphs, while matrices are only attractive when the graph is dense or edge existence is the constant-time question.",
              "BFS uses a queue and discovers shortest unweighted path lengths by layers. DFS uses recursion or a stack and is useful for reachability, components, cycle checks, and topological work.",
            ],
          },
        ],
        snippets: [
          {
            title: "Adjacency list from edges",
            summary: "Make direction explicit when building the graph.",
            code: `func buildGraph(edges [][2]int, directed bool) map[int][]int {
    graph := map[int][]int{}
    for _, edge := range edges {
        a, b := edge[0], edge[1]
        graph[a] = append(graph[a], b)
        if !directed {
            graph[b] = append(graph[b], a)
        }
    }
    return graph
}`,
          },
          {
            title: "BFS distance in unweighted graph",
            summary: "The first time BFS sees a node is the shortest edge count from the source.",
            code: `func distance(graph map[int][]int, start int) map[int]int {
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
}`,
          },
        ],
        mistakes: [
          "Forgetting to mark visited nodes before they are enqueued repeatedly",
          "Using DFS for shortest paths in an unweighted graph when BFS gives the distance directly",
          "Building an adjacency matrix for a sparse graph with millions of possible node pairs",
        ],
        checks: [
          {
            question: "Why does BFS find shortest paths in an unweighted graph?",
            answer: "It explores all nodes at distance k before any node at distance k+1.",
          },
        ],
        exercises: [
          {
            title: "Count components",
            prompt:
              "Given undirected edges, count connected components using either BFS or DFS and a visited set.",
            goal: "Practice graph representation and visited-state ownership.",
          },
        ],
      },
      {
        id: "dsa-shortest-path-connectivity",
        title: "Dijkstra and Union-Find",
        teachingGoal:
          "Use Dijkstra for weighted shortest paths and union-find for dynamic connectivity.",
        diagramIds: ["dsa-shortest-path", "dsa-union-find"],
        explanation: [
          {
            paragraphs: [
              "When edges have non-negative weights, BFS no longer measures cost. Dijkstra keeps a priority queue of cheapest tentative nodes and relaxes edges from the cheapest unsettled frontier.",
              "Union-find answers a different question: are two items in the same connected component as edges are added? It does not list the path, but it is extremely practical for connectivity, clustering, and Kruskal-style minimum spanning tree work.",
            ],
          },
        ],
        snippets: [
          {
            title: "Relax an edge",
            summary: "A cheaper path replaces the previous tentative distance.",
            code: `func relax(dist map[int]int, from, to, weight int) bool {
    candidate := dist[from] + weight
    current, ok := dist[to]
    if !ok || candidate < current {
        dist[to] = candidate
        return true
    }
    return false
}`,
          },
          {
            title: "Union-find core",
            summary: "Path compression keeps future finds short.",
            code: `type unionFind struct {
    parent []int
    size   []int
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
}`,
          },
        ],
        mistakes: [
          "Using Dijkstra with negative edges",
          "Using union-find when the task needs the actual path, not just same-component answers",
          "Forgetting to discard stale priority-queue entries in a Dijkstra implementation",
        ],
        checks: [
          {
            question: "What edge-weight condition does Dijkstra require?",
            answer: "Non-negative edge weights.",
          },
        ],
        exercises: [
          {
            title: "Choose the graph tool",
            prompt:
              "For friend circles, cheapest shipping route, and shortest number of clicks, choose union-find, Dijkstra, or BFS.",
            goal: "Practice matching the graph question to the algorithm.",
          },
        ],
      },
    ],
  },
  {
    id: "dsa-dp-greedy-advanced",
    partId: "dsa-graphs-patterns",
    stage: "Module 06",
    level: "advanced",
    title: "Greedy Decisions, Dynamic Programming, Tries, and Segment Trees",
    summary:
      "Use advanced patterns only when the workload has the structure they exploit: local choice, overlapping subproblems, prefixes, or repeated ranges.",
    prerequisites: ["Modules 01-05"],
    outcomes: [
      "Recognize when a greedy choice is safe enough to rely on",
      "Build dynamic programming state from reusable subproblems",
      "Use tries and segment trees for repeated prefix and range workloads",
    ],
    glossaryIds: [
      "dsa-greedy",
      "dsa-dp",
      "dsa-state",
      "dsa-trie",
      "dsa-segment-tree",
      "dsa-topological-order",
    ],
    lessons: [
      {
        id: "dsa-greedy-dp",
        title: "Greedy and Dynamic Programming",
        teachingGoal:
          "Separate local-choice problems from overlapping-subproblem problems before coding.",
        diagramIds: ["dsa-dp-table"],
        explanation: [
          {
            paragraphs: [
              "A greedy algorithm commits to a local choice and never revisits it. That is practical when the problem structure makes the local choice safe, such as picking earliest finishing intervals for maximum non-overlapping meetings.",
              "Dynamic programming is useful when the same subproblems appear repeatedly. The key is naming state that is small enough to store and rich enough to answer the next transition.",
            ],
          },
        ],
        snippets: [
          {
            title: "Greedy interval scheduling",
            summary: "Earliest finish leaves the most room for later compatible intervals.",
            code: `func maxNonOverlapping(intervals []Interval) int {
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
}`,
          },
          {
            title: "One-dimensional DP",
            summary: "Each state reuses smaller states instead of recomputing them.",
            code: `func waysToClimb(n int) int {
    if n <= 1 {
        return 1
    }
    dp := make([]int, n+1)
    dp[0], dp[1] = 1, 1
    for step := 2; step <= n; step++ {
        dp[step] = dp[step-1] + dp[step-2]
    }
    return dp[n]
}`,
          },
        ],
        mistakes: [
          "Calling an algorithm greedy just because it picks something first",
          "Writing recursive DP without bounding the number of states",
          "Adding a DP table when a pair of rolling variables would preserve the same state",
        ],
        checks: [
          {
            question: "What makes DP practical?",
            answer: "A bounded set of reusable states and transitions that avoid repeated work.",
          },
        ],
        exercises: [
          {
            title: "Name the state",
            prompt:
              "For coin change, longest increasing subsequence, and meeting scheduling, decide whether the first tool should be DP or greedy.",
            goal: "Practice classifying problem shape before choosing an implementation.",
          },
        ],
      },
      {
        id: "dsa-advanced-indexes",
        title: "Tries, Segment Trees, and Topological Order",
        teachingGoal:
          "Use specialized structures when repeated prefix, range, or dependency queries justify the setup cost.",
        diagramIds: ["dsa-trie-segment-tree"],
        explanation: [
          {
            paragraphs: [
              "A trie indexes strings by prefix. It is useful for autocomplete, dictionary lookup, and routing tables when prefix queries happen repeatedly.",
              "A segment tree indexes ranges so updates and range queries can both be logarithmic. Topological order solves dependency workflows where directed edges must be respected before work can run.",
            ],
          },
        ],
        snippets: [
          {
            title: "Trie insert shell",
            summary: "Each edge consumes one character of the prefix.",
            code: `type trieNode struct {
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
}`,
          },
          {
            title: "Topological ready queue",
            summary:
              "Nodes with no remaining prerequisites are ready; a short result means a cycle blocked progress.",
            code: `func readyOrder(graph map[string][]string, indegree map[string]int) ([]string, bool) {
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
}`,
          },
        ],
        mistakes: [
          "Using a trie for a handful of exact lookups that a map handles cleanly",
          "Using a segment tree when the data is static and prefix sums answer the range query",
          "Ignoring cycles in dependency graphs before trusting topological output",
        ],
        checks: [
          {
            question: "When is a trie more attractive than a map?",
            answer: "When prefix queries are a core repeated operation, not just exact-key lookup.",
          },
        ],
        exercises: [
          {
            title: "Choose the index",
            prompt:
              "For autocomplete, daily sales range totals with updates, and build task dependencies, choose trie, segment tree, or topological sort.",
            goal: "Practice paying complexity only for repeated workload shape.",
          },
        ],
      },
    ],
  },
];

export const dsaCourseModules = attachRunnableSnippetPrograms(dsaCourseModulesWithoutRunCode);

function attachRunnableSnippetPrograms(modules: CourseModule[]): CourseModule[] {
  return modules.map((courseModule) => ({
    ...courseModule,
    lessons: courseModule.lessons.map((lesson) => ({
      ...lesson,
      snippets: lesson.snippets.map(attachRunnableSnippetProgram),
    })),
  }));
}

function attachRunnableSnippetProgram(snippet: CodeExample): CodeExample {
  const runCode = dsaRunnableSnippetPrograms[snippet.title];
  if (!runCode) {
    throw new Error(`Missing runnable DSA snippet program for "${snippet.title}".`);
  }

  return {
    ...snippet,
    runCode,
  };
}

export const dsaGlossary: GlossaryTerm[] = [
  {
    id: "dsa-adjacency-list",
    term: "Adjacency list",
    definition: "A graph representation that stores each node's outgoing neighbors.",
  },
  {
    id: "dsa-amortized-cost",
    term: "Amortized cost",
    definition:
      "Average cost over a sequence of operations, useful for growth events such as slice append.",
  },
  {
    id: "dsa-array",
    term: "Array or slice",
    definition: "Contiguous indexed storage; in Go, slices are the everyday dynamic sequence.",
  },
  {
    id: "dsa-bfs",
    term: "BFS",
    definition:
      "Breadth-first search; queue-based traversal that expands an unweighted graph by layers.",
  },
  {
    id: "dsa-binary-search",
    term: "Binary search",
    definition: "A logarithmic search over sorted data or a monotonic answer space.",
  },
  {
    id: "dsa-bst",
    term: "Binary search tree",
    definition: "A binary tree whose left and right subtrees preserve key ordering.",
  },
  {
    id: "dsa-collision",
    term: "Collision",
    definition: "Two different keys landing in the same hash-table bucket or probe path.",
  },
  {
    id: "dsa-complexity",
    term: "Complexity",
    definition: "How runtime or memory grows as input size grows.",
  },
  {
    id: "dsa-dfs",
    term: "DFS",
    definition:
      "Depth-first search; stack or recursion-based traversal that follows a path before backtracking.",
  },
  {
    id: "dsa-dijkstra",
    term: "Dijkstra",
    definition: "A shortest-path algorithm for graphs with non-negative edge weights.",
  },
  {
    id: "dsa-dp",
    term: "Dynamic programming",
    definition: "A method that stores reusable subproblem results to avoid repeated work.",
  },
  {
    id: "dsa-frequency-map",
    term: "Frequency map",
    definition: "A map from item to count, often built in one pass.",
  },
  {
    id: "dsa-graph",
    term: "Graph",
    definition: "Nodes connected by directed or undirected edges.",
  },
  {
    id: "dsa-greedy",
    term: "Greedy algorithm",
    definition: "An algorithm that commits to a local choice and does not revisit it.",
  },
  {
    id: "dsa-hash-table",
    term: "Hash table",
    definition: "A key/value structure that uses a hash function to choose storage locations.",
  },
  {
    id: "dsa-heap",
    term: "Heap",
    definition: "A priority structure whose root is the next item according to the heap order.",
  },
  {
    id: "dsa-input-size",
    term: "Input size",
    definition: "The part of the workload that can grow and drive runtime or memory cost.",
  },
  {
    id: "dsa-invariant",
    term: "Invariant",
    definition: "A condition the algorithm keeps true before and after each loop step.",
  },
  {
    id: "dsa-linked-list",
    term: "Linked list",
    definition: "A sequence of nodes connected by pointers rather than contiguous storage.",
  },
  {
    id: "dsa-load-factor",
    term: "Load factor",
    definition: "How full a hash table is relative to its bucket capacity.",
  },
  {
    id: "dsa-prefix-sum",
    term: "Prefix sum",
    definition: "A cumulative summary that answers range sums by subtraction.",
  },
  {
    id: "dsa-priority-queue",
    term: "Priority queue",
    definition: "A structure that repeatedly returns the next item by priority.",
  },
  {
    id: "dsa-queue",
    term: "Queue",
    definition: "First-in, first-out structure, commonly used for BFS and work scheduling.",
  },
  {
    id: "dsa-segment-tree",
    term: "Segment tree",
    definition: "A tree over ranges that supports range queries and updates in logarithmic time.",
  },
  {
    id: "dsa-set",
    term: "Set",
    definition: "A membership collection where values are present or absent.",
  },
  {
    id: "dsa-sliding-window",
    term: "Sliding window",
    definition: "A contiguous range whose boundaries move forward while maintaining a condition.",
  },
  {
    id: "dsa-stack",
    term: "Stack",
    definition: "Last-in, first-out structure, commonly used for parsing and backtracking.",
  },
  {
    id: "dsa-stable-sort",
    term: "Stable sort",
    definition: "A sort that preserves the original order of equal keys.",
  },
  {
    id: "dsa-state",
    term: "State",
    definition: "The named subproblem information a DP transition needs.",
  },
  {
    id: "dsa-topological-order",
    term: "Topological order",
    definition: "An ordering of directed acyclic graph nodes where prerequisites appear first.",
  },
  {
    id: "dsa-traversal",
    term: "Traversal",
    definition: "A systematic visit order through a tree or graph.",
  },
  {
    id: "dsa-tree",
    term: "Tree",
    definition: "A hierarchical structure with parent and child relationships and no cycles.",
  },
  {
    id: "dsa-trie",
    term: "Trie",
    definition: "A prefix tree for repeated string-prefix operations.",
  },
  {
    id: "dsa-two-pointer",
    term: "Two pointers",
    definition: "A pattern that moves two indexes through ordered or bounded data.",
  },
  {
    id: "dsa-union-find",
    term: "Union-find",
    definition: "A disjoint-set structure for dynamic connectivity queries.",
  },
];

export const dsaCheatSheet: CheatSheetItem[] = [
  {
    title: "Complexity budget",
    note: "Name the input size, operation count, and memory trade before choosing an algorithm.",
    code: `// One query: scan may be best.
// Many queries: build an index if reuse pays for memory.`,
  },
  {
    title: "Lower bound",
    note: "Use a half-open window for the first index satisfying a monotonic predicate.",
    code: `lo, hi := 0, len(values)
for lo < hi {
    mid := lo + (hi-lo)/2
    if values[mid] < target {
        lo = mid + 1
    } else {
        hi = mid
    }
}`,
  },
  {
    title: "Hash set",
    note: "Use a map when repeated membership lookup is worth the memory.",
    code: `seen := map[string]struct{}{}
seen[id] = struct{}{}
_, ok := seen[id]`,
  },
  {
    title: "Prefix sum",
    note: "Build once for many range-sum queries over mostly unchanged data.",
    code: `sum := prefix[right+1] - prefix[left]`,
  },
  {
    title: "BFS frontier",
    note: "A queue expands unweighted graph distance by layers.",
    code: `for len(queue) > 0 {
    node := queue[0]
    queue = queue[1:]
    for _, next := range graph[node] {
        // enqueue unseen neighbors
    }
}`,
  },
  {
    title: "Union-find",
    note: "Use disjoint sets for same-component questions while edges are added.",
    code: `if uf.Union(a, b) {
    components--
}`,
  },
  {
    title: "DP state",
    note: "DP is practical when the number of reusable states is bounded and transitions are cheap.",
    code: `dp[i] = combine(dp[i-1], dp[i-2])`,
  },
];

export const dsaCourse: CourseContent = {
  meta: {
    id: "dsa",
    title: "Data Structures and Algorithms",
    shortTitle: "DSA",
    summary:
      "Practical data structures and algorithms, taught with Go examples, cost budgets, and visual mental models.",
    target: "Practical DSA in Go",
    targetDetail:
      "Examples use Go-shaped implementations and focus on everyday choices: operation cost, memory, workload shape, and maintainability.",
  },
  parts: dsaCourseParts,
  modules: dsaCourseModules,
  diagrams: dsaDiagrams,
  glossary: dsaGlossary,
  cheatSheet: dsaCheatSheet,
};

export default dsaCourse;
