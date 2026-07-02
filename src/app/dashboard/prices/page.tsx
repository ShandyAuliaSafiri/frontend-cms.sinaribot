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
  priceService,
} from "@/services/price.service";

import {
  branchServiceApi,
} from "@/services/branch-service.service";
import {
  useSearchParams,
} from "next/navigation"
import {
  satuanItemService,
} from "@/services/satuan-item.service";
export default function PricesPage() {

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
const [branchServices, setBranchServices] =
  useState<any[]>([])

const [items, setItems] =
  useState<any[]>([])
  const [currentId, setCurrentId] =
    useState<number | null>(null);

  const [price, setPrice] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [minimalQty, setMinimalQty] =
    useState("");

  const [maxQty, setMaxQty] =
    useState("");

  const [unit, setUnit] =
    useState("KG");

  const [branchServiceId, setBranchServiceId] =
    useState("");

  const [satuanItemId, setSatuanItemId] =
    useState("");

  const [formLoading, setFormLoading] =
    useState(false);

  const fetchPrices = async () => {
    try {

      setLoading(true);

      const res =
        await priceService.getAll();

      setData(res);

      setError(null);

    } catch (err: any) {

      setError(
        err.message ||
        "Error fetching prices",
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

  fetchPrices()

  fetchRelations()

}, [])
  const handleOpenCreateModal = () => {

    setIsEditMode(false)

    setCurrentId(null)

    setPrice("")
    setDuration("")
    setMinimalQty("")
    setMaxQty("")
    setUnit("KG")
    setBranchServiceId("")
    setSatuanItemId("")

    setIsModalOpen(true)
  }

  const handleOpenEditModal = (
    item: any,
  ) => {

    setIsEditMode(true)

    setCurrentId(item.id)

    setPrice(item.price || "")

    setDuration(
      item.duration || "",
    )

    setMinimalQty(
      item.minimalQty || "",
    )

    setMaxQty(
      item.maxQty || "",
    )

    setUnit(item.unit || "KG")

    setBranchServiceId(
      item.branchServiceId || "",
    )

    setSatuanItemId(
      item.satuanItemId || "",
    )

    setIsModalOpen(true)
  }

  const closeModal = () => {

    setIsModalOpen(false)

    setPrice("")
    setDuration("")
    setMinimalQty("")
    setMaxQty("")
    setUnit("KG")
    setBranchServiceId("")
    setSatuanItemId("")
  }
const fetchRelations =
async () => {

  try {

    const branchServiceRes =
      await branchServiceApi.getAll()

    const itemRes =
      await satuanItemService.getAll()

    setBranchServices(
      branchServiceRes,
    )

    setItems(itemRes)

  } catch (error) {

    console.error(error)

  }
}
  const handleSubmit =
  async (
    e: React.FormEvent,
  ) => {

    e.preventDefault()

    setFormLoading(true)

    try {

      const payload = {

        price:
          Number(price),

        duration,

        minimalQty:
          minimalQty
            ? Number(minimalQty)
            : null,

        maxQty:
          maxQty
            ? Number(maxQty)
            : null,

        unit,

        branchServiceId:
          Number(branchServiceId),

        satuanItemId:
          satuanItemId
            ? Number(satuanItemId)
            : null,
      }

      if (
        isEditMode &&
        currentId
      ) {

        await priceService.update(
          currentId,
          payload,
        )

      } else {

        await priceService.create(
          payload,
        )
      }

      toast.success(
        isEditMode
          ? "Price updated"
          : "Price created",
      )

      closeModal()

      fetchPrices()

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
          "Delete price?",

        text:
          "Data akan dihapus",

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

        await priceService.delete(
          id,
        )

        toast.success(
          "Price deleted",
        )

        fetchPrices()

      } catch {

        toast.error(
          "Failed delete price",
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
const filteredData = data.filter((item) => {
  const keyword = search.toLowerCase()

  return (
    item.branchService?.service?.name
      ?.toLowerCase()
      .includes(keyword) ||

    item.satuanItem?.name
      ?.toLowerCase()
      .includes(keyword) ||

    item.branchService?.branch?.name
      ?.toLowerCase()
      .includes(keyword) ||

    item.duration
      ?.toLowerCase()
      .includes(keyword) ||

    item.unit
      ?.toLowerCase()
      .includes(keyword) ||

    String(item.price)
      .includes(search)
  )
})

  return (
    <div className="space-y-6 relative">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Prices
        </h1>

        <Button
          onClick={
            handleOpenCreateModal
          }
          className="flex items-center gap-2"
        >

          <Plus className="h-4 w-4" />

          Add Price

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
                  ? "Edit Price"
                  : "Create Price"
                }
              </CardTitle>

            </CardHeader>

            <CardContent>

  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >

    {/* BRANCH SERVICE */}
    <select
      required
        disabled={isEditMode}
      value={branchServiceId}
      onChange={(e) =>
        setBranchServiceId(
          e.target.value,
        )
      }
      className="
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
      "
    >

      <option value="">
        Select Branch Service
      </option>

      {branchServices.map((bs) => (

        <option
          key={bs.id}
          value={bs.id}
        >

          {bs.branch.name}
          {" - "}
          {bs.service.name}

        </option>
      ))}
    </select>

    {/* ITEM */}
    <select
    disabled={isEditMode}
      value={satuanItemId}
      onChange={(e) =>
        setSatuanItemId(
          e.target.value,
        )
      }
      className="
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
      "
    >

      <option value="">
        Select Item
      </option>
{items.map((item) => (

  <option
    key={item.id}
    value={item.id}
  >
    {item.name}
  </option>

))}
     
    </select>

    {/* PRICE */}
    <input
      type="number"
      required
      value={price}
      onChange={(e) =>
        setPrice(
          e.target.value,
        )
      }
      placeholder="Price"
      className="
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
      "
    />

    {/* DURATION */}
    <input
      type="text"
      required
      value={duration}
      onChange={(e) =>
        setDuration(
          e.target.value,
        )
      }
      placeholder="Duration"
      className="
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
      "
    />

    {/* UNIT */}
    <select
    disabled={isEditMode}
      value={unit}
      onChange={(e) =>
        setUnit(
          e.target.value,
        )
      }
      className="
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
      "
    >

      <option value="KG">
        KG
      </option>

      <option value="PCS">
        PCS
      </option>

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
            All Prices
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
                <div className="mb-4">

  

</div>

              <table className="w-full text-sm text-left">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50">

                  <tr>
                    <th className="px-6 py-3">
                      Service
                    </th>
                     <th className="px-6 py-3">
                      Item
                    </th>

                    <th className="px-6 py-3">
                      Branch
                    </th>

                    <th className="px-6 py-3">
                      Price
                    </th>

                    <th className="px-6 py-3">
                      Duration
                    </th>

                    <th className="px-6 py-3">
                      Unit
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
                          item.branchService
                          ?.service?.name
                        }

                      </td>
                     <td className="px-6 py-4">
                       {item.satuanItem?.name ?? "-"}
                       </td>
                      <td className="px-6 py-4">

                        {
                          item.branchService
                          ?.branch?.name
                        }

                      </td>

                      <td className="px-6 py-4">

                        Rp
                        {item.price}

                      </td>

                      <td className="px-6 py-4">
                        {item.duration}
                      </td>

                      <td className="px-6 py-4">
                        {item.unit}
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