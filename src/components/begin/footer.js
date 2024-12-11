import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => (
  <Flex
    as="footer"
    bg="purple.700"
    color="white"
    py={4}
    px={8}
    justifyContent="center"
  >
    <Text>&copy; 2024 REPPSI. Todos os direitos reservados.</Text>
  </Flex>
);

export default Footer;
