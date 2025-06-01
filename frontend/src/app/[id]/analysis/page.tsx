import AnalysisImage from "./_components/Image"
import Location from "./_components/Location"
import Status from "./_components/Status"

export default async function Analysis({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="space-y-4">
      <AnalysisImage />
      <Status productId={id} />
      <Location productId={id} />
    </div>
  )
}
