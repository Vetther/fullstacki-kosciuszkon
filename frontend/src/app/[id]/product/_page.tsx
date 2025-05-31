import Card from "../_components/Card"
import Row from "../_components/Row"

export default function Product() {
  return (
    <div className="space-y-4 p-4">
      <Card>1</Card>
      <Card>2</Card>
      <Row>
        <Card>3</Card>
        <Card>4</Card>
      </Row>
      <Row>
        <div className="flex flex-1">
          <Card>5</Card>
        </div>
        <div className="flex-1 space-y-4">
          <Card>6</Card>
          <Card>7</Card>
        </div>
      </Row>
    </div>
  )
}
