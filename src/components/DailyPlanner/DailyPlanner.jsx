

import CalendarModal from "./CalendarModal/CalendarModal";
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


//tasks dummy data
const dummyTasksList = [
    {
        category: "국어",
        color: 'rgba(236, 18, 18, 0.3)',
        semiColor: 'rgba(236, 18, 18, 1)',
        tasks: [
            { contents: "나비효과 30p", sledding: "checked" },
            { contents: "매3비 6지문", sledding: "x" },
            { contents: "6모 기출 3문", sledding: "none" },
        ],
    },
    {
        category: "수학",
        color: "rgba(241, 234, 20, 0.3)",
        semiColor: "rgba(241, 234, 20, 1)",
        tasks: [
            { contents: "쎈 10p", sledding: "none" },
            { contents: "블랙라벨 1챕터", sledding: "none" },
        ],
    },
    {
        category: "영어",
        color: "rgba(11, 194, 240, 0.3)",
        semiColor: "rgba(11, 194, 240, 1)",
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
        progress: 76,
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

const DailyPlanner = (dateObj) => {

    //---------------------------------Variables---------------------------------

    // 날짜 정보 포멧팅
    const today = dateObj.dateObj;
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();
    const formattedMonth = `${month}월`;
    const formattedDay = `${day}일`;
    const dayofweek = today.toLocaleDateString('ko-KR', { weekday: 'long' });

    // Task 입력창 placeholder
    const taskInputPlaceholder = "할 일을 입력 후 Enter 키 혹은 입력 버튼을 눌러주세요.";
    const taskCategoryPlaceholder = "교재나 과목을 선택해 주세요.";

    // Router
    const navigate = useNavigate();

    //---------------------------------States---------------------------------

    const [tasksList, setTasksList] = useState(dummyTasksList);
    const [taskInput, setTaskInput] = useState("");
    const [workbooks, setWorkbooks] = useState(dummyWorkbookList);
    const [studyTimeData, setStudyTimeData] = useState(dummyStudyTimeData);
    const [taskAchievementData, setTaskAchievementData] = useState(dummyTaskAchievementData);

    //timetable에서 선택된 색상
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState(null); // 선택된 색상의 인덱스, -1이면 지우개

    //modal 창 상태 관리
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);


    //---------------------------------Event Handlers---------------------------------

    //TODO : 해당 workbook 페이지로 이동
    const handleWorkbookClick = (workbookIndex) => {
        console.log(`Clicked workbook index: ${workbookIndex}`);
    };

    const formattedTotalStudyTime = `${Math.floor(dummyStudyTimeData.reduce((total, item) => total + item.size, 0) / 60)}시간 ${dummyStudyTimeData.reduce((total, item) => total + item.size, 0) % 60}분`;

    /**
     * Task 입력창에 입력된 내용을 tasksList에 추가하는 함수
     * @returns 적당한 값(안중요함)
     */
    const handleTaskSubmit = () => {
        if (taskInput.trim() === "") return;

        const selectedCategory = document.querySelector("select").value;
        if (!selectedCategory) return;

        const newTask = { contents: taskInput, sledding: "none" };
        let categoryExists = false;

        const updatedTasksList = tasksList.map((tasksForCategory) => {
            if (tasksForCategory.category === selectedCategory) {
                categoryExists = true;
                return {
                    ...tasksForCategory,
                    tasks: [...tasksForCategory.tasks, newTask],
                };
            }
            return tasksForCategory;
        });

        if (!categoryExists) {
            updatedTasksList.push({
                category: selectedCategory,
                tasks: [newTask],
            });
        }

        setTasksList(updatedTasksList);
        setTaskInput("");
    };

    const handleCalenderIconClick = () => {
        setIsCalendarModalOpen(true);
    }

    const handlePrevDateClick = () => {
        const PrevDay = new Date(today);
        PrevDay.setDate(today.getDate());
        const formattedPrevDay = PrevDay.toISOString().split('T')[0];
        navigate(`/dailyPlannerPage/${formattedPrevDay}`);
    };


    const handleNextDateClick = () => {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 2);
        const formattedNextDay = nextDay.toISOString().split('T')[0];
        navigate(`/dailyPlannerPage/${formattedNextDay}`);
    };

    //---------------------------------Rendering---------------------------------

    return (
        <Container>
            <PlanContainer>
                <DateInfoBox>
                    <CalendarModal
                        isOpen={isCalendarModalOpen}
                        onClose={() => setIsCalendarModalOpen(false)}
                        children={'Calendar Modal'}
                    />
                    <CalendarIcon
                        src="/src/assets/CalendarDots.svg"
                        onClick={handleCalenderIconClick}
                    />
                    <DateInfo>{formattedMonth}</DateInfo>
                    <DateInfo>{formattedDay}</DateInfo>
                    <DayOfWeek>{dayofweek}</DayOfWeek>
                    <ArrowBox>
                        <ArrowIcon
                            src="/src/assets/ArrowLeft.svg"
                            onClick={handlePrevDateClick}
                        />
                        <ArrowIcon
                            src="/src/assets/ArrowRight.svg"
                            onClick={handleNextDateClick}
                        />
                    </ArrowBox>
                </DateInfoBox>
                <TaskInfoBox>
                    <TaskListBox>
                        {tasksList.map((tasksForCategory, index) => (
                            <TaskListByCategory
                                key={index}
                                category={tasksForCategory.category}
                                tasks={tasksForCategory.tasks}
                                setTasks={(newTasks) => {
                                    const newTasksList = [...tasksList];
                                    newTasksList[index].tasks = newTasks;
                                    setTasksList(newTasksList);
                                }}
                                categoryColor={tasksForCategory.color}
                                semiCategoryColor={tasksForCategory.semiColor}
                                categoryColorIndex={index}
                                selectedColorIndex={selectedColorIndex}
                                setSelectedColorIndex={setSelectedColorIndex}
                                setSelectedColor={setSelectedColor}
                            />
                        ))}
                    </TaskListBox>
                    <TaskInputBox>
                        <TaskInput
                            type="text"
                            placeholder={taskInputPlaceholder}
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <TaskInputFuncBox>
                            <TaskCategorySelect>
                                <option value="" disabled selected hidden>{taskCategoryPlaceholder}</option>
                                <option value="국어">국어</option>
                                <option value="수학">수학</option>
                                <option value="영어">영어</option>
                            </TaskCategorySelect>
                            <TaskSubmitBtn onClick={handleTaskSubmit}>등록</TaskSubmitBtn>
                        </TaskInputFuncBox>
                    </TaskInputBox>
                </TaskInfoBox>
            </PlanContainer>
            <TimeTableContainer>
                <TimeTable
                    selectedColor={selectedColor}
                />
                <EraserIcon
                    src="/src/assets/Eraser.svg"
                    isSelected={selectedColorIndex == -1}
                    onClick={() => {
                        if (selectedColorIndex == -1) {
                            setSelectedColor(null);
                            setSelectedColorIndex(null);
                        }
                        else {
                            setSelectedColor(1);
                            setSelectedColorIndex(-1);
                        }

                    }}
                />
            </TimeTableContainer>
            <AchievementInfoContainer>
                <AchievementTextBox>오늘의 학습 성취도</AchievementTextBox>

                <RecordChartContainer>
                    <MultiValueBarDiscriptionBox>
                        <MultiValueBarTextBox>공부시간</MultiValueBarTextBox>
                        <MultiValueBarLargeTextBox>{formattedTotalStudyTime}</MultiValueBarLargeTextBox>
                    </MultiValueBarDiscriptionBox>
                    <MultiValueBar datas={studyTimeData} />
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
                            <MultiValueBarTextBox>{`${taskAchievementData[0].size + taskAchievementData[1].size}개 중 ${taskAchievementData[0].size}개`}</MultiValueBarTextBox>
                            <MultiValueBarLargeTextBox>{`${parseInt(taskAchievementData[0].size / (taskAchievementData[0].size + taskAchievementData[1].size) * 100)}%`}</MultiValueBarLargeTextBox>
                        </div>
                    </MultiValueBarDiscriptionBox>
                    <MultiValueBar datas={taskAchievementData} />

                </RecordChartContainer>

                <WorkBookItemContainer>
                    {workbooks.map((workbook, index) => (
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