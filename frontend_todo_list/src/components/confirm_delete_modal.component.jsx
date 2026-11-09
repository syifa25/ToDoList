import { Trash, LoaderCircle } from "lucide-react"


function ConfirmDeleteModal({ onClose, onContinue, onLoading }) {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50">
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 w-100  border border-gray-200">
                <div className="flex items-center justify-center p-4 bg-red-600 rounded-full">
                    <Trash className="text-white" />
                </div>
                <h2 className="text-gray-900 font-semibold mt-4 text-xl">Yakin ingin menghapus?</h2>
                <p className="text-sm text-gray-600 mt-2 text-center">
                    Segala data todo akan terhapus.<br />Aksi tidak dapat dipulihkan.
                </p>
                <div className="flex items-center justify-center gap-4 mt-5 w-full">
                    <button onClick={() => onClose()} disabled={onLoading} type="button" className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-blue-600 text-white font-medium text-sm hover:bg-blue-800 active:scale-95 transition">
                        Cancel
                    </button>
                    <button onClick={() => onContinue()} disabled={onLoading} type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-800 active:scale-95 transition">
                        {onLoading ? (
                            <div className="flex justify-center">
                                <LoaderCircle className="animate-spin" />
                            </div>

                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>


    )
}

export default ConfirmDeleteModal