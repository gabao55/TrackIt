import { CreateHabit, DaysWrapper, ActionWrapper } from "./styles";
import { ThreeDots } from "react-loader-spinner";
import { useForm } from "../Shared/useForm";
import { createHabit } from "../../Services/trackit";
import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import dayjs from "dayjs";
import { daysCorrespondence } from "./daysCorrespondence";

export default function HabitForm({ isLoading, setIsLoading, setIsCreatingHabit }) {
    const [habitDays, setHabitDays] = useState([]);
    const [form, handleForm, resetForm] = useForm({
        initState: {
            name: ""
        }
    });
    const { userData, setUserData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    function sendForm(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            ...form,
            days: habitDays.sort(),
        }
        
        const promise = createHabit(body, config);

        promise
        .then(() => {
            if (habitDays.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total : userData.total + 1,
                });
            }
            setIsLoading(false);
            setIsCreatingHabit(false);
            setHabitDays([]);
            resetForm();
        })
        .catch(() => {
            alert("Erro ao criar hábito");
            setIsLoading(false);
        });
    }

    return (
        <CreateHabit>
            <input
                type="text" 
                placeholder="nome do hábito" 
                name="name"
                onChange={handleForm}
                value={form.name}
                required
                disabled={isLoading}
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
        </CreateHabit>
    )
}

function Days({ habitDays, setHabitDays, isLoading }) {
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
        {daysCorrespondence.map(day => renderDayBox(day))}
    </DaysWrapper>
    )
}