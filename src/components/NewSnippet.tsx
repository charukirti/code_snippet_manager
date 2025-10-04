"use client";

import SnippetForm from "@/components/SnippetForm";
import { useCreateSnippet } from "@/hooks/useSnippets";
import { SnippetFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function NewSnippet() {
  const router = useRouter();
  const { mutate } = useCreateSnippet();
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
