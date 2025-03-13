import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartContainer } from './RecordChart.style';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RecordChart3 = ({ data }) => {
    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
            {
                label: '총 공부 시간 (hour)',
                data: data.map(entry => entry.studyTime),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: '학습한 페이지',
                data: data.map(entry => entry.pagesCompleted),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <ChartContainer ChartContainer >
            <Line data={chartData} options={options} />;
        </ChartContainer >
    );
};

export default RecordChart3;