'use client';

import React from 'react';

export interface Task {
  id: number;
  text: string;
  completed?: boolean;
  сompleted?: boolean;
}

export interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onToggle }) => {
  const isDone = Boolean(task.completed ?? task.сompleted);

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        marginBottom: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(task.id)}
        />
        <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      </label>
      <button
        type="button"
        onClick={() => onRemove(task.id)}
        aria-label="Delete"
        style={{
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 10px',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default TaskItem;