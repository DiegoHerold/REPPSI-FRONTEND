import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'; // Importando o ChakraProvider
import { ThemeProvider } from '@mui/material/styles'; // Importando o ThemeProvider do Material UI
import { getTheme } from './theme'; // Importe o getTheme em vez do themeChakra

const theme = getTheme('violet'); // Defina o tema inicial, por exemplo, 'violet'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Use o tema gerado pela função getTheme */}
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
);