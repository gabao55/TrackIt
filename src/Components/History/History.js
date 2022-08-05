import { CreateHabitWrapper } from "../Habits/styles";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import Calendar from 'react-calendar'
import { useContext, useEffect, useState } from "react";
import { getHistory } from "../Services/trackit";
import UserContext from "../../Contexts/UserContext";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

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

    function classifyHistory(historyArr) {
        const classification = [];
        for (let i=0; i < historyArr.length; i ++) {
            const [day, month, year] = historyArr[i].day.split('/');
            const date = new Date(+year, month - 1, +day);
            let isDone = true;
            for (let j = 0; j < historyArr[i].habits.length; j ++) {
                if (historyArr[i].habits[j].done === false) {
                    isDone = false;
                }
            }
            classification.push({
                date,
                isDone,
            })
        }
        return classification
    }

    function paintTiles({ date }) {
        let paint;
        const currentDate = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
        const today = new Date();
        const todayDate = {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
        }

        if (compareDates(todayDate, currentDate)) {
            return ""
        }
        
        historyChecks.map(day => {
            const historyDate = {
                day: day.date.getDate(),
                month: day.date.getMonth(),
                year: day.date.getFullYear(),
            }
            if (compareDates(historyDate, currentDate)) {
                if (day.isDone) {
                    paint = true;
                } else {
                    paint = false;
                }
            }

            return ""
        })

        if (paint) {
            return "date-green"
        } else if (paint === undefined) {
            return ""
        }

        return "date-red"
    }

    function compareDates(dateObj1, dateObj2) {
        if (dateObj1.day === dateObj2.day &&
            dateObj1.month === dateObj2.month &&
            dateObj1.year === dateObj2.year) {
                return true
            }

        return false
    }

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
                    onChange={date => paintTiles(date)}
                    tileClassName={date => paintTiles(date)} />
                </CalendarContainer>
            </MainWrapper>
            <Footer />
        </>
    )
}

const CalendarContainer = styled.div`
    > div {
        width: 335px;
        height: 402px;
        border: none;
        border-radius: 10px;
    }

    .react-calendar__tile abbr {
        width: 20px;
    }

    .date-red {
        background-color: #ea5766;
        border-radius: 50%;
    }

    .date-green {
        background-color: #8cc653;
        border-radius: 50%;
    }
`;