import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import checkmark from "../Shared/assets/Checkmark.png";
import {DayWrapper, ListWrapper, HabitsDetails, HabitsCheckmark, Colored } from "./styles";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { getTodayHabits } from "../Services/trackit";

export default function Today() {
    const [habits, setHabits] = useState({});
    const { userData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    console.log(userData);

    useEffect(() => {
        getTodayHabits(config).then(response => setHabits({...response.data}));
    }, [])
    
    return (
        <>
            <Navbar />
            <MainWrapper>
                <DayWrapper>
                    <h2>Segunda, 17/05</h2>
                    <p>Nenhum hábito concluído ainda!</p>
                </DayWrapper>
                <ListWrapper>
                    <HabitDetail />
                </ListWrapper>
            </MainWrapper>
            <Footer />
        </>
    )
}

function HabitDetail() {
    const habits = [
        {
            name: "Ler 1 capítulo de livro",
            sequence: 3,
            record: 5,
            checked: true,
        },
        {
            name: "Ler 1 capítulo de livro",
            sequence: 3,
            record: 5,
            checked: false,
        },
        {
            name: "Ler 1 capítulo de livro",
            sequence: 3,
            record: 5,
            checked: false,
        },
    ]

    return (
        <>
            {habits.map((habit, index) => (
                <li key={index}>
                    <HabitsDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: <Colored green>{habit.sequence} dias</Colored></p>
                        <p>Seu recorde: <Colored>{habit.record} dias</Colored></p>
                    </HabitsDetails>
                    {habit.checked ?
                        <HabitsCheckmark green>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark> :
                        <HabitsCheckmark>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark>
                     }
                </li>
            ))}
        </>
    )
}