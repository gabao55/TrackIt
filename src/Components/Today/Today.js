import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import checkmark from "../Shared/assets/Checkmark.png";
import {DayWrapper, ListWrapper, HabitsDetails, HabitsCheckmark, Colored } from "./styles";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { checkHabit, getTodayHabits, uncheckHabit } from "../../Services/trackit";
import dayjs from "dayjs";
import translateDay from "./daysCorrespondence";

export default function Today() {
    const { userData } = useContext(UserContext);
    
    return (
        <>
            <Navbar />
            <MainWrapper>
                <DayWrapper>
                    <h2>{translateDay(dayjs().day())}, {dayjs().date()}/{dayjs().month()+1}</h2>
                    {
                        userData.completed > 0 ?
                        <span>{(userData.completed/userData.total*100).toFixed(0)}% dos hábitos concluídos</span> :
                        <p>Nenhum hábito concluído ainda!</p>
                    }
                </DayWrapper>
                <ListWrapper>
                    <HabitsList />
                </ListWrapper>
            </MainWrapper>
            <Footer />
        </>
    )
}

function HabitsList() {
    const [changeState, setChangeState] = useState(0);
    const [habits, setHabits] = useState([]);
    const { userData, setUserData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    useEffect(() => {
        getTodayHabits(config).then(response => {
            setHabits({...response.data});
            setUserData({
                ...userData,
                completed : response.data.filter(habit => habit.done).length,
                total : response.data.length,
            });
        });
    }, [changeState]);

    function check(habitId) {
        checkHabit(habitId, config)
        .then(() => {
            setUserData({
                ...userData,
                completed: userData.completed + 1
            });
            setHabits({...habits});
            setChangeState(changeState+1);
        })
        .catch((error) => console.log(error));
    }

    function uncheck(habitId) {
        uncheckHabit(habitId, config)
        .then(() => {
            setUserData({
                ...userData,
                completed: userData.completed - 1
            });
            setHabits({...habits});
            setChangeState(changeState+1);
        })
        .catch((error) => console.log(error));
    }

    return (
        <>
            {
                habits.length === 0 ?
                "" :
                <HabitsListDetails habits={habits} check={check} uncheck={uncheck} />
            }            
        </>
    )
}

function HabitsListDetails({ habits, check, uncheck }) {
    return (
        <>
            {Object.keys(habits).map(habitIndex => { 
                const habit = habits[habitIndex];
                return (
                <li key={habitIndex}>
                    <HabitsDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: {habit.done ? <Colored green>{habit.currentSequence} dias</Colored> : <Colored>{habit.currentSequence} dias</Colored> }</p>
                        <p>Seu recorde: {(habit.currentSequence === habit.highestSequence && habit.highestSequence !== 0) ? <Colored green>{habit.highestSequence} dias</Colored> : <Colored>{habit.highestSequence} dias</Colored>}</p>
                    </HabitsDetails>
                    {habit.done ?
                        <HabitsCheckmark green onClick={() => {uncheck(habit.id)}}>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark> :
                        <HabitsCheckmark onClick={() => {check(habit.id)}}>
                            <img src={checkmark} alt="checkmark icon" />
                        </HabitsCheckmark>
                    }
                </li>
            )})}
        </>
    )
}