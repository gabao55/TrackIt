import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import checkmark from "../Shared/assets/Checkmark.png";
import { checkHabit, getTodayHabits, uncheckHabit } from "../../Services/trackit";
import { Colored, HabitsCheckmark, HabitsDetails } from "./styles";

export default function HabitsList() {
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

    

    console.log(userData);

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