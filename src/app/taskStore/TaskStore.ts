import type {TaskInterface} from '@shared/model/types';
import {useCallback, useState} from 'react';

export const createTaskStore = function () {
    let tmpId = 7;
    let tasks: TaskInterface[] = [
        {
            id: 1,
            title: 'Task1',
            description: 'do task1 please',
            category: 'Bug',
            status: 'Done',
            priority: 'Low',
            date: new Date().toDateString()
        },
        {
            id: 2,
            title: 'Task2',
            category: 'Documentation',
            status: 'In Progress',
            priority: 'High',
            date: new Date().toDateString()
        },
        {
            id: 3,
            title: 'Task3',
            description: 'make it good',
            category: 'Feature',
            status: 'To Do',
            priority: 'Medium',
            date: new Date().toDateString()
        },
        {
            id: 4,
            title: 'Task4',
            description: 'Take some rest',
            category: 'Refactor',
            status: 'To Do',
            priority: 'Low',
            date: new Date().toDateString()
        },
        {
            id: 5,
            title: 'Task5',
            description: 'Do homework',
            category: 'Test',
            status: 'To Do',
            priority: 'Medium',
            date: new Date().toDateString()
        },
        {
            id: 6,
            title: ' Очень очень длинное название для задачи где нужно описать все все, чтобы ни у кого не осталось вопросов',
            description:
                'Супер подробное описание задачи, со всеми нужными технологиями, уточнениями, шутками-прибаутками, с заходом издалека, с благодарностями, пожеланиями, жалобами, воодушевлениями',
            category: 'Test',
            status: 'To Do',
            priority: 'Medium',
            date: new Date().toDateString()
        }
    ];

    return {
        tasks,
        updateTask: function ({id, task}: {id: number; task: TaskInterface}) {
            console.log('updateTask', this);
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === id) {
                    this.tasks[i] = task;
                    break;
                }
            }
            console.log(this.tasks);
        },
        createTask: function (task: TaskInterface) {
            console.log('createTask', this);
            task.id = tmpId++;
            task.date = new Date().toDateString();
            this.tasks.push(task);
            console.log(this.tasks);
        },
        deleteTask: function (id: number) {
            console.log('deleteTask', this);
            const deleteInd = this.tasks.findIndex((task) => task.id === id);
            this.tasks.splice(deleteInd, 1);
            console.log(this.tasks);
        }
    };
};
