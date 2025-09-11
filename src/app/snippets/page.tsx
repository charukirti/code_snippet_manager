import Snippets from "@/components/Snippets";
import { Suspense } from "react";

export default function AllSnippets() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Snippets />
    </Suspense>
  );
}
