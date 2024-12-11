import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from './Util/ThemeContext';
import PrivateRoute from './Routes/RotaPrivada/RotaPrivada';
import Redirect from './Routes/RotaPrivada/Redirect';
import Home from './Pages/Home';
import Consultas from './Pages/Consultas';
import Feed from './Pages/Feed';
import PerfilCliente from './Pages/PerfilCliente';
import PerfilPsicologo from './Pages/PerfilPsicologo';
import SettingPage from './Pages/Configuracao';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import SignupPsicologoPage from './components/login/SignupPsicologo';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import HomePage from './components/begin/homePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />


      <Route path="/perfil" element={<Redirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil/psicologo" element={<PrivateRoute role="psicologo"><PerfilPsicologo /></PrivateRoute>} />
      <Route path="/perfil/cliente" element={<PrivateRoute role="paciente"><PerfilCliente /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role={localStorage.getItem('role')}><Home /></PrivateRoute>} />
      <Route path="/consultas" element={<PrivateRoute role={localStorage.getItem('role')}><Consultas /></PrivateRoute>} />
      <Route path="/feed" element={<PrivateRoute role={localStorage.getItem('role')}><Feed /></PrivateRoute>} />
      <Route path="/configuracao" element={<PrivateRoute role={localStorage.getItem('role')}><SettingPage /></PrivateRoute>} />
      
      
      <Route path="/signup-psicologo" element={<SignupPsicologoPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />


     
    </Routes>
  );
};

const Root = () => {
  const { theme } = useTheme();
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ChakraProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <Root />
  </ThemeProvider>
);

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/RotaPrivada/RotaPrivada';
// import Redirect from './components/RotaPrivada/Redirect';
// import Home from './Pages/Home';
// import Consultas from './Pages/Consultas';
// import Feed from './Pages/Feed';
// import PerfilCliente from './Pages/PerfilCliente';
// import PerfilPsicologo from './Pages/PerfilPsicologo';
// import SettingPage from './Pages/Configuracao';
// import Login from './Pages/Login';
// import Cadastro from './Pages/Cadastro';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Redirecionamento inicial com base no papel */}
//         <Route path="/perfil" element={<Redirect />} />

//         {/* Rotas públicas */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/cadastro" element={<Cadastro />} />

//         {/* Rotas para Psicólogos */}
//         <Route 
//           path="/perfil/psicologo" 
//           element={
//             <PrivateRoute role="psicologo">
//               <PerfilPsicologo />
//             </PrivateRoute>
//           } 
//         />

//         {/* Rotas para Pacientes */}
//         <Route 
//           path="/perfil/cliente" 
//           element={
//             <PrivateRoute role="paciente">
//               <PerfilCliente />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/home" 
//           element={
//             <PrivateRoute role={localStorage.getItem('role')}>
//               <Home />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/consultas" 
//           element={
//             <PrivateRoute role={localStorage.getItem('role')}>
//               <Consultas />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/feed" 
//           element={
//             <PrivateRoute role={localStorage.getItem('role')}>
//               <Feed/>
//             </PrivateRoute>
//           } 
//         />

//         {/* Configuração acessível a ambos os papéis */}
//         <Route 
//           path="/configuracao" 
//           element={
//             <PrivateRoute role={localStorage.getItem('role')}>
//               <SettingPage />
//             </PrivateRoute>
//           } 
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // // import ProtectedRoutes from './Routes/ProtectedRoutes'
// // import PrivateRoute from './components/RotaPrivada/RotaPrivada'
// // //Caminhos da Pages
// // import Home from './Pages/Home';
// // import Consultas from './Pages/Consultas';
// // import Feed from './Pages/Feed';
// // import PerfilCliente from './Pages/PerfilCliente';
// // import PerfilPsicologo from './Pages/PerfilPsicologo';
// // import SettingPage from './Pages/Configuracao';
// // import Login from './Pages/Login';
// // import Cadastro from './Pages/Cadastro';
// // import { getTheme } from './theme';


// // const App= () => {
// //   const [theme, setTheme] = useState(getTheme('violet'));

// //   const handleThemeChange = (newTheme) => {
// //     setTheme(getTheme(newTheme));
// //   };

// //   return (
// //       <Router>
// //         <Routes>
// //           {/* Rotas públicas*/}
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/cadastro" element={<Cadastro />} />
          
// //           {/* Rotas protegidas */}
         
// //           <Route 
// //             path="/home" 
// //             element={
// //               <PrivateRoute>
// //                 <Home />
// //                 </PrivateRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/perfil/cliente" 
// //             element={
// //               <PrivateRoute>
// //                     <PerfilCliente />
// //                 </PrivateRoute>
// //             } 
// //           />
          
// //           <Route 
// //             path="/perfil/psicologo" 
// //             element={
// //               <PrivateRoute>
// //                     <PerfilPsicologo />
// //                 </PrivateRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/consultas" 
// //             element={
// //               <PrivateRoute>
// //                   <Consultas />
// //                   </PrivateRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/feed" 
// //             element={
// //               <PrivateRoute>
// //                     <Feed />
// //                 </PrivateRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/configuracao" 
// //             element={
// //                 <PrivateRoute>
// //                     <SettingPage onChangeTheme={handleThemeChange} />
// //                   </PrivateRoute>
// //             } 
// //           />
          
// //           {/* Página inicial pública */}
// //           {/* <Route path="/" element={<Home />} /> */}
        
// //         </Routes>
// //       </Router>
// //   );
// // };

// // export default App;

