"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  Plus,
  Edit2,
  Trash2,
} from "lucide-react"

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
  userService,
  User,
} from "@/services/user.service"
import {
  useSearchParams,
} from "next/navigation"
export default function UsersPage() {
  const [users, setUsers] =
    useState<User[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)

      const data =
        await userService.getAll()

      setUsers(data)
    } catch (error) {
      console.error(error)

      alert(
        "Gagal mengambil data admin",
      )
    } finally {
      setIsLoading(false)
    }
  }

const searchParams =
  useSearchParams()

const search =
  searchParams.get(
    "search",
  ) || ""

const filteredData =
  users.filter((item) =>
    item.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase(),
      ) ||
    item.email
      ?.toLowerCase()
      .includes(
        search.toLowerCase(),
      ),
  )

const handleDelete = async (
  id: number,
) => {
  const confirmDelete =
    confirm(
      "Yakin ingin menghapus admin ini?",
    )

  if (!confirmDelete) return

  try {
    await userService.delete(id)

    fetchUsers()

    alert(
      "Admin berhasil dihapus",
    )
  } catch (error) {
    console.error(error)

    alert(
      "Gagal menghapus admin",
    )
  }
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Kelola Admin
          </h1>

          <p className="text-sm text-gray-500">
            Manajemen akun admin
            CMS.
          </p>
        </div>

        <Link href="/dashboard/users/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Admin
          </Button>
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Nama
              </TableHead>

              <TableHead>
                Email
              </TableHead>

              <TableHead>
                Role
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
                  colSpan={4}
                  className="text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length ===
              0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center"
                >
                  Tidak ada admin
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((user: User) => (
                <TableRow
                  key={user.id}
                >
                  <TableCell>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>
                    {user.role}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/users/edit/${user.id}`}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                        >
                          <Edit2 className="h-4 w-4 text-emerald-600" />
                        </Button>
                      </Link>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDelete(
                            user.id,
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
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