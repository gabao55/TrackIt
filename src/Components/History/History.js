import { CreateHabitWrapper } from "../Habits/styles";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import Calendar from 'react-calendar'
import { useContext, useEffect, useState } from "react";
import { getHistory } from "../../Services/trackit";
import UserContext from "../../Contexts/UserContext";
import 'react-calendar/dist/Calendar.css';
import { CalendarContainer } from "./styles";
import { classifyHistory, paintTiles } from "./calendarCustomization";

export default function History() {
    const [history, setHistory] = useState([]);
    const { userData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };
    
    useEffect(() => {
        const promise = getHistory(config);

        promise
        .then(response => setHistory(response.data))
        .catch(error => console.log(error));
    }, []);

    const historyChecks = classifyHistory(history);

    return (
        <>
            <Navbar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Histórico</h2>
                </CreateHabitWrapper>
                <CalendarContainer>
                    <Calendar
                    calendarType="US"
                    onChange={date => paintTiles(date, historyChecks)}
                    tileClassName={date => paintTiles(date, historyChecks)} />
                </CalendarContainer>
            </MainWrapper>
            <Footer />
        </>
    )
}