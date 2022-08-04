import styled from "styled-components";

const DayWrapper = styled.div`
width: 100%;

p {
    margin-top: 5px;
    font-size: 18px;
    color: #BABABA;
}

span {
    margin-top: 5px;
    font-size: 18px;
    display: block;
    color: #8FC549;
}
`;

const ListWrapper = styled.ul`
width: 100%;
margin-top: 28px;

li {
    width: 100%;
    height: 95px;
    margin-bottom: 10px;
    padding: 0 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
`;

const HabitsDetails = styled.div`
h3 {
    margin-bottom: 7px;
}

p {
    font-size: 13px;
    line-height: 16px;
}
`;

const HabitsCheckmark = styled.div`
width: 69px;
height: 69px;
background-color: ${props => props.green ? "#8FC549" : "#EBEBEB"};
display: flex;
justify-content: center;
align-items: center;
border: ${props => props.green ? "" : "1px solid #E7E7E7;"};
border-radius: 5px;
cursor: pointer;

img {
    width: 35px;
    height: 28px;
}
`;

const Colored = styled.span`
color: ${props => props.green ? "#8FC549" : "BABABA"};
`;

export {DayWrapper, ListWrapper, HabitsDetails, HabitsCheckmark, Colored };