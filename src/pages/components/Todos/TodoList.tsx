import React, { useState } from 'react';
import styles from '../../style/TodoList.module.scss';
import { useTodos } from './hooks/useTodos';
import { TodoItem } from './components/TodoItem';
import { Priority } from '@/pages/types';


export const TodoList: React.FC = () => {
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [dueDate, setDueDate] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [filtersTags, setFiltersTags] = useState<string>('');
    const { todos, addTodo, toggleComplete, updateTodo, deleteTodo, setSortType, setFilterTags } = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
            addTodo({
                title: newTodo,
                priority,
                dueDate: dueDate || null,
                tags: tags.split(',').map(tag => tag.trim()),
            });
            setNewTodo('');
            setPriority('medium');
            setDueDate('');
            setTags('');
        }
    };

    const handleFilterTagClick = (tag: string) => {
        setFilterTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const allTags = Array.from(new Set(todos.flatMap(todo => todo.tags)));

    return (
        <div className="container mx-auto p-4">

            <form onSubmit={handleSubmit} className="mb-4 space-y-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className={styles.todoList__input}
                    placeholder="Add new todo"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className={styles.todoList__input}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={styles.todoList__input}
                />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className={styles.todoList__input}
                    placeholder="Tags (comma-separated)"
                />
                <button type='submit' className={styles.todoList__button}>
                    Add Todo
                </button>
            </form>

            <div className="mb-4 space-y-2">
                <select
                    onChange={(e) => setSortType(e.target.value as 'newest' | 'priority')}
                    className={styles.todoList__input}
                >
                    <option value="newest">Sort by Newest</option>
                    <option value="priority">Sort by Priority</option>
                </select>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleFilterTagClick(tag)}
                            className={`${styles.todoList__tag} ${filtersTags.includes(tag) ? styles.todoList__tag__active : ''}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="space-y-2">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleComplete}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};