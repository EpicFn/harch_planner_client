import { useState, useEffect } from 'react';
import { TimeTableWrapper, Table, TableRow, TableData, TimeSign, TimeSignWrapper } from './TimeTable.style';



const dummyInitialGrid = Array.from({ length: 24 }, () => Array(6).fill(0));

// Set some cells 
dummyInitialGrid[2][2] = '국어';
dummyInitialGrid[2][3] = '국어';
dummyInitialGrid[2][4] = '국어';
dummyInitialGrid[11][3] = '수학';
dummyInitialGrid[11][4] = '수학';
dummyInitialGrid[11][5] = '수학';
dummyInitialGrid[20][2] = '영어';
dummyInitialGrid[20][3] = '영어';

const TimeTable = (selectedColor) => {

    const [cellData, setCellData] = useState(dummyInitialGrid);


    // 드래그 상태 관리
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);
    const [isDragging, setIsDragging] = useState(false);


    const handleMouseDown = (row, col) => {
        if (!selectedColor) return;

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

        if (startCell && endCell && selectedColor) {
            const newCellData = [];
            const startRow = Math.min(startCell.row, endCell.row);
            const endRow = Math.max(startCell.row, endCell.row);
            const startCol = Math.min(startCell.col, endCell.col);
            const endCol = Math.max(startCell.col, endCell.col);

            for (let row = startRow; row <= endRow; row++) {
                for (let col = startCol; col <= endCol; col++) {
                    newCellData.push({ row, col, color: selectedColor });
                }
            }

            setCellData(prevCellData => [...prevCellData, ...newCellData]);
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
                            let cellColor = 'transparent';
                            let selected = false;
                            if (cell === '국어') {
                                cellColor = '#f7d8d8';
                                selected = true;
                            }
                            else if (cell === '수학') {
                                cellColor = '#FFFEE0';
                                selected = true;
                            }
                            else if (cell === '영어') {
                                cellColor = '#E0F9FF';
                                selected = true;
                            }
                            return (
                                <TableData
                                    key={colIndex}
                                    isselected={selected}
                                    color={cellColor}
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
