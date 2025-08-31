"use client";

import SnippetForm from "@/components/SnippetForm";
import { snippetStorage } from "@/lib/storage";
import { useParams, useRouter } from "next/navigation";

export default function EditSnippet() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const currentSnippet = snippetStorage.findById(params.id);

  if (!currentSnippet) return <p>Snippet is not found</p>;

  const handleSubmit = (data: any) => {
    snippetStorage.update(params.id, data);
    router.push("/snippets");
  };
  return (
    <>
      <h1 className="text-2xl text-gray-500 poppins font-bold">
        Edit Snippet page
      </h1>

      <SnippetForm initialData={currentSnippet} onSubmit={handleSubmit} />
    </>
  );
}
