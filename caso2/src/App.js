import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import TaskForm from './componentes/TaskForm';
import TaskList from './componentes/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const fetchTasks = async () => {
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    const tasksData = tasksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setTasks(tasksData);
  };

  useEffect(() => {
    // Cargar las tareas desde Firestore al inicio
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = async (taskId) => {
    try {
      
      // Elimina el documento de Firestore
      await deleteDoc(doc(db, 'tasks', taskId));
      /*
      /// alt
      const deleteTaskFunction = httpsCallable(functions, 'deleteTask');
      await deleteTaskFunction({ taskId });
      */
      // Actualiza el estado local para reflejar la eliminación
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <button onClick={() => setShowForm(!showForm)}>Agregar Tarea</button>
      {showForm && <TaskForm addTask={addTask} />}
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default App;
