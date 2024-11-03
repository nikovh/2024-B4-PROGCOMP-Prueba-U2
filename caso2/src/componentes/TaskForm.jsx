import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import moment from 'moment';
import axios from 'axios';

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const validator = new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      customDateFormat: 'La fecha debe estar en el formato YYYY-MM-DD.',
    },
    validators: {
      customDateFormat: {
        message: 'La fecha debe estar en el formato YYYY-MM-DD.',
        rule: (val) => moment(val, 'YYYY-MM-DD', true).isValid(),
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      try {
        // Simulación de solicitud HTTP para obtener prioridad de la tarea
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        const priority = response.data.id % 2 === 0 ? 'High' : 'Low';


        const deadlineTimestamp = deadline
          ? Timestamp.fromDate(moment(deadline, 'YYYY-MM-DD').toDate())
          : null;

        const docRef = await addDoc(collection(db, 'tasks'), {
          taskName,
          deadline: deadlineTimestamp,
          priority,
        });
        // Llamar a addTask solo para actualizar el estado, sin guardar en Firestore
        addTask({ taskName, deadline: deadlineTimestamp, priority, id: docRef.id });

        // Limpiar los campos del formulario
        setTaskName('');
        setDeadline('');
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
      }
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre de la tarea:</label>
      <input
        type="text"
        placeholder="Ingresa el nombre de tu tarea"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      {validator.message('taskName', taskName, 'required')}

      <label>Fecha límite:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      {validator.message('deadline', deadline, 'required|customDateFormat')}

      <button type="submit">Enviar</button>
    </form>
  );
}

export default TaskForm;