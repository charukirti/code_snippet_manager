"use client";
import SnippetCard from "@/components/SnippetCard";
import { OverlayLoader } from "@/components/ui/OverlayLoader";
import { snippetStorage } from "@/lib/storage";
import { copyToClipboard } from "@/lib/utils";
import { Snippet } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Snippets() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* get url parameters (filter) */
  const searchQuery = searchParams.get("search") || "";
  const selectedLanguage = searchParams.get("language") || "";
  const selectedTags = searchParams.get("tag") || "";

  useEffect(() => {
    const data = snippetStorage.getAll();
    setSnippets(data);
    setIsLoading(true);
  }, []);

  /* filter snippets based on url params */
  const filteredSnippets = useMemo(() => {
    if (!isLoading) return [];
    return snippetStorage.search(
      searchQuery,
      selectedLanguage || undefined,
      selectedTags || undefined
    );
  }, [searchQuery, selectedLanguage, selectedTags, isLoading]);

  if (!isLoading) {
    return <OverlayLoader />;
  }

  const handleDelete = (id: string) => {
    snippetStorage.delete(id);
    setSnippets(snippetStorage.getAll());
  };

  const handleEdit = (id: string) => {
    router.push(`/snippets/edit/${id}`);
  };

  const handleCopy = (code: string) => {
    copyToClipboard(code);
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-6 ">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-slate-100 poppins font-bold">
          {filteredSnippets.length === snippets.length
            ? `All snippets (${snippets.length})`
            : `Filtered Results (${filteredSnippets.length} of ${snippets.length})`}
        </h2>
        <p className="text-slate-600 dark:text-slate-50 mt-1 text-sm sm:text-base">
          Manage and organize your code snippets
        </p>
      </div>

      {/* Content Section */}
      {filteredSnippets.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">
            {snippets.length === 0
              ? "No snippets yet"
              : "No matching snippets found"}
          </h3>
          <p className="text-slate-600 dark:text-slate-100 text-sm sm:text-base">
            {snippets.length === 0
              ? "Create your first snippet to get started."
              : "Try adjusting your search or filters"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2  ">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              title={snippet.title}
              language={snippet.language}
              code={snippet.code}
              createdAt={snippet.createdAt}
              id={snippet.id}
              tag={snippet.tag}
              description={snippet.description}
              onCopy={handleCopy}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
