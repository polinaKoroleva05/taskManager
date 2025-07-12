import { Container, Flex } from "@mantine/core";
import { useContext } from "react"
import { TasksContext } from "../Context"
import type { TaskInterface } from "../types";
import TaskList from "./TaskList";
import { Carousel } from "@mantine/carousel";
import styles from '../css/taskList.module.css'

export default function MainPage() {
    const { tasks }: { tasks: TaskInterface[] } = useContext(TasksContext)
    let tasksToDo = tasks.filter(task => task.status === 'To Do')
    let tasksInProgress = tasks.filter(task => task.status === 'In Progress')
    let tasksDone = tasks.filter(task => task.status === 'Done')
    return (<>
        <p>Поиск</p>
        <Flex visibleFrom="sm"
            gap="sm"
            justify="center"
            align="flex-start"
            direction="row">
            <TaskList style={{'width': '30vw'}} title="To Do" tasks={tasksToDo} />
            <TaskList style={{'width': '30vw'}} title="In Progress" tasks={tasksInProgress} />
            <TaskList style={{'width': '30vw'}} title="Done" tasks={tasksDone} />
        </Flex>
        <Carousel hiddenFrom="sm" withIndicators withControls slideSize="70%" slideGap="md" emblaOptions={{
            loop: true,
            
        }}>
            <Carousel.Slide><TaskList title="To Do" tasks={tasksToDo} /></Carousel.Slide>
            <Carousel.Slide><TaskList title="In Progress" tasks={tasksInProgress} /></Carousel.Slide>
            <Carousel.Slide><TaskList title="Done" tasks={tasksDone} /></Carousel.Slide>
            {/* ...other slides */}
        </Carousel>
    </>
    )
}