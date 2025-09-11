"use client";

import SnippetForm from "@/components/SnippetForm";
import { snippetStorage } from "@/lib/storage";
import { SnippetFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function NewSnippet() {
  const router = useRouter();

  const handleSubmit = (data: SnippetFormData) => {
    snippetStorage.add(data);
    router.push("/snippets");
  };
  return (
    <>
      <SnippetForm onSubmit={handleSubmit} />
    </>
  );
}
