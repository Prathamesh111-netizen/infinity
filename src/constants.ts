export enum Routes {
    Home = "/",
    Login = "/login",
    Dashboard = "/dashboard",
}

export const backendUrl = "http://localhost:3000";

export enum backendRoutes {
    Login = `/api/user/login`,
    getUser = `/api/user`,
    createProject = `/api/project`,
    createPAT = `/api/pat`,
    getProject = `/api/project`,
}

export enum queryKeys {
    getUser = "getUser",
    getProject = "getProject",
}

export interface Project {
    projectName: string;
    projectDescription: string;
    ownerId: string;
    githubLink: string;
    patAttached: string;
    vmAttached: string;
    previousDeployments?: {
        deploymentId: string;
        deploymentType: "Source" | "TYPECHECK" | "Deploy";
        deploymentStatus: 'Success' | 'Failed';
        deploymentLogs: string;
        updatedAt: Date;
    }[];
    externalPorts?: string[];
}