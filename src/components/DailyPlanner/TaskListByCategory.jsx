import {
    CategoryBox,
    CategoryColorPoint,
    MovingPointForTaskItem,
    SlidingTaskControlBox,
    TaskControlMenu,
    TaskControlMenuItem,
    TaskItem,
    TaskItemCheckBox,
    TaskItemContent,
    TaskItemList,
    TasksByCategoryBox,
} from "./DailyPlanner.style"
import { useState } from 'react';



export default function TaskListByCategory({ category, tasks, setTasks }) {
    //TaskItem 드래그 앤 드롭 관련 상태
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [slidIndex, setSlidIndex] = useState(null);

    const initialMenuVisibility = tasks.map(() => false);
    const [menuVisible, setMenuVisible] = useState(initialMenuVisibility);

    // const toggleMenu = (index) => {
    //     const newMenuVisibility = tasks.map((_, i) => i === index ? !menuVisible[i] : false);
    //     setMenuVisible(newMenuVisibility);
    // };

    const handleCheckBoxClick = (index) => {
        const newTaskList = [...tasks];
        switch (newTaskList[index].sledding) {
            case 'none':
                newTaskList[index].sledding = 'checked';
                break;
            case 'checked':
                newTaskList[index].sledding = 'x';
                break;
            case 'x':
                newTaskList[index].sledding = 'none';
                break;
            default:
                newTaskList[index].sledding = 'none';
        }



        setTasks(newTaskList);

    };

    //TaskItem 스와이프 관련 상태 함수
    const toggleSlide = (e, index) => {
        e.preventDefault(); // 기본 우클릭 메뉴 방지
        setSlidIndex(slidIndex === index ? null : index);
    };

    const handleDeleteTask = (index) => {
        const newMenuVisibility = tasks.map(() => false);
        setMenuVisible(newMenuVisibility);

        const newTaskList = tasks.filter((_, i) => i !== index);
        setTasks(newTaskList);

        setSlidIndex(null);
    };



    return (
        <TasksByCategoryBox>
            <CategoryBox bgColor='rgba(255, 0, 0, 0.10)'>
                <CategoryColorPoint color="red" />
                {category}
            </CategoryBox>
            <TaskItemList>
                {tasks.map((task, index) => {
                    let checkBoxSrc;
                    switch (task.sledding) {
                        case 'checked':
                            checkBoxSrc = '/src/assets/CheckSquare.svg';
                            break;
                        case 'none':
                            checkBoxSrc = '/src/assets/Square.svg';
                            break;
                        case 'x':
                            checkBoxSrc = '/src/assets/XSquare.svg';
                            break;
                        default:
                            checkBoxSrc = '/src/assets/Square.svg';
                    }

                    const handleDragStart = (e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify({ index, category }));
                        //e.dataTransfer.setData('text/plain', index);
                        setDraggingIndex(index);
                    };

                    const handleDrop = (e) => {
                        //const draggedIndex = e.dataTransfer.getData('text');
                        e.preventDefault(); // 기본 동작 방지
                        const { index: draggedIndex, category: draggedCategory } = JSON.parse(e.dataTransfer.getData('text'));
                        if (draggedCategory !== category) {
                            return; // 다른 카테고리로 드롭을 방지
                        }

                        const newTaskList = [...tasks];
                        const [draggedTask] = newTaskList.splice(draggedIndex, 1);
                        newTaskList.splice(index, 0, draggedTask);
                        setTasks(newTaskList);
                        setDraggingIndex(null);
                    };

                    const handleDragOver = (e) => {
                        e.preventDefault();
                    };

                    const handleDragEnd = () => {
                        setSlidIndex(null);
                        setDraggingIndex(null);
                    };

                    return (
                        <TaskItem
                            key={index}
                            isDragging={index === draggingIndex}
                            draggable={index === draggingIndex}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                        >
                            <SlidingTaskControlBox>
                                <TaskControlMenu
                                    isSlid={index === slidIndex}>
                                    <TaskControlMenuItem
                                        isSlid={index === slidIndex}
                                        commentType="delete"
                                        onClick={() => { handleDeleteTask(index) }}>
                                        삭제
                                    </TaskControlMenuItem>
                                    <TaskControlMenuItem
                                        isSlid={index === slidIndex}
                                        commentType="edit"
                                        onClick={() => { console.log("!!!!!!!") }}>
                                        수정
                                    </TaskControlMenuItem>
                                </TaskControlMenu>

                                <MovingPointForTaskItem
                                    onMouseDown={() => { setDraggingIndex(index) }}
                                    onMouseUp={() => { setDraggingIndex(null) }}
                                    isSlid={index === slidIndex}
                                />
                                <TaskItemContent
                                    onContextMenu={(e) => { toggleSlide(e, index) }}
                                    onClick={() => handleCheckBoxClick(index)}
                                    sledding={task.sledding}
                                    isSlid={index === slidIndex}>
                                    {task.contents}
                                </TaskItemContent>
                            </SlidingTaskControlBox>
                            <TaskItemCheckBox src={checkBoxSrc} onClick={() => handleCheckBoxClick(index)} />
                        </TaskItem>
                    );
                })}
            </TaskItemList>
        </TasksByCategoryBox>
    );
}

/*

import { useState } from 'react';

                            const [menuVisible, setMenuVisible] = useState(false);

                            const toggleMenu = () => {
                                setMenuVisible(!menuVisible);
                            };

                            <TaskItem key={index}>
                                <div style={{ position: 'relative' }}>
                                    <button onClick={toggleMenu}>⋮</button>
                                    {menuVisible && (
                                        <div style={{
                                            position: 'absolute',
                                            left: '-100px',
                                            top: '0',
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                            zIndex: 1
                                        }}>
                                            <div style={{ padding: '8px', cursor: 'pointer' }}>Edit</div>
                                            <div style={{ padding: '8px', cursor: 'pointer' }}>Delete</div>
                                        </div>
                                    )}
                                </div>
                                <MovingPointForTaskItem />
                                <TaskItemContent sledding={task.sledding}>
                                    {task.contents}
                                </TaskItemContent>
                                <TaskItemCheckBox src={checkBoxSrc} onClick={() => handleCheckBoxClick(index)} />
                            </TaskItem>
*/