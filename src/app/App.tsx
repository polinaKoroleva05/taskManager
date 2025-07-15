import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import './App.css'
import { Route, Routes } from 'react-router'
import {TaskDetails} from '@widgets/taskDetails'
import { TaskStoreProvider } from '@/app/taskStore'
import {MainPage} from '@pages/mainPage'
import { NewTaskPage } from '@/pages/newTaskPage'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

function App() {

    return (
        <MantineProvider>
            <TaskStoreProvider>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/task/:id' element={<TaskDetails/>} />
                    <Route path='task/new' element={<NewTaskPage/>}/>
                </Routes>
            </TaskStoreProvider>
        </MantineProvider>
    )
}

export default App
