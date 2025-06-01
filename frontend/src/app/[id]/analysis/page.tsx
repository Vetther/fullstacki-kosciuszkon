import AnalysisImage from "./_components/Image"
import Location from "./_components/Location"
import Status from "./_components/Status"

const stages = [
  "W przygotowaniu",
  "Oczekuje na odbiór",
  "W drodze",
  "Dostarczono do magazynu",
  "Dostarczono do klienta",
]

export default function Analysis() {
  return (
    <div className="space-y-4">
      <AnalysisImage />
      <Status currentStage={1} stages={stages} />
      <Location
        statuses={["Wysyłka: Niemcy", "Wysyłka: Polska", "Odbiór z magazynu"]}
      />
    </div>
  )
}
