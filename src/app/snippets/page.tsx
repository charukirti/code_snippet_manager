"use client";
import SnippetCard from "@/components/SnippetCard";
import { snippetStorage } from "@/lib/storage";
import { copyToClipboard } from "@/lib/utils";
import { Snippet } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllSnippets() {
  const router = useRouter();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  useEffect(() => {
    const data = snippetStorage.getAll();
    setSnippets(data);
  }, []);
  console.log(snippets);

  const handleDelete = (id: string) => {
    snippetStorage.delete(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/snippets/edit/${id}`);
  };

  const handleCopy = (code: string) => {
    copyToClipboard(code);
  };
  return (
    <>
      <h1 className="text-2xl text-gray-500 poppins font-bold">All Snippets</h1>
      {snippets.map((snippet) => (
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
    </>
  );
}
