import { useEffect, useState } from "react"
import TodoCard from "../components/todo_card.component"
import TodoModal from "../components/todo_modal.component"
import { Ghost, LoaderCircle } from "lucide-react"


function HomePage() {

    const [todoModal, setTodoModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`)

            const todo = await response.json()

            setData(todo.data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    function handleDelete(id) {
        setData(prev => prev.filter(e => e.id != id))
    }


    return (
        <div className="flex flex-col gap-2 p-8">

            <div className="flex justify-between  items-center p-4">
                <h1 className="text-5xl font-bold">Todo List</h1>
                <button onClick={() => setTodoModal(prev => !prev)} className="bg-blue-600 w-32 text-white flex justify-center rounded p-2 active:scale-90 transition-all duration-100 hover:bg-blue-800">Tambah Todo</button>
            </div>

            {
                todoModal && <TodoModal onClose={() => setTodoModal(false)} description={"Tambah Todo"} onUpdate={()=>fetchData()}/>
            }

            {
                data.length != 0 ? (<div className="grid grid-cols-5 px-4 ">
                    <h1 className="text-xl font-bold">Judul</h1>
                    <h1 className="text-xl font-bold">Status</h1>
                    <h1 className="text-xl font-bold">Prioritas</h1>
                    <h1 className="text-xl font-bold">Deadline</h1>
                    <h1 className="text-xl text-center font-bold">Aksi</h1>
                </div>) : (
                    <div className="flex justify-center items-center  absolute -z-10 inset-0">
                        <div className="flex flex-col gap-4 items-center ">
                            {
                                loading ?
                                    <div className="flex flex-col gap-2 items-center">
                                        <LoaderCircle size={60} className="animate-spin" />
                                        <h1 className="text-2xl font-bold text-center">Mengambil Data</h1>
                                    </div>

                                    :

                                    <div className="flex flex-col gap-2 items-center">
                                        <Ghost size={60} className="animate-pulse" />
                                        <h1 className="text-2xl font-bold text-center">Belum ada <br /> Todo List</h1>
                                    </div>

                            }

                        </div>
                    </div>
                )


            }

            <div>
                {data.map(todo => (
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        judul={todo.title}
                        status={todo.status}
                        prioritas={todo.priority}
                        deadline={todo.deadline}
                        onDelete={() => handleDelete(todo.id)}
                        onUpdate={() =>fetchData()}
                    />
                ))}
            </div>


        </div>

    )
}

export default HomePage