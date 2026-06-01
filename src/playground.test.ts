import { describe, expect, it } from "vite-plus/test";
import {
  formatPlaygroundResult,
  getRunnableSnippetCode,
  getSnippetDisplayCode,
} from "./playground";

describe("playground helpers", () => {
  it("marks complete snippets and package main snippets as runnable", () => {
    expect(
      getRunnableSnippetCode({
        code: "fmt.Println(1)",
        complete: true,
        summary: "",
        title: "",
      }),
    ).toBe("fmt.Println(1)");

    expect(
      getRunnableSnippetCode({
        code: "package main\n\nfunc main() {}",
        summary: "",
        title: "",
      }),
    ).toBe("package main\n\nfunc main() {}");
  });

  it("leaves fragments non-runnable", () => {
    expect(
      getRunnableSnippetCode({
        code: "fmt.Println(1)",
        summary: "",
        title: "",
      }),
    ).toBeUndefined();
  });

  it("uses runnable backing code for lesson fragments", () => {
    expect(
      getRunnableSnippetCode({
        code: `text := "Go語"
fmt.Println(len(text))`,
        summary: "",
        title: "Byte length versus rune iteration",
      }),
    ).toContain("package main");
  });

  it("displays the same code that runnable lesson fragments execute", () => {
    const snippet = {
      code: `func counter() func() int {
    value := 0
    return func() int {
        value++
        return value
    }
}`,
      summary: "",
      title: "Closure over private state",
    };

    expect(getSnippetDisplayCode(snippet)).toBe(getRunnableSnippetCode(snippet));
    expect(getSnippetDisplayCode(snippet)).toContain("fmt.Println");
  });

  it("displays non-runnable fragments unchanged", () => {
    const snippet = {
      code: "value := 42",
      summary: "",
      title: "fragment",
    };

    expect(getSnippetDisplayCode(snippet)).toBe("value := 42");
  });

  it("formats compiler errors before runtime output", () => {
    expect(
      formatPlaygroundResult({
        Errors: "./prog.go:3:2: undefined: missing",
        Events: [{ Message: "ignored" }],
      }),
    ).toEqual({
      label: "Compile error",
      output: "./prog.go:3:2: undefined: missing",
      tone: "error",
    });
  });

  it("marks non-zero runtime status as an error", () => {
    expect(
      formatPlaygroundResult({
        Events: [{ Message: "panic: x\n" }],
        Status: 2,
      }),
    ).toEqual({
      label: "Run error",
      output: "panic: x",
      tone: "error",
    });
  });

  it("does not describe failed empty output as a successful run", () => {
    expect(
      formatPlaygroundResult({
        Status: 1,
      }),
    ).toEqual({
      label: "Run error",
      output: "Program exited with status 1 and produced no output.",
      tone: "error",
    });
  });
});
