import { NavBar } from "@/components/nav-bar"
import "@/styles/globals.css"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <Toaster />
        <NavBar />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}

