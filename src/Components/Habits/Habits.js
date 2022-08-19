import { useState } from "react";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import HabitForm from "./HabitForm";
import HabitsList from "./HabitsList";
import { CreateHabitWrapper } from "./styles";

export default function Habits() {
    const [isCreatingHabit, setIsCreatingHabit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <>
            <Navbar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Meus hábitos</h2>
                    <button onClick={() => setIsCreatingHabit(true)}>+</button>
                </CreateHabitWrapper>
                {isCreatingHabit ?
                    <HabitForm isLoading={isLoading} setIsLoading={setIsLoading} setIsCreatingHabit={setIsCreatingHabit} /> :
                    ""
                }
                <HabitsList isLoading={isLoading} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />                
            </MainWrapper>
            <Footer />
        </>
    )
}