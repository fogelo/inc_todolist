import AppWithRedux from './AppWithRedux';
import {ReduxStoriesProviderDecorator} from './stories/ReduxStoriesProviderDecorator';

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoriesProviderDecorator]
}


export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}