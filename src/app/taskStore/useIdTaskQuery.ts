import {useQuery} from '@tanstack/react-query';
import {getIdTaskService} from '@store/taskService';

export const useIdTaskQuery = (id: number) => {
    return useQuery({
        queryFn: () => getIdTaskService(id),
        queryKey: ['task', id],
        staleTime: 5000,
        retry: (failureCount, error) => {
            console.log(error)
            if (error.message === 'Not Found') {
                return false;
            }
            return failureCount < 3;
        }
    });
};
