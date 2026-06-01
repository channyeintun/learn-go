# Data Structures and Algorithms Course Plan

## Goal

Add a second practical course track for data structures and algorithms while keeping the existing Golang course intact. Learners should be able to switch courses from the navbar, browse course-specific parts/modules/lessons, and use hand-drawn-style diagrams as the primary teaching aid for abstract structures and algorithm behavior.

## Implementation Plan

1. Introduce a course-level data model with split content files.
   - Keep shared types in `src/courseTypes.ts`.
   - Keep the existing Go content unchanged as the `go` course in `src/courses/go.ts`.
   - Add a new `dsa` course in `src/courses/dsa.ts` with its own parts, modules, lessons, glossary, cheat sheet, and diagram metadata.
   - Keep lightweight course metadata and dynamic loaders in `src/courses/index.ts` so the app can lazy-load only the active course content.

2. Make the app course-aware in `src/App.tsx`.
   - Load the active course by route through a dynamic import and then build its index.
   - Add navbar course links.
   - Route course pages under `/courses/:courseId`.
   - Keep `/` and old reference paths working by redirecting to the default Go course.
   - Scope sidebar, overview, diagrams, glossary, cheat sheet, lesson progress, and route helpers to the active course.

3. Add the DSA curriculum.
   - Part 1: Practical Analysis and Core Sequences.
   - Part 2: Hashing, Trees, and Priority Queues.
   - Part 3: Graphs and Advanced Problem Patterns.
   - Cover commonly used topics from arrays, linked lists, stacks, queues, hash tables, binary search, sorting, trees, heaps, BFS/DFS, shortest paths, union-find, greedy, dynamic programming, and practical complexity analysis.
   - Use Go snippets because this repository is a Golang app and the playground runner already supports Go.

4. Add hand-drawn-style DSA diagram assets.
   - Generate deterministic bitmap PNG diagrams directly into `src/assets/diagrams`.
   - Add diagrams for Big-O growth, array/list operations, hash collisions, tree traversal, heap invariant, graph traversal/shortest path, union-find, and dynamic programming tables.
   - Reference every diagram from lesson data and ensure every metadata entry has a matching asset.

5. Update tests and validation.
   - Extend content tests to validate every course, every course-specific diagram, and unique snippet titles across all course content.
   - Update progress storage helpers for course-specific keys.
   - Run `vp check` and `vp test`.

## Design Notes

- The DSA course should be practical rather than theory-first. Analysis sections should teach how to choose between acceptable, risky, and unnecessary approaches for real workloads.
- Diagrams should stay lightweight, labeled, and inspectable. The images should explain the mental model before the prose adds edge cases.
- Avoid adding a new syntax highlighter language. DSA examples will use runnable or Go-shaped snippets.
- Keep the default `/` experience on Golang so existing links still feel stable.
