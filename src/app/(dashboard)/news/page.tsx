"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Toolbar, SearchInput } from "@/components/ui/table"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { newsService, News } from "@/services/news.service"
import Link from "next/link"

export default function NewsPage() {
  const [newsData, setNewsData] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const data = await newsService.getAll()
      setNewsData(data)
    } catch (error) {
      console.error("Failed to fetch news", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await newsService.delete(id)
        fetchNews()
      } catch (error) {
        console.error("Failed to delete news", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRUD Berita (News)</h1>
          <p className="text-sm text-gray-500">Kelola artikel dan berita untuk pelanggan.</p>
        </div>
        <Link href="/dashboard/news/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
             <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
           <Toolbar>
              <SearchInput placeholder="Cari berita..." />
           </Toolbar>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Dibuat Oleh</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : (
              newsData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <span>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-"}</TableCell>
                  <TableCell>{item.author?.name || "Admin"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/dashboard/news/edit/${item.id}`}>
                        <Button variant="ghost" size="icon" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
