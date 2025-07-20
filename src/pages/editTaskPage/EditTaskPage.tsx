import {useNavigate, useParams} from 'react-router';
import {TaskDetails} from '@/widgets/taskDetails';
import type {TaskInterface} from '@/shared/model/types';
import {getTaskQueryMiddleware} from '@store/taskQueryMiddleware';
import {useIdTaskQuery} from '@store/useIdTaskQuery';
import { Loader } from '@mantine/core';

export default function EditTaskPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {
        data: currentTask,
        isLoading
    } = useIdTaskQuery(Number(id));
    const {updateTaskMutation} = getTaskQueryMiddleware();
    if (isLoading) {
        return <Loader />;
    }
    if (!currentTask) {
        return <p> Not Found :c </p>;
    }
    function handleEditTask(taskData: TaskInterface) {
        let patchData: Partial<TaskInterface> = {} //только измененные данные
        for (let field in taskData){
            if (taskData[field] !== currentTask[field]){
                patchData[field] = taskData[field]
            }
        }
        if(Object.keys(patchData).length){
            updateTaskMutation({id: Number(id), newTask: patchData});
        }
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
