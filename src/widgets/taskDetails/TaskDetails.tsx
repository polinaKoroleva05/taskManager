import { useContext } from "react"
import { useNavigate, useParams } from "react-router"
import { TasksContext } from "@store/Context"
import type { TaskInterface } from "@shared/model/types"
import { Button, Group, SegmentedControl, Textarea, Text, TextInput, Paper } from "@mantine/core"
import { useForm } from "@mantine/form"
import styles from './taskDetails.module.css'

export default function TaskDetails() {
    let navigate = useNavigate()
    let { id } = useParams()
    const { tasks, setTask }: { tasks: TaskInterface[], setTask: ({ id, task }: { id: number, task: TaskInterface }) => void } = useContext(TasksContext)
    let currentTask = tasks.find(item => item.id === Number(id))
    if (!currentTask) {
        return <p> Not Found :c </p>
    }
    function handleSubmit(values: typeof form.values) {
        setTask({ id: Number(id), task: values })
        navigate('/')
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: currentTask.title,
            description: currentTask.description,
            category: currentTask.category,
            status: currentTask.status,
            priority: currentTask.priority,
            id: currentTask.id
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    return (
        <Paper className={styles.form} shadow='md' radius='md'>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput 
                    withAsterisk
                    label="Title"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />
                <Textarea
                    label="Description"
                    
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                    
                    rows={11}

                />
                <Text fz='sm' fw={500} ta="left">
                    Category
                </Text>
                <SegmentedControl
                    fullWidth
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                    data={[
                        { label: 'Bug', value: 'Bug' },
                        { label: 'Feature', value: 'Feature' },
                        { label: 'Documentation', value: 'Documentation' },
                        { label: 'Refactor', value: 'Refactor' },
                        { label: 'Test', value: 'Test' }
                    ]}
                />
                <Text fz='sm' fw={500} ta="left">
                    Status
                </Text>
                <SegmentedControl
                    fullWidth
                    key={form.key('status')}
                    {...form.getInputProps('status')}
                    data={[
                        { label: 'To Do', value: 'To Do' },
                        { label: 'In Progress', value: 'In Progress' },
                        { label: 'Done', value: 'Done' }
                    ]}
                />
                <Text fz='sm' fw={500} ta="left">
                    Priority
                </Text>
                <SegmentedControl
                    fullWidth
                    key={form.key('priority')}
                    {...form.getInputProps('priority')}
                    data={[
                        { label: 'Low', value: 'Low' },
                        { label: 'Medium', value: 'Medium' },
                        { label: 'High', value: 'High' }
                    ]}
                />

                <Group justify="flex-end" mt="md">
                    <Button color='#80b654ff' type="submit">Save</Button>
                    <Button color='#a6a6a6ff' onClick={() => navigate('/')}>Cancel</Button>
                </Group>
            </form>
        </Paper>
    )
}