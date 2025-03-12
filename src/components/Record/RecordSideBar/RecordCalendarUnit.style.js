import styled from "styled-components";


export const UnitContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    
    height : 70%;
    overflow-y : auto;
`

export const CalendarNavigator = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    font-size: 20px;
    color: #000;
`

export const MonthAndYear = styled.div`
`

export const ArrowButtton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #000;
    margin: 0 10px;
`

export const WeeksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Week = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    column-gap: 30px;
`

export const Day = styled.div`
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 18px;
    color : ${props => props.thisMonthFlag ? '#000' : '#e0e0e0'};
    
`

export const Yoil = styled.div`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 18px;
    color : #000;
    font-weight: 500;
`