import React, { useState } from 'react';
import styles from '../../style/TodoList.module.scss';
import TodoItem from './components/TodoItem';
import useTodos from '@/lib/hooks/useTodos';
import { Priority, Tags } from '@/lib/types';


const TodoList: React.FC = () => {
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [dueDate, setDueDate] = useState<string>('');
    const [tag, setTag] = useState<Tags>('others');
    const [filtersTags, setFiltersTags] = useState<Tags[]>([]);
    const { todos, addTodo, toggleComplete, updateTodo, deleteTodo, setSortType } = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
            const finalDueDate = dueDate || (() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow.toISOString().split('T')[0];
            })();
            addTodo({
                title: newTodo,
                priority,
                dueDate: finalDueDate,
                tag,
            });
            setNewTodo('');
            setPriority('medium');
            setDueDate('');
            setTag('others');
        }
    };

    const handleFilterTagClick = (tag: Tags) => {
        setFiltersTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const allTags = Array.from(new Set(todos.flatMap(todo => todo.tag)));

    const filteredTodos = todos.filter(todo => filtersTags.length === 0 || filtersTags.includes(todo.tag));

    return (
        <div className="w-full">

            <form onSubmit={handleSubmit} className="flex flex-col mb-4 space-y-2">
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
                    className={`${styles.todoList__input}`}
                />
                <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value as Tags)}
                    className={`p-6  ${styles.todoList__input}`}
                >
                    <option value="others">Others</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                </select>
                <button type='submit' className={styles.todoList__button}>
                    Add Todo
                </button>
            </form>

            <div className="mb-4 flex flex-row-reverse gap-9">
                <select
                    onChange={(e) => setSortType(e.target.value as 'newest' | 'priority')}
                    className={`m-0 ${styles.todoList__input}`}
                >
                    <option value="newest">Sort by Newest</option>
                    <option value="priority">Sort by Priority</option>
                </select>
                <div className="flex flex-wrap gap-2 flex-grow">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleFilterTagClick(tag)}
                            className={`${styles.todoList__tag} ${filtersTags.includes(tag) ? styles['todoList__tag--active'] : ''}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="space-y-2">
                {filteredTodos.length === 0 && <p className="text-center">No todos found</p>}
                {filteredTodos.map(todo => (
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

export default TodoList;