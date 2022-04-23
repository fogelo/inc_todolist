import App from './App';
import {ReduxStoriesProviderDecorator} from '../stories/ReduxStoriesProviderDecorator';

export default {
    title: 'AppWithRedux component',
    component: App,
    decorators: [ReduxStoriesProviderDecorator]
}


export const AppWithReduxBaseExample = () => {
    return <App/>
}