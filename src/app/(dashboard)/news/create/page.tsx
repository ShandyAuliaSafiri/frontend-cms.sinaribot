"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { newsService } from "@/services/news.service"
import { useRouter } from "next/navigation"

export default function CreateNewsPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      if (image) {
        formData.append("image", image)
      }

      await newsService.create(formData)
      router.push("/news")
    } catch (error) {
      console.error("Failed to create news", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/news" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 mb-2">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Berita
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Berita</h1>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Judul Berita</label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Masukkan judul berita..." />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium text-gray-700">Konten</label>
              <textarea 
                id="content" 
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                placeholder="Tulis konten berita disini..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-gray-700">Gambar Cover (Opsional)</label>
              <Input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
              <p className="text-xs text-gray-500">Maksimal ukuran file 2MB.</p>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
              <Link href="/news">
                 <Button type="button" variant="outline">Batal</Button>
              </Link>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan Berita"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
