import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer() {
    const percentage = 50;

    return (
        <FooterWrapper>
            <p>Hábitos</p>
            <div>
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
            <p>Histórico</p>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;

    div {
        width: 90px;
        height: 90px;
        padding: 6px;
        margin-bottom: 48px;
        background-color: #52B6FF;
        border-radius: 50%;
    }

    p {
        font-size: 18px;
        color: #52B6FF;
    }
`;