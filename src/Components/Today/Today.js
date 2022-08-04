import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import checkmark from "../Shared/assets/Checkmark.png";
import {DayWrapper, ListWrapper, HabitsDetails, HabitsCheckmark, Colored } from "./styles";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { getTodayHabits } from "../Services/trackit";
import dayjs from "dayjs";

export default function Today() {
    const [habits, setHabits] = useState([]);
    const { userData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    useEffect(() => {
        getTodayHabits(config).then(response => setHabits({...response.data}));
    }, []);

    console.log(habits);

    function translateDay(dayNumber) {
        let conversion;
        switch (dayNumber) {
            case 0:
                conversion = "Domingo";
                break;
            case 1:
                conversion = "Segunda";
                break;
            case 2:
                conversion = "Terça";
                break;
            case 3:
                conversion = "Quarta";
                break;
            case 4:
                conversion = "Quinta";
                break;
            case 5:
                conversion = "Sexta";
                break;
            default:
                conversion = "Sábado"
        }

        return conversion
    }
    
    return (
        <>
            <Navbar />
            <MainWrapper>
                <DayWrapper>
                    <h2>{translateDay(dayjs().day())}, {dayjs().date()}/{dayjs().month()+1}</h2>
                    <p>Nenhum hábito concluído ainda!</p>
                </DayWrapper>
                <ListWrapper>
                    {
                        habits.length === 0 ?
                        "" :
                        <HabitDetail habits={habits} />
                    }
                </ListWrapper>
            </MainWrapper>
            <Footer />
        </>
    )
}

function HabitDetail({ habits }) {
    return (
        <>
            {Object.keys(habits).map(habitIndex => { 
                const habit = habits[habitIndex];
                return (
                <li key={habitIndex}>
                    <HabitsDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: <Colored green>{habit.currentSequence} dias</Colored></p>
                        <p>Seu recorde: <Colored>{habit.highestSequence} dias</Colored></p>
                    </HabitsDetails>
                    {habit.done ?
                        <HabitsCheckmark green>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark> :
                        <HabitsCheckmark>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark>
                     }
                </li>
            )})}
        </>
    )
}