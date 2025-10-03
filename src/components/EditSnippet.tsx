"use client";

interface EditSnippetProps {
  id: string;
}

import NotFound from "@/components/NotFound";
import SnippetForm from "@/components/SnippetForm";
import { OverlayLoader } from "@/components/ui/OverlayLoader";
import { useSnippet, useUpdateSnippet } from "@/hooks/useSnippets";
import { snippetStorage } from "@/lib/storage";
import { SnippetFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function EditSnippet({ id }: EditSnippetProps) {
  const router = useRouter();

  const { data: currentSnippet, isLoading, isError } = useSnippet(id);
  const updateSnippet = useUpdateSnippet();

  if (!currentSnippet) return <p>Snippet is not found</p>;

  const handleSubmit = (data: Partial<SnippetFormData>) => {
    updateSnippet.mutate(
      { id, data },
      {
        onSuccess: () => {
          router.push("/snippets");
        },
      }
    );
  };

  if (isLoading) {
    return <OverlayLoader />;
  }

  if (isError) {
    <NotFound />;
  }
  return (
    <>
      <SnippetForm initialData={currentSnippet} onSubmit={handleSubmit} />
    </>
  );
}
