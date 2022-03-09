import {userReducer} from './user-reducer';

test('users reducer should increment only age', () => {

    const startState = {age: 20, childrenCount: 2, name: 'Anton'}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('users reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Anton'}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('users reducer should change user name', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Anton'}
    const newName = 'Ivan'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe('Ivan')
})