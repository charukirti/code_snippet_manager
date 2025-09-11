import EditSnippet from "@/components/EditSnippet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippets | Edit snippet",
  description: "Edit your existing snippet",
};

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <EditSnippet id={id} />
    </>
  );
}
