import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Input,
    Loader,
    Paper,
    TagsInput,
    useMantineColorScheme,
} from '@mantine/core';
import {useState, type JSX} from 'react';
import type {TaskInterface} from '@shared/model/types';
import {TaskList} from '@widgets/taskList';
import {Carousel} from '@mantine/carousel';
import styles from './mainPage.module.css';
import SearchIcon from '@shared/ui/search.svg?react';
import {useTasksQuery} from '@/app/taskStore/useTasksQuery';
import {useNavigate} from 'react-router';
import {useToggle} from '@mantine/hooks';
import SortAscIcon from '@shared/ui/sortAsc.svg?react';
import SortDescIcon from '@shared/ui/sortDesc.svg?react';
import SortNoneIcon from '@shared/ui/sortNone.svg?react';
import SunIcon from '@shared/ui/sun.svg?react';
import MoonIcon from '@shared/ui/moon.svg?react';

const iconOrderMap: {[key: string]: JSX.Element} = {
    none: <SortNoneIcon className={styles.iconSort} />,
    asc: <SortAscIcon className={styles.iconSort} />,
    desc: <SortDescIcon className={styles.iconSort} />
};

const priorityNumber: {[key: string]: number} = {
    Low: 0,
    Medium: 1,
    High: 2
};

export default function MainPage() {
    const {setColorScheme} = useMantineColorScheme();
    const mantineTheme = document.documentElement.getAttribute(
        'data-mantine-color-scheme'
    );
    console.log(mantineTheme)
    const {data: tasks, isLoading, isSuccess} = useTasksQuery();
    console.log('tanstack', tasks, isLoading, isSuccess);
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();
    const [searchCategory, setSearchCategory] = useState<string[] | undefined>(
        []
    );
    const [searchPriority, setSearchPriority] = useState<string[] | undefined>(
        []
    );
    const [sortOrderDate, toggleSortOrderDate] = useToggle([
        'none',
        'asc',
        'desc'
    ]);
    const [sortOrderPriority, toggleSortOrderPriority] = useToggle([
        'none',
        'asc',
        'desc'
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const regSearch = new RegExp(searchWord, 'i');

    let searchFilteredTasks = tasks.filter(
        (task: TaskInterface) =>
            regSearch.test(task.title) ||
            (task.description && regSearch.test(task.description))
    ); //фильтруем по title или, если существует description, то по нему тоже
    if (sortOrderDate !== 'none') {
        searchFilteredTasks.sort(sortDate);
    }
    if (sortOrderPriority !== 'none') {
        searchFilteredTasks.sort(sortPriority);
    }

    if (searchCategory?.length) {
        searchFilteredTasks = searchFilteredTasks.filter(
            (task: TaskInterface) => searchCategory.includes(task.category)
        );
    }
    if (searchPriority?.length) {
        searchFilteredTasks = searchFilteredTasks.filter(
            (task: TaskInterface) => searchPriority.includes(task.priority)
        );
    }
    const tasksToDo = searchFilteredTasks.filter(
        (task: TaskInterface) => task.status === 'To Do'
    );
    const tasksInProgress = searchFilteredTasks.filter(
        (task: TaskInterface) => task.status === 'In Progress'
    );
    const tasksDone = searchFilteredTasks.filter(
        (task: TaskInterface) => task.status === 'Done'
    );
    function handleCreateTask() {
        navigate('/task/new');
    }

    function sortDate(a: TaskInterface, b: TaskInterface) {
        if (sortOrderDate === 'asc') return a.date! - b.date!;
        return b.date! - a.date!;
    }

    function sortPriority(a: TaskInterface, b: TaskInterface) {
        if (sortOrderPriority === 'asc')
            return priorityNumber[a.priority] - priorityNumber[b.priority];
        return priorityNumber[b.priority] - priorityNumber[a.priority];
    }

    return (
        <>
            <ActionIcon
                variant='outline'
                color={mantineTheme == 'dark' ? 'yellow' : 'blue'}
                onClick={() => mantineTheme == 'dark' ? setColorScheme('light') : setColorScheme('dark')}
                title='Toggle color scheme'
            >
                {mantineTheme == 'dark' ? (
                    <SunIcon style={{width: 18, height: 18}} />
                ) : (
                    <MoonIcon style={{width: 18, height: 18}} />
                )}
            </ActionIcon>
            <Group justify='space-between'>
                <h2>TaskManager Siriur</h2>
                <Group gap='xs'>
                    <Button
                        color='#787878'
                        variant='outline'
                        rightSection={iconOrderMap[sortOrderPriority]}
                        onClick={() => {
                            toggleSortOrderDate('none');
                            toggleSortOrderPriority();
                        }}
                    >
                        Priority
                    </Button>
                    <Button
                        className={styles.button}
                        color='#787878'
                        variant='outline'
                        rightSection={iconOrderMap[sortOrderDate]}
                        onClick={() => {
                            toggleSortOrderPriority('none');
                            toggleSortOrderDate();
                        }}
                    >
                        Date
                    </Button>
                    <Button onClick={handleCreateTask}>Add task</Button>
                </Group>
            </Group>
            <Paper shadow='md' className={styles.searchField}>
                <Input
                    placeholder='Search'
                    value={searchWord}
                    onChange={(event) =>
                        setSearchWord(event.currentTarget.value)
                    }
                    rightSection={
                        searchWord !== '' ? (
                            <Input.ClearButton
                                onClick={() => setSearchWord('')}
                            />
                        ) : undefined
                    }
                    leftSection={<SearchIcon className={styles.searchIcon} />}
                />
                <Group>
                    <TagsInput
                        ta='left'
                        label='Category'
                        value={searchCategory}
                        onChange={setSearchCategory}
                        placeholder='Choose category'
                        data={[
                            'Bug',
                            'Feature',
                            'Documentation',
                            'Refactor',
                            'Test'
                        ]}
                        clearable
                    />
                    <TagsInput
                        ta='left'
                        label='Priority'
                        value={searchPriority}
                        onChange={setSearchPriority}
                        placeholder='Choose priority'
                        data={['Low', 'Medium', 'High']}
                        clearable
                    />
                </Group>
            </Paper>
            <Flex
                visibleFrom='xs'
                gap='sm'
                justify='center'
                align='flex-start'
                direction='row'
            >
                <TaskList
                    style={{width: '30vw'}}
                    title='To Do'
                    tasks={tasksToDo}
                />
                <TaskList
                    style={{width: '30vw'}}
                    title='In Progress'
                    tasks={tasksInProgress}
                />
                <TaskList
                    style={{width: '30vw'}}
                    title='Done'
                    tasks={tasksDone}
                />
            </Flex>
            <Carousel
                styles={{
                    root: {position: 'unset'},
                    controls: {position: 'fixed'},
                    indicators: {position: 'fixed'}
                }}
                hiddenFrom='xs'
                withIndicators
                withControls
                slideSize='80%'
                slideGap='sm'
                emblaOptions={{
                    loop: true
                }}
            >
                <Carousel.Slide>
                    <TaskList title='To Do' tasks={tasksToDo} />
                </Carousel.Slide>
                <Carousel.Slide>
                    <TaskList title='In Progress' tasks={tasksInProgress} />
                </Carousel.Slide>
                <Carousel.Slide>
                    <TaskList title='Done' tasks={tasksDone} />
                </Carousel.Slide>
            </Carousel>
        </>
    );
}
