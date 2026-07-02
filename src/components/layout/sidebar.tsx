"use client"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  LogOut,
  Users,
  FileText,
  UserCircle,

  Store,
  Package,
  Boxes,
  Wallet,
  Tags,
  History,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import api from "@/lib/api"

import Cookies from "js-cookie"

import {
  cn,
} from "@/lib/utils"

export function Sidebar() {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [role, setRole] =
    useState("")

  const fetchProfile =
  async () => {

    try {

      const res =
        await api.get(
          "/auth/me",
        )

      setRole(
        res.data.role,
      )

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const navigation = [

    // =========================
    // DASHBOARD
    // =========================
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    // =========================
    // KNOWLEDGE
    // =========================
    {
      name: "QnA (Knowledge)",
      href: "/dashboard/knowledge",
      icon: MessageSquare,
    },

    // =========================
    // BRANCH
    // =========================
    {
      name: "Branches",
      href: "/dashboard/branches",
      icon: Store,
    },

    // =========================
    // SERVICES
    // =========================
    {
      name: "Services",
      href: "/dashboard/services",
      icon: Package,
    },

    // =========================
    // BRANCH SERVICES
    // =========================
    {
      name: "Branch Services",
      href: "/dashboard/branch-services",
      icon: Boxes,
    },

    // =========================
    // PRICES
    // =========================
    {
      name: "Prices",
      href: "/dashboard/prices",
      icon: Wallet,
    },

    // =========================
    // SATUAN ITEMS
    // =========================
    {
      name: "Satuan Items",
      href: "/dashboard/satuan-items",
      icon: Tags,
    },

    // =========================
    // NEWS
    // =========================
    {
      name: "Berita",
      href: "/dashboard/news",
      icon: Newspaper,
    },

    // =========================
    // UNANSWERED
    // =========================
    {
      name:
        "Unanswered Questions",

      href:
        "/dashboard/unanswered",

      icon:
        FileText,
    },
    {
  name: "RAG Logs",
  href: "/dashboard/rag-logs",
  icon: FileText,
},
{
  name: "Chat History",
  href: "/dashboard/chat-logs",
  icon: History,
},
    // =========================
    // PROFILE
    // =========================
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle,
    },

    // =========================
    // USERS (SUPER ADMIN)
    // =========================
    ...(role ===
      "SUPER_ADMIN"

      ? [
          {
            name: "Pengguna",

            href:
              "/dashboard/users",

            icon:
              Users,
          },
        ]

      : []),
  ]

  const handleLogout = () => {

    Cookies.remove(
      "admin_token",
    )

    router.push(
      "/login",
    )
  }

  return (

    <div
      className="
        flex
        h-full
        w-72
        flex-col
        bg-white
        border-r
        border-gray-200
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          h-20
          items-center
          px-6
          border-b
          border-gray-200
          bg-gradient-to-r
          from-emerald-600
          to-teal-600
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <img
            src="/images/logo.sinari.jpeg"
            alt="SINARI Logo"
            className="
              h-11
              w-11
              rounded-full
              object-cover
              border-2
              border-white
              shadow-lg
            "
          />

          <div>

            <h1
              className="
                text-lg
                font-bold
                tracking-wide
                text-white
                leading-none
              "
            >
              SINARIBOTS
            </h1>

            <p
              className="
                text-xs
                text-emerald-100
                mt-1
              "
            >
              CMS Dashboard
            </p>

          </div>
        </div>
      </div>

      {/* MENU */}
      <div
        className="
          flex-1
          overflow-y-auto
          py-4
        "
      >

        <nav
          className="
            space-y-1
            px-3
          "
        >

          <div
            className="
              text-xs
              font-semibold
              text-gray-400
              uppercase
              tracking-wider
              mb-4
              px-3
            "
          >
            Menu Utama
          </div>

          {navigation.map(
            (item) => {

              const isActive =

                pathname ===
                  item.href ||

                pathname.startsWith(
                  `${item.href}/`,
                )

              return (

                <Link
                  key={item.name}
                  href={item.href}

                  className={cn(

                    isActive

                      ? `
                        bg-emerald-50
                        text-emerald-700
                      `

                      : `
                        text-gray-700
                        hover:bg-gray-50
                        hover:text-gray-900
                      `,

                    `
                      group
                      flex
                      items-center
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      rounded-xl
                      transition-all
                    `,
                  )}
                >

                  <item.icon
                    className={cn(

                      isActive

                        ? `
                          text-emerald-600
                        `

                        : `
                          text-gray-400
                          group-hover:text-gray-500
                        `,

                      `
                        mr-3
                        h-5
                        w-5
                        flex-shrink-0
                      `,
                    )}
                  />

                  {item.name}

                </Link>
              )
            },
          )}
        </nav>
      </div>

      {/* FOOTER */}
      <div
        className="
          border-t
          border-gray-200
          p-4
        "
      >

        <button

          onClick={
            handleLogout
          }

          className="
            flex
            w-full
            items-center
            px-3
            py-2.5
            text-sm
            font-medium
            text-red-600
            rounded-xl
            hover:bg-red-50
            transition-colors
          "
        >

          <LogOut
            className="
              mr-3
              h-5
              w-5
            "
          />

          Logout

        </button>
      </div>
    </div>
  )
}