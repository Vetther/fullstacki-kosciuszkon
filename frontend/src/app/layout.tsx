import Footer from "./_components/Footer"
import Main from "./_components/Main"
import Navbar from "./_components/Navbar"
import { type Metadata } from "next"
import "~/styles/globals.css"
import { TRPCReactProvider } from "~/trpc/react"

export const metadata: Metadata = {}

export default function RootLayout({
  children,
  params,
}: Children & { params: { id: string } }) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <TRPCReactProvider>
          <Navbar />
          <Main>{children}</Main>
          <Footer id={params.id} />
        </TRPCReactProvider>
      </body>
    </html>
  )
}
