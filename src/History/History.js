import { CreateHabitWrapper } from "../Habits/styles";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";

export default function History() {
    return (
        <>
            <Navbar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Histórico</h2>
                </CreateHabitWrapper>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </MainWrapper>
            <Footer />
        </>
    )
}
