
import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
  const userRole = localStorage.getItem('role');

  if (userRole === 'psicologo') {
    return <Navigate to="/perfil/psicologo" />;
  } else if (userRole === 'paciente') {
    return <Navigate to="/perfil/cliente" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Redirect;
