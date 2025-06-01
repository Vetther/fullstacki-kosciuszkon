"use client"

import "dotenv/config"
import { useQRCode } from "next-qrcode"

export default function Home() {
  const { Canvas } = useQRCode()

  return (
    <div className="grid min-h-screen place-items-center">
      <Canvas
        text={`${process.env.NEXT_PUBLIC_URL}/00000000-0000-0000-0000-000000000000/product`}
      />
    </div>
  )
}
