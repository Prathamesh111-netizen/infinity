import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
    _id: string;
    username: string;
    password: string;
    pats?: { _id: string, token: string, desc: string }[]; // personal access tokens
    projectsMeta?: { _id: string, name: string, desc: string }[];
}

interface IStore {
    authToken?: string,
    user?: User,
    setUser: (user: User) => void,
    setAuthToken: (token: string) => void,
    currentSelectedProject: string | null;
    setCurrentSelectedProject: (projectId: string | null) => void;
}

const useStore = create<IStore>()(
    persist(
        (set) => ({
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined,
            setUser: (user: User) => set({ user }),
            authToken: localStorage.getItem('authToken') || undefined,
            setAuthToken: (authToken: string) => set({ authToken }),
            currentSelectedProject: localStorage.getItem('currentSelectedProject') || null,
            setCurrentSelectedProject: (currentSelectedProject: string | null) => set({ currentSelectedProject }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStore;