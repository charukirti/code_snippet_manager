import { Copy, Edit, Trash2 } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SnippetCardProps {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt: Date;
  description?: string;
  tag: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopy?: (code: string) => void;
}

export default function SnippetCard({
  id,
  title,
  language,
  code,
  description,
  createdAt,
  tag,
  onEdit,
  onCopy,
  onDelete,
}: SnippetCardProps) {
  const truncatedCode = truncateText(code, 15);

  return (
    <article
      aria-label="snippet-card"
      className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-4"
    >
      <div className="space-y-2 sm:space-y-3" aria-label="card-header">
        <div className="flex flex-col   gap-2">
          <Link href={`/snippets/${id}`} className="flex-1 min-w-0 order-1">
            <h3 className="text-lg sm:text-2xl font-semibold capitalize  hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>
          <span className="text-gray-500 text-xs sm:text-sm order-2 sm:order-3 sm:whitespace-nowrap">
            {formatDate(createdAt)}
          </span>
        </div>

        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-300 text-violet-700 w-fit">
          {tag}
        </span>

        {description && (
          <p className="text-gray-400 text-sm sm:text-base line-clamp-2 sm:line-clamp-1">
            {description}
          </p>
        )}
      </div>

      <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border border-slate-800/50">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              minWidth: "fit-content",
            }}
            className="sm:text-sm"
          >
            {truncatedCode}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gray-600 w-fit">
          {language}
        </span>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors touch-manipulation"
            title="Copy code"
            onClick={() => onCopy?.(code)}
          >
            <Copy size={16} className="sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors touch-manipulation"
            title="Edit snippet"
            onClick={() => onEdit?.(id)}
          >
            <Edit size={16} className="sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors touch-manipulation"
            title="Delete snippet"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
