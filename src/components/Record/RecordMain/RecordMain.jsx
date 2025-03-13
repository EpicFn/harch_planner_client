import {
    RecordMainContainer,
    ChartSelectBox,
    CustomSelectedBox,
    CustomSelectedBoxHeader,
    CustomSelectedBoxArrow,
    CustomSelectedBoxList,
    CustomSelectedBoxItem,
    ArrowActionWrapper,
} from "./RecordMain.style";
import RecordChart1 from "./RecordChart1";
import RecordChart2 from "./RecordChart2";
import RecordChart3 from "./RecordChart3";

import { useState, useEffect } from 'react';
import { IoMdArrowDropup } from "react-icons/io";


// -------------------------------------------------------------------------
// dummy data
// -------------------------------------------------------------------------

const Chart1DummyData = [
    { subject: '국어', studyTime: 120, pagesProgressed: 30 },
    { subject: '영어', studyTime: 90, pagesProgressed: 20 },
    { subject: '수학', studyTime: 150, pagesProgressed: 25 },
    { subject: '과학', studyTime: 110, pagesProgressed: 22 },
    { subject: '사회', studyTime: 80, pagesProgressed: 18 },
    { subject: '역사', studyTime: 95, pagesProgressed: 20 },
    { subject: '음악', studyTime: 60, pagesProgressed: 15 },
    { subject: '미술', studyTime: 70, pagesProgressed: 17 },
    { subject: '체육', studyTime: 50, pagesProgressed: 10 },
    { subject: '기술', studyTime: 85, pagesProgressed: 19 },
    { subject: '가정', studyTime: 65, pagesProgressed: 14 },
    { subject: '컴퓨터', studyTime: 100, pagesProgressed: 21 }
];

const Chart2DummyData = [
    { bookName: 'Book A', existingProgress: 120, additionalProgress: 30 },
    { bookName: 'Book B', existingProgress: 90, additionalProgress: 20 },
    { bookName: 'Book C', existingProgress: 150, additionalProgress: 25 },
    { bookName: 'Book D', existingProgress: 110, additionalProgress: 22 },
    { bookName: 'Book E', existingProgress: 80, additionalProgress: 18 },
    { bookName: 'Book F', existingProgress: 95, additionalProgress: 20 },
    { bookName: 'Book G', existingProgress: 60, additionalProgress: 15 },
    { bookName: 'Book H', existingProgress: 70, additionalProgress: 17 },
    { bookName: 'Book I', existingProgress: 50, additionalProgress: 10 },
    { bookName: 'Book J', existingProgress: 85, additionalProgress: 19 },
    { bookName: 'Book K', existingProgress: 65, additionalProgress: 14 },
    { bookName: 'Book L', existingProgress: 100, additionalProgress: 21 }
];

const Chart3DummyData = [
    { date: '23-01-01', studyTime: 120, pagesCompleted: 30 },
    { date: '23-01-02', studyTime: 90, pagesCompleted: 20 },
    { date: '23-01-03', studyTime: 150, pagesCompleted: 25 },
    { date: '23-01-04', studyTime: 110, pagesCompleted: 22 },
    { date: '23-01-05', studyTime: 80, pagesCompleted: 18 },
    { date: '23-01-06', studyTime: 95, pagesCompleted: 20 },
    { date: '23-01-07', studyTime: 60, pagesCompleted: 15 },
    { date: '23-01-08', studyTime: 70, pagesCompleted: 17 },
    { date: '23-01-09', studyTime: 50, pagesCompleted: 10 },
    { date: '23-01-10', studyTime: 85, pagesCompleted: 19 },
    { date: '23-01-11', studyTime: 65, pagesCompleted: 14 },
    { date: '23-01-12', studyTime: 100, pagesCompleted: 21 }
];

// -------------------------------------------------------------------------
// RecordMain component
// -------------------------------------------------------------------------

const RecordMain = () => {

    const chartList = [
        { value: "chart1", name: "과목별 공부량" },
        { value: "chart2", name: "일간 공부량" },
        { value: "chart3", name: "교재별 진도율" },
    ];

    const [selectedChart, setSelectedChart] = useState("chart1");
    const [selectedChartName, setSelectedChartName] = useState("과목별 공부량");
    const [chartWidget, setChartWidget] = useState(<RecordChart1 data={Chart1DummyData} />);

    const [selectBoxActive, setSelectBoxActive] = useState(false);


    const handleSelectBoxToggle = () => {
        setSelectBoxActive(!selectBoxActive);
    }

    const handleSelectBoxItemClick = (e) => {
        setSelectedChart(e);
        setSelectBoxActive(false);
    }


    useEffect(() => {
        switch (selectedChart) {
            case "chart1":
                setSelectedChartName("과목별 공부량");
                setChartWidget(<RecordChart1 data={Chart1DummyData} />);
                break;
            case "chart2":
                setSelectedChartName("일간 공부량");
                setChartWidget(<RecordChart3 data={Chart3DummyData} />);
                break;
            case "chart3":
                setSelectedChartName("교재별 진도율");
                setChartWidget(<RecordChart2 data={Chart2DummyData} />);
                break;
            default:
                break;
        }
    }, [selectedChart]);


    return (
        <RecordMainContainer>
            {/* <ChartSelectBox onChange={handleChartChange}>
                {chartList.map(chart => (
                    <option key={chart.value} value={chart.value}>
                        {chart.name}
                    </option>
                ))}
            </ChartSelectBox> */}
            <CustomSelectedBox>
                <CustomSelectedBoxHeader>
                    {selectedChartName}
                    <CustomSelectedBoxArrow onClick={handleSelectBoxToggle}>
                        <ArrowActionWrapper activated={selectBoxActive}>
                            <IoMdArrowDropup />
                        </ArrowActionWrapper>
                    </CustomSelectedBoxArrow>
                </CustomSelectedBoxHeader>
                <CustomSelectedBoxList activated={selectBoxActive}>
                    {
                        chartList.map(chart => (
                            <CustomSelectedBoxItem key={chart.value} onClick={() => handleSelectBoxItemClick(chart.value)}>
                                {chart.name}
                            </CustomSelectedBoxItem>
                        ))
                    }
                </CustomSelectedBoxList>
            </CustomSelectedBox>

            {chartWidget}
        </RecordMainContainer>
    );
}

export default RecordMain;