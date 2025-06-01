"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaBell, FaHeart, FaRegBell, FaRegHeart } from "react-icons/fa6"
import {
  IoBag,
  IoBagOutline,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5"
import { type IconType } from "react-icons/lib"
import { Button } from "~/components/ui/button"

type Tab = {
  iconInactive: IconType
  iconActive: IconType
  name: string
  href: string
}

const tabs: Tab[] = [
  {
    iconInactive: IoHomeOutline,
    iconActive: IoHomeSharp,
    name: "Produkt",
    href: "product",
  },
  {
    iconInactive: FaRegBell,
    iconActive: FaBell,
    name: "Analiza",
    href: "analysis",
  },
  {
    iconInactive: FaRegHeart,
    iconActive: FaHeart,
    name: "Cykl Życia",
    href: "cycle",
  },
  {
    iconInactive: IoBagOutline,
    iconActive: IoBag,
    name: "Home",
    href: "home",
  },
]

export default function Footer() {
  const pathname = usePathname().split("/")
  const id = pathname[1]
  const href = pathname[2]

  return (
    <footer className="bg-bg sticky bottom-0 flex items-center justify-between px-6 py-4 text-white">
      {tabs.map(tab => (
        <Button
          key={tab.name}
          variant="ghost"
          className="hover:bg-tick w-min flex-col py-6 hover:text-white"
          asChild
        >
          <Link href={`/${id}/${tab.href}`}>
            {tab.href === href ? <tab.iconActive /> : <tab.iconInactive />}
            <span
              className={tab.href === href ? "font-semibold" : "font-light"}
            >
              {tab.name}
            </span>
          </Link>
        </Button>
      ))}
    </footer>
  )
}
