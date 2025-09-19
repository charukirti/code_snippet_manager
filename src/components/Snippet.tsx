"use client";

import NotFound from "@/components/NotFound";
import { snippetStorage } from "@/lib/storage";
import { copyToClipboard, formatDate } from "@/lib/utils";
import { ArrowLeft, Copy, Edit, Trash2, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
    return <NotFound />;
  }

  const handleDownload = () => {
    try {
      const getFileExtension = (language: string) => {
        const extensions: { [key: string]: string } = {
          javascript: "js",
          typescript: "ts",
          python: "py",
          java: "java",
          cpp: "cpp",
          c: "c",
          html: "html",
          css: "css",
          sql: "sql",
          json: "json",
          xml: "xml",
          php: "php",
          ruby: "rb",
          go: "go",
          rust: "rs",
          kotlin: "kt",
          swift: "swift",
        };
        return extensions[language.toLowerCase()] || "txt";
      };

      const fileExtension = getFileExtension(snippet.language);
      const commentChar = [
        "js",
        "ts",
        "java",
        "cpp",
        "c",
        "css",
        "php",
        "go",
        "rust",
        "kt",
        "swift",
      ].includes(fileExtension)
        ? "//"
        : "#";

      const fileContent = `${commentChar} ${snippet.title}
${snippet.description ? `${commentChar} ${snippet.description}` : ""}
${commentChar} Language: ${snippet.language}
${commentChar} Tag: ${snippet.tag}
${commentChar} Created: ${formatDate(snippet.createdAt)}

${snippet.code}`;

      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${snippet.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`${snippet.title} downloaded successfully!`, {
        duration: 3000,
        icon: "📥",
      });
    } catch (error) {
      toast.error("Failed to download snippet. Please try again.", {
        duration: 4000,
        icon: "❌",
      });
      console.error("Download error:", error);
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(snippet.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast.success("Code copied to clipboard!", {
        duration: 2000,
        icon: "📋",
      });
    } catch (error) {
      toast.error("Failed to copy code. Please try again.", {
        duration: 3000,
        icon: "❌",
      });
      console.error("Copy error:", error);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      try {
        snippetStorage.delete(id);
        toast.success("Snippet deleted successfully!", {
          duration: 3000,
          icon: "🗑️",
        });

        router.push("/snippets");
      } catch (error) {
        toast.error("Failed to delete snippet. Please try again.", {
          duration: 4000,
          icon: "❌",
        });
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = () => {
    try {
      router.push(`/snippets/edit/${id}`);
    } catch (error) {
      toast.error("Failed to navigate to edit page.", {
        duration: 3000,
        icon: "❌",
      });
      console.error("Navigation error:", error);
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto p-5">
        <Link
          href={"/snippets"}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to snippets
        </Link>

        {/* ----------------------- main content -------------------- */}

        <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm dark:shadow-slate-900/20 overflow-hidden">
          <header className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-slate-100 capitalize font-bold mb-2">
                  {snippet?.title}
                </h1>

                {snippet.description && (
                  <p className="text-gray-600 dark:text-slate-300 text-lg">
                    {snippet.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-slate-400">
                  <time dateTime={formatDate(snippet.createdAt)}>
                    Created on {formatDate(snippet.createdAt)}
                  </time>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    {snippet.tag}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {snippet.language}
                  </span>
                </div>
              </div>

              {/* --------------------- Action Buttons ------------------------- */}
              <aside className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20 dark:focus:ring-slate-400/20"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  title="Edit snippet"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  title="Delete snippet"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  title="Download snippet"
                >
                  <Download className="w-4 h-4" />
                  Download
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
        </article>
      </main>
    </>
  );
}
