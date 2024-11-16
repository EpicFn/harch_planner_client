import styled from 'styled-components';

// 테이블과 셀 스타일 정의
export const TimeTableWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex : 1;

    height : 100%;
    padding : 5px;


    border: 1px solid #e0e0e0;
    border-radius: 5px;
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    border: 1px solid #e0e0e0;
`;

export const TableRow = styled.tr`

`;

export const TableColumn = styled.div`
    display: flex;
    flex : 1;
    flex-direction: row;
    width : 100%;
`

export const TableData = styled.td`
    border: 1px solid #e0e0e0;
    background-color: ${({ isselected, color }) => (isselected ? color : 'transparent')};
`;

export const TimeSignWrapper = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid #e0e0e0;
`;
export const TimeSign = styled.div`
    color: var(--Font-04_Gray, #767676);
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 300;
    line-height: 8px; /* 100% */
    letter-spacing: -0.2px;

    height : 100%;
    width : 10px;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 0 5px 0 5px;
`;

