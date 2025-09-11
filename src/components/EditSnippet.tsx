"use client";

interface EditSnippetProps {
  id: string;
}

import SnippetForm from "@/components/SnippetForm";
import { snippetStorage } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function EditSnippet({ id }: EditSnippetProps) {
  const router = useRouter();

  const currentSnippet = snippetStorage.findById(id);

  if (!currentSnippet) return <p>Snippet is not found</p>;

  const handleSubmit = (data: any) => {
    snippetStorage.update(id, data);
    router.push("/snippets");
  };
  return (
    <>
      <SnippetForm initialData={currentSnippet} onSubmit={handleSubmit} />
    </>
  );
}
