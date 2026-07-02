"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { knowledgeService } from "@/services/knowledge.service";
import Swal from "sweetalert2"
import { toast } from "sonner"
import {
  useSearchParams,
} from "next/navigation"

export default function KnowledgePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [intent, setIntent] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchKnowledge = async () => {
    try {
      setLoading(true);
      const res = await knowledgeService.getAll();
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error fetching knowledge");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setIntent('general');
    setQuestion('');
    setAnswer('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setIsEditMode(true);
    setCurrentId(item.id);
    setIntent(item.intent || '');
    setQuestion(item.question || '');
    setAnswer(item.answer || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIntent('general');
    setQuestion('');
    setAnswer('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Question and Answer are required.");
      return;
    }
    
    setFormLoading(true);
    try {
      const payloadIntent = intent.trim() || 'general';
      if (isEditMode && currentId) {
        await knowledgeService.update(currentId, { intent: payloadIntent, question, answer });
      } else {
        await knowledgeService.create({ intent: payloadIntent, question, answer });
      }
      closeModal();
      fetchKnowledge();
    } catch (err: any) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete =
  async (id: number) => {
    const result =
      await Swal.fire({
        title:
          "Hapus QnA?",

        text:
          "Data knowledge akan dihapus",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor:
          "#059669",

        cancelButtonColor:
          "#dc2626",

        confirmButtonText:
          "Ya, hapus",

        cancelButtonText:
          "Batal",
      })

    if (result.isConfirmed) {
      try {
        await knowledgeService.delete(
          id,
        )

        toast.success(
          "Knowledge berhasil dihapus",
        )

        fetchKnowledge()
      } catch (error) {
        console.error(error)

        toast.error(
          "Gagal menghapus knowledge",
        )
      }
    }
  };
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
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <Button onClick={handleOpenCreateModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add QnA
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg bg-white relative">
            <Button variant="ghost" className="absolute top-2 right-2" onClick={closeModal}>
              <X className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle>{isEditMode ? "Edit QnA" : "Create QnA"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Intent (Optional)</label>
                  <input
                    type="text"
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="E.g. general"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Question</label>
                  <input
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="E.g. What is your name?"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Response / Answer</label>
                  <textarea
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="E.g. Hello, how can I help you?"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All QnA Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : data.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No knowledge entries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Question / Intent</th>
                    <th className="px-6 py-3">Answer</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {filteredData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-6 py-4 font-medium">{item.question || item.intent || 'N/A'}</td>
                      <td className="px-6 py-4">{item.answer}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
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
  );
}