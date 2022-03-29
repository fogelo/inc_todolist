import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Task Component',
    component: Task
}


const removeTaskCallback = action('Task removed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
export const TaskBaseExample = () => {
    return <>
        <Task task={{id: '1', isDone: true, title: 'css'}}
              todolistId={'todolistId1'}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>
        <Task task={{id: '2', isDone: false, title: 'html'}}
              todolistId={'todolistId2'}
              removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>
    </>
}