
import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    align-items: center;
`

//----------------------------------------------
//plan box
//----------------------------------------------

export const PlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex: 4;
    width: 100%;
    height: 100%;
`

//date info box
export const DateInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    width: 100%;
`

export const CalendarIcon = styled.img`
    width: 32px;
    height: 32px;
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 5px;

    &:hover {
        filter: brightness(0.3) hue-rotate(180deg);
    }
`

export const DateInfo = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: #000;
    font-family: Pretendard;
    font-style: normal;

    margin-right: 5px;
`

export const DayOfWeek = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;

    margin-left: 8px;
    margin-right: 4px;
    margin-bottom: 3px;
`

export const ArrowBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: center;
    width: 50px;
    height: 50px;
    user-select: none;
    margin-bottom: 10px;
`

export const ArrowIcon = styled.img`
    width: 20px;
    height: 16px;
    transition: filter 0.3s;
    filter: hue-rotate(180deg);

    &:hover {
        filter: brightness(0.3) hue-rotate(180deg);
    }
`



//task box
export const TaskInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #FFF;

    overflow-y: auto;
    overflow-x: hidden;
`

export const TaskListBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 90%;
    

    overflow-y: auto;
    overflow-x: hidden;
    
`
export const TasksByCategoryBox = styled.div`
    display: flex;
    flex-direction: column;
`

export const CategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;

    height: 24px;
    padding: 0px 4px 0px 8px;
    gap: 8px;

    background-color: ${props => props.bgColor || 'grey'};
    
    border-radius: 3px;    
    border: ${props => props.isSelected ? '1px dashed black' : 'none'};
    box-sizing: border-box;

`

export const CategoryColorPoint = styled.div`
    height: 10px;
    width : 10px;
    border-radius: 50%;
    background-color: ${props => props.color || 'black'};

    margin-right: 10px;
`

export const TaskItemList = styled.ul`
    display: flex;
    flex-direction: column;

    padding: 10px 0px 0px 0px;
    margin : 0px;
`

export const TaskItem = styled.li`
    display: flex;
    flex-direction: row;

    height: 24px;
    padding: 0px 4px 0px 0px;
    margin-bottom: 10px;
    gap: 8px;

    border-radius: 4px;
    background: rgba(210, 210, 210, 0.20);

    user-select: none;

    ${({ isDragging }) => isDragging && `
    opacity: 0.5;
    border: 2px dashed #000;
    `}

    overflow: hidden;
    width: 100%;

`

export const MovingPointForTaskItem = styled.div`
    align-self: center;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height : 50%;
    width : 10px;
    
    margin : 0px 5px;
    margin-left: 8px;

    border-radius: 5px;
    background-color: #c6c6c6;

    transform: ${({ isSlid }) => (isSlid ? 'translateX(68px)' : 'translateX(0)')};
    transition: all 0.3s ease;

    //position: relative;
    //transition: transform 0.3s ease;
    //transform: ${({ isSlid }) => (isSlid ? 'translateX(68px)' : 'translateX(0)')};
`

export const TaskItemContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    position: relative;
    //max-width: 200px;

    transform: ${({ isSlid }) => (isSlid ? 'translateX(68px)' : 'translateX(0)')};
    transition: all 0.3s ease;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: var(--Font-03_Gray, #505050);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;

    user-select: none;

    

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: currentColor;
        transform: ${props => props.sledding == 'checked' ? 'translateY(-50%)' : 'scaleX(0)'};
        transform-origin: left;
        transition: transform 0.3s ease;
    }

    //position: relative;
    //transition: transform 0.3s ease;
    //transform: ${({ isSlid }) => (isSlid ? 'translateX(68px)' : 'translateX(0)')};
`

export const TaskItemCheckBox = styled.img`
    width: 24px;
    height: 24px;
`

export const SlidingTaskControlBox = styled.div`
    display: flex;
    flex-direction: row;

    flex : 1;

    position: relative;
    overflow : hidden;
`

export const TaskControlMenu = styled.div`
    position: absolute;
    

    display: flex;
    flex-direction: row;
    height: 100%;
    
    align-items: center;
    width:68px;
    
    //display: ${({ isSlid }) => (isSlid ? 'flex' : 'none')};
    transform: ${({ isSlid }) => (isSlid ? 'translateX(0)' : 'translateX(-68px)')};
    transition: all 0.3s ease;


    /* opacity: ${props => (props.visibility === 'visible' ? 1 : 0)};
    transform: ${props => (props.visibility === 'visible' ? 'scale(1)' : 'scale(0.8)')};
    transform-origin: center right;
    transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out; */
`

export const TaskControlMenuItem = styled.div`
    position: relative;
    cursor: pointer;
    //border: 1px solid #ccc;
    height: 100%;
    width: 34px;
    
    //display: ${({ isSlid }) => (isSlid ? 'flex' : 'none')};
    display : flex;
    //transition: display 0.3s ease;

    align-items: center;
    justify-content: center;


    //styleName: Pretendard Light/Body 12;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
    text-align: center;

    color: #FFFFFF;
    background: ${({ commentType }) => (commentType === 'edit' ? '#767676' : '#FF4141')};
    border-radius: ${({ commentType }) => (commentType === 'edit' ? '0px' : '4px 0px 0px 4px')};
    
`


export const TaskInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

export const TaskInput = styled.input`
    display: flex;
    width: 98%;
    align-items: center;
    gap: 10px;

    padding : 4px;
    height: 40px;

    border-radius: 4px;
    border: 1px solid var(--Line-Disabled, #CACAD7);

    
    
    /* Pretendard Light/Button 12 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 18px; /* 150% */

    &::placeholder {
        color: var(--Placeholder-Color, #A9A9A9);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 18px; /* 150% */
    }
`
export const TaskInputFuncBox = styled.div`
    display: flex;  
    flex-direction: row;
    width: 100%;
    margin-top: 5px;
`

export const TaskCategorySelect = styled.select`
    display: flex;
    padding: 4px;
    align-items: center;
    gap: 10px;
    flex  : 1;

    border-radius: 4px;
    border: 1px solid var(--Line-Disabled, #CACAD7);

    color: var(--Font-03_Gray, #505050);
    
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 18px; /* 150% */
    letter-spacing: -0.3px;

    &::placeholder {
        color: var(--Placeholder-Color, #A9A9A9);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 18px; /* 150% */
        letter-spacing: -0.3px;
    }
`

export const TaskSubmitBtn = styled.button`
    width : 50px;
    padding: 4px 8px;
    margin-left: 5px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 4px;
    background: rgba(105, 101, 146, 0.70);
`

//----------------------------------------------
//time table
//----------------------------------------------

export const TimeTableContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 4;
    width : 100%;
    height: 95%;

    margin : 20px;
`

export const EraserIcon = styled.img`
    width: 23px;
    height: 44px;
    flex-shrink: 0;

    margin-top : 5px;

    border-radius: 0px 4px 4px 0px;
    border-top: 1px solid var(--Line-Regular_Color, #E5E5EC);
    border-right: 1px solid var(--Line-Regular_Color, #E5E5EC);
    border-bottom: 1px solid var(--Line-Regular_Color, #E5E5EC);

    border: ${props => props.isSelected ? '1px dashed black' : '1px solid var(--Line-Regular_Color, #E5E5EC)'};
`

//----------------------------------------------
//achievement box
//----------------------------------------------

export const AchievementInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 5;
    width: 100%;
    height: 95%;

    margin : 40px 40px;

    align-items: start;
`

export const AchievementTextBox = styled.div`
    margin-top: 10px;

    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const WorkBookItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    width: 100%;

    gap: 10px;

    margin-top: 20px;
`

export const RecordChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    margin : 20px 0px;
`

export const MultiValueBarDiscriptionBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
`
export const MultiValueBarTextBox = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const MultiValueBarLargeTextBox = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`