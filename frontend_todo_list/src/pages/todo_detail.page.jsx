import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AddTodoModal from "../components/todo_modal.component"

function TodoDetail() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [update, setUpdate] = useState(false)



    useEffect(() => {
        fetchTodoDetail()
    }, [])

    async function fetchTodoDetail() {
        try {
            setLoading(true)

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${id}`)

            const todo = await response.json()

            return setData(todo.data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (

        loading ?
            <div className="h-screen flex flex-col justify-center items-center gap-4">
                <LoaderCircle className="animate-spin" size={60} />
                <h1 className="text-2xl font-bold">Fetching todo detail...</h1>
            </div>

            :
            <div className="h-screen flex justify-center items-center b">
                <div className="w-3xl shadow p-8 grid grid-cols-3 gap-8 rounded-xl">
                    <div className="flex flex-col gap-4 col-span-2">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-2xl">Judul</h1>
                            <p>{data.title}</p>
                        </div>

                        <div className="flex flex-col ">
                            <h1 className="font-bold text-2xl">Deskripsi</h1>
                            <div className=" overflow-y-scroll h-32 shadow p-2 rounded">
                                {
                                    data.description
                                }
                            </div>

                        </div>
                    </div>

                    <div className="grid">
                        <div>
                            <h1 className="font-bold text-2xl">Status</h1>
                            <p>{data.status}</p>

                        </div>

                        <div>
                            <h1 className="font-bold text-2xl">Prioritas</h1>
                            <p>{data.priority}</p>
                        </div>

                        <div>
                            <h1 className="font-bold text-2xl">Deadline</h1>
                            <p>{data?.deadline?.split("T")[0]}</p>

                        </div>

                        <div>

                        </div>
                        <div className="grid grid-cols-2 gap-2 rows-">
                            <button onClick={() => navigate("/")} className="bg-red-600 active:scale-90 transition-all duration-150 hover:bg-red-800 text-white rounded">
                                Kembali
                            </button>
                            <button onClick={() => setUpdate(true)} className="bg-blue-600 hover:bg-blue-800 active:scale-90 text-white rounded transition-all duration-150">Update</button>
                        </div>

                        {
                            update && <AddTodoModal
                                onClose={() => setUpdate(false)}
                                onUpdate={fetchTodoDetail}
                                description="Update Todo"
                                todoData={data}
                            />

                        }
                    </div>
                </div>
            </div>

    )
}

export default TodoDetail