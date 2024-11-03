import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask }) {
  return (
    <React.Fragment>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </React.Fragment>
  );
}

export default TaskList;
