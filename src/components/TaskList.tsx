import TaskItem from "./TaskItem"
import type { TaskInterface } from "../types"
import { Flex } from "@mantine/core"
import { useContext, useMemo } from "react"
import { Context } from "../Context"

export default function TaskList() {
    const mapTasks: Map<number, TaskInterface> | null = useContext(Context)
    let arrayTasks = useMemo(()=>{
        if(mapTasks){
            return Array.from(mapTasks.entries())
        }else 
            return []
    }, [Context])
    return (
        <Flex gap='xs' align='center' direction='column' >
            {arrayTasks.map(([id, ], key) =>
                <TaskItem id={id} key={key} />
            )}
        </Flex>
    )
}