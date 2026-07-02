"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import api from "@/lib/api"
import Cookies from "js-cookie"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setIsLoading(true)
    setError("")

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      )

      if (response.data.access_token) {
        Cookies.set(
          "admin_token",
          response.data.access_token,
          { expires: 1 }
        )

        router.push("/dashboard")
      }
    } catch (err: any) {
      console.log(err.response?.data)

      setError(
        err.response?.data?.message ||
          "Email atau password salah"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 relative mb-4">
            <Image
              src="/images/logo.sinari.jpeg"
              alt="Sinari Logo"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Login Admin
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Masuk untuk mengelola portal SINARIBOTS
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={handleLogin}
        >
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email / Username
              </label>

              <Input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                placeholder="admin@sinari.id"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ingat saya
              </label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4"
            >
              {isLoading
                ? "Memproses..."
                : "Masuk"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Belum memiliki token admin?{" "}
          <Link
            href="/register"
            className="text-emerald-600 hover:text-emerald-500 font-semibold"
          >
            Hubungi Super Admin untuk mendapatkan akses CMS
          </Link>
        </div>
      </div>
    </div>
  )
}