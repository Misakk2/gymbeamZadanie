export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    dueDate: string | null;
    tags: string[];
    createdAt: string;
}

export interface AddTodoPayload {
    title: string;
    priority: Priority;
    dueDate: string | null;
    tags: string[];
}

export interface UpdateTodoPayload extends Partial<Omit<Todo, 'id'>> {
    id: string;
}