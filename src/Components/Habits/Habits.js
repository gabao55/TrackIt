import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../../Contexts/UserContext";
import { createHabit, deleteHabit, getAllHabits } from "../Services/trackit";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import { CreateHabitWrapper, CreateHabit, ActionWrapper, HabitsWrapper, DaysWrapper } from "./styles";

export default function Habits() {
    const [isCreatingHabit, setIsCreatingHabit] = useState(false);
    const [form, setForm] = useState({
        name: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { userData } = useContext(UserContext);
    const [habitDays, setHabitDays] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };
    const [allHabits, setAllHabits] = useState([]);
    const allDays = [
        {
            index: 0,
            letter: "D"
        },
        {
            index: 1,
            letter: "S"
        },
        {
            index: 2,
            letter: "T"
        },
        {
            index: 3,
            letter: "Q"
        },
        {
            index: 4,
            letter: "Q"
        },
        {
            index: 5,
            letter: "S"
        },
        {
            index: 6,
            letter: "S"
        },
    ]

    useEffect(() => {
        getAllHabits(config).then(response => {
            setAllHabits(response.data);
        });
    }, [isLoading, isDeleting]);

    function handleForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function sendForm(e) {
        e.preventDefault();
        setIsLoading(!isLoading);
        const body = {
            ...form,
            days: habitDays.sort(),
        }
        
        const promise = createHabit(body, config);

        promise.then(response => {
            setIsLoading(false);
            setIsCreatingHabit(false);
            setHabitDays([]);
            setForm({
                name: "",
            })
        });

        promise.catch(() => alert("Erro ao criar hábito"));
    }

    return (
        <>
            <Navbar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Meus hábitos</h2>
                    <button onClick={() => setIsCreatingHabit(true)}>+</button>
                </CreateHabitWrapper>
                {isCreatingHabit ?
                <CreateHabit>
                    <input
                        type="text" 
                        placeholder="nome do hábito" 
                        name="name"
                        onChange={(e) => {
                            handleForm({
                                name: e.target.name,
                                value: e.target.value
                            })
                        }}
                        value={form.name}
                        required
                        disabled={isLoading ? true : false}
                    />
                    <Days allDays={allDays} habitDays={habitDays} setHabitDays={setHabitDays} isLoading={isLoading} />
                    <ActionWrapper>
                        {isLoading ?
                            <>
                                <span style={{opacity: 0.7}}>Cancelar</span>
                                <button><ThreeDots color="#FFFFFF" height={40} width={40} /></button>
                            </> :
                            <>
                                <span onClick={() => setIsCreatingHabit(false)}>Cancelar</span>
                                <button onClick={sendForm}>Salvar</button>
                            </>
                        }
                    </ActionWrapper>
                </CreateHabit> :
                ""
                }
                { allHabits.length === 0 ?
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> :
                    allHabits.map((habit, index) => <HabitsList key={index} allDays={allDays} habit={habit} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />)
                }
                
            </MainWrapper>
            <Footer />
        </>
    )
}

function Days({ allDays, habitDays, setHabitDays, isLoading }) {
    function selectHabitDay(dayNumber) {
        if (isLoading) {
            return
        }

        if (habitDays.includes(dayNumber)) {
            const newDays = removeItem(habitDays, dayNumber);
            setHabitDays(newDays);
            return
        }

        setHabitDays([...habitDays, dayNumber]);
        return
    }

    function removeItem(array, value) {
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }

        return [...array]
    }

    function renderDayBox(dayObj) {
        if (habitDays === undefined) {
            return <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</b> :
        <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
    }

    return (
    <DaysWrapper>
        {allDays.map(day => renderDayBox(day))}
    </DaysWrapper>
    )
}

function HabitsList({ allDays, habit, isDeleting, setIsDeleting }) {
    const { userData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    function renderDayBox(dayObj, habitDays) {
        if (habitDays.length === 0) {
            return <span key={dayObj.index}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index}>{dayObj.letter}</b> :
        <span key={dayObj.index}>{dayObj.letter}</span>
    }

    function deleteItem() {
        const confirmation = window.confirm(`Você quer realmente deletar o hábito ${habit.name}`);
        if (confirmation) {
            deleteHabit(habit.id, config).then(response => {
                setIsDeleting(!isDeleting);
            });
        }
    }

    console.log(habit.id);

    return (
        <>
            <HabitsWrapper>
                <h3>{habit.name}</h3>
                <DaysWrapper>
                    {allDays.map(day => {
                        return <Day key={day.index} dayObj={day} habitDays={habit.days} />
                    })}
                </DaysWrapper>
                <ion-icon name="trash-outline" onClick={deleteItem}></ion-icon>
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