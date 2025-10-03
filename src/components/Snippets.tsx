// components/Snippets.tsx
"use client";

import SnippetCard from "@/components/SnippetCard";
import { OverlayLoader } from "@/components/ui/OverlayLoader";
import { copyToClipboard } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useSnippets, useDeleteSnippet } from "@/hooks/useSnippets";

export default function Snippets() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Replace local storage with API hooks
  const { data: snippets = [], isLoading, error } = useSnippets();
  const deleteSnippet = useDeleteSnippet();

  console.log(`created at ${snippets.map(sn => sn.createdAt)}`)

  /* Get URL parameters (filter) */
  const searchQuery = searchParams.get("search") || "";
  const selectedLanguage = searchParams.get("language") || "";
  const selectedTags = searchParams.get("tag") || "";

  /* Filter snippets based on URL params (client-side filtering) */
  const filteredSnippets = useMemo(() => {
    if (!snippets) return [];
    
    return snippets.filter((snippet) => {
      // Search in title, description, and code
      const matchesSearch = searchQuery
        ? snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          snippet.code.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Filter by language
      const matchesLanguage = selectedLanguage
        ? snippet.language === selectedLanguage
        : true;

      // Filter by tag
      const matchesTag = selectedTags
        ? snippet.tag.toLowerCase() === selectedTags.toLowerCase()
        : true;

      return matchesSearch && matchesLanguage && matchesTag;
    });
  }, [snippets, searchQuery, selectedLanguage, selectedTags]);

  // Show loading state
  if (isLoading) {
    return <OverlayLoader />;
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full max-w-7xl mx-auto py-6">
        <div className="text-center py-12 sm:py-16">
          <h3 className="text-lg sm:text-xl font-medium text-red-600 mb-2">
            Error Loading Snippets
          </h3>
          <p className="text-slate-600 dark:text-slate-100 text-sm sm:text-base">
            {error.message}
          </p>
        </div>
      </section>
    );
  }

  const handleDelete = (id: string) => {
    deleteSnippet.mutate(id);
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
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}  // Changed from snippet.id to snippet._id (MongoDB)
              title={snippet.title}
              language={snippet.language}
              code={snippet.code}
              createdAt={new Date(snippet.createdAt!)}
              id={snippet._id!}  // Changed from snippet.id
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