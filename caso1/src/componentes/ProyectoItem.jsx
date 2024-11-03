import React from 'react';

function ProyectoItem({ proyecto, deleteProyecto }) {
  return (
    <div>
      <h3>{proyecto.nombre}</h3>
      <p>{proyecto.descripcion}</p>
      <p>Datos adicionales: {proyecto.additionalData}</p>
      <button onClick={() => deleteProyecto(proyecto.id)}>Eliminar</button>
    </div>
  );
}

export default ProyectoItem;
