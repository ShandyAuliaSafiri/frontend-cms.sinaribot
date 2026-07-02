"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  Button,
} from "@/components/ui/button"

import {
  Input,
} from "@/components/ui/input"

import api from "@/lib/api"

export default function ProfilePage() {
  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [role, setRole] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile =
    async () => {
      try {
        const res =
          await api.get(
            "/auth/me",
          )

        setName(res.data.name)

        setEmail(res.data.email)

        setRole(res.data.role)
      } catch (error) {
        console.error(error)

        alert(
          "Gagal mengambil profile",
        )
      }
    }

  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault()

      try {
        setIsLoading(true)

        await api.put(
          "/auth/profile",
          {
            name,
            email,
            password,
          },
        )

        alert(
          "Profile berhasil diperbarui",
        )
      } catch (error: any) {
        console.error(error)

        alert(
          error.response?.data
            ?.message ||
            "Gagal update profile",
        )
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="text-sm text-gray-500">
          Kelola akun admin Anda.
        </p>
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
            Role
          </label>

          <Input
            value={role}
            disabled
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
            placeholder="Kosongkan jika tidak ingin mengganti password"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading
            ? "Menyimpan..."
            : "Update Profile"}
        </Button>
      </form>
    </div>
  )
}