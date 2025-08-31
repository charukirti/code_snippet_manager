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
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-2"
    >
      <div className="space-y-2" aria-label="card-header">
        <div className="flex items-center justify-between">
          {" "}
          <Link href={`/snippets/${id}`}>
            <h3 className="text-xl font-semibold capitalize truncate">
              {title}
            </h3>{" "}
            <span className="text-gray-500 text-sm">
              {formatDate(createdAt)}
            </span>
          </Link>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-300 text-violet-700">
          {tag}
        </span>
        {description && (
          <p className="text-gray-400 text-sm lg:text-lg truncate">
            {description}
          </p>
        )}
      </div>

      {/* body */}

      <div className="relative overflow-hidden rounded-xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border border-slate-800/50">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontFamily: "monospace",
          }}
        >
          {truncatedCode}
        </SyntaxHighlighter>
      </div>

      {/* footer */}

      <div className="flex items-center justify-between mt-8">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gray-600">
          {language}
        </span>

        <div className="flex items-center gap-1 ml-4">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Copy code"
            onClick={() => onCopy?.(code)}
          >
            <Copy size={16} />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit snippet"
            onClick={() => onEdit?.(id)}
          >
            <Edit size={16} />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete snippet"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
