import { Trash, Eye, LoaderCircle } from "lucide-react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import ConfirmDeleteModal from "./confirm_delete_modal.component";


function TodoCard({ id, judul, status, prioritas, deadline, onDelete }) {
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        try {
            setLoading(true)
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
                { method: "DELETE" }
            );

            const result = await response.json();

            onDelete()

            console.log(result.message);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setConfirm(false)
        }
    }

    return (
        <div className="rounded shadow p-4 grid grid-cols-5 items-center">
            <h1 className="truncate w-52">{judul}</h1>
            <h1>{status}</h1>
            <h1>{prioritas}</h1>
            <h1>{deadline.split("T")[0]}</h1>

            <div className="flex justify-center gap-4">
                <button onClick={() => navigate(`/todo/${id}`)} className="bg-blue-600 w-10 flex justify-center rounded p-2 active:scale-90 transition-all duration-100 hover:bg-blue-800">
                    <Eye className="text-white" />
                </button>

                <button onClick={() => setConfirm(true)} className="bg-red-600 w-10 flex justify-center rounded p-2 active:scale-90 transition-all duration-100 hover:bg-red-800">
                    {
                        loading ? <LoaderCircle className="text-white" /> : <Trash className="text-white" />
                    }

                </button>
                {
                    confirm && <ConfirmDeleteModal onClose={() => setConfirm(false)} onContinue={() => handleDelete()} onLoading={loading}/>
                }

            </div>
        </div>
    )
}

export default TodoCard