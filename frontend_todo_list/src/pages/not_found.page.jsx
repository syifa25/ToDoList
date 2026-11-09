import { Home } from "lucide-react"
import { Link } from "react-router-dom"


function NotFound(){
    return(
        <div className="h-screen flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-2 items-center">
          <h1 className="text-8xl font-bold">
                404
            </h1>
             <h1 className="text-5xl font-bold">
                Not Found 
            </h1>
            </div>
          
            <div className="flex gap-2 items-center">
                <Link className="text-2xl font-bold" to="/">Kembali ke beranda</Link>
                <Home/>
            </div>  
            
        </div>
    )
}

export default NotFound