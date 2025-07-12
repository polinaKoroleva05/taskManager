import TaskItem from "./TaskItem"
import type { TaskInterface } from "../types"
import { Flex } from "@mantine/core"
import { useContext } from "react"
import { TasksContext } from "../Context"

export default function TaskList() {
    const {tasks}: {tasks: TaskInterface[]} = useContext(TasksContext)
    return (
        <Flex gap='xs' align='center' direction='column' >
            {tasks.map((item, key) =>
                <TaskItem id={item.id} key={key} />
            )}
        </Flex>
    )
}