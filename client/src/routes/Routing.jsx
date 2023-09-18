import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Private from "./Private";


const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Private><Home /></Private>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing