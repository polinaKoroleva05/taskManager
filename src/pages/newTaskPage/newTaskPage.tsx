import {getTaskQueryMiddleware} from '@store/taskQueryMiddleware';
import type {TaskInterface} from '@/shared/model/types';
import {TaskDetails} from '@/widgets/taskDetails';
import {useNavigate} from 'react-router';
import styles from './newTaskPage.module.css';

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
    const {createTaskMutation} = getTaskQueryMiddleware();
    function handleCreateTask(taskData: TaskInterface) {
        createTaskMutation(taskData);
        navigate('/');
    }
    return (
        <div className={styles.page}>
            <TaskDetails
                currentTask={emptyTask}
                onSubmitProp={handleCreateTask}
                onCancelProp={() => navigate('/')}
            />
        </div>
    );
}
