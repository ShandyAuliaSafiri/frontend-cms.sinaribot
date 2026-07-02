"use client"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ChevronLeft,
} from "lucide-react"

import Link from "next/link"

import {
  useState,
} from "react"

import {
  newsService,
} from "@/services/news.service"

import {
  useRouter,
} from "next/navigation"

import {
  toast,
} from "sonner"



export default function CreateNewsPage() {
  const router =
    useRouter()

  const [title, setTitle] =
    useState("")

  const [content, setContent] =
    useState("")

  const [category, setCategory] =
    useState("NEWS")

  const [image, setImage] =
    useState<File | null>(
      null,
    )

  const [isLoading, setIsLoading] =
    useState(false)

  const handleSubmit =
  
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault()

      if (
        !title.trim() ||
        !content.trim()
      ) {
        toast.error(
          "Judul dan konten tidak boleh kosong",
        )

        return
      }

      setIsLoading(true)

      try {
        const formData =
          new FormData()

        formData.append(
          "title",
          title,
        )

        formData.append(
          "content",
          content,
        )

        formData.append(
          "category",
          category,
        )

        if (image) {
          formData.append(
            "image",
            image,
          )
        }
        console.log({
  title,
  content,
  category,
})
        await newsService.create(
          formData,
        )

        toast.success(
          "Konten berhasil ditambahkan",
        )

        router.push(
          "/dashboard/news",
        )
      } catch (
        error: any
      ) {
        console.error(
          "Failed to create content",
          error,
        )

        toast.error(
          error.response
            ?.data
            ?.message ||
            "Gagal menyimpan konten",
        )
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/dashboard/news"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 mb-2"
          >

            <ChevronLeft className="mr-1 h-4 w-4" />

            Kembali ke Content Management

          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Tambah Konten
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Buat berita, promo,
            FAQ, artikel, atau
            pengumuman baru.
          </p>

        </div>

      </div>

      <Card>

        <CardContent className="pt-6 space-y-6">

          <form
            className="space-y-6"
            onSubmit={
              handleSubmit
            }
          >

            <div className="space-y-2">

              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Judul Konten
              </label>

              <Input
                id="title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value,
                  )
                }
                required
                placeholder="Masukkan judul konten..."
              />

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

           <Select
  defaultValue="NEWS"
  onValueChange={(value) => {
    console.log(
      "CATEGORY:",
      value,
    )

    setCategory(value)
  }}
>

  <SelectTrigger
    className="
      border-yellow-300
      focus:ring-2
      focus:ring-yellow-400
      focus:border-yellow-400
      bg-yellow-50/40
    "
  >

    <SelectValue placeholder="Pilih category" />

  </SelectTrigger>

  <SelectContent
    className="
      z-[9999]
      bg-white
      border-yellow-200
      shadow-2xl
      rounded-xl
    "
  >

    <SelectItem
      value="NEWS"
      className="
        focus:bg-yellow-100
        focus:text-yellow-900
      "
    >
      📰 News
    </SelectItem>

    <SelectItem
      value="PROMO"
      className="
        focus:bg-yellow-100
        focus:text-yellow-900
      "
    >
      ✨ Promo
    </SelectItem>

    <SelectItem
      value="FAQ"
      className="
        focus:bg-yellow-100
        focus:text-yellow-900
      "
    >
      ❓ FAQ
    </SelectItem>

    <SelectItem
      value="ANNOUNCEMENT"
      className="
        focus:bg-yellow-100
        focus:text-yellow-900
      "
    >
      📢 Announcement
    </SelectItem>

    <SelectItem
      value="ARTICLE"
      className="
        focus:bg-yellow-100
        focus:text-yellow-900
      "
    >
      📘 Article
    </SelectItem>

  </SelectContent>

</Select>

            </div>

            <div className="space-y-2">

              <label
                htmlFor="content"
                className="text-sm font-medium text-gray-700"
              >
                Konten
              </label>

              <textarea
                id="content"
                rows={8}
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value,
                  )
                }
                required
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Tulis isi konten disini..."
              />

            </div>

            <div className="space-y-2">

              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700"
              >
                Gambar Cover
                (Opsional)
              </label>

              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target
                      .files?.[0] ||
                      null,
                  )
                }
              />

              <p className="text-xs text-gray-500">
                Maksimal ukuran file
                2MB.
              </p>

            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">

              <Link href="/dashboard/news">

                <Button
                  type="button"
                  variant="outline"
                >
                  Batal
                </Button>

              </Link>

              <Button
                type="submit"
                disabled={
                  isLoading
                }
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading
                  ? "Menyimpan..."
                  : "Simpan Konten"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>
    </div>
  )
}