import { useContext } from "react"
import { useParams } from "react-router"
import { Context } from "../Context"
import type { TaskInterface } from "../types"
import { Button, Group, Paper, SegmentedControl, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

export default function TaskDetails() {
    let { id } = useParams()
    const mapTasks: Map<number, TaskInterface> | null = useContext(Context)
    let currentTask = Number(id) ? mapTasks?.get(Number(id)) : undefined
    if (!currentTask) {
        return <p> Not Found :c </p>
    }
    function handleSubmit(values: typeof form.values){
        mapTasks?.set(Number(id), values)
        console.log(mapTasks)
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: currentTask.title,
            description: currentTask.description,
            category: currentTask.category,
            status: currentTask.status,
            priority: currentTask.priority
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