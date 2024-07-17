import React from 'react';
import { Priority, Todo } from '@/pages/types';
import styles from '../../../style/TodoList.module.scss';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    const itemClasses = `${styles.todoList__item} ${isOverdue ? styles['todoList__item--overdue'] : ''
        } ${todo.completed ? styles['todoList__item--completed'] : ''}`;

    return (
        <li className={itemClasses}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mr-2"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
            </span>
            <select
                value={todo.priority}
                onChange={(e) => onUpdate(todo.id, { priority: e.target.value as Priority })}
                className={styles.todoList__input}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input
                type="date"
                value={todo.dueDate || ''}
                onChange={(e) => onUpdate(todo.id, { dueDate: e.target.value })}
                className={styles.todoList__input}
            />

            <input
                type="text"
                value={todo.tags.join(', ')}
                onChange={(e) => onUpdate(todo.id, { tags: e.target.value.split(',').map(tag => tag.trim()) })}
                placeholder="Tags"
                className={styles.todoList__input}
            />
            <button
                onClick={() => onDelete(todo.id)}
                className={styles['todoList__button--delete']}
            >
                Delete
            </button>
        </li>
    );
};