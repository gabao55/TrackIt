import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import Habits from "../Habits/Habits";
import History from "../History/History";
import Login from "../Login/Login";
import Register from "../Login/Register";
import GlobalStyle from "../Shared/globalStyle";
import Today from "../Today/Today";

export default function App() {
	const [userData, setUserData] = useState("");

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{userData, setUserData}}>
                <BrowserRouter>
                    <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/cadastro" element={<Register />} />
                            <Route path="/habitos" element={<Habits />} />
                            <Route path="/hoje" element={<Today />} />
                            <Route path="/historico" element={<History />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}