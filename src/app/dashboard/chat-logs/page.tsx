"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import api from "@/lib/api"

interface ChatLog {
  id: number
  customerName: string | null
  phoneNumber: string | null
  question: string
  answer: string
  createdAt: string
}

export default function ChatHistoryPage() {
  const [logs, setLogs] = useState<ChatLog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const res = await api.get("/chat-logs")
      setLogs(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])
 const searchParams = useSearchParams()

const search =
  searchParams.get("search")?.toLowerCase() || ""

const filteredLogs = logs.filter((log) =>
  log.customerName?.toLowerCase().includes(search) ||
  log.phoneNumber?.includes(search) ||
  log.question?.toLowerCase().includes(search) ||
  log.answer?.toLowerCase().includes(search)
)
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Chat History
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Riwayat percakapan pelanggan dengan Sinaribots
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border p-6">
          Loading...
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>

                <th className="p-4 text-left">
                  Nama
                </th>

                <th className="p-4 text-left">
                  No. Telepon
                </th>

                <th className="p-4 text-left">
                  Pertanyaan
                </th>

                <th className="p-4 text-left">
                  Jawaban
                </th>

                <th className="p-4 text-left">
                  Waktu
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredLogs.map((log) => (

                <tr
                  key={log.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {log.customerName ?? "-"}
                  </td>

                  <td className="p-4">
                    {log.phoneNumber ?? "-"}
                  </td>

                  <td className="p-4 max-w-sm">
                    {log.question}
                  </td>

                  <td className="p-4 max-w-md">
                    {log.answer}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {!filteredLogs.length && (
            <div className="p-10 text-center text-gray-500">
              Belum ada riwayat chat.
            </div>
          )}

        </div>
      )}
    </div>
  )
}