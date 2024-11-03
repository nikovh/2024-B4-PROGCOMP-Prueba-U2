import React, { useState } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function ProyectoForm({ addProyecto }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const validator = new SimpleReactValidator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      try {
        // Solicitud simulada para obtener datos adicionales
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        const additionalData = response.data.title;

        // Guardar el proyecto en Firestore
        const docRef = await addDoc(collection(db, 'projects'), {
          nombre,
          descripcion,
          additionalData,
        });

        addProyecto({ id: docRef.id, nombre, descripcion, additionalData });
        setNombre('');
        setDescripcion('');
      } catch (error) {
        console.error('Error al agregar el proyecto:', error);
      }
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre del proyecto:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {validator.message('nombre', nombre, 'required')}

      <label>Descripción:</label>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      {validator.message('descripcion', descripcion, 'required|min:10')}

      <button type="submit">Agregar Proyecto</button>
    </form>
  );
}

export default ProyectoForm;
