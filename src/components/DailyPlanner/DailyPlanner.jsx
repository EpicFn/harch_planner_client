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
} from "./DailyPlanner.style";

import TaskListByCategory from "./TaskListByCategory";
import TimeTable from "./TimeTable/TimeTable";


//tasks dummy data
const tasksList = [
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
                        {tasksList.map((tasks, index) => (
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
                <h2>Achievement</h2>
            </AchievementInfoContainer>
        </Container>
    );
};

export default DailyPlanner;