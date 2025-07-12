import TaskList from './components/TaskList'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import './App.css'
import { Route, Routes } from 'react-router'
import TaskDetails from './components/TaskDetails'
import { TaskContextProvider } from './Context'

function App() {

    return (
        <MantineProvider>
            <TaskContextProvider>
                <Routes>
                    <Route path='/' element={<TaskList />} />
                    <Route path='/task/:id' element={<TaskDetails/>} />
                </Routes>
            </TaskContextProvider>
        </MantineProvider>
    )
}

export default App
