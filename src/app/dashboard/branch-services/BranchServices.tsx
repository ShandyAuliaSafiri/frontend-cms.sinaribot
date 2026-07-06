"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

import Swal from "sweetalert2";

import { toast } from "sonner";

import {
  branchServiceApi,
} from "@/services/branch-service.service";

import {
  branchService,
} from "@/services/branch.service";

import {
  serviceService,
} from "@/services/service.service";
import {
  useSearchParams,
} from "next/navigation"

export default function BranchServicesPage() {

  const [data, setData] =
    useState<any[]>([]);

  const [branches, setBranches] =
    useState<any[]>([]);

  const [services, setServices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [branchId, setBranchId] =
    useState("");

  const [serviceId, setServiceId] =
    useState("");

  const [formLoading, setFormLoading] =
    useState(false);

  const fetchData =
  async () => {

    try {

      setLoading(true);

      const [
        relationRes,
        branchRes,
        serviceRes,
      ] = await Promise.all([

        branchServiceApi.getAll(),

        branchService.getAll(),

        serviceService.getAll(),
      ])

      setData(relationRes)

      setBranches(branchRes)

      setServices(serviceRes)

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed fetch data",
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const closeModal = () => {

    setIsModalOpen(false)

    setBranchId("")

    setServiceId("")
  }

  const handleSubmit =
  async (
    e: React.FormEvent,
  ) => {

    e.preventDefault()

    setFormLoading(true)

    try {

      await branchServiceApi.create({

        branchId:
          Number(branchId),

        serviceId:
          Number(serviceId),
      })

      toast.success(
        "Relation created",
      )

      closeModal()

      fetchData()

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed create relation",
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
          "Delete relation?",

        text:
          "Relasi akan dihapus",

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

        await branchServiceApi.delete(
          id,
        )

        toast.success(
          "Relation deleted",
        )

        fetchData()

      } catch {

        toast.error(
          "Failed delete relation",
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
  data.filter((item) => {

    const branch =
      item.branch?.name
        ?.toLowerCase() || ""

    const service =
      item.service?.name
        ?.toLowerCase() || ""

    return (

      branch.includes(
        search.toLowerCase(),
      ) ||

      service.includes(
        search.toLowerCase(),
      )
    )
  })

  return (
    <div className="space-y-6 relative">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Branch Services
        </h1>

        <Button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="flex items-center gap-2"
        >

          <Plus className="h-4 w-4" />

          Add Relation

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
                Create Relation
              </CardTitle>

            </CardHeader>

            <CardContent>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <select
                  required
                  value={branchId}
                  onChange={(e) =>
                    setBranchId(
                      e.target.value,
                    )
                  }
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >

                  <option value="">
                    Select Branch
                  </option>

                  {branches.map((branch) => (

                    <option
                      key={branch.id}
                      value={branch.id}
                    >

                      {branch.name}

                    </option>
                  ))}
                </select>

                <select
                  required
                  value={serviceId}
                  onChange={(e) =>
                    setServiceId(
                      e.target.value,
                    )
                  }
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >

                  <option value="">
                    Select Service
                  </option>

                  {services.map((service) => (

                    <option
                      key={service.id}
                      value={service.id}
                    >

                      {service.name}

                    </option>
                  ))}
                </select>

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
            All Relations
          </CardTitle>

        </CardHeader>

        <CardContent>

          {loading ? (

            <div className="p-4 text-center">
              Loading...
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50">

                  <tr>

                    <th className="px-6 py-3">
                      Branch
                    </th>

                    <th className="px-6 py-3">
                      Service
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

                      <td className="px-6 py-4">

                        {
                          item.branch?.name
                        }

                      </td>

                      <td className="px-6 py-4">

                        {
                          item.service?.name
                        }

                      </td>

                      <td className="px-6 py-4 text-right">

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