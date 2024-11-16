import { useState, useEffect } from 'react';
import { TimeTableWrapper, Table, TableRow, TableData, TimeSign, TimeSignWrapper } from './TimeTable.style';

const dummyData = [
    { row: 2, col: 2, color: '#f7d8d8' },
    { row: 2, col: 3, color: '#f7d8d8' },
    { row: 2, col: 4, color: '#f7d8d8' },
    { row: 11, col: 3, color: '#FFFEE0' },
    { row: 11, col: 4, color: '#FFFEE0' },
    { row: 11, col: 5, color: '#FFFEE0' },
    { row: 20, col: 3, color: '#E0F9FF' },
    { row: 20, col: 2, color: '#E0F9FF' }
];

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

    const [cellData, setCellData] = useState(dummyData);

    // 드래그 상태 관리
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        console.log('startCell:', startCell);
        console.log('endCell:', endCell);
    }, [startCell, endCell]);

    useEffect(() => {
        // Trigger re-render when cellData changes
    }, [cellData]);


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


    // 선택된 셀 표시
    const isSelected = (row, col) => {
        return cellData.some(data => data.row === row && data.col === col);
    };

    //선택된 셀의 색 가져오기
    const getColor = (row, col) => {
        const selectedCellData = cellData.find(data => data.row === row && data.col === col);
        return selectedCellData ? selectedCellData.color : 'transparent';
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
                {[...Array(24)].map((_, row) => (
                    <TableRow key={row}>
                        {[...Array(6)].map((_, col) => (
                            <TableData
                                key={col}
                                isselected={isSelected(row, col)}
                                color={getColor(row, col)}
                                onMouseDown={() => handleMouseDown(row, col)}
                                onMouseEnter={() => handleMouseEnter(row, col)}
                                onMouseUp={handleMouseUp}
                            />
                        ))}

                    </TableRow>
                ))}
            </Table>
        </TimeTableWrapper>
    );
};

export default TimeTable;
