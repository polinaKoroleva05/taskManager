import { Badge, Button, Group, Paper, Text } from "@mantine/core"
import type { TaskInterface } from "../types"
import styles from '../css/taskItem.module.css'
import LowPriorityIcon from '../assets/low.svg?react'
import MediumPriorityIcon from '../assets/medium.svg?react'
import HighPriorityIcon from '../assets/high.svg?react'
import { useContext } from "react"
import { TasksContext } from "../Context"
import { useNavigate } from "react-router"

const IconMap = {
    'Low': <LowPriorityIcon className={styles.icon} />,
    'Medium': <MediumPriorityIcon className={styles.icon} />,
    'High': <HighPriorityIcon className={styles.icon} />
}

export default function TaskItem({ id }: { id: number }) {
    const { tasks }: { tasks: TaskInterface[] } = useContext(TasksContext)
    let navigate = useNavigate()
    let currentTask = tasks.find(item=>item.id === id)
    return (
        <Paper shadow='sm' radius='md' className={styles.taskItem}>
            {currentTask &&
                <>
                    <Group justify="space-between">
                        <Badge color="blue" size="lg">{currentTask.priority}</Badge>
                        <Text fw={500}>
                            {currentTask.title}
                        </Text>
                        <Button variant="transparent" radius="md" onClick={() => navigate(`task/${id}`)}><LowPriorityIcon className={styles.icon} /></Button>
                    </Group>
                    {currentTask.description && <Text> {currentTask.description}</Text>}
                    <Group>
                        <Badge color="blue" size="lg">{currentTask.category}</Badge>
                        <Badge color="blue" size="lg">{currentTask.status}</Badge>
                    </Group>
                </>
            }
        </Paper>
    )
}