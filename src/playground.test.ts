import { describe, expect, it } from "vite-plus/test";
import { formatPlaygroundResult, getRunnableSnippetCode } from "./playground";

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
});
