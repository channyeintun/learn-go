import type { CodeExample } from "./courseTypes";
import { runnableSnippetPrograms } from "./snippetRunners";

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
  if (snippet.runCode) {
    return snippet.runCode;
  }

  const runnableSnippetProgram = runnableSnippetPrograms[snippet.title];
  if (runnableSnippetProgram) {
    return runnableSnippetProgram;
  }

  const trimmedCode = snippet.code.trimStart();

  if (snippet.complete || trimmedCode.startsWith("package main")) {
    return snippet.code;
  }

  return undefined;
}

export function getSnippetDisplayCode(
  snippet: CodeExample,
  runnableCode = getRunnableSnippetCode(snippet),
) {
  return runnableCode ?? snippet.code;
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
    output: getEmptyOutputMessage(response, failed),
    tone: failed ? "error" : "success",
  };
}

function getEmptyOutputMessage(response: PlaygroundResponse, failed: boolean) {
  if (!failed) {
    return response.IsTest ? "Tests passed." : "Program ran with no output.";
  }

  if (response.Status) {
    return `Program exited with status ${response.Status} and produced no output.`;
  }

  if (response.TestsFailed) {
    return `${response.TestsFailed} test${response.TestsFailed === 1 ? "" : "s"} failed with no output.`;
  }

  return "Program failed with no output.";
}
