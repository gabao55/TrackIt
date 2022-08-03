import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../../Contexts/UserContext";
import { createHabit } from "../Services/trackit";
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
    const { userData } = useContext(UserContext);
    const [habitDays, setHabitDays] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };


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

        console.log(body);
        
        const promise = createHabit(body, config);

        promise.then(response => {
            console.log(response.data); 
            setIsLoading(false);
            setIsCreatingHabit(false);
            setHabitDays([]);
        });
        promise.catch(error => console.log(error.data));

        // const promise = loginUser(form)

        // promise.then(response => {
        //     setUserData(response.data);
        //     navigate('/hoje');
        // });

        // promise.catch(response => {
        //     alert("O login deu errado, tente novamente");
        //     // TODO: Change this reload for another approach that works
        //     window.location.reload();
        //     // setIsLoading(!isLoading);
        // });
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
                    <Days habitDays={habitDays} setHabitDays={setHabitDays} isLoading={isLoading} />
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
                <HabitsList />
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </MainWrapper>
            <Footer />
        </>
    )
}

function Days({ habitDays, setHabitDays, isLoading }) {
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

function HabitsList() {
    const habitsList = [
        "Ler 1 capítulo de livro",
        "Ler 1 capítulo de livro",
        "Ler 1 capítulo de livro",
        "Ler 1 capítulo de livro",
        "Ler 1 capítulo de livro",
    ]

    return (
        <>
            {habitsList.map(habit => (
                <HabitsWrapper>
                    <h3>{habit}</h3>
                    <Days />
                    <ion-icon name="trash-outline"></ion-icon>
                </HabitsWrapper>
            ))}
        </>
    )
}

