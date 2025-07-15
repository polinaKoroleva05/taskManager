import {useNavigate, useParams} from 'react-router';
import {TaskDetails} from '@/widgets/taskDetails';
import type {TaskInterface} from '@/shared/model/types';
import { useTaskStore } from '@/app/taskStore';

export default function EditTaskPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const Taskstore: {
        tasks: TaskInterface[];
        updateTask: ({id, task}: {id: number; task: TaskInterface}) => void;
    } = useTaskStore();

    const currentTask = Taskstore.tasks.find((item) => item.id === Number(id));
    if (!currentTask) {
        return <p> Not Found :c </p>;
    }
    function handleEditTask(taskData: TaskInterface) {
        Taskstore.updateTask({id: Number(id), task: taskData});
        navigate('/');
    }
    return (
        <TaskDetails
            currentTask={currentTask}
            onSubmitProp={handleEditTask}
            onCancelProp={() => navigate('/')}
        />
    );
}
