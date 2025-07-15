import { Flex, Group, Input, Stack, TagsInput } from '@mantine/core';
import { useContext, useState } from 'react'
import { TasksContext } from '@store/Context'
import type { TaskInterface } from '@shared/model/types';
import TaskList from '@widgets/taskList/TaskList';
import { Carousel } from '@mantine/carousel';
import styles from './mainPage.module.css'
import SearchIcon from '@shared/ui/search.svg?react'

export default function MainPage() {
    const { tasks }: { tasks: TaskInterface[] } = useContext(TasksContext)
    const [searchWord, setSearchWord] = useState('')
    const [searchCategory, setSearchCategory] = useState<string[] | undefined>([])
    const [searchPriority, setSearchPriority] = useState<string[] | undefined>([])
    const regSearch = new RegExp(searchWord, 'i')
    let searchFilteredTasks = tasks.filter(task => regSearch.test(task.title) || (task.description && regSearch.test(task.description))) //фильтруем по title или, если существует description, то по нему тоже
    if (searchCategory?.length) {
        searchFilteredTasks = searchFilteredTasks.filter(task => searchCategory.includes(task.category))
    }
    if (searchPriority?.length) {
        searchFilteredTasks = searchFilteredTasks.filter(task => searchPriority.includes(task.priority))
    }
    const tasksToDo = searchFilteredTasks.filter(task => task.status === 'To Do')
    const tasksInProgress = searchFilteredTasks.filter(task => task.status === 'In Progress')
    const tasksDone = searchFilteredTasks.filter(task => task.status === 'Done')
    return (<>
        <Stack className={styles.searchField}>
            <Input
                placeholder='Search'
                value={searchWord}
                onChange={(event) => setSearchWord(event.currentTarget.value)}
                rightSection={searchWord !== '' ? <Input.ClearButton onClick={() => setSearchWord('')} /> : undefined}
                leftSection={<SearchIcon className={styles.searchIcon}/>}
            />
            <Group>
                <TagsInput className={styles.categoryField} ta="left" label='Category' value={searchCategory} onChange={setSearchCategory} placeholder='Choose category' data={['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']} clearable />
                <TagsInput className={styles.priorityField} ta="left" label='Priority' value={searchPriority} onChange={setSearchPriority} placeholder='Choose priority' data={['Low', 'Medium', 'High']} clearable />
            </Group>
        </Stack>
        <Flex visibleFrom='sm'
            gap='sm'
            justify='center'
            align='flex-start'
            direction='row'>
            <TaskList style={{ 'width': '30vw' }} title='To Do' tasks={tasksToDo} />
            <TaskList style={{ 'width': '30vw' }} title='In Progress' tasks={tasksInProgress} />
            <TaskList style={{ 'width': '30vw' }} title='Done' tasks={tasksDone} />
        </Flex>
        <Carousel hiddenFrom='sm' withIndicators withControls slideSize='70%' slideGap='md' emblaOptions={{
            loop: true,

        }}>
            <Carousel.Slide><TaskList title='To Do' tasks={tasksToDo} /></Carousel.Slide>
            <Carousel.Slide><TaskList title='In Progress' tasks={tasksInProgress} /></Carousel.Slide>
            <Carousel.Slide><TaskList title='Done' tasks={tasksDone} /></Carousel.Slide>
        </Carousel>
    </>
    )
}