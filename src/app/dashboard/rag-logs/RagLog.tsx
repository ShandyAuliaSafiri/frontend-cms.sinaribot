"use client"
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import api from "@/lib/api"

interface RagLog {
  id: number
  question: string
  similarity: number
  topK: number
  threshold: number
  retrievedContext: string
  finalAnswer: string
  createdAt: string
}

export default function RagLogsPage() {

  const [logs, setLogs] =
    useState<RagLog[]>([])

  const [loading, setLoading] =
    useState(true)


  const fetchLogs = async () => {

    try {

      const res =
        await api.get("/rag-logs")

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
  log.question?.toLowerCase().includes(search) ||
  log.retrievedContext?.toLowerCase().includes(search) ||
  log.finalAnswer?.toLowerCase().includes(search)
)

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          RAG Logs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitoring Retrieval-Augmented Generation chatbot
        </p>
      </div>

      {/* SEARCH */}
      <div>

        
      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white rounded-xl border border-gray-200 p-6">

          <p className="text-sm text-gray-500">
            Loading RAG logs...
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {filteredLogs.map((log) => (

            <div
              key={log.id}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
                shadow-sm
              "
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="font-semibold text-gray-900">
                    {log.question}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      log.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      log.similarity >= log.threshold
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {log.similarity >= log.threshold
                    ? "PASS"
                    : "FAIL"}
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mt-5">

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    Similarity
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                   {Number(log.similarity).toFixed(4)}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    Top-K
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    {log.topK}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    Threshold
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    {log.threshold}
                  </h3>
                </div>
              </div>

              {/* CONTEXT */}
              <div className="mt-5">

                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Retrieved Context
                </h3>

                <div
                  className="
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    p-4
                    text-sm
                    text-gray-700
                    whitespace-pre-wrap
                  "
                >
                  {log.retrievedContext}
                </div>
              </div>

              {/* FINAL ANSWER */}
              <div className="mt-5">

                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Final AI Response
                </h3>

                <div
                  className="
                    bg-emerald-50
                    border
                    border-emerald-200
                    rounded-xl
                    p-4
                    text-sm
                    text-gray-700
                    whitespace-pre-wrap
                  "
                >
                  {log.finalAnswer}
                </div>
              </div>
            </div>
          ))}

          {!filteredLogs.length && (

            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-xl
                p-10
                text-center
              "
            >

              <p className="text-sm text-gray-500">
                Belum ada data RAG logs 😭
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}