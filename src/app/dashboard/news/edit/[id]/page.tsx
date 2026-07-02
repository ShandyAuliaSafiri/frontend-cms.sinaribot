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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  newsService,
} from "@/services/news.service"

import {
  toast,
} from "sonner"

export default function EditNewsPage() {
  const params =
    useParams()

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

  const id = Number(
    params.id,
  )

  useEffect(() => {
    if (id) {
      fetchNews()
    }
  }, [id])

  const fetchNews =
    async () => {
      try {
        const data =
          await newsService.getById(
            id,
          )

        setTitle(
          data.title,
        )

        setContent(
          data.content,
        )

        setCategory(
          data.category ||
            "NEWS",
        )
      } catch (error) {
        console.error(
          "Failed to fetch news",
          error,
        )

        toast.error(
          "Gagal mengambil konten",
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
        console.log(
  "UPDATE CATEGORY:",
  category,
)
        await newsService.update(
          id,
          formData,
        )

        toast.success(
          "Konten berhasil diperbarui",
        )

        router.push(
          "/dashboard/news",
        )
      } catch (
        error: any
      ) {
        console.error(
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

      <div>

        <Link
          href="/dashboard/news"
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Edit Konten
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Kelola berita, promo,
          FAQ, artikel, dan
          pengumuman.
        </p>

      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5 bg-white p-6 rounded-xl border shadow-sm"
      >

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Judul
          </label>

          <Input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value,
              )
            }
            placeholder="Masukkan judul konten"
          />

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Category
          </label>

          <Select
    value={category}
  onValueChange={(value) => {
    console.log(
      "EDIT CATEGORY:",
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

          <label className="text-sm font-medium">
            Konten
          </label>

          <textarea
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value,
              )
            }
            rows={8}
            className="w-full rounded-md border p-3"
            placeholder="Isi konten..."
          />

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Ganti Gambar
          </label>

          <Input
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

        </div>

        <Button
          type="submit"
          disabled={
            isLoading
          }
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading
            ? "Menyimpan..."
            : "Update Konten"}
        </Button>

      </form>
    </div>
  )
}