import { BrowserRouter,Routes,Route } from "react-router-dom"


import TodoDetail from "./pages/todo_detail.page.jsx"
import HomePage from "./pages/home.page.jsx"
import NotFound from "./pages/not_found.page.jsx"


function App(){
  return(   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/todo/:id" element={<TodoDetail/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
     
  )
}

export default App