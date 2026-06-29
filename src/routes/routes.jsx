import {Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import Register from "../pages/register"
import Admin from "../pages/admin"
import Private from "./private"
import Erro from "../pages/error"

const RoutApp = () => {
    return (
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/admin" element={<Private> <Admin/> </Private>}/>

                <Route path="*" element={ <Erro/>}/>
            </Routes>
      
    )
}

export default RoutApp