import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navbar } from '@/components/Navbar'
import { NavbarMobile } from '@/components/NavbarMobile'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Archive Chat Logs',
  description: 'Search engine for chat log files from Twitch and YouTube channels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen">
            <Navbar />
            <NavbarMobile />
            <main className="pt-20 pb-8">
              <div className="container mx-auto px-4">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}