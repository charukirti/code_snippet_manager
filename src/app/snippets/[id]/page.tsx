import Snippet from "@/components/Snippet";

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <main className=" px-15 mx-auto">
        <Snippet id={id} />
      </main>
    </>
  );
}
