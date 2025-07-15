import React, { useCallback, useState } from "react";
import type { TaskInfo } from "@shared/model/types";

export const TasksContext = React.createContext<{ tasks: TaskInfo[], setTask: ({ id, task }: { id: number, task: TaskInfo }) => void }>({ tasks: [], setTask: () => { } });

export const useCreateTasksContext = function () {

    let tasks: TaskInfo[] = [
        {
            id: 1,
            title: 'Task1',
            description: 'do task1 please',
            category: 'Bug',
            status: 'Done',
            priority: 'Low'
        }, {
            id: 2,
            title: 'Task2',
            category: 'Documentation',
            status: 'In Progress',
            priority: 'High'
        }, {
            id: 3,
            title: 'Task3',
            description: 'make it good',
            category: 'Feature',
            status: 'To Do',
            priority: 'Medium'
        },
        {
            id: 4,
            title: 'Task4',
            description: 'Take some rest',
            category: 'Refactor',
            status: 'To Do',
            priority: 'Low'
        },
        {
            id: 5,
            title: 'Task5',
            description: 'Do homework',
            category: 'Test',
            status: 'To Do',
            priority: 'Medium'
        },
        {
            id: 6,
            title: ' Очень очень длинное название для задачи где нужно описать все все, чтобы ни у кого не осталось вопросов',
            description: 'Супер подробное описание задачи, со всеми нужными технологиями, уточнениями, шутками-прибаутками, с заходом издалека, с благодарностями, пожеланиями, жалобами, воодушевлениями',
            category: 'Test',
            status: 'To Do',
            priority: 'Medium'
        }]

    const [state, setState] = useState(tasks)

    const changeTask = useCallback(({ id, task }: { id: number, task: TaskInfo }) => {
        for (let i = 0; i < state.length; i++) {
            if (state[i].id === id) {
                state[i] = task;
                break;
            }
        }
        setState([...state]);
    }, []);

    return {
        tasks: state,
        setTask: changeTask,
    };
}

export const TaskContextProvider = ({ children }: { children: React.ReactElement }) => {
    const context = useCreateTasksContext();
    return <TasksContext.Provider value={context}>{children}</TasksContext.Provider>;
}