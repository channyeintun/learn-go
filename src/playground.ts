import type { CodeExample } from "./course";

export const playgroundCompileUrl = "https://play.golang.org/compile";

export type PlaygroundRunResult = {
  label: string;
  output: string;
  tone: "success" | "error";
};

type PlaygroundEvent = {
  Message?: string;
};

type PlaygroundResponse = {
  Errors?: string;
  Events?: PlaygroundEvent[];
  IsTest?: boolean;
  Status?: number;
  TestsFailed?: number;
  VetErrors?: string;
};

export function getRunnableSnippetCode(snippet: CodeExample) {
  const trimmedCode = snippet.code.trimStart();

  if (snippet.complete || trimmedCode.startsWith("package main")) {
    return snippet.code;
  }

  return undefined;
}

export async function runGoSnippet(code: string, signal?: AbortSignal) {
  const response = await fetch(playgroundCompileUrl, {
    body: new URLSearchParams({
      body: code,
      version: "2",
      withVet: "true",
    }),
    method: "POST",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Go Playground returned HTTP ${response.status}`);
  }

  return formatPlaygroundResult((await response.json()) as PlaygroundResponse);
}

export function formatPlaygroundResult(response: PlaygroundResponse): PlaygroundRunResult {
  const compileErrors = response.Errors?.trim();
  if (compileErrors) {
    return {
      label: "Compile error",
      output: compileErrors,
      tone: "error",
    };
  }

  const eventOutput = (response.Events ?? [])
    .map((event) => event.Message ?? "")
    .join("")
    .trimEnd();
  const vetErrors = response.VetErrors?.trim();
  const output = [vetErrors, eventOutput].filter(Boolean).join("\n\n");
  const failed = Boolean(vetErrors) || Boolean(response.Status) || Boolean(response.TestsFailed);

  if (output) {
    return {
      label: failed ? "Run error" : response.IsTest ? "Test output" : "Output",
      output,
      tone: failed ? "error" : "success",
    };
  }

  return {
    label: failed ? "Run error" : response.IsTest ? "Tests passed" : "Output",
    output: response.IsTest ? "Tests passed." : "Program ran with no output.",
    tone: failed ? "error" : "success",
  };
}
