import Link from "next/link"
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
}

const tabs: Tab[] = [
  {
    iconInactive: IoHomeOutline,
    iconActive: IoHomeSharp,
    name: "Produkt",
  },
  {
    iconInactive: FaRegBell,
    iconActive: FaBell,
    name: "Analiza",
  },
  {
    iconInactive: FaRegHeart,
    iconActive: FaHeart,
    name: "Cykl Życia",
  },
  {
    iconInactive: IoBagOutline,
    iconActive: IoBag,
    name: "Home",
  },
]

export default function Footer() {
  return (
    <footer className="bg-bg sticky bottom-0 flex items-center justify-between px-6 py-4">
      {tabs.map(tab => (
        <Button key={tab.name} variant="ghost" className="flex-col" asChild>
          <Link href="/">
            {tab.name === "Produkt" ? <tab.iconActive /> : <tab.iconInactive />}
            <span
              className={
                tab.name === "Produkt" ? "font-semibold" : "font-light"
              }
            >
              {tab.name}
            </span>
          </Link>
        </Button>
      ))}
    </footer>
  )
}
