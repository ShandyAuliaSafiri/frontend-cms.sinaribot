"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import Swal from "sweetalert2";

import { toast } from "sonner";

import {
  satuanItemService,
} from "@/services/satuan-item.service";
import {
  useSearchParams,
} from "next/navigation"
export default function SatuanItemsPage() {

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isEditMode, setIsEditMode] =
    useState(false);

  const [currentId, setCurrentId] =
    useState<number | null>(null);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [formLoading, setFormLoading] =
    useState(false);

  const fetchItems =
  async () => {

    try {

      setLoading(true);

      const res =
        await satuanItemService.getAll();

      setData(res);

      setError(null);

    } catch (err: any) {

      setError(
        err.message ||
        "Error fetching items",
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleOpenCreateModal =
  () => {

    setIsEditMode(false)

    setCurrentId(null)

    setName("")
    setDescription("")

    setIsModalOpen(true)
  }

  const handleOpenEditModal =
  (item: any) => {

    setIsEditMode(true)

    setCurrentId(item.id)

    setName(item.name || "")

    setDescription(
      item.description || "",
    )

    setIsModalOpen(true)
  }

  const closeModal = () => {

    setIsModalOpen(false)

    setName("")
    setDescription("")
  }

  const handleSubmit =
  async (
    e: React.FormEvent,
  ) => {

    e.preventDefault()

    setFormLoading(true)

    try {

      const payload = {
        name,
        description,
      }

      if (
        isEditMode &&
        currentId
      ) {

        await satuanItemService.update(
          currentId,
          payload,
        )

      } else {

        await satuanItemService.create(
          payload,
        )
      }

      toast.success(
        isEditMode
          ? "Item updated"
          : "Item created",
      )

      closeModal()

      fetchItems()

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ||
        err.message,
      )

    } finally {

      setFormLoading(false)

    }
  }

  const handleDelete =
  async (
    id: number,
  ) => {

    const result =
      await Swal.fire({

        title:
          "Delete item?",

        text:
          "Item akan dihapus",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonColor:
          "#059669",

        cancelButtonColor:
          "#dc2626",

        confirmButtonText:
          "Ya, hapus",
      })

    if (result.isConfirmed) {

      try {

        await satuanItemService.delete(
          id,
        )

        toast.success(
          "Item deleted",
        )

        fetchItems()

      } catch {

        toast.error(
          "Failed delete item",
        )
      }
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

    item.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase(),
      ),
  )
  return (
    <div className="space-y-6 relative">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Satuan Items
        </h1>

        <Button
          onClick={
            handleOpenCreateModal
          }
          className="flex items-center gap-2"
        >

          <Plus className="h-4 w-4" />

          Add Item

        </Button>
      </div>

      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <Card className="w-full max-w-lg bg-white relative">

            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={closeModal}
            >

              <X className="h-4 w-4" />

            </Button>

            <CardHeader>

              <CardTitle>
                {
                  isEditMode
                  ? "Edit Item"
                  : "Create Item"
                }
              </CardTitle>

            </CardHeader>

            <CardContent>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value,
                    )
                  }
                  placeholder="Item Name"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                />

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value,
                    )
                  }
                  placeholder="Description"
                  className="flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm"
                />

                <div className="flex justify-end gap-2 pt-4">

                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={formLoading}
                  >
                    {
                      formLoading
                      ? "Saving..."
                      : "Save"
                    }
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>

        <CardHeader>
          <CardTitle>
            All Items
          </CardTitle>
        </CardHeader>

        <CardContent>

          {loading ? (

            <div className="p-4 text-center">
              Loading...
            </div>

          ) : error ? (

            <div className="p-4 text-center text-red-500">
              {error}
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50">

                  <tr>

                    <th className="px-6 py-3">
                      Item Name
                    </th>

                    <th className="px-6 py-3">
                      Description
                    </th>

                    <th className="px-6 py-3 text-right">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                 {filteredData.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="px-6 py-4 font-medium">
                        {item.name}
                      </td>

                      <td className="px-6 py-4">
                        {item.description}
                      </td>

                      <td className="px-6 py-4 text-right flex justify-end gap-2">

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleOpenEditModal(
                              item,
                            )
                          }
                        >

                          <Pencil className="h-4 w-4" />

                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              item.id,
                            )
                          }
                        >

                          <Trash2 className="h-4 w-4" />

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