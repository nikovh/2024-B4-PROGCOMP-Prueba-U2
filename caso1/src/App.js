import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebaseConfig';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

import ProyectoForm from './componentes/ProyectoForm';
import ProyectoList from './componentes/ProyectoList';

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectosSnapshot = await getDocs(collection(db, 'projects'));
      const proyectosData = proyectosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProyectos(proyectosData);
    };
    fetchProyectos();
  }, []);

  const addProyecto = (proyecto) => {
    setProyectos([...proyectos, proyecto]);
  };

  const deleteProyecto = async (projectId) => {
    try {

      // elmmina en Firestore
      await deleteDoc(doc(db, 'projects', projectId));

      setProyectos(proyectos.filter((proyecto) => proyecto.id !== projectId));
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Proyectos</h1>
      <button onClick={() => setShowForm(!showForm)}>Agregar Proyecto</button>
      {showForm && <ProyectoForm addProyecto={addProyecto} />}
      {proyectos.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ProyectoList proyectos={proyectos} deleteProyecto={deleteProyecto} />
      )}
    </div>
  );
}

export default App;
