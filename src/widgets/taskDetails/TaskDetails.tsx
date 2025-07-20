import type {TaskInterface} from '@shared/model/types';
import {
    Button,
    Group,
    SegmentedControl,
    Textarea,
    Text,
    TextInput,
    Paper
} from '@mantine/core';
import {useForm} from '@mantine/form';
import styles from './taskDetails.module.css';
import {format} from 'date-fns';

/**
 * A functional React component that displays form filled with task data, allows you to edit fields.
 * @param {TaskInterface} currentTask - The task whose data needs to be displayed.
 * @param {(taskData: TaskInterface) => void} onSubmitProp - Action to be called when the submit button is pressed.
 * @param {() => void} onCancelProp - Action to be called when the cancel button is pressed.
 * @returns {React.Element} A React element displaying the form of task details.
 */
export default function TaskDetails({
    currentTask,
    onSubmitProp,
    onCancelProp
}: {
    currentTask: TaskInterface;
    onSubmitProp: (taskData: TaskInterface) => void;
    onCancelProp: () => void;
}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: currentTask.title,
            description: currentTask.description,
            category: currentTask.category,
            status: currentTask.status,
            priority: currentTask.priority,
            id: currentTask.id,
            date: currentTask.date
        },

        validate: {
            title: (value) =>
                /\S+/.test(value) ? null : "Title can't be empty"
        }
    });
    const dateString = format(
        new Date(currentTask.date!),
        'dd MMM yyyy HH:mm:ss'
    );
    return (
        <Paper className={styles.form} shadow='md' radius='md'>
            <form onSubmit={form.onSubmit(onSubmitProp)}>
                <TextInput
                    withAsterisk
                    label='Title'
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />
                {currentTask.date && (
                    <>
                        <Text fz='sm' fw={500} ta='left'>
                            Create date
                        </Text>
                        <Text fz='sm' ta='left'>
                            {dateString}
                        </Text>
                    </>
                )}
                <Textarea
                    label='Description'
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                    rows={11}
                />
                <Text fz='sm' fw={500} ta='left'>
                    Category
                </Text>
                <SegmentedControl
                    className={styles.scrollable}
                    fullWidth
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                    data={[
                        {label: 'Bug', value: 'Bug'},
                        {label: 'Feature', value: 'Feature'},
                        {label: 'Documentation', value: 'Documentation'},
                        {label: 'Refactor', value: 'Refactor'},
                        {label: 'Test', value: 'Test'}
                    ]}
                />
                <Text fz='sm' fw={500} ta='left'>
                    Status
                </Text>
                <SegmentedControl
                    fullWidth
                    key={form.key('status')}
                    {...form.getInputProps('status')}
                    data={[
                        {label: 'To Do', value: 'To Do'},
                        {label: 'In Progress', value: 'In Progress'},
                        {label: 'Done', value: 'Done'}
                    ]}
                />
                <Text fz='sm' fw={500} ta='left'>
                    Priority
                </Text>
                <SegmentedControl
                    fullWidth
                    key={form.key('priority')}
                    {...form.getInputProps('priority')}
                    data={[
                        {label: 'Low', value: 'Low'},
                        {label: 'Medium', value: 'Medium'},
                        {label: 'High', value: 'High'}
                    ]}
                />

                <Group justify='flex-end' mt='md'>
                    <Button type='submit'>Save</Button>
                    <Button color='#a6a6a6ff' onClick={onCancelProp}>
                        Cancel
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};
