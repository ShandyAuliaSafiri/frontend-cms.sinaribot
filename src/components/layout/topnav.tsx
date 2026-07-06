"use client"

import { Bell, Search, Menu } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

interface TopNavProps {
  setOpen: (value: boolean) => void
}

export function TopNav({
  setOpen,
}: TopNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isDashboard =
    pathname === "/dashboard"

  const [query, setQuery] =
    useState("")

  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-4
        sm:px-6
        relative
        z-50
      "
    >

      {/* LEFT */}
      <div
        className="
          flex
          flex-1
          items-center
          gap-3
        "
      >

        {/* MOBILE MENU */}
        <button
          onClick={() => setOpen(true)}
          className="
            lg:hidden
            rounded-md
            p-2
            hover:bg-gray-100
          "
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* SEARCH */}
        {!isDashboard && (
          <div
            className="
              relative
              w-full
            "
          >

            <Search
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-4
                w-4
                text-gray-400
              "
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(
                    `${pathname}?search=${encodeURIComponent(
                      query,
                    )}`,
                  )
                }
              }}
              placeholder="Search..."
              className="
                block
                w-full
                rounded-md
                border-0
                py-2
                pl-10
                pr-3
                text-gray-900
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-inset
                focus:ring-emerald-600
                sm:text-sm
              "
            />

          </div>
        )}

      </div>

      {/* RIGHT */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <button
          type="button"
          className="
            p-2
            text-gray-400
            hover:text-gray-600
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              hidden
              sm:block
              text-right
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-gray-900
              "
            >
              Admin
            </p>

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              Administrator
            </p>

          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              font-bold
              text-emerald-700
            "
          >
            A
          </div>

        </div>

      </div>

    </header>
  )
}