import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"

import { cn } from "@/lib/utils"

import { Toaster } from 'sonner'
import Swal from "sweetalert2"


const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SINARIBOTS CMS',
  description:
    'Admin Portal SINARIBOTS Laundry AI System',

  icons: {
    icon: '/images/logo.sinari.jpeg',
    shortcut:
      '/images/logo.sinari.jpeg',
    apple:
      '/images/logo.sinari.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen`}
        >
          {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          theme="light"
          toastOptions={{
            style: {
              borderRadius: '14px',
              padding: '14px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}