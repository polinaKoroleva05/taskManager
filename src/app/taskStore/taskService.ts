const BASE = 'https://task-manager-api-sigma-mauve.vercel.app/tasks';
// const BASE = 'http://localhost:3000/tasks';
import type {TaskInterface} from '@shared/model/types';

export async function getTasksService() {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error('Failed to fetch tasks!');
    return res.json();
}

export async function getIdTaskService(id: number) {
    const res = await fetch(`${BASE}/${id}`);
    if(res.status === 404) throw new Error('Not Found')
    else if (!res.ok) throw new Error(`Failed to fetch task with id ${id}!`);
    return res.json();
}

export async function createTaskService(newTask: TaskInterface) {
    const res = await fetch(BASE, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('in createTaskService', res)
    if (!res.ok) throw new Error(`Failed to create task`);
    return res.json();
}

export async function updateTaskService({
    id,
    newTask
}: {
    id: number;
    newTask: Partial<TaskInterface>;
}) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error(`Failed to update task`);
    return res.json();
}

export async function deleteTaskService(id: number) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}
