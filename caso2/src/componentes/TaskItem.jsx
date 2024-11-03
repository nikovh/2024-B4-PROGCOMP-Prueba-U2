import React from 'react';

function TaskItem({ task, deleteTask }) {
  const deadlineDate = task.deadline
    ? task.deadline.toDate().toLocaleDateString()
    : 'Fecha límite no disponible';

  return (
    <div>
      <h3>{task.taskName}</h3>
      <p>Fecha límite: {deadlineDate}</p>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </div>
  );
}

export default TaskItem;
