import Main from "./_components/Main"
import { type Metadata } from "next"
import "~/styles/globals.css"
import { TRPCReactProvider } from "~/trpc/react"

export const metadata: Metadata = {}

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className="bg-bg text-white">
        <TRPCReactProvider>
          <Main>{children}</Main>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
