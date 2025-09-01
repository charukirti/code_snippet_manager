import EditSnippet from "@/components/EditSnippet";

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
