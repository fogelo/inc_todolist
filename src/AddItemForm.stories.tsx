import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}


const callback = action('Button "add" was pressed inside the form')

export const AddItemFormBaseExample = () => {
    // return <AddItemForm addItem={(title: string) => alert(title)}/>
    return <AddItemForm addItem={callback}/> //выведет сообщение, которое мы передали в action и значение, которое передается в callback
}