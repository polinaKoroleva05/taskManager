import type {TaskInterface} from '@shared/model/types';
import {createContext, useContext} from 'react';
import {observer, useLocalObservable} from 'mobx-react-lite';
import {createTaskStore} from './TaskStore';

export const TasksContext = createContext<{
    tasks: TaskInterface[];
    updateTask: ({id, task}: {id: number; task: TaskInterface}) => void;
    createTask: (task: TaskInterface) => void;
    deleteTask: (id: number) => void;
}>({tasks: [], updateTask: () => {}, createTask: () => {}, deleteTask: () => {}});

export const TaskStoreProvider = observer(
    ({children}: {children: React.ReactElement}) => {
        const store = useLocalObservable(() => createTaskStore());
        return (
            <TasksContext.Provider value={store}>
                {children}
            </TasksContext.Provider>
        );
    }
);

export const useTaskStore = () => {
    const store = useContext(TasksContext);
    if (!store) throw new Error('Use Task store within provider!');
    return store;
};
