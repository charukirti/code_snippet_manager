import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center dark:bg-slate-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
        Snippet not found
      </h1>
      <p className="text-gray-600 dark:text-slate-300 mb-4">
        The snippet you are looking for, does not exist!
      </p>

      <Link
        href={"/snippets"}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to snippets
      </Link>
    </div>
  );
}
