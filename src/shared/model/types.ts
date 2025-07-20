type Category = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test'
type Status = 'To Do' | 'In Progress' | 'Done'
type Priority = 'Low' | 'Medium' | 'High'

/**
 * @param {number | null} id - The id of task. Id = null, when client send new data to server. Server always send data with correct id.
 * @param {string} title - The title of task.
 * @param {string} [description] - The description of task. May be missing
 * @param {Category} category - The category of task. May be 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test'
 * @param {Status} status - The status of task. May be 'To Do' | 'In Progress' | 'Done'
 * @param {Priority} priority - The status of task. May be 'Low' | 'Medium' | 'High'
 * @param {number | null} date - The date of creation task. Date = null, when client send new data to server. Server always send data with correct date.
 */
export interface TaskInterface {
    [key: string]: string | number | undefined | null
    id: number | null,
    title: string;
    description?: string;
    category: Category;
    status: Status;
    priority: Priority;
    date: number | null
}