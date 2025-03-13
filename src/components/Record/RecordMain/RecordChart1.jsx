import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartContainer } from './RecordChart.style';



const RecordChart1 = ({ data }) => {
    const [showStudyTime, setShowStudyTime] = useState(true);
    const [showPagesProgressed, setShowPagesProgressed] = useState(true);

    const subjects = data.map(item => item.subject);
    const studyTimes = data.map(item => item.studyTime);
    const pagesProgressed = data.map(item => item.pagesProgressed);

    const chartData = {
        labels: subjects,
        datasets: [
            {
                label: '총 공부 시간 (hour)',
                data: showStudyTime ? studyTimes : [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: '학습한 페이지',
                data: showPagesProgressed ? pagesProgressed : [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    return (
        <ChartContainer>
            <Bar data={chartData} />
        </ChartContainer>
    );
};

export default RecordChart1;