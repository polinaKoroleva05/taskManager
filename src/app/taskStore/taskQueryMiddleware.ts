import {useQueryClient} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';
import {
    createTaskService,
    deleteTaskService,
    updateTaskService
} from '@store/taskService';
import type {TaskInterface} from '@/shared/model/types';

export function getTaskQueryMiddleware() {
    const client = useQueryClient();
    const {mutate: createTaskMutation} = useMutation({
        mutationFn: createTaskService,
        onSuccess: (newTask: TaskInterface) => {
            client.setQueryData(['allTasks'], (oldTasks: TaskInterface[]) => [
                ...oldTasks,
                newTask
            ]);
            // client.invalidateQueries({queryKey: ['allTasks']});
        }
    });

    const {mutate: updateTaskMutation} = useMutation({
        mutationFn: updateTaskService,
        onMutate: ({
            id,
            newTask
        }: {
            id: number;
            newTask: Partial<TaskInterface>;
        }) => {
            const previousTasks = client.getQueryData(['allTasks']);
            client.setQueryData(['allTasks'], (oldTasks: TaskInterface[]) =>
                oldTasks.map((task: TaskInterface) =>
                    task.id === id ? {...task, ...newTask} : task
                )
            );
            return {previousTasks}; // Возвращаем старые данные для отката
        },
        onError: (_err, _variables, context) => {
            client.setQueryData(['allTasks'], context!.previousTasks);
        },
        onSuccess: (updatedTask: TaskInterface) => {
            //принимаем таску от сервера, полную, со всеми полями
            client.setQueryData(['task', updatedTask.id], () => updatedTask);
            client.setQueryData(['allTasks'], (oldTasks: TaskInterface[]) =>
                oldTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        }
    });

    const {mutate: deleteNoteMutation} = useMutation({
        mutationFn: deleteTaskService,
        onMutate: (id: number) => {
            const previousTasks = client.getQueryData(['allTasks']);
            client.setQueryData(['allTasks'], (oldTasks: TaskInterface[]) =>
                oldTasks.filter((task: TaskInterface) => task.id != id)
            );
            return {previousTasks}; // Возвращаем старые данные для отката
        },
        onError: (_err, _id, context) => {
            client.setQueryData(['allTasks'], context!.previousTasks);
        },
        onSuccess: (tasks: TaskInterface[]) => {
            console.log('success');
            client.setQueryData(['allTasks'], () => tasks);
            // client.invalidateQueries({queryKey: ['allTasks']});
        }
    });
    return {createTaskMutation, updateTaskMutation, deleteNoteMutation};
}
