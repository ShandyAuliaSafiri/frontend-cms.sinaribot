'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

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
  MessageSquare,
  Newspaper,
  Users,
  BarChart3,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Bot,
  Activity,
  LogOut,
  ChevronRight
} from 'lucide-react'

import {
  dashboardService,
} from '@/services/dashboard.service'

import { useRouter } from 'next/navigation'

import Cookies from 'js-cookie'

export default function DashboardPage() {
  const router = useRouter()

  const [data, setData] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const token =
      Cookies.get('admin_token')

    if (!token) {
      router.push('/login')
      return
    }

    fetchDashboard()
  }, [router])

const fetchDashboard =
  async () => {

    try {

      const res =
        await dashboardService.getDashboard()

      console.log(res)

      setData(res)

    } catch (error) {

      console.log(error)

      Cookies.remove(
        'admin_token',
      )

      router.push('/login')

    } finally {

      setLoading(false)
    }
  }

if (loading || !data) {

  return (

    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative w-20 h-20 animate-pulse">
        <img src="/images/logo.sinari.jpeg" alt="SINARI Logo" className="object-cover rounded-full" />
      </div>
      <p className="text-gray-500 font-medium animate-pulse">Loading dashboard...</p>
    </div>
  )
}

  const stats = [
    {
      title: 'Total QnA',
      value:
        data?.stats?.totalQna || 0,
      icon: MessageSquare,
      color:
        'from-emerald-500 to-emerald-700 shadow-emerald-500/30',
      desc:
        'Knowledge chatbot aktif',
    },

    {
      title: 'Total Promo',
      value:
        data?.stats?.totalNews || 0,
      icon: Newspaper,
      color:
        'from-sky-500 to-sky-700 shadow-sky-500/30',
      desc:
        'Konten promo terbaru',
    },

    {
      title: 'Total Pengguna',
      value:
        data?.stats?.totalUsers || 0,
      icon: Users,
      color:
        'from-violet-500 to-violet-700 shadow-violet-500/30',
      desc:
        'Pengguna bot aktif',
    },

    {
      title: 'Total Pesan',
      value:
        data?.stats?.totalQuestions || 0,
      icon: BarChart3,
      color:
        'from-amber-500 to-amber-700 shadow-amber-500/30',
      desc:
        'Interaksi chatbot',
    },
  ]

  return (

    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">

      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          bg-white
          p-6
          rounded-3xl
          border
          border-gray-100
          shadow-sm
        "
      >

        <div className="flex items-center gap-5">
           <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
             <img src="/images/logo.sinari.jpeg" alt="SINARI" className="h-full w-full object-cover" />
           </div>
           <div>

            <h1
              className="
                text-3xl
                font-black
                text-gray-900
                tracking-tight
              "
            >
              Halo, Admin SINARI! 👋
            </h1>

            <p
              className="
                text-gray-500
                mt-1
              "
            >
              Pantau aktivitas layanan cuci dan performa chatbot cerdas Anda.
            </p>

          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Link href="/dashboard/unanswered">

            <Button
              className="
                rounded-xl
                bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 text-white font-semibold transition-all hover:-translate-y-0.5
              "
            >

              <AlertTriangle className="h-4 w-4 mr-2" />

              {data?.stats?.unanswered || 0}
              {' '}
              Pesan Butuh Bantuan

            </Button>

          </Link>

          

        </div>

      </div>

      {/* KPI */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {stats.map(
          (item, index) => (

            <div
              key={index}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                p-6
                text-white
                shadow-xl
                transition-all
                hover:-translate-y-1
                hover:shadow-2xl
                bg-gradient-to-br
                ${item.color}
              `}
            >

              <div
                className="
                  absolute
                  -right-6
                  -top-6
                  opacity-10
                  transition-transform
                  group-hover:scale-110
                  duration-500
                "
              >

                <item.icon className="w-32 h-32" />

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-white/80
                      text-sm
                      font-medium
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                      mt-2
                      tracking-tight
                    "
                  >
                    {item.value}
                  </h2>

                </div>

                <div
                  className="
                    bg-white/20
                    p-3
                    rounded-2xl
                    backdrop-blur-sm
                  "
                >

                  <item.icon className="h-6 w-6" />

                </div>

              </div>

              <div
                className="
                  mt-6
                  pt-4
                  border-t
                  border-white/20
                  flex
                  items-center
                  justify-between
                "
              >

                <p
                  className="
                    text-xs
                    text-white/80
                  "
                >
                  {item.desc}
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-semibold
                    bg-white/20
                    px-2 py-1
                    rounded-lg
                  "
                >

                  <ArrowUpRight className="h-3 w-3" />
                  Live

                </div>

              </div>

            </div>
          ),
        )}

</div>

{/* INSIGHTS */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >
        <Card className="rounded-3xl border-0 shadow-md bg-gradient-to-br from-emerald-50 flex items-center p-5 to-white overflow-hidden relative">
          <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-100 rotate-12" />
          <div className="z-10 relative space-y-1">
             <div className="text-emerald-800 text-sm font-semibold flex items-center gap-2 mb-2"><Bot className="w-4 h-4"/> Topik Favorit Hari Ini</div>
             <p className="text-gray-900 font-bold text-lg leading-tight">
               "{data?.insights?.topQuestion || 'Belum ada data'}"
             </p>
          </div>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-gradient-to-br from-orange-50 flex items-center p-5 to-white overflow-hidden relative">
          <Activity className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-100 -rotate-12" />
          <div className="z-10 relative space-y-1">
             <div className="text-orange-800 text-sm font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4"/> Rasio Delay Respon</div>
             <p className="text-gray-900 font-bold text-lg leading-tight">
               <span className="text-orange-600">{data?.insights?.unansweredPercent || 0}%</span> pesan belum diproses AI
             </p>
          </div>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-gradient-to-br from-blue-50 flex items-center p-5 to-white overflow-hidden relative">
          <Users className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-100 rotate-12" />
          <div className="z-10 relative space-y-1">
             <div className="text-blue-800 text-sm font-semibold flex items-center gap-2 mb-2"><MessageSquare className="w-4 h-4"/> Aktivitas Pengguna</div>
             <p className="text-gray-900 font-bold text-lg leading-tight">
               <span className="text-blue-600">{data?.insights?.totalQuestions || 0}</span> chatbot dijalankan
             </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
      {/* ACTIVITY */}
      <Card
        className="
          rounded-3xl
          border-gray-100
          shadow-sm
          h-full
        "
      >

        <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-3xl">

          <CardTitle
            className="
              flex
              items-center
              justify-between
            "
          >
           <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-600" />
            <span className="text-lg">Log Percakapan Live</span>
           </div>
           <Link href="/dashboard/unanswered" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center font-medium">Lihat Semua <ChevronRight className="w-4 h-4"/></Link>
          </CardTitle>

        </CardHeader>

        <CardContent className="pt-6">

          <div className="space-y-6">

            {data.recentActivities?.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p>Belum ada history obrolan masuk</p>
              </div>
            )}

            {data.recentActivities
              ?.slice(0, 5)
              ?.map(
                (
                  item: any,
                  index: number,
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      gap-4
                      group
                    "
                  >

                    <div className="flex flex-col items-center">
                       <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:scale-125 transition-transform" />
                       {index !== Math.min(data.recentActivities.length, 5) - 1 && (
                         <div className="w-px h-full bg-gray-100 my-1"/>
                       )}
                    </div>

                    <div className="pb-4">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-gray-900
                        "
                      >
                        "{item.question}"
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                          mt-1.5
                          flex items-center gap-1
                        "
                      >
                        {new Date(
                          item.createdAt,
                        ).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                      </p>

                    </div>

                  </div>
                ),
              )}

          </div>

        </CardContent>

      </Card>

      {/* TOP QUESTIONS */}
      <Card
        className="
          rounded-3xl
          border-gray-100
          shadow-sm
          h-full
        "
      >

        <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-3xl">

          <CardTitle
            className="
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            <span className="text-lg">Topik Sering Ditanyakan</span>
            </div>
          </CardTitle>

        </CardHeader>

        <CardContent className="pt-6">

          <div
            className="space-y-4"
          >

            {data.topQuestions?.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Bot className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p>Belum ada data topik masuk</p>
              </div>
            )}

            {data.topQuestions?.map(
              (
                item: any,
                index: number,
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    border
                    border-gray-100
                    hover:border-emerald-100
                    hover:bg-emerald-50/50
                    transition-all
                    group
                  "
                >

                  <div className="flex items-center gap-4">

                    <p
                      className="
                        text-sm font-black
                        text-gray-300
                        group-hover:text-emerald-500
                        transition-colors
                        w-6
                      "
                    >
                      #{index + 1}
                    </p>

                    <h3
                      className="
                        font-medium
                        text-gray-800
                      "
                    >
                      {item.question}
                    </h3>

                  </div>

                  <div
                    className="
                      h-10
                      px-4
                      rounded-xl
                      bg-gray-50
                      group-hover:bg-emerald-100
                      group-hover:text-emerald-700
                      flex
                      items-center
                      justify-center
                      text-gray-500
                      font-bold
                      text-sm
                      transition-colors
                    "
                  >

                    {item._count.question}x

                  </div>

                </div>
              ),
            )}

          </div>

        </CardContent>

      </Card>
      </div>
    </div>
  )
}