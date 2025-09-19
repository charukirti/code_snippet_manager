'use client'

import { Snippet } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ContentProps {
    snippet: Snippet
}

export function Content({snippet}:ContentProps) {
  return (
    <section className="p-6">
      <div className="relative">
        <SyntaxHighlighter
          language={snippet.language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontFamily: "Fira Code, Monaco, Consolas, monospace",
            border: "1px solid var(--tw-prose-pre-border)",
            backgroundColor: "transparent",
          }}
          className="border border-gray-200 dark:border-slate-600 bg-gray-900 dark:bg-slate-950"
          showLineNumbers
          lineNumberStyle={{
            color: "#6b7280",
            borderRight: "1px solid #374151",
            paddingRight: "1rem",
            marginRight: "1rem",
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <footer className="mt-4 text-sm text-gray-500 dark:text-slate-400 text-center">
        {snippet.code.split("\n").length} lines • {snippet.code.length}{" "}
        characters
      </footer>
    </section>
  );
}
