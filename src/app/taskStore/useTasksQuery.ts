import { useQuery } from "@tanstack/react-query"
import { getTasksService } from "@store/taskService"

export const useTasksQuery = () => {
    return useQuery({
        queryFn: getTasksService,
        queryKey: ['allTasks'],
        staleTime: 5000
    })
}