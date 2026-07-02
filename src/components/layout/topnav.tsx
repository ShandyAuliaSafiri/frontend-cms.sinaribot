"use client"

import { Bell, Search } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

export function TopNav() {
  const router = useRouter()
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  const [query, setQuery] = useState("")

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
        px-6
        relative
        z-50
      "
    >
      {/* SEARCH */}
<div
  className="
    flex
    flex-1
    items-center
  "
>
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
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(
              `${pathname}?search=${encodeURIComponent(query)}`
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
          justify-end
          gap-x-6
        "
      >
        <button
          type="button"
          className="
            -m-2.5
            p-2.5
            text-gray-400
            hover:text-gray-500
          "
        >
          <Bell
            className="
              h-5
              w-5
            "
          />
        </button>

        <div
          className="
            flex
            items-center
            gap-x-4
          "
        >
          <div
            className="
              hidden
              sm:flex
              sm:flex-col
              sm:items-end
            "
          >
            <span
              className="
                text-sm
                font-semibold
                text-gray-900
              "
            >
              Admin
            </span>

            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Administrator
            </span>
          </div>

          <div
  className="
    h-8
    w-8
    rounded-full
    bg-emerald-100
    flex
    items-center
    justify-center
    text-emerald-700
    font-bold
    text-sm
  "
>
  A
</div>
        </div>
      </div>
    </header>
  )
}