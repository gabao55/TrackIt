import styled from "styled-components";

const CreateHabitWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    button {
        width: 40px;
        height: 35px;
        font-size: 27px;
        color: #FFFFFF;
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const CreateHabit = styled.div`
    width: 100%;
    height: 180px;
    padding: 16px 18px;
    margin-bottom: 30px;
    background-color: #FFFFFF;
    border-radius: 5px;
`;

const DaysWrapper = styled.div`
    margin-bottom: 30px;
    display: flex;
    
    span {
        width: 30px;
        height: 30px;
        margin-right: 4px;
        font-size: 20px;
        color: #D4D4D4;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;

const ActionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
        margin-right: 23px;
        font-size: 16px;
        color: #52B6FF;
        cursor: pointer;
    }

    button {
        width: 85px;
        height: 35px;
        font-size: 20px;
        color: #FFFFFF;
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const HabitsWrapper = styled.div`
    width: 100%;
    height: 90px;
    margin-bottom: 10px;
    padding: 12px 0 0 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: relative;

    ion-icon {
        font-size: 15px;
        color: #666666;
        position: absolute;
        top: 12px;
        right: 15px
    }

    ion-icon:hover {
        cursor: pointer;
    }
`;

export { HabitsWrapper, ActionWrapper, DaysWrapper, CreateHabit, CreateHabitWrapper };