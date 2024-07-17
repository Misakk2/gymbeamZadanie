import React from 'react';
import styles from '../../../style/TodoList.module.scss';
import { Priority, Tags, Todo } from '@/lib/types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
    onDelete: (id: string) => void;
}

const getTagClasses = (tag: Tags) => {
    switch (tag) {
        case 'work':
            return 'bg-green-50 text-green-700 ring-green-600/20';
        case 'personal':
            return 'bg-blue-50 text-blue-700 ring-blue-600/20';
        case 'shopping':
            return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
        default:
            return 'bg-gray-50 text-gray-600 ring-gray-500/10';
    }
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {

    if (!todo) {
        return null;
    }

    const isOverdue = todo.dueDate ? new Date(todo.dueDate) < new Date() && !todo.completed : false;

    const itemClasses = `flex flex-wrap jusitfy-between gap-6 py-5 ${styles.todoList__item} ${isOverdue ? styles['todoList__item--overdue'] : ''
        } ${todo.completed ? styles['todoList__item--completed'] : ''}`;

    const tagClasses = getTagClasses(todo.tag);

    return (
        <li className={itemClasses}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mr-2 scale-150"
            />
            <div className='w-3/6'>
                <span className={`leading-6 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                </span>
            </div>
            <select
                value={todo.tag}
                onChange={(e) => onUpdate(todo.id, { tag: e.target.value as Tags })}
                className={`h-full inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${tagClasses} ${todo.completed ? 'line-through text-gray-500' : ''}`}
                disabled={todo.completed}
            >
                <option value="others">Others</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
            </select>
            <input
                type="date"
                value={todo.dueDate || ''}
                onChange={(e) => onUpdate(todo.id, { dueDate: e.target.value })}
                className={styles.todoList__input}
                disabled={todo.completed}
            />
            <select
                value={todo.priority}
                onChange={(e) => onUpdate(todo.id, { priority: e.target.value as Priority })}
                className={`${styles.todoList__input} ${todo.completed ? 'line-through text-gray-500' : ''}`} disabled={todo.completed}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button
                onClick={() => onDelete(todo.id)}
                className={styles['todoList__button--delete']}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </li>
    );

};

export default TodoItem;