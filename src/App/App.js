import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";
import GlobalStyle from "../Shared/globalStyle";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}