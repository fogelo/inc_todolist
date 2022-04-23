import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}


const onChangeCallback = action('title changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'start title'} onChange={onChangeCallback}/>

}