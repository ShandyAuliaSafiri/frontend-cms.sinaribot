"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateKnowledgePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/knowledge" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 mb-2">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar QnA
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Tambah QnA (Knowledge)</h1>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium text-gray-700">Pertanyaan / Variasi Input</label>
              <Input id="question" placeholder="Masukkan pertanyaan pelanggan..." />
              <p className="text-xs text-gray-500">Contoh: "Berapa lama proses cuci kering?"</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium text-gray-700">Jawaban Bot</label>
              <textarea 
                id="answer" 
                rows={4}
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                placeholder="Masukkan jawaban yang akan diberikan Sinaribot..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="intent" className="text-sm font-medium text-gray-700">Kategori / Intent</label>
              <select 
                id="intent"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="" disabled selected>Pilih Intent</option>
                <option value="layanan">Layanan</option>
                <option value="harga">Harga</option>
                <option value="promo">Promo</option>
                <option value="lokasi">Lokasi</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
              <Link href="/dashboard/knowledge">
                 <Button type="button" variant="outline">Batal</Button>
              </Link>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Simpan QnA</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
