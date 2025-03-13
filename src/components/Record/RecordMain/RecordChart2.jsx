import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart2SwitchButton, ChartContainer } from './RecordChart.style';

const RecordChart2 = ({ data }) => {
    const [showTotalProgress, setShowTotalProgress] = useState(true);

    const sortedData = data.sort((a, b) => {
        const progressA = showTotalProgress ? a.existingProgress + a.additionalProgress : a.additionalProgress;
        const progressB = showTotalProgress ? b.existingProgress + b.additionalProgress : b.additionalProgress;
        return progressB - progressA;
    });

    const chartData = {
        labels: sortedData.map(item => item.bookName),
        datasets: [
            {
                label: showTotalProgress ? '총 진행도' : '추가 진행도',
                data: sortedData.map(item => showTotalProgress ? item.existingProgress + item.additionalProgress : item.additionalProgress),
                backgroundColor: '#ACACAC',
                borderWidth: 1,
            },
        ],
    };

    return (
        <ChartContainer>
            <Chart2SwitchButton onClick={() => setShowTotalProgress(!showTotalProgress)}>
                {showTotalProgress ? '추가 진행도만 보기' : '총 진행도 보기'}
            </Chart2SwitchButton>
            <Bar data={chartData} />
        </ChartContainer>
    );
};

export default RecordChart2;