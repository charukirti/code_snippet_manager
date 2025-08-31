import Snippet from "@/components/Snippet";

export default async function SnippetPage ({params}: {params: Promise<{id: string}>}){
  const {id} = await params
  return (
    <>
     <main className="max-w-3xl mx-auto">
      <Snippet id={id} />
    </main>
    </>
  )
}

