import React from 'react';
import { Box, Heading, Flex, Image, Text, VStack, Button } from '@chakra-ui/react';
import Navegue from './img/Navegue.png';
import Escolha from './img/Escolha.png';
import Agende from './img/Agende.png';

const HowItWorksSection = () => {
  const handleNavigateToLogin = () => {
    window.location.href = '/login'; // Redireciona para a página de Login
  };

  return (
    <Box id="how-it-works" bg="purple.50" py={16} px={8}>
      <Heading size="lg" textAlign="center" color="purple.700" mb={12}>
        Como Funciona
      </Heading>

      {/* Passo 1: Navegue */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        mb={16}
        gap={{ base: 8, md: 12 }}
      >
        <Image
          src={Navegue}
          alt="Navegue pelos perfis"
          maxW={{ base: '100%', md: '45%' }}
          objectFit="contain"
        />
        <VStack align="flex-start" spacing={6} maxW="50%">
          <Heading size="md" color="purple.700">
            1. Navegue
          </Heading>
          <Text fontSize="md" color="purple.600" lineHeight="1.8">
            Explore os perfis de psicólogos disponíveis na plataforma. Utilize filtros para encontrar profissionais que atendam às suas necessidades.
          </Text>
        </VStack>
      </Flex>

      {/* Passo 2: Escolha */}
      <Flex
        direction={{ base: 'column', md: 'row-reverse' }}
        align="center"
        justify="space-between"
        mb={16}
        gap={{ base: 8, md: 12 }}
      >
        <Image
          src={Escolha}
          alt="Escolha o atendimento"
          maxW={{ base: '100%', md: '45%' }}
          objectFit="contain"
        />
        <VStack align="flex-start" spacing={6} maxW="50%">
          <Heading size="md" color="purple.700">
            2. Escolha
          </Heading>
          <Text fontSize="md" color="purple.600" lineHeight="1.8">
            Escolha entre atendimentos online ou presenciais, de acordo com sua disponibilidade e preferência. Analise as avaliações para tomar sua decisão.
          </Text>
        </VStack>
      </Flex>

      {/* Passo 3: Agende */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        mb={16}
        gap={{ base: 8, md: 12 }}
      >
        <Image
          src={Agende}
          alt="Agende sua consulta"
          maxW={{ base: '100%', md: '45%' }}
          objectFit="contain"
        />
        <VStack align="flex-start" spacing={6} maxW="50%">
          <Heading size="md" color="purple.700">
            3. Agende
          </Heading>
          <Text fontSize="md" color="purple.600" lineHeight="1.8">
            Agende sua consulta no horário mais conveniente para você e receba o cuidado que merece, de forma simples e segura.
          </Text>
        </VStack>
      </Flex>

      {/* Botão Saiba Mais */}
      <Flex justifyContent="center" mt={8}>
        <Button
          size="lg"
          colorScheme="pink"
          onClick={handleNavigateToLogin}
          _hover={{ bg: 'pink.600' }}
        >
          Saiba Mais
        </Button>
      </Flex>
    </Box>
  );
};

export default HowItWorksSection;






// import React from 'react';
// import { Box, Heading, Grid, GridItem, Text, Image, VStack } from '@chakra-ui/react';
// import Navegue from './img/Navegue.png';

// const HowItWorksSection = () => (
//   <Box id="how-it-works" bg="purple.50" py={16} px={8}>
//     <Heading size="lg" textAlign="center" color="purple.700" mb={8}>
//       Como Funciona
//     </Heading>
//     <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={12}>
//       {/* Passo 1: Navegue */}
//       <GridItem>
//         <VStack spacing={4} align="center">
//           <Image
//             src={Navegue}
//             alt="Navegue pelos perfis"
//             boxSize="150px"
//             borderRadius="md"
//             shadow="md"
//           />
//           <Text fontSize="lg" fontWeight="bold" color="purple.700" textAlign="center">
//             Navegue
//           </Text>
//           <Text fontSize="md" color="purple.600" textAlign="center">
//             Explore os perfis de psicólogos disponíveis e encontre o profissional
//             ideal para suas necessidades.
//           </Text>
//         </VStack>
//       </GridItem>

//       {/* Passo 2: Escolha */}
//       <GridItem>
//         <VStack spacing={4} align="center">
//           <Image
//             src="./img/Escolha.png"
//             alt="Escolha o atendimento"
//             boxSize="150px"
//             borderRadius="md"
//             shadow="md"
//           />
//           <Text fontSize="lg" fontWeight="bold" color="purple.700" textAlign="center">
//             Escolha
//           </Text>
//           <Text fontSize="md" color="purple.600" textAlign="center">
//             Decida entre consultas online ou presenciais, conforme sua
//             disponibilidade e preferência.
//           </Text>
//         </VStack>
//       </GridItem>

//       {/* Passo 3: Agende */}
//       <GridItem>
//         <VStack spacing={4} align="center">
//           <Image
//             src="../begin/img/Agende.png"
//             alt="Agende sua consulta"
//             boxSize="150px"
//             borderRadius="md"
//             shadow="md"
//           />
//           <Text fontSize="lg" fontWeight="bold" color="purple.700" textAlign="center">
//             Agende
//           </Text>
//           <Text fontSize="md" color="purple.600" textAlign="center">
//             Marque a consulta no dia e horário de sua conveniência e aproveite o
//             cuidado que você merece.
//           </Text>
//         </VStack>
//       </GridItem>
//     </Grid>
//   </Box>
// );

// export default HowItWorksSection;

