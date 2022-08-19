import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { deleteHabit, getAllHabits } from "../../Services/trackit";
import { daysCorrespondence } from "./daysCorrespondence";
import { DaysWrapper, HabitsWrapper } from "./styles";

export default function HabitsList({ isLoading, isDeleting, setIsDeleting }) {
    const { userData, setUserData } = useContext(UserContext);
    const [allHabits, setAllHabits] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    useEffect(() => {
        getAllHabits(config).then(response => {
            setAllHabits(response.data);
        });
    }, [isLoading, isDeleting]);

    function deleteItem(habit) {
        const confirmation = window.confirm(`Você quer realmente deletar o hábito ${habit.name}`);
        if (confirmation) {
            if (habit.days.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total : userData.total - 1,
                });
            }
            deleteHabit(habit.id, config).then(() => {
                setIsDeleting(!isDeleting);
            });
        }
    }

    return (
        <>
            { allHabits.length === 0 ?
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> :
                allHabits.map((habit, index) => <HabitDetails key={index} habit={habit} deleteItem={deleteItem} />)
            }
        </>
    )
}

function HabitDetails ({ habit, deleteItem }) {
    return (
        <>
            <HabitsWrapper>
                <h3>{habit.name}</h3>
                <DaysWrapper>
                    {daysCorrespondence.map(day => {
                        return <Day key={day.index} dayObj={day} habitDays={habit.days} />
                    })}
                </DaysWrapper>
                <ion-icon name="trash-outline" onClick={() => deleteItem(habit)}></ion-icon>
            </HabitsWrapper>
        </>
    )
}

function Day({ dayObj, habitDays }) {
    function renderDayBox() {
        if (habitDays.length === 0) {
            return <span key={dayObj.index}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index}>{dayObj.letter}</b> :
        <span key={dayObj.index}>{dayObj.letter}</span>
    }

    return renderDayBox()
}