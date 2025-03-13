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
    flex-direction: row;
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
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #000;
`

export const WeeksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 10px;
`

export const Week = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

export const Day = styled.div`
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 18px;
    flex : 1;
    color : ${props => props.thisMonthFlag ? '#000' : '#e0e0e0'};
    background-color: ${props => props.isDateInRange ? '#BCBCBC' : 'transparent'};
`

export const SelectedDayBack = styled(Day)`
    background-image: ${props =>
        props.isStartPoint ? 'linear-gradient(to left, #BCBCBC 50%, transparent 50%)' :
            props.isEndPoint ? 'linear-gradient(to right, #BCBCBC 50%, transparent 50%)' :
                'none'};
`

export const SelectedDay = styled(Day)`
    position: absolute;    
    width: 40px;
    height: 40px;
    color: white;
    background-color: #7B7B7B;
    border-radius: 50%;
`;

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