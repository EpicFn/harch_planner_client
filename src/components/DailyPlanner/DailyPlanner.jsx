import {
    AchievementInfoContainer,
    Container,
    DateInfoBox,
    PlanContainer,
    TimeTableContainer,
    TaskInputBox,
    TaskListBox,
    CalendarIcon,
    TaskInfoBox,
    DateInfo,
    DayOfWeek,
    ArrowBox,
    ArrowIcon,
    TaskInput,
    TaskCategorySelect,
    TaskInputFuncBox,
    TaskSubmitBtn,
    EraserIcon,
    AchievementTextBox,
    WorkBookItemContainer,
    MultiValueBarDiscriptionBox,
    MultiValueBarTextBox,
    MultiValueBarLargeTextBox,
    RecordChartContainer,
} from "./DailyPlanner.style";
import MultiValueBar from "./MultiValueBar/MultiValueBar";

import TaskListByCategory from "./TaskListByCategory";
import TimeTable from "./TimeTable/TimeTable";
import WorkBookItem from "./WorkBookItem/WorkBookItem";


//tasks dummy data
const dummyTasksList = [
    {
        category: "국어",
        tasks: [
            { contents: "나비효과 30p", sledding: "checked" },
            { contents: "매3비 6지문", sledding: "x" },
            { contents: "6모 기출 3문", sledding: "none" },
        ],
    },
    {
        category: "수학",
        tasks: [
            { contents: "쎈 10p", sledding: "none" },
            { contents: "블랙라벨 1챕터", sledding: "none" },
        ],
    },
    {
        category: "영어",
        tasks: [
            { contents: "단어 100개 암기", sledding: "none" },
            { contents: "영어 수특 1문단 풀이", sledding: "none" },
            { contents: "미드 1편 보기", sledding: "none" },
        ],
    },
];

//workbook dummy data
const dummyWorkbookList = [
    {
        name: "나혼자 풀기",
        subject: "국어",
        date: "2021.09.01",
        progress : 76,
    },
    {
        name: "수학의 정석",
        subject: "수학",
        date: "2021.09.02",
        progress: 50,
    },
    {
        name: "영어의 달인",
        subject: "영어",
        date: "2021.09.03",
        progress: 30,
    }
]

//과목별 공부시간 dummy data
const dummyStudyTimeData = [
    {
        category: "국어",
        size: 30,
        color: '#FFE0E0',
    },
    {
        category: "수학",
        size: 60,
        color: "#FFFEE0",
    },
    {
        category: "영어",
        size: 45,
        color: "#E0F9FF",
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
        category : 'success',
        size : 12,
        color : '#8F8F8F',
    },
    {
        category : 'fail',
        size : 8,
        color : '#D9D9D9',
    }
]

const DailyPlanner = () => {

    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();
    const formattedMonth = `${month}월`;
    const formattedDay = `${day}일`;
    const dayofweek = today.toLocaleDateString('ko-KR', { weekday: 'long' });

    //
    const taskInputPlaceholder = "할 일을 입력 후 Enter 키 혹은 입력 버튼을 눌러주세요.";
    const taskCategoryPlaceholder = "교재나 과목을 선택해 주세요.";

    const handleWorkbookClick = (workbookIndex) => {
        console.log(`Clicked workbook index: ${workbookIndex}`);
    };

    const formattedTotalStudyTime = `${Math.floor(dummyStudyTimeData.reduce((total, item) => total + item.size, 0) / 60)}시간 ${dummyStudyTimeData.reduce((total, item) => total + item.size, 0) % 60}분`;


    return (
        <Container>
            <PlanContainer>
                <DateInfoBox>
                    <CalendarIcon src="/src/assets/CalendarDots.svg" />
                    <DateInfo>{formattedMonth}</DateInfo>
                    <DateInfo>{formattedDay}</DateInfo>
                    <DayOfWeek>{dayofweek}</DayOfWeek>
                    <ArrowBox>
                        <ArrowIcon src="/src/assets/ArrowLeft.svg" />
                        <ArrowIcon src="/src/assets/ArrowRight.svg" />
                    </ArrowBox>
                </DateInfoBox>
                <TaskInfoBox>
                    <TaskListBox>
                        {dummyTasksList.map((tasks, index) => (
                            <TaskListByCategory
                                key={index}
                                category={tasks.category}
                                tasks={tasks.tasks}
                            />
                        ))}
                    </TaskListBox>
                    <TaskInputBox>
                        <TaskInput type="text" placeholder={taskInputPlaceholder} />
                        <TaskInputFuncBox>
                            <TaskCategorySelect>
                                <option value="" disabled selected hidden>{taskCategoryPlaceholder}</option>
                                <option value="국어">국어</option>
                                <option value="수학">수학</option>
                                <option value="영어">영어</option>
                            </TaskCategorySelect>
                            <TaskSubmitBtn>등록</TaskSubmitBtn>
                        </TaskInputFuncBox>
                    </TaskInputBox>
                </TaskInfoBox>
            </PlanContainer>
            <TimeTableContainer>
                <TimeTable />
                <EraserIcon src="/src/assets/Eraser.svg" />
            </TimeTableContainer>
            <AchievementInfoContainer>
                <AchievementTextBox>오늘의 학습 성취도</AchievementTextBox>
                
                <RecordChartContainer>
                    <MultiValueBarDiscriptionBox>
                        <MultiValueBarTextBox>공부시간</MultiValueBarTextBox>
                        <MultiValueBarLargeTextBox>{formattedTotalStudyTime}</MultiValueBarLargeTextBox>
                    </MultiValueBarDiscriptionBox>
                    <MultiValueBar datas={dummyStudyTimeData} />
                    <div style={{ height: '30px' }}></div>
                    <MultiValueBarDiscriptionBox>
                        <MultiValueBarTextBox>오늘의 목표 달성률</MultiValueBarTextBox>
                        <div style={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'end',
                                gap: '10px',
                            }
                        }>
                            <MultiValueBarTextBox>{`${dummyTaskAchievementData[0].size + dummyTaskAchievementData[1].size}개 중 ${dummyTaskAchievementData[0].size}개`}</MultiValueBarTextBox>
                            <MultiValueBarLargeTextBox>{`${parseInt(dummyTaskAchievementData[0].size/(dummyTaskAchievementData[0].size + dummyTaskAchievementData[1].size) * 100)}%`}</MultiValueBarLargeTextBox>
                        </div>
                    </MultiValueBarDiscriptionBox>
                    <MultiValueBar datas={dummyTaskAchievementData} />
                
                </RecordChartContainer>

                <WorkBookItemContainer>
                    {dummyWorkbookList.map((workbook, index) => (
                        <WorkBookItem
                            key={index}
                            workbook={workbook}
                            onClick={() => handleWorkbookClick(index)}
                        />
                    ))}
                </WorkBookItemContainer>
            </AchievementInfoContainer>
        </Container>
    );
};

export default DailyPlanner;