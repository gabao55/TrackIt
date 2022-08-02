import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import { CreateHabitWrapper, CreateHabit, ActionWrapper, HabitsWrapper, DaysWrapper } from "./styles";

export default function Habits() {
    return (
        <>
            <Navbar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Meus hábitos</h2>
                    <button>+</button>
                </CreateHabitWrapper>
                <CreateHabit>
                    <input type="text" placeholder="nome do hábito" />
                    <Days />
                    <ActionWrapper>
                        <span>Cancelar</span>
                        <button>Salvar</button>
                    </ActionWrapper>
                </CreateHabit>
                <HabitsList />
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </MainWrapper>
            <Footer />
        </>
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

function Days() {
    return (
    <DaysWrapper>
        <span>D</span>
        <span>S</span>
        <span>T</span>
        <span>Q</span>
        <span>Q</span>
        <span>S</span>
        <span>S</span>
    </DaysWrapper>
    )
}

