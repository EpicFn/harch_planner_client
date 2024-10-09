import {TimeTableWrapper, Table, TableRow, TableData, TimeSign, TimeSignWrapper} from './TimeTable.style';

const dummyData = [
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 11, col: 3 },
    { row: 11, col: 4 },
    { row: 11, col: 5 },
    { row: 20, col: 3 },
    { row: 20, col: 2 }
];

const TimeTable = () => {
  // 선택된 셀 표시
    const isSelected = (row, col) => {
        return dummyData.some(data => data.row === row && data.col === col);
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
                            <TableData key={col} isselected={isSelected(row, col)} />
                        ))}
                    </TableRow>
                ))}
            </Table>
        </TimeTableWrapper>
    );
};

export default TimeTable;
