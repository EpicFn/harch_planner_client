import {
    MultiValueBarDiscriptionBox,
    MultiValueBarTextBox,
    MultiValueBarLargeTextBox,
} from "../../DailyPlanner/DailyPlanner.style";
import { CalendarUnitContainer, MultiValueBarContainer, SideBarContainer } from "./RecordSideBar.style";
import MultiValueBar from "../../DailyPlanner/MultiValueBar/MultiValueBar";

import { useState } from "react";
import CalendarUnit from "./CalendarUnit";


//과목별 공부시간 dummy data
const dummyStudyTimeData = [
    {
        category: "국어",
        size: 30,
        color: 'rgba(236, 18, 18, 0.3)',
    },
    {
        category: "수학",
        size: 60,
        color: "rgba(241, 234, 20, 0.3)",
    },
    {
        category: "영어",
        size: 45,
        color: "rgba(11, 194, 240, 0.3)",
    },
    {
        category: "과학",
        size: 90,
        color: "#F1E0FF",
    },
    {
        category: "사회",
        size: 20,
        color: "#C3F6D2",
    }
]


//Task 달성률 dummy data
const dummyTaskAchievementData = [
    {
        category: 'success',
        size: 12,
        color: '#8F8F8F',
    },
    {
        category: 'fail',
        size: 8,
        color: '#D9D9D9',
    }
]

const RecordSiderBar = () => {

    const [studyTimeData, setStudyTimeData] = useState(dummyStudyTimeData);
    const [taskAchievementData, setTaskAchievementData] = useState(dummyTaskAchievementData);


    const formattedTotalStudyTime = `${Math.floor(dummyStudyTimeData.reduce((total, item) => total + item.size, 0) / 60)}시간 ${dummyStudyTimeData.reduce((total, item) => total + item.size, 0) % 60}분`;


    return (
        <SideBarContainer>
            <MultiValueBarContainer>
                <MultiValueBarDiscriptionBox>
                    <MultiValueBarTextBox>공부시간</MultiValueBarTextBox>
                    <MultiValueBarLargeTextBox>{formattedTotalStudyTime}</MultiValueBarLargeTextBox>
                </MultiValueBarDiscriptionBox>
                <MultiValueBar datas={studyTimeData} />
                <div style={{ height: '30px' }}></div>
                <MultiValueBarDiscriptionBox>
                    <MultiValueBarTextBox>목표 달성률</MultiValueBarTextBox>
                    <div style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                            gap: '10px',
                        }
                    }>
                        <MultiValueBarTextBox>{`${taskAchievementData[0].size + taskAchievementData[1].size}개 중 ${taskAchievementData[0].size}개`}</MultiValueBarTextBox>
                        <MultiValueBarLargeTextBox>{`${parseInt(taskAchievementData[0].size / (taskAchievementData[0].size + taskAchievementData[1].size) * 100)}%`}</MultiValueBarLargeTextBox>
                    </div>
                </MultiValueBarDiscriptionBox>
                <MultiValueBar datas={taskAchievementData} />
            </MultiValueBarContainer>
            <CalendarUnitContainer>
                <CalendarUnit />
            </CalendarUnitContainer>
        </SideBarContainer>
    );
}


export default RecordSiderBar;