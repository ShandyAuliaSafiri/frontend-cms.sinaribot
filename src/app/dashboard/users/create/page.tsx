"use client"

import {
  useState,
} from "react"

import {
  useRouter,
} from "next/navigation"

import Link from "next/link"

import {
  Button,
} from "@/components/ui/button"

import {
  Input,
} from "@/components/ui/input"

import {
  userService,
} from "@/services/user.service"

export default function CreateUserPage() {
  const router = useRouter()

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    if (
      !name ||
      !email ||
      !password
    ) {
      alert(
        "Semua field wajib diisi",
      )

      return
    }

    try {
      setIsLoading(true)

      await userService.create({
        name,
        email,
        password,
      })

      alert(
        "Admin berhasil dibuat",
      )

      router.push(
        "/dashboard/users",
      )
    } catch (error: any) {
      console.error(error)

      alert(
        error.response?.data
          ?.message ||
          "Gagal membuat admin",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/dashboard/users"
          className="text-sm text-emerald-600"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          Tambah Admin
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white border rounded-xl p-6"
      >
        <div>
          <label className="text-sm font-medium">
            Nama
          </label>

          <Input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value,
              )
            }
            placeholder="Nama admin"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value,
              )
            }
            placeholder="admin@mail.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Password
          </label>

          <Input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
            placeholder="********"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading
            ? "Menyimpan..."
            : "Simpan Admin"}
        </Button>
      </form>
    </div>
  )
}