import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Your Second Brain',
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url:"/light/favicon.ico",
        href:"/light/favicon.ico"
      },
      {
        media:"(prefers-color-scheme: dark)",
        url:"/dark/favicon.ico",
        href:"/dark/favicon.ico"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}> <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey='motion-theme'
          >
            {children}
          </ThemeProvider></body>
    </html>
  )
}
