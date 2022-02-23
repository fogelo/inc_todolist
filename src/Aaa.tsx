import {v1} from 'uuid';

type Aaa = {
    id: string;
    title: string;
    isDone: boolean;
}

let aaa: Aaa = {id: v1(), title: 'CSS', isDone: true}