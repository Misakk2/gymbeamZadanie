import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../style/TodoList.module.scss';
import { useToast } from '../Toast/context/ToastContext';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    tags?: string[];
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const { addToast } = useToast();


    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get<Todo[]>('https://6694db794bd61d8314c8ec8b.mockapi.io/todolist/v1/todos');
            setTodos(response.data);
        } catch (error) {
            addToast({ message: 'Error fetching todos', type: 'error' });
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() !== '') {
            try {
                const response = await axios.post<Todo>('https://6694db794bd61d8314c8ec8b.mockapi.io/todolist/v1/todos', {
                    title: newTodo,
                    completed: false,
                });
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                addToast({ message: 'Error adding todos', type: 'error' });
                console.error('Error adding todo:', error);
            }
        }
    };

    const toggleComplete = async (id: string) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            try {
                const response = await axios.put<Todo>(`https://6694db794bd61d8314c8ec8b.mockapi.io/todolist/v1/todos/${id}`, {
                    ...todo,
                    completed: !todo.completed,
                });
                setTodos(todos.map(t => t.id === id ? response.data : t));
            } catch (error) {
                console.error('Error updating todo:', error);
                addToast({ message: 'Error updating todos', type: 'error' });
            }
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await axios.delete(`https://6694db794bd61d8314c8ec8b.mockapi.io/todolist/v1/todos/${id}`);
            setTodos(todos.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            addToast({ message: (error as Error).message, type: 'error' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className={styles.todoList__title}>Todo List</h1>

            <form onSubmit={handleSubmit} className="flex justify-start align-top mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className={styles.todoList__input}
                    placeholder="Add new todo"
                />
                <button type='submit' className={styles.todoList__button}>Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={styles.todoList__item}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            className="mr-2"
                        />
                        <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
                        <button onClick={() => deleteTodo(todo.id)} className={styles['todoList__button--delete']}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;