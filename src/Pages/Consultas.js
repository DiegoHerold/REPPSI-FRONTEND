import React from 'react';

import ConsultationsPage from '../components/consultas/Consultas';
import Header from '../components/header/Header';

  const Consultas = () => {
    // Função para capturar o psychologistId
  const handlePsychologistClick = (psychologistId) => {
    console.log('Psychologist ID:', psychologistId);
  };
    return (
        <>
        <Header />
        <ConsultationsPage onPsychologistClick={handlePsychologistClick}/>
        </>
      );
  };
  
  export default Consultas;