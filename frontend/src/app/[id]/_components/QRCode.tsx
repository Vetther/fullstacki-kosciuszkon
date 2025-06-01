"use client"

import { useQRCode } from "next-qrcode"
import { IoQrCode } from "react-icons/io5"
import { Button } from "~/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"

export default function QRCode({ id }: { id: string }) {
  const { Canvas } = useQRCode()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed right-4 bottom-24 z-10 w-min rounded-full">
          <IoQrCode />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="grid w-full place-items-center">
          <DrawerTitle>QR Code</DrawerTitle>
          <Canvas
            options={{ scale: 7 }}
            text={`${process.env.NEXT_PUBLIC_URL}/${id}`}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
