import { useState, useEffect } from 'react';
import { TimeTableWrapper, Table, TableRow, TableData, TimeSign, TimeSignWrapper } from './TimeTable.style';




const dummyInitialGrid = Array.from({ length: 24 }, () => Array(6).fill(1));

// Set some cells 
dummyInitialGrid[2][2] = '#f7d8d8';
dummyInitialGrid[2][3] = '#f7d8d8';
dummyInitialGrid[2][4] = '#f7d8d8';
dummyInitialGrid[11][3] = '#FFFEE0';
dummyInitialGrid[11][4] = '#FFFEE0';
dummyInitialGrid[11][5] = '#FFFEE0';
dummyInitialGrid[20][2] = '#E0F9FF';
dummyInitialGrid[20][3] = '#E0F9FF';

const TimeTable = (selectedColor) => {

    const [cellData, setCellData] = useState(dummyInitialGrid);


    // 드래그 상태 관리
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);
    const [isDragging, setIsDragging] = useState(false);


    const handleMouseDown = (row, col) => {
        //선택된 색이 없으면 리턴
        if (!selectedColor.selectedColor) return;

        setStartCell({ row, col });
        setEndCell({ row, col });

        setIsDragging(true);
    };

    const handleMouseEnter = (row, col) => {
        if (isDragging) {
            setEndCell({ row, col });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (startCell && endCell && selectedColor.selectedColor) {
            const newCellData = [...cellData];
            var { row: startRow, col: startCol } = startCell;
            var { row: endRow, col: endCol } = endCell;

            if (startRow > endRow) {
                startRow, endRow = endRow, startRow;
                startCol, endCol = endCol, startCol;
            }

            if (startRow > endRow) {
                [startRow, endRow] = [endRow, startRow];
            }
            if (startCol > endCol) {
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

        }

        setStartCell(null);
        setEndCell(null);
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
                            let isDragged = false; //드래그 중인 셀인지 여부
                            if (cell == 1)
                                cellColor = 'transparent';
                            else {
                                cellColor = cell;
                                selected = true;
                            }

                            if (startCell && endCell) {
                                const { row: startRow, col: startCol } = startCell;
                                const { row: endRow, col: endCol } = endCell;
                                if ((rowIndex == startRow && rowIndex == endRow) || (colIndex == startCol && colIndex == endCol)) {
                                    isDragged = true;
                                }
                            }

                            return (
                                <TableData
                                    key={colIndex}
                                    isselected={selected}
                                    color={cellColor}
                                    isDraged={isDragged}
                                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                    onMouseUp={handleMouseUp}
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
