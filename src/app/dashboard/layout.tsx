"use client"

import { useState } from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/topnav"
import { MobileSidebar } from "@/components/layout/MobileSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar Desktop */}
   
      <div className="hidden lg:block">
  <Sidebar />
</div>

<MobileSidebar
  open={open}
  setOpen={setOpen}
/>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav setOpen={setOpen} />

        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            pb-20
          "
        >
          {children}
        </main>
      </div>

    </div>
  )
}