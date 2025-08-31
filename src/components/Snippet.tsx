"use client";
import { snippetStorage } from "@/lib/storage";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SnippetProps{
 id: string 
}

export default function Snippet({id}:SnippetProps) {

  const snippet = snippetStorage.findById(id);
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{snippet?.title}</h1>
        <p className="text-gray-600 mb-4">{snippet?.description}</p>

        <SyntaxHighlighter
          language={snippet?.language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontFamily: "monospace",
          }}
        >
          {snippet?.code ?? ""}
        </SyntaxHighlighter>

        <p className="mt-2 text-sm text-gray-500">
          Language: {snippet?.language}
        </p>
        <p className="mt-1 text-sm text-gray-500">Tags: {snippet?.tag}</p>
      </div>
    </>
  );
}
