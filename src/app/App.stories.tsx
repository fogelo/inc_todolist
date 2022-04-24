import App from '../app/App';
import {ReduxStoriesProviderDecorator} from '../stories/ReduxStoriesProviderDecorator';

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoriesProviderDecorator]
}


export const AppBaseExample = () => {
    return <App demo={true}/>
}