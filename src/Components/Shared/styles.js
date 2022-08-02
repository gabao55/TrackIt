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

export {MainWrapper};