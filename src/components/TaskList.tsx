import TaskItem from "./TaskItem"
import type { TaskInterface } from "../types"
import { Flex, Paper, Title } from "@mantine/core"
import { useContext } from "react"
import { TasksContext } from "../Context"

export default function TaskList({ style, title, tasks }: { style?: {}, title: string, tasks: TaskInterface[]}) {
    return (
        <Paper style={style} shadow='sm' radius='md' bg='#eeeeeeff'>
            <Title order={4}> {title} </Title>
            <Flex gap='xs' align='center' direction='column' >
                {tasks.map((item, key) =>
                    <TaskItem id={item.id} key={key} />
                )}
            </Flex>
        </Paper>
    )
}