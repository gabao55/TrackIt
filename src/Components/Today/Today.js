import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { MainWrapper } from "../Shared/styles";
import {DayWrapper, ListWrapper } from "./styles";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import dayjs from "dayjs";
import translateDay from "./daysCorrespondence";
import HabitsList from "./HabitsList";

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