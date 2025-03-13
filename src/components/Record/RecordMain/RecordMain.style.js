import styled from "styled-components";

export const RecordMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    padding: 20px;
    height : 80%;
    width : 80%;
    background-color: #fff;
    border-radius: 10px;
`;

export const ChartSelectBox = styled.select`
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    align-self: end;
`;

export const CustomSelectedBox = styled.div`
    display : flex;
    flex-direction : column;
    align-self : flex-end;
    width : 175px;
`

export const CustomSelectedBoxHeader = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 10px;
    padding-left : 25px;
    border : none;
    font-weight: bold;
    box-shadow : inset 0px 0px 5px 5px rgb(224, 224, 224);
    border-radius : 5px;
    background-color: #F8F8F8;
    
`

export const CustomSelectedBoxArrow = styled.button`
    border: none;
    border-radius: 4px;

    height : 25px;
    width : 25px;
    padding : 0;

    color : black;
    font-size: 25px;
    
    display : flex;
    justify-content: center;
    align-items: center;
    
    background-color: #FFF;
    box-shadow : 0px 0px 5px 5px rgb(224, 224, 224);
    
    cursor: pointer;
`

export const ArrowActionWrapper = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;

    height : 100%;
    width : 100%;

    transition: transform 0.3s;
    transform : ${props => props.activated ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const CustomSelectedBoxList = styled.div`
    display : ${props => props.activated ? 'flex' : 'none'};

    flex-direction : column;
    row-gap : 5px;

    border : none;
    border-radius: 5px;
    box-shadow : 0px 0px 5px 3px rgb(224, 224, 224);
    
    padding : 5px 0;
    margin-top : 10px;
`

export const CustomSelectedBoxItem = styled.div`
    cursor : pointer;
`