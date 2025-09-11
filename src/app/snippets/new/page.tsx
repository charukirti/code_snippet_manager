import NewSnippet from "@/components/NewSnippet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippets | Add snippet",
  description: "Create and add your snippet",
};

export default function CreateSnippet() {
  return (
    <>
      <NewSnippet />
    </>
  );
}
