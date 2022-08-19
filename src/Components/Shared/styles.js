import styled from "styled-components";

const MainWrapper = styled.main`
    width: 100vw;
    min-height: 100vh;
    padding: 100px 18px 120px 18px;
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    h2 {
        font-size: 23px;
        color: #126BA5;
    }

    h3 {
        margin-bottom: 8px;
        font-size: 20px;
        color: #666666;
    }

    p {
        font-size: 18px;
        color: #666666;
    }
`;

const NavWrapper = styled.nav`
    width: 100%;
    height: 70px;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1 {
        font-family: 'Playball';
        font-size: 40px;
        color: #FFFFFF;
        cursor: pointer;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;

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
        cursor: pointer;
    }

    p {
        font-size: 18px;
        color: #52B6FF;
        cursor: pointer;
    }
`;

export { MainWrapper, NavWrapper, FooterWrapper };