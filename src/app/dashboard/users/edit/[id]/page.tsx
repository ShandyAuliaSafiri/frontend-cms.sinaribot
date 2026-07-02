"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
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

export default function EditUserPage() {
  const params = useParams()

  const router = useRouter()

  const id = params?.id
    ? Number(params.id)
    : null

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [id])

  const fetchUser = async () => {
    try {
      const users =
        await userService.getAll()

      const data = users.find(
        (user: any) => user.id === id,
      )

      if (!data) {
        throw new Error("User not found")
      }

      setName(data.name)

      setEmail(data.email)
    } catch (error) {
      console.error(error)

      alert(
        "Gagal mengambil data admin",
      )
    }
  }

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      await userService.update(
        id!,
        {
          name,
          email,
          password,
        },
      )

      alert(
        "Admin berhasil diupdate",
      )

      router.push(
        "/dashboard/users",
      )
    } catch (error: any) {
      console.error(error)

      alert(
        error.response?.data
          ?.message ||
          "Gagal update admin",
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
          Edit Admin
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
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Password Baru
          </label>

          <Input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
            placeholder="Kosongkan jika tidak diubah"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading
            ? "Menyimpan..."
            : "Update Admin"}
        </Button>
      </form>
    </div>
  )
}