type Category = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test'
type Status = 'To Do' | 'In Progress' | 'Done'
type Priority = 'Low' | 'Medium' | 'High'

export interface TaskInterface {
    id: number | null,
    title: string;
    description?: string;
    category: Category;
    status: Status;
    priority: Priority;
    date: string | null
}