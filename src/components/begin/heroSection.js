/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Animação de gradiente pulsante
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const handleStartClick = () => {
    window.location.href = '/login'; // Redireciona para a página de Login
  };
const HeroSection = () => {
  

  return (
    <Box
      css={{
        background: "linear-gradient(270deg, #805AD5, #FF686B, #B794F4, #FF686B)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
      color="white"
      textAlign="center"
      py={20}
      px={8}
      id="hero"
    >
      <Heading size="2xl" fontWeight="bold">
        Bem-vindo ao REPPSI
      </Heading>
      <Text fontSize="lg" mt={4}>
        Saúde mental ao seu alcance: conecte-se com psicólogos qualificados de forma simples e confiável.
      </Text>
      <Button
        mt={6}
        size="lg"
        colorScheme="pink"
        _hover={{ bg: "pink.600" }}
        onClick={handleStartClick}
      >
        Começar Agora
      </Button>
    </Box>
  );
};

export default HeroSection;



// import React from 'react';
// import { Box, Heading, Text, Button } from '@chakra-ui/react';

// const HeroSection = () => (
//   <Box
//     bgGradient="linear(to-r, purple.500, pink.500)"
//     color="white"
//     textAlign="center"
//     py={20}
//     px={8}
//     id="hero"
//   >
//     <Heading size="2xl">Bem-vindo à REPPSI</Heading>
//     <Text fontSize="lg" mt={4}>
//       Sua conexão com psicólogos qualificados, presencial ou online. Acesse o
//       suporte que você merece, de onde estiver.
//     </Text>
//     <Button mt={6} size="lg" colorScheme="pink">
//       Começar Agora
//     </Button>
//   </Box>
// );

// export default HeroSection;
