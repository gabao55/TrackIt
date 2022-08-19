import styled from "styled-components";

const CalendarContainer = styled.div`
> div {
    width: 335px;
    height: 402px;
    border: none;
    border-radius: 10px;
}

.react-calendar__tile abbr {
    width: 20px;
}

.date-red {
    background-color: #ea5766;
    border-radius: 50%;
}

.date-green {
    background-color: #8cc653;
    border-radius: 50%;
}
`;

export { CalendarContainer }