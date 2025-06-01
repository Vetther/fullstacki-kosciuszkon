import QRCode from "./_components/QRCode"

export default async function ProductLayout({
  children,
  params,
}: Children & { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      {children}
      <QRCode id={id} />
    </>
  )
}
