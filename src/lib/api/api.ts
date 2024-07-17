import axios from 'axios';
import { AddTodoPayload, Todo, UpdateTodoPayload } from '../types';
export const API_BASE_URL = 'https://6694db794bd61d8314c8ec8b.mockapi.io/todolist/v1';
export const TODOS_ENDPOINT = `${API_BASE_URL}/todos`;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(TODOS_ENDPOINT);
  return response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addTodo = async (payload: AddTodoPayload): Promise<Todo> => {
  const response = await axios.post<Todo>(TODOS_ENDPOINT, {
      ...payload,
      completed: false,
      createdAt: new Date().toISOString(),
  });
  return response.data;
};

export const updateTodo = async (payload: UpdateTodoPayload): Promise<Todo> => {
    const response = await axios.put<Todo>(`${TODOS_ENDPOINT}/${payload.id}`, payload);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${TODOS_ENDPOINT}/${id}`);
};