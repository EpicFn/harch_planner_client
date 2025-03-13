import styled from "styled-components";

export const MultiValueBarContainer = styled.div`
    
    borderRadius: 8px;
    overflow:hidden;
    width: 100%;
    height: 30px;  
    display: flex;
`

export const MultiValueBarItem = styled.div`
    width: ${({ width }) => width || '10%'};
    background-color: ${({ backgroundColor }) => backgroundColor || '#ccc'};
    height: 30px;
    display: inline-block;
`