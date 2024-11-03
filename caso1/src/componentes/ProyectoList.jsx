import React from 'react';
import ProyectoItem from './ProyectoItem';

function ProyectoList({ proyectos, deleteProyecto }) {
  return (
    <React.Fragment>
      {proyectos.map((proyecto) => (
        <ProyectoItem key={proyecto.id} proyecto={proyecto} deleteProyecto={deleteProyecto} />
      ))}
    </React.Fragment>
  );
}

export default ProyectoList;
