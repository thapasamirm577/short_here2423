import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Eror404 from "./component/404error/Eror404";

import Home from './component/home';
import Login from './component/login/login';
import Register from "./component/login/register";
import Mylink from "./component/Mylink/mylink";
import Navbar from "./component/Navbar";

export default function Router(){
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/user/login" element={<Login />} exact />
                <Route path="/user/register" element={<Register />} exact />
                <Route path="/user/mylink" element={<Mylink />} exact />
                <Route path="*" element={<Eror404 />} exact />
            </Routes>
        </BrowserRouter>
    )
}