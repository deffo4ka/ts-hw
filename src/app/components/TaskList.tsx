'use client';

import React, { useState, useEffect } from 'react';
import TaskItem, { Task } from './TaskItem';

export interface TaskListProps {
  tasks?: Task[];
}

const getInitialTasks = (propsTasks?: Task[]): Task[] => {
  if (propsTasks !== undefined) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tasks', JSON.stringify(propsTasks));
      } catch {
   
      }
    }
    return propsTasks;
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      return [];
    }
  }

  return [];
};

export const TaskList: React.FC<TaskListProps> = ({ tasks: propsTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(() => getInitialTasks(propsTasks));
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (propsTasks !== undefined) {
      setTasks(propsTasks);
      localStorage.setItem('tasks', JSON.stringify(propsTasks));
    }
  }, [propsTasks]);

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  };

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      сompleted: false,
    };

    updateTasks([...tasks, newTask]);
    setInputVal('');
  };

  const handleToggleTask = (id: number) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const currentStatus = Boolean(t.completed ?? t.сompleted);
        return {
          ...t,
          completed: !currentStatus,
          сompleted: !currentStatus,
        };
      }
      return t;
    });
    updateTasks(updated);
  };

  const handleRemoveTask = (id: number) => {
    const updated = tasks.filter((t) => t.id !== id);
    updateTasks(updated);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Task List</h1>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="New task..."
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #000',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onRemove={handleRemoveTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;