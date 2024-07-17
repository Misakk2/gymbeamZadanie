import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '../../Toast/context/ToastContext';
import  * as api  from '@/pages/api/api';
import { AddTodoPayload, Priority, Todo } from '@/pages/types';

type SortType = 'newest' | 'priority';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [sortType, setSortType] = useState<SortType>('newest');
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const { addToast } = useToast();

    const sortedAndFilteredTodos = useMemo(() => {
        let result = todos;
        // Filter by tags
        if (filterTags.length > 0) {
            result = result.filter(todo => 
                todo.tags.some(tag => filterTags.includes(tag))
            );
        }
        // Sort
        if (sortType === 'newest') {
            return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else {
            const priorityOrder: { [key in Priority]: number } = { high: 3, medium: 2, low: 1 };
            return result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        }
    }, [todos, sortType, filterTags]);

    const fetchTodos = useCallback(async () => {
        try {
            const fetchedTodos = await api.fetchTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            addToast({ message: 'Error fetching todos', type: 'error' });
            console.error('Error fetching todos:', error);
        }
    }, [addToast]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = async (payload: AddTodoPayload) => {
        try {
            const newTodo = await api.addTodo(payload);
            setTodos([newTodo, ...todos]);
        } catch (error) {
            addToast({ message: 'Error adding todo', type: 'error' });
            console.error('Error adding todo:', error);
        }
    };

    const toggleComplete = async (id: string) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            try {
                const updatedTodo = await api.updateTodo({
                    id,
                    completed: !todo.completed,
                });
                setTodos(todos.map(t => t.id === id ? updatedTodo : t));
            } catch (error) {
                addToast({ message: 'Error updating todo', type: 'error' });
                console.error('Error updating todo:', error);
            }
        }
    };

    const updateTodo = async (id: string, updates: Partial<Omit<Todo, 'id'>>) => {
        try {
            const updatedTodo = await api.updateTodo({ id, ...updates });
            setTodos(todos.map(t => t.id === id ? updatedTodo : t));
        } catch (error) {
            addToast({ message: 'Error updating todo', type: 'error' });
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await api.deleteTodo(id);
            setTodos(todos.filter(t => t.id !== id));
        } catch (error) {
            addToast({ message: 'Error deleting todo', type: 'error' });
            console.error('Error deleting todo:', error);
        }
    };

    return { 
        todos: sortedAndFilteredTodos, 
        addTodo, 
        toggleComplete, 
        updateTodo, 
        deleteTodo, 
        setSortType, 
        setFilterTags 
    };
};