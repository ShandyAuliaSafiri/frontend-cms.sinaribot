"use client"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Plus,
  Edit2,
  Trash2,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import {
  useSearchParams,
} from "next/navigation"

import {
  newsService,
  News,
} from "@/services/news.service"

import Link from "next/link"

import Swal from "sweetalert2"

import { toast } from "sonner"

export default function NewsPage() {
  const [newsData, setNewsData] =
    useState<News[]>([])
const [selectedCategory, setSelectedCategory] =
  useState("ALL")
  const searchParams = useSearchParams()

const search =
  searchParams.get("search")?.toLowerCase() || ""
  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setIsLoading(true)

      const data =
        await newsService.getAll()

      setNewsData(data)
    } catch (error) {
      console.error(
        "Failed to fetch news",
        error,
      )
    } finally {
      setIsLoading(false)
    }
  }
const filteredNews = newsData.filter((item) => {
  const matchCategory =
    selectedCategory === "ALL" ||
    item.category === selectedCategory

  const matchSearch =
    item.title?.toLowerCase().includes(search) ||
    item.content?.toLowerCase().includes(search) ||
    item.category?.toLowerCase().includes(search) ||
    item.author?.name?.toLowerCase().includes(search)

  return matchCategory && matchSearch
})
  const handleDelete =
    async (id: number) => {
      const result =
        await Swal.fire({
          icon: "warning",

          title:
            "Hapus konten?",

          text:
            "Konten yang dihapus tidak dapat dikembalikan.",

          showCancelButton: true,

          confirmButtonColor:
            "#059669",

          cancelButtonColor:
            "#dc2626",

          confirmButtonText:
            "Ya, hapus",

          cancelButtonText:
            "Batal",
        })

      if (
        result.isConfirmed
      ) {
        try {
          await newsService.delete(
            id,
          )

          toast.success(
            "Konten berhasil dihapus",
          )

          fetchNews()
        } catch (error) {
          console.error(
            error,
          )

          toast.error(
            "Gagal menghapus konten",
          )
        }
      }
    }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Content Management
          </h1>

          <p className="text-sm text-gray-500">
            Kelola berita, promo,
            FAQ, artikel, dan
            pengumuman.
          </p>
        </div>

        <Link href="/dashboard/news/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />

            Tambah Konten
          </Button>
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="p-4 border-b border-gray-200">
          
          <div className="flex flex-wrap gap-2 mt-4">

  {[
    "ALL",
    "NEWS",
    "PROMO",
    "FAQ",
    "ARTICLE",
    "ANNOUNCEMENT",
  ].map((category) => (

    <button
      key={category}
      onClick={() =>
        setSelectedCategory(
          category,
        )
      }
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all

        ${
          selectedCategory ===
          category
            ? "bg-emerald-600 text-white"

            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {category}
    </button>

  ))}
</div>
        </div>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead className="w-12">
                No
              </TableHead>

              <TableHead>
                Judul
              </TableHead>

              <TableHead>
                Category
              </TableHead>

              <TableHead>
                Tanggal
              </TableHead>

              <TableHead>
                Dibuat Oleh
              </TableHead>

              <TableHead className="text-right">
                Aksi
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {isLoading ? (
              <TableRow>

                <TableCell
                  colSpan={6}
                  className="text-center"
                >
                  Loading...
                </TableCell>

              </TableRow>
            ) : (
              filteredNews.map(
                (
                  item,
                  index,
                ) => (
                  <TableRow
                    key={item.id}
                  >

                    <TableCell className="font-medium">
                      {index + 1}
                    </TableCell>

                    <TableCell>

                      <div className="flex items-center gap-3">

                        {item.imageUrl ? (
                          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">

                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                              alt={
                                item.title
                              }
                              className="h-full w-full object-cover"
                            />

                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200" />
                        )}

                        <span>
                          {item.title}
                        </span>

                      </div>

                    </TableCell>

                    <TableCell>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-semibold

                          ${
                            item.category ===
                            "PROMO"
                              ? "bg-pink-100 text-pink-700"

                            : item.category ===
                              "FAQ"
                              ? "bg-blue-100 text-blue-700"

                            : item.category ===
                              "ANNOUNCEMENT"
                              ? "bg-yellow-100 text-yellow-700"

                            : item.category ===
                              "ARTICLE"
                              ? "bg-purple-100 text-purple-700"

                            : "bg-emerald-100 text-emerald-700"
                          }
                        `}
                      >
                        {item.category}
                      </span>

                    </TableCell>

                    <TableCell>

                      {item.createdAt
                        ? new Date(
                            item.createdAt,
                          ).toLocaleDateString(
                            "id-ID",
                          )
                        : "-"}

                    </TableCell>

                    <TableCell>

                      {item.author
                        ?.name ||
                        "Admin"}

                    </TableCell>

                    <TableCell className="text-right">

                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/dashboard/news/edit/${item.id}`}
                        >

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>

                        </Link>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() =>
                            handleDelete(
                              item.id,
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>

                    </TableCell>

                  </TableRow>
                ),
              )
            )}

          </TableBody>

        </Table>

      </div>
    </div>
  )
}