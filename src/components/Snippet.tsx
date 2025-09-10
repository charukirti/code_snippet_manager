"use client";

import { snippetStorage } from "@/lib/storage";
import { copyToClipboard, formatDate } from "@/lib/utils";
import { ArrowLeft, Copy, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SnippetProps {
  id: string;
}

export default function Snippet({ id }: SnippetProps) {
  const router = useRouter();
  const [copied, setIsCopied] = useState(false);

  const snippet = snippetStorage.findById(id);

  if (!snippet) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Snippet not found
        </h1>
        <p className="text-gray-600 mb-4">
          The snippet you are looking for, does not exist!
        </p>

        <Link
          href={"/snippets"}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to snippets
        </Link>
      </div>
    );
  }

  const handleCopy = async () => {
    await copyToClipboard(snippet.code);
    setIsCopied((copied) => !copied);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure, about you action?")) {
      snippetStorage.delete(id);
      router.push("/snippets");
    }
  };

  const handleEdit = () => {
    router.push(`/snippets/edit/${id}`);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto p-5">
        <Link
          href={"/snippets"}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to snippets
        </Link>

        {/* ----------------------- main content -------------------- */}

        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <header className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl text-gray-900 capitalize font-bold mb-2">
                  {snippet?.title}
                </h1>

                {snippet.description && (
                  <p className="text-gray-600 text-lg">{snippet.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                  <time dateTime={formatDate(snippet.createdAt)}>
                    Created on {formatDate(snippet.createdAt)}
                  </time>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                    {snippet.tag}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {snippet.language}
                  </span>
                </div>
              </div>

              {/* --------------------- Action Buttons ------------------------- */}
              <aside className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  title="Edit snippet"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  title="Delete snippet"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </aside>
            </div>
          </header>

          {/* ------------------------ code box ------------------ */}
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
                  border: "1px solid #e5e7eb",
                }}
                showLineNumbers
                lineNumberStyle={{
                  color: "#6b7280",
                  borderRight: "1px solid #e5e7eb",
                  paddingRight: "1rem",
                  marginRight: "1rem",
                }}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>

            <footer className="mt-4 text-sm text-gray-500 text-center">
              {snippet.code.split("\n").length} lines • {snippet.code.length}{" "}
              characters
            </footer>
          </section>
        </article>
      </main>
    </>
  );
}
