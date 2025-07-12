import { useContext } from "react"
import { useNavigate, useParams } from "react-router"
import { TasksContext } from "../Context"
import type { TaskInterface } from "../types"
import { Button, Group, SegmentedControl, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

export default function TaskDetails() {
    let navigate = useNavigate()
    let { id } = useParams()
    const { tasks, setTask }: { tasks: TaskInterface[],  setTask: ({id, task}:{id: number, task: TaskInterface}) => void } = useContext(TasksContext)
    let currentTask = tasks.find(item=>item.id === Number(id))
    if (!currentTask) {
        return <p> Not Found :c </p>
    }
    function handleSubmit(values: typeof form.values){
        setTask({id: Number(id), task: values})
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                withAsterisk
                label="Заголовок"
                key={form.key('title')}
                {...form.getInputProps('title')}
            />
            {currentTask.description && <TextInput
                label="Описание"
                key={form.key('description')}
                {...form.getInputProps('description')}
            />}
            <SegmentedControl
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
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}