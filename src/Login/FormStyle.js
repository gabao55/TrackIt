import styled from "styled-components";
import logo from "../Shared/assets/Logo.png";

function Brand() {
    return <Logo src={logo} alt="Logo" />
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Logo = styled.img`
    width: 180px;
    height: 180px;
    margin: 68px 0 32px 0;
`;

const Form = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 100%;
        height: 45px;
        margin-bottom: 6px;
        font-size: 20px;
        padding-left: 12px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
    }

    input:focus {
        outline: none;
    }

    button {
        width: 100%;
        height: 45px;
        margin-bottom: 25px;
        background-color: #52B6FF;
        font-size: 20px;
        color: #FFFFFF;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    p {
        font-size: 14px;
        font-family: 'Lexend Deca';
        color: #52B6FF;
        text-decoration: underline;
        cursor: pointer;
    }
`

export { Brand, Wrapper, Form };