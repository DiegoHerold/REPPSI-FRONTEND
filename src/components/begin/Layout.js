import React from 'react';
import Header from './headerHome';
import Footer from './footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Box>
    <Header />
    <Box as="main" minHeight="80vh">
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
