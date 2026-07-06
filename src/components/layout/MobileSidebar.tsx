"use client"

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

import { Sidebar } from "./sidebar"

interface MobileSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function MobileSidebar({
  open,
  setOpen,
}: MobileSidebarProps) {
  return (
    <div className="lg:hidden">
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent
          side="left"
          className="w-72 p-0"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}