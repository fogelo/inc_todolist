import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test("id should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        todolist: {
            id: "todolistId3",
            title: "title",
            order: 0,
            addedDate: ""
        }
    })
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})