import App from '../app/App';
import { ReduxStoriesProviderDecorator} from "../stories/ReduxStoriesProviderDecorator";
import StoryRouter from 'storybook-react-router';

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoriesProviderDecorator, StoryRouter()]
}


export const AppBaseExample = () => {
    return <App demo={true}/>
}