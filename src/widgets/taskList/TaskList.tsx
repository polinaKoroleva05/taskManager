import {TaskItem} from '@widgets/taskItem';
import type {TaskInterface} from '@shared/model/types';
import {Flex, Paper, Title} from '@mantine/core';
import styles from './taskList.module.css'

/**
 * A functional React component that displays list of tasks.
 * @param {object} style - Object with style for css.
 * @param {string} title - Status of tasks in that taskList.
 * @param {TaskInterface[]} tasks - Array of tasks.
 * @returns {React.Element} A React element displaying array of tasks.
 */
export default function TaskList({
    style,
    title,
    tasks
}: {
    style?: object;
    title: string;
    tasks: TaskInterface[];
}) {
    return (
        <Paper className={styles.taskList} style={style} shadow='md' radius='md' bg='#00000020'>
            <Title order={5}> {title} </Title>
            <Flex gap='xs' align='center' direction='column'>
                {tasks.map((item, key) => (
                    <TaskItem item={item} key={key} />
                ))}
            </Flex>
        </Paper>
    );
}
