import { LoaderCircle } from "lucide-react"
import { useState } from "react"

function AddTodoModal({ onClose, onUpdate, description, todoData }) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState({
        title: todoData?.title || "",
        description: todoData?.description || "",
        status: todoData?.status || "to-do",
        priority: todoData?.priority || "low",
        deadline: todoData?.deadline?.split("T")[0] || ""
    });

    function handleChange(e) {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            setError("");

            if (!data.title || !data.description || !data.deadline) {
                return setError("Semua Field Diperlukan!");
            }

            const isUpdate = Boolean(todoData?.id);

            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/todos${isUpdate ? `/${todoData.id}` : ""}`,
                {
                    method: isUpdate ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            onUpdate();
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="absolute bg-black/50 inset-0 flex justify-center items-center">
            <div className="bg-white flex flex-col gap-2 py-4 px-8 w-1/3 rounded">
                <h1 className="text-2xl pb-4 text-center font-semibold">{description}</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">Judul</h1>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="shadow p-2 border border-blue-600 rounded"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">Deskripsi</h1>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="shadow p-2 border border-blue-600 rounded"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold">Status</h1>
                            <select
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                                className="border border-blue-600 rounded p-2"
                            >
                                <option value="to-do">to-do</option>
                                <option value="in progress">in progress</option>
                                <option value="done">done</option>
                            </select>
                        </div>


                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold">Prioritas</h1>
                            <select
                                name="priority"
                                value={data.priority}
                                onChange={handleChange}
                                className="border border-blue-600 rounded p-2"
                            >
                                <option value="low">low</option>
                                <option value="medium">medium</option>
                                <option value="high">high</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2 pb-4">
                        <h1 className="text-xl font-bold">Deadline</h1>
                        <input
                            name="deadline"
                            value={data.deadline}
                            onChange={handleChange}
                            type="date"
                            className="shadow p-2 border border-blue-600 rounded"
                        />

                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className={error ? "text-red-600 font-bold text-center pb-2" : "hidden"}>{error}</h1>
                        <div className="grid grid-cols-2  gap-2 ">
                            <button disabled={loading} className="text-xl bg-red-600 hover:bg-red-800 text-white rounded py-1" onClick={onClose}>Batal</button>
                            <button disabled={loading} className="text-xl bg-blue-600 hover:bg-blue-800 text-white  rounded py-1" onClick={handleSubmit}>
                                {loading ? (
                                    <div className="flex justify-center">
                                        <LoaderCircle className="animate-spin" />
                                    </div>
                                ) : todoData ? (
                                    "Update"
                                ) : (
                                    "Tambah"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default AddTodoModal