import {
    CategoryBox,
    CategoryColorPoint,
    MovingPointForTaskItem,
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
    const [draggingIndex, setDraggingIndex] = useState(null);

    const initialMenuVisibility = tasks.map(() => false);
    const [menuVisible, setMenuVisible] = useState(initialMenuVisibility);

    const toggleMenu = (index) => {
        const newMenuVisibility = tasks.map((_, i) => i === index ? !menuVisible[i] : false);
        setMenuVisible(newMenuVisibility);
    };

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

    const handleDeleteTask = (index) => {
        const newMenuVisibility = tasks.map(() => false);
        setMenuVisible(newMenuVisibility);

        const newTaskList = tasks.filter((_, i) => i !== index);
        setTasks(newTaskList);
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
                        e.dataTransfer.setData('text/plain', index);
                        setDraggingIndex(index);
                    };

                    const handleDrop = (e) => {
                        const draggedIndex = e.dataTransfer.getData('text');
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
                            <div style={{ position: 'absolute', visibility: menuVisible[index] ? 'visible' : 'hidden' }}>
                                <TaskControlMenu visibility={menuVisible[index] ? 'visible' : 'hidden'}>
                                    <TaskControlMenuItem>수정</TaskControlMenuItem>
                                    <TaskControlMenuItem onClick={() => { handleDeleteTask(index) }}>삭제</TaskControlMenuItem>
                                </TaskControlMenu>
                            </div>
                            <MovingPointForTaskItem
                                onMouseDown={() => { setDraggingIndex(index) }}
                                onMouseUp={() => { setDraggingIndex(null) }}
                            //onClick={() => { toggleMenu(index) }}

                            />
                            <TaskItemContent sledding={task.sledding}>
                                {task.contents}
                            </TaskItemContent>
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