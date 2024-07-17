export type Priority = 'low' | 'medium' | 'high';
export type Tags = 'others' | 'work' | 'personal' | 'shopping';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    dueDate: string | null;
    tag: Tags;
}

export interface AddTodoPayload {
    title: string;
    priority: Priority;
    dueDate: string | null;
    tag: string;
}

export interface UpdateTodoPayload extends Partial<Omit<Todo, 'id'>> {
    id: string;
}