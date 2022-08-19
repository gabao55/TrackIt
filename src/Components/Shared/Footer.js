import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { FooterWrapper } from "./styles";

export default function Footer() {
    const { userData } = useContext(UserContext);
    const percentage = userData.completed/userData.total*100;
    const navigate = useNavigate();

    return (
        <FooterWrapper>
            <p onClick={() => navigate("/habitos")}>Hábitos</p>
            <div onClick={() => navigate("/hoje")}>
                <CircularProgressbar 
                value={percentage} 
                text="Hoje"
                styles={buildStyles({
                    textSize: '22px',
                    pathColor: `#FFFFFF`,
                    textColor: '#FFFFFF',
                    trailColor: '#52B6FF',
                })}
                />
            </div>
            <p onClick={() => navigate("/historico")}>Histórico</p>
        </FooterWrapper>
    )
}