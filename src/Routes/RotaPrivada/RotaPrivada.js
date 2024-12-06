import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  // console.log("Token:", token); // Verifica se o token está presente
  // console.log("Papel do usuário no localStorage:", userRole); // Verifica o valor de `userRole`
  // console.log("Papel esperado:", role); // Verifica o papel esperado para a rota

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />; // Redireciona para home se o papel não corresponder
  }

  return children;
};

export default PrivateRoute;




// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('authToken');

//   // Se não houver token, redirecionar para a página de login
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // Se houver token, renderiza a rota protegida
//   return children;
// };

// export default PrivateRoute;