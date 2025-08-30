"use client";

import SnippetForm from "@/components/SnippetForm";
import { snippetStorage } from "@/lib/storage";
import { Snippet, SnippetFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function NewSnippet() {
  const router = useRouter();

  const handleSubmit = (data: SnippetFormData) => {
    snippetStorage.add(data);
    router.push("/snippets");
  };
  return (
    <>
      <h1 className="text-2xl text-gray-500 poppins font-bold">
        Add New Snippet
      </h1>
      <SnippetForm onSubmit={handleSubmit} />
    </>
  );
}
