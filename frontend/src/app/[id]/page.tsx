import { redirect } from "next/navigation"

export default async function ProductId({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  redirect(`${id}/product`)
}
