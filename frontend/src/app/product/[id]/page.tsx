type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function Product({ params }: ProductPageProps) {
  const { id } = await params

  return <div>{id}</div>
}
