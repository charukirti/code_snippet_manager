"use client";

import SnippetForm from "@/components/SnippetForm";
import { useCreateSnippet } from "@/hooks/useSnippets";
import { snippetStorage } from "@/lib/storage";
import { SnippetFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function NewSnippet() {
  const router = useRouter();
  const { mutate, isError, isPending } = useCreateSnippet();
  const handleSubmit = (data: SnippetFormData) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/snippets");
      },
    });
  };
  return (
    <>
      <SnippetForm onSubmit={handleSubmit} />
    </>
  );
}
