import styled from "styled-components";

export const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items : center;
    justify-content : center;
    padding: 20px;
    height : 100%;
    width : 100%;
`;

export const Chart2SwitchButton = styled.button`
    align-self: start;
    margin-bottom: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 1px   #555555;
    background-color:rgb(212, 212, 212);
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #000;
        color: #fff;
    }
    
`;