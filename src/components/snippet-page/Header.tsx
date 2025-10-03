"use client";

import { Snippet } from "@/lib/api";
import { formatDate } from "@/lib/utils";

import { Copy, Download, Trash2, Edit } from "lucide-react";

interface HeaderProps {
  snippet: Snippet;
  handleCopy: () => void;
  handleEdit: () => void;
  handleDownload: (snippet: Snippet) => void;
  handleDelete: () => void;
  copied: boolean;
}

export function Header({
  snippet,
  handleCopy,
  handleDelete,
  handleDownload,
  handleEdit,
  copied,
}: HeaderProps) {
  const created = new Date(snippet.createdAt!)
  return (
    <header className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-slate-100 capitalize font-bold mb-2">
            {snippet?.title}
          </h1>

          {snippet?.description && (
            <p className="text-gray-600 dark:text-slate-300 text-lg">
              {snippet?.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-slate-400">
            <time dateTime={created.toISOString()}>
              Created on {formatDate(created)}
            </time>

            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              {snippet?.tag}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {snippet?.language}
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
            onClick={() => handleDownload(snippet)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            title="Download snippet"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </aside>
      </div>
    </header>
  );
}
