import { useState, useEffect } from 'react';
import { TimeTableWrapper, Table, TableRow, TableData, TimeSign, TimeSignWrapper } from './TimeTable.style'




const dummyInitialGrid = Array.from({ length: 24 }, () => Array(6).fill(1));



const TimeTable = (selectedColor) => {

    const [cellData, setCellData] = useState(dummyInitialGrid);


    // 셀 선택 상태 관리
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);

    useEffect(() => {
        if (startCell && endCell) {
            const newCellData = [...cellData];
            let { row: startRow, col: startCol } = startCell;
            let { row: endRow, col: endCol } = endCell;

            if (startRow > endRow) {
                [startRow, endRow] = [endRow, startRow];
                [startCol, endCol] = [endCol, startCol];
            }

            let i = startRow;
            let j = startCol;
            while (i !== endRow || j !== endCol) {
                newCellData[i][j] = selectedColor.selectedColor;
                j++;
                if (j >= 6) {
                    j = 0;
                    i++;
                }
            }
            newCellData[endRow][endCol] = selectedColor.selectedColor;

            setCellData(newCellData);
            setStartCell(null);
            setEndCell(null);
        }
    }, [endCell, startCell, cellData, selectedColor.selectedColor]);

    const handleCellClick = (row, col) => {
        // 선택된 색이 없으면 리턴
        if (!selectedColor.selectedColor) return;

        // startCell이 없는 경우 : startCell 선택
        // 해당 셀을 startCell로 설정
        if (!startCell) {
            setStartCell({ row, col });
            return;
        }

        // startCell이 있는 경우 : endCell 선택
        // endCell을 설정
        setEndCell({ row, col });
    };



    return (
        <TimeTableWrapper>
            <TimeSignWrapper>
                {[...Array(24)].map((_, index) => {
                    const hour = (index + 6) % 24;
                    return (
                        <TimeSign key={index}>
                            {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}{hour < 12 || hour === 24 ? ' AM' : ' PM'}
                        </TimeSign>
                    );
                })}

            </TimeSignWrapper>
            <Table>

                {cellData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            let cellColor;
                            let selected = false; // 채워진 셀인지 여부
                            if (cell == 1)
                                cellColor = 'transparent';
                            else {
                                cellColor = cell;
                                selected = true;
                            }


                            // 선택된 셀인 경우
                            let isStartCell = false;
                            if (startCell && startCell.row === rowIndex && startCell.col === colIndex) {
                                isStartCell = true;
                            }

                            return (
                                <TableData
                                    key={colIndex}
                                    isselected={selected}
                                    color={cellColor}
                                    isStartCell={isStartCell}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >

                                </TableData>
                            );
                        })}
                    </TableRow>
                ))}


            </Table>
        </TimeTableWrapper>
    );
};

export default TimeTable;
