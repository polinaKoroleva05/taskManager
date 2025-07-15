import { useTaskStore } from '@/app/taskStore';
import type {TaskInterface} from '@/shared/model/types';
import {TaskDetails} from '@/widgets/taskDetails';
import {useNavigate} from 'react-router';

export default function NewTaskPage() {
    const navigate = useNavigate();
    const emptyTask: TaskInterface = {
        id: null,
        title: '',
        description: '',
        category: 'Bug',
        status: 'To Do',
        priority: 'Low',
        date: null
    };
    const Taskstore: {
        tasks: TaskInterface[];
        createTask: (task: TaskInterface) => void;
    } = useTaskStore();

    function handleCreateTask(taskData: TaskInterface) {
        Taskstore.createTask(taskData)
        navigate('/')
    }
    return (
        <TaskDetails
            currentTask={emptyTask}
            onSubmitProp={handleCreateTask}
            onCancelProp={() => navigate('/')}
        />
    );
}
