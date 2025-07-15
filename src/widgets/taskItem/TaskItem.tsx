import {Badge, Button, Group, Paper, Text, Title} from '@mantine/core';
import type {TaskInterface} from '@shared/model/types';
import styles from './taskItem.module.css';
import EditIcon from '@shared/ui/edit.svg?react';
import {useNavigate} from 'react-router';
import {observer} from 'mobx-react-lite';
import {useTaskStore} from '@/app/taskStore';
import DeleteIcon from '@shared/ui/delete.svg?react'
import { format } from "date-fns";

const PriorityMap = {
    Low: '#8bade8ff',
    Medium: '#e6b359ff',
    High: '#f06767ff'
};

const StatusMap = {
    'To Do': '#ff3838ff',
    'In Progress': '#707682ff',
    Done: '#68bb4aff'
};

const CategoryMap = {
    Bug: {from: '#ff3838ff', to: '#ff8b51ff', deg: 45},
    Feature: {from: '#a548baff', to: '#e461dbff', deg: 45},
    Documentation: {from: '#4d3dffff', to: '#3da1ffff', deg: 45},
    Refactor: {from: '#38b6ffff', to: '#25d4c8ff', deg: 45},
    Test: {from: '#3bcb33ff', to: '#b0cf32ff', deg: 45}
};

export default observer(function TaskItem({item}: {item: TaskInterface}) {
    const navigate = useNavigate();
    const Taskstore: {
        tasks: TaskInterface[];
        deleteTask: (id: number) => void;
    } = useTaskStore();
    function handleDelete(event: any) {
        event.stopPropagation();
        Taskstore.deleteTask(item.id!);
    }
    const dateString = format(new Date(item.date!), "dd MMM yyyy HH:mm")
    return (
        <Paper
            shadow='sm'
            radius='md'
            className={styles.taskItem}
            onClick={() => navigate(`task/${item.id}`)}
        >
            {item && (
                <>
                <Text className={styles.dateText} ta='left'>{dateString} </Text>
                    <Group justify='space-between'>
                        <Badge
                            variant='light'
                            color={PriorityMap[item.priority]}
                            size='sm'
                        >
                            {item.priority}
                        </Badge>
                        <Group gap="0">
                            <Button
                                variant="transparent"
                                color='#8c8c8cff'
                                size='xs'
                                radius='sm'
                                onClick={() => navigate(`task/${item.id}`)}
                                className={styles.iconButton}
                            >
                                <EditIcon className={styles.iconEdit} />
                            </Button>
                            <Button
                                variant="transparent"
                                color='#8c8c8cff'
                                size='xs'
                                radius='sm'
                                onClick={handleDelete}
                                className={styles.iconButton}
                            >
                                <DeleteIcon className={styles.iconDelete}/>
                            </Button>
                        </Group>
                    </Group>
                    <Title ta='left' order={5}>
                        {item.title}
                    </Title>
                    {item.description && (
                        <Text ta='left'> {item.description}</Text>
                    )}
                    <Group style={{paddingTop: '1vw'}}>
                        <Badge
                            variant='dot'
                            radius='sm'
                            color={StatusMap[item.status]}
                            size='sm'
                        >
                            {item.status}
                        </Badge>
                        <Badge
                            radius='sm'
                            variant='gradient'
                            gradient={CategoryMap[item.category]}
                            size='sm'
                        >
                            {item.category}
                        </Badge>
                    </Group>
                </>
            )}
        </Paper>
    );
});
