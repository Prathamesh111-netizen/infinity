import {
    useQuery
} from '@tanstack/react-query';
import requester from '../requester';
import useStore, { User } from '../store';
import { backendRoutes, queryKeys, Project } from './constants';

export const useUserData = () => {
    return useQuery({
        queryKey: [queryKeys.getUser],
        queryFn: async () => {
            const user = useStore.getState().user;
            const setUser = useStore.getState().setUser;
            const response = await requester.get(`${backendRoutes.getUser}/${user?._id}`);
            if (!response.data.status)
                throw new Error(response.data.message);
            const newUser = response.data.data.user as User;
            setUser(newUser);
            return newUser as User;
        },
        staleTime: 1000 * 60,
    })
}

export const useProjectData = (projectId: string) => {
    return useQuery({
        queryKey: [queryKeys.getProject],
        queryFn: async () => {
            const response = await requester.get(`${backendRoutes.getProject}/${projectId}`, {
                headers: {
                    Authorization: `${useStore.getState().authToken}`
                }
            });
            if (!response.data.status)
                throw new Error(response.data.message);
            return response.data.data as Project;
        },
        staleTime: 1000 * 10,
    })
}