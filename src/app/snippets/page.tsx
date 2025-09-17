import Snippets from "@/components/Snippets";
import { OverlayLoader } from "@/components/ui/OverlayLoader";
import { Suspense } from "react";

export default function AllSnippets() {
  return (
    <Suspense fallback={<OverlayLoader/>}>
      <Snippets />
    </Suspense>
  );
}
