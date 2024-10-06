import {
    CategoryBox,
    CategoryColorPoint,
    MovingPointForTaskItem,
    TaskItem,
    TaskItemCheckBox,
    TaskItemContent,
    TaskItemList,
    TasksByCategoryBox,
} from "./DailyPlanner.style"


export default function TaskListByCategory({ category, tasks }) {

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
                    return (
                        <TaskItem key={index}>
                            <MovingPointForTaskItem />
                            <TaskItemContent sledding={task.sledding}>
                                {task.contents}
                            </TaskItemContent>
                            <TaskItemCheckBox src={checkBoxSrc} />
                        </TaskItem>
                    );
                })}
            </TaskItemList>
        </TasksByCategoryBox>
    );
}