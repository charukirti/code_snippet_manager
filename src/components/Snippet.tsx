"use client";

import NotFound from "@/components/NotFound";
import { Content } from "@/components/snippet-page/Content";
import { Header } from "@/components/snippet-page/Header";
import { OverlayLoader } from "@/components/ui/OverlayLoader";
import { useDeleteSnippet, useSnippet } from "@/hooks/useSnippets";
import { snippetStorage } from "@/lib/storage";
import { copyToClipboard, handleDownload } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SnippetProps {
  id: string;
}

export default function Snippet({ id }: SnippetProps) {
  const router = useRouter();
  const [copied, setIsCopied] = useState(false);

  const { data, isLoading, isError } = useSnippet(id);
  const {
    mutate: deleteSnippet,
    isPending,
    isError: deleteError,
  } = useDeleteSnippet();

  if (isLoading) {
    return <OverlayLoader />;
  }

  if (isError) {
    return <NotFound />;
  }

  const handleCopy = async () => {
    try {
      await copyToClipboard(data?.code!);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast.success("Code copied to clipboard!", {
        duration: 2000,
        icon: "📋",
      });
    } catch (error) {
      toast.error("Failed to copy code. Please try again.", {
        duration: 3000,
        icon: "❌",
      });
      console.error("Copy error:", error);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      try {
        deleteSnippet(data?._id!);

        router.push("/snippets");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = () => {
    try {
      router.push(`/snippets/edit/${id}`);
    } catch (error) {
      toast.error("Failed to navigate to edit page.", {
        duration: 3000,
        icon: "❌",
      });
      console.error("Navigation error:", error);
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto p-5">
        <Link
          href={"/snippets"}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to snippets
        </Link>

        {/* ----------------------- main content -------------------- */}

        <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm dark:shadow-slate-900/20 overflow-hidden">
          <Header
            snippet={data!}
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            copied={copied}
          />

          {/* ------------------------ code box ------------------ */}
          <Content snippet={data!} />
        </article>
      </main>
    </>
  );
}
