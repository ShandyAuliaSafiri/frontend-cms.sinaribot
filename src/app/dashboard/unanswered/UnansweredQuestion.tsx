'use client'
export const dynamic = "force-dynamic";
import {
  useEffect,
  useState,
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Button,
} from '@/components/ui/button'

import {
  RefreshCcw,
  CheckCircle2,
} from 'lucide-react'

import {
  unansweredService,
} from '@/services/unanswered.service'
import {
  useSearchParams,
} from "next/navigation"
export default function UnansweredPage() {

  const [data, setData] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [resolvingId, setResolvingId] =
    useState<number | null>(null)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    fetchUnanswered()
  }, [])

  const fetchUnanswered =
    async () => {

      try {

        setLoading(true)

        const res =
          await unansweredService.getAll()

        console.log(
          '🔥 UNANSWERED:',
          res,
        )

        setData(res)

        setError(null)

      } catch (err: any) {

        console.log(
          '❌ ERROR:',
          err,
        )

        console.log(
          '❌ RESPONSE:',
          err.response,
        )

        setError(
          err.response?.data?.message ||
          err.message ||
          'Error fetching unanswered questions',
        )

      } finally {

        setLoading(false)
      }
    }

  const handleResolve =
    async (id: number) => {

      try {

        setResolvingId(id)

        await unansweredService.resolve(id)

        alert(
          '✅ Berhasil dijadikan QnA',
        )

        await fetchUnanswered()

      } catch (err: any) {

        console.log(
          '❌ RESOLVE ERROR:',
          err,
        )

        console.log(
          '❌ RESPONSE:',
          err.response,
        )

        alert(
          err.response?.data?.message ||
          'Gagal resolve question',
        )

      } finally {

        setResolvingId(null)
      }
    }
const searchParams =
  useSearchParams()

const search =
  searchParams.get(
    "search",
  ) || ""
  const filteredData =
  data.filter((item) =>

    item.question
      ?.toLowerCase()
      .includes(
        search.toLowerCase(),
      ),
  )


  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Unanswered Questions
          </h1>

          <p className="text-sm text-gray-500">
            Pertanyaan yang gagal dijawab AI.
          </p>
        </div>

        <Button
          onClick={fetchUnanswered}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />

          Refresh
        </Button>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>
            Needs Review
          </CardTitle>
        </CardHeader>

        <CardContent>

          {loading ? (

            <div className="p-6 text-center text-gray-500">
              Loading unanswered questions...
            </div>

          ) : error ? (

            <div className="p-6 text-center text-red-500">
              {error}
            </div>

          ) : data.length === 0 ? (

            <div className="p-6 text-center text-gray-500">
              Tidak ada unanswered question 🎉
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left">

                <thead className="text-xs uppercase bg-gray-50 text-gray-700">

                  <tr>

                    <th className="px-6 py-3">
                      Pertanyaan
                    </th>

                    <th className="px-6 py-3">
                      Waktu
                    </th>

                    <th className="px-6 py-3 text-right">
                      Aksi
                    </th>

                  </tr>

                </thead>

                <tbody>

                 {filteredData.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 font-medium">
                        {item.question}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(
                          item.createdAt,
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-right">

                        <Button
                          size="sm"
                          onClick={() =>
                            handleResolve(item.id)
                          }
                          disabled={
                            resolvingId === item.id
                          }
                          className="gap-1"
                        >

                          <CheckCircle2 className="h-4 w-4" />

                          {resolvingId === item.id
                            ? 'Resolving...'
                            : 'Resolve'}

                        </Button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </CardContent>

      </Card>

    </div>
  )
}