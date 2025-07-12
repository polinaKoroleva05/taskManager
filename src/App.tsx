import TaskList from './components/TaskList'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import type { TaskInfo } from './types'
import './App.css'
import { Route, Routes } from 'react-router'
import TaskDetails from './components/TaskDetails'
import { Context } from './Context'

function App() {
    let listTasks: Map<number, TaskInfo> = new Map([
        [1, {
        title: 'Task1',
        description: 'do task1 please',
        category: 'Bug',
        status: 'Done',
        priority: 'Low'
    }], [2, {
        title: 'Task2',
        category: 'Documentation',
        status: 'In Progress',
        priority: 'High'
    }], [3, {
        title: 'Task3',
        description: 'make it good',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium'
    }],
    [4, {
        title: 'Task4',
        description: 'Take some rest',
        category: 'Feature',
        status: 'To Do',
        priority: 'Low'
    }]])

    return (
        <MantineProvider>
            <Context.Provider value={listTasks}>
                <Routes>
                    <Route path='/' element={<TaskList />} />
                    <Route path='/task/:id' element={<TaskDetails/>} />
                </Routes>
            </Context.Provider>
        </MantineProvider>
    )
}

export default App
