import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "Dark Auth Pages",
  description: "Dark themed login and signup pages with Google authentication",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
