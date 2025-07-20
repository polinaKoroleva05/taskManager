import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import './App.css';
import {Route, Routes} from 'react-router';
import {TaskStoreProvider} from '@/app/taskStore';
import {MainPage} from '@pages/mainPage';
import {NewTaskPage} from '@/pages/newTaskPage';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {EditTaskPage} from '@/pages/editTaskPage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const client = new QueryClient();
import {ModalsProvider} from '@mantine/modals';

function App() {
    return (
        <MantineProvider>
            <ModalsProvider>
                <TaskStoreProvider>
                    <QueryClientProvider client={client}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route
                                path='/task/:id'
                                element={<EditTaskPage />}
                            />
                            <Route path='task/new' element={<NewTaskPage />} />
                        </Routes>
                    </QueryClientProvider>
                </TaskStoreProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}

export default App;
