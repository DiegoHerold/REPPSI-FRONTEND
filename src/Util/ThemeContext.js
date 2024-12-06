import React, { createContext, useState, useContext } from 'react';
import { getTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('violet'); // Tema padrão

  const changeTheme = (newTheme) => {
    setThemeName(newTheme);
  };

  const value = {
    themeName,
    theme: getTheme(themeName),
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
