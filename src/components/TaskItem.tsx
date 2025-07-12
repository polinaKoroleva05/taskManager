import { Badge, Button, Group, Paper, Text, Title } from "@mantine/core"
import type { TaskInterface } from "../types"
import styles from '../css/taskItem.module.css'
import LowPriorityIcon from '../assets/low.svg?react'
import MediumPriorityIcon from '../assets/medium.svg?react'
import HighPriorityIcon from '../assets/high.svg?react'
import { useContext } from "react"
import { TasksContext } from "../Context"
import { useNavigate } from "react-router"

const PriorityMap = {
    'Low': "#8bade8ff",
    'Medium': "#e6b359ff",
    'High': "#f06767ff"
}

const StatusMap = {
    'To Do': "#ff3838ff",
    'In Progress': "#707682ff",
    'Done': "#68bb4aff"
}

const CategoryMap = {
    'Bug': { from: '#ff3838ff', to: '#ff8b51ff', deg: 45 },
    'Feature': { from: '#a548baff', to: '#e461dbff', deg: 45 },
    'Documentation': { from: '#4d3dffff', to: '#3da1ffff', deg: 45 },
    'Refactor': { from: '#38b6ffff', to: '#25d4c8ff', deg: 45 },
    'Test': { from: '#3bcb33ff', to: '#b0cf32ff', deg: 45 }
}

export default function TaskItem({ id }: { id: number }) {
    const { tasks }: { tasks: TaskInterface[] } = useContext(TasksContext)
    let navigate = useNavigate()
    let currentTask = tasks.find(item => item.id === id)
    return (
        <Paper shadow='sm' radius='md' className={styles.taskItem}>
            {currentTask &&
                <>
                    <Group justify="space-between">
                        <Badge variant="light" color={PriorityMap[currentTask.priority]} size='sm'>{currentTask.priority}</Badge>
                        <Button variant="transparent" radius="md" onClick={() => navigate(`task/${id}`)}><HighPriorityIcon className={styles.icon} /></Button>
                    </Group>
                        <Title ta="left" order={5}>
                            {currentTask.title}
                        </Title >
                    {currentTask.description && <Text ta="left"> {currentTask.description}</Text>}
                    <Group>
                        <Badge variant="dot"  radius='sm' color={StatusMap[currentTask.status]} size="sm">{currentTask.status}</Badge>
                        <Badge radius='sm' variant="gradient"
                            gradient={CategoryMap[currentTask.category]} size="sm">{currentTask.category}</Badge>
                    </Group>
                </>
            }
        </Paper>
    )
}