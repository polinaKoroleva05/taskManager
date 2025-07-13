import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import './App.css'
import { Route, Routes } from 'react-router'
import TaskDetails from './components/TaskDetails'
import { TaskContextProvider } from './Context'
import MainPage from './components/MainPage'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

function App() {

    return (
        <MantineProvider>
            <TaskContextProvider>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/task/:id' element={<TaskDetails/>} />
                </Routes>
            </TaskContextProvider>
        </MantineProvider>
    )
}

export default App
