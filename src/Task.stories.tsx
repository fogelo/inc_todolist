import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from './api/todolists-api';

export default {
    title: 'Task Component',
    component: Task
}


const removeTaskCallback = action('Task removed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
export const TaskBaseExample = () => {
    return <>
        <Task task={{
            id: '1', status: TaskStatuses.Completed, title: 'css', addedDate: '',
            order: 0,
            description: '',
            deadline: '',
            startDate: '',
            todoListId: 'todolistId1',
            priority: TaskPriorities.Low
        }}
              todolistId={'todolistId1'}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>
        <Task task={{
            id: '2', status: TaskStatuses.New, title: 'html', addedDate: '',
            order: 0,
            description: '',
            deadline: '',
            startDate: '',
            todoListId: 'todolistId1',
            priority: TaskPriorities.Low
        }}
              todolistId={'todolistId2'}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>
    </>
}