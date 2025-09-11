import NewSnippet from "@/components/NewSnippet";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Code Snippets | Add snippet",
  description: "Create and add your snippet",
};

export default function CreateSnippet() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <NewSnippet />
    </Suspense>
  );
}
