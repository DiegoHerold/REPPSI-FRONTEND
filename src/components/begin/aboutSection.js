import React from 'react';
import { Box, Flex, Heading, Text, Image, VStack, Button, Divider } from '@chakra-ui/react';
import { FaBrain, FaHandshake, FaTools } from 'react-icons/fa';

const AboutSection = () => {
  const handleNavigateToLogin = () => {
    window.location.href = '/login'; // Redireciona para a página de Login
  };

  return (
    <Box id="about" bg="purple.50" py={20} px={8}>
      {/* Primeira parte com imagem e texto */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        gap={8}
        mb={16}
      >
        <VStack align="flex-start" flex="1">
          <Heading size="2xl" color="purple.700" mb={4}>
            Sobre a REPPSI
          </Heading>
          <Text fontSize="lg" color="purple.700" lineHeight="1.8">
            A REPPSI é uma plataforma digital inovadora que conecta pacientes a
            psicólogos qualificados, oferecendo um ambiente seguro e acolhedor para
            consultas presenciais e online. Nosso objetivo é democratizar o acesso à
            saúde mental, tornando-o mais acessível e prático para todos.
          </Text>
          <Text fontSize="lg" color="purple.700" lineHeight="1.8" mt={4}>
            Com ferramentas modernas e uma interface amigável, ajudamos pacientes a
            encontrar o profissional ideal para suas necessidades, garantindo suporte
            personalizado e eficaz.
          </Text>
          <Button
            mt={6}
            size="lg"
            colorScheme="pink"
            onClick={handleNavigateToLogin}
            _hover={{ bg: 'pink.600' }}
          >
            Conheça Mais
          </Button>
        </VStack>
      </Flex>

      <Divider borderColor="purple.200" />

      {/* Nova abordagem para "Por que escolher a REPPSI?" */}
      <Box mt={16}>
        <Heading size="lg" textAlign="center" color="purple.700" mb={8}>
          Por que escolher a REPPSI?
        </Heading>
        <Flex
          direction="column"
          gap={12}
          alignItems="center"
        >
          <VStack spacing={4} align="center" maxW="700px">
            <FaBrain size={50} color="#805AD5" />
            <Heading size="md" color="purple.700">
              Foco no Bem-Estar Mental
            </Heading>
            <Text fontSize="lg" color="purple.600" textAlign="center">
              A REPPSI é comprometida em promover saúde mental de qualidade,
              conectando você a profissionais especializados que entendem suas
              necessidades.
            </Text>
          </VStack>
          <VStack spacing={4} align="center" maxW="700px">
            <FaHandshake size={50} color="#805AD5" />
            <Heading size="md" color="purple.700">
              Relacionamento de Confiança
            </Heading>
            <Text fontSize="lg" color="purple.600" textAlign="center">
              Nossos psicólogos passam por uma rigorosa verificação para garantir
              segurança e confiança em cada consulta realizada.
            </Text>
          </VStack>
          <VStack spacing={4} align="center" maxW="700px">
            <FaTools size={50} color="#805AD5" />
            <Heading size="md" color="purple.700">
              Ferramentas Modernas
            </Heading>
            <Text fontSize="lg" color="purple.600" textAlign="center">
              Nossa plataforma utiliza tecnologia de ponta para oferecer uma
              experiência simples e eficiente, seja para agendar ou realizar
              consultas.
            </Text>
          </VStack>
        </Flex>
      </Box>

      <Divider borderColor="purple.200" mt={16} />

      {/* Terceira parte com mensagem final */}
      <Box mt={16} textAlign="center">
        <Heading size="lg" color="purple.700" mb={4}>
          Nossa Missão
        </Heading>
        <Text fontSize="lg" color="purple.700" maxW="800px" mx="auto" lineHeight="1.8">
          Promover o bem-estar emocional e a saúde mental de todas as pessoas,
          facilitando a conexão com profissionais qualificados e criando um ambiente
          confiável para suporte psicológico. Junte-se a nós e faça parte dessa
          transformação!
        </Text>
      </Box>
    </Box>
  );
};

export default AboutSection;



// import React from 'react';
// import { Box, Flex, Heading, Text, Image, VStack, Button, Divider } from '@chakra-ui/react';

// const AboutSection = () => (
//   <Box id="about" bg="purple.50" py={20} px={8}>
//     {/* Primeira parte com imagem e texto */}
//     <Flex
//       direction={{ base: 'column', md: 'row' }}
//       alignItems="center"
//       gap={8}
//       mb={16}
//     >
//       <Image
//         src="/images/therapy-session.jpg" // Substitua pela imagem ideal
//         alt="Sessão de terapia"
//         borderRadius="lg"
//         boxShadow="xl"
//         flex="1"
//       />
//       <VStack align="flex-start" flex="1">
//         <Heading size="2xl" color="purple.700" mb={4}>
//           Sobre a REPPSI
//         </Heading>
//         <Text fontSize="lg" color="purple.700" lineHeight="1.8">
//           A REPPSI é uma plataforma digital inovadora que conecta pacientes a
//           psicólogos qualificados, oferecendo um ambiente seguro e acolhedor para
//           consultas presenciais e online. Nosso objetivo é democratizar o acesso à
//           saúde mental, tornando-o mais acessível e prático para todos.
//         </Text>
//         <Text fontSize="lg" color="purple.700" lineHeight="1.8" mt={4}>
//           Com ferramentas modernas e uma interface amigável, ajudamos pacientes a
//           encontrar o profissional ideal para suas necessidades, garantindo suporte
//           personalizado e eficaz.
//         </Text>
//         <Button mt={6} size="lg" colorScheme="pink">
//           Conheça Mais
//         </Button>
//       </VStack>
//     </Flex>

//     <Divider borderColor="purple.200" />

//     {/* Segunda parte com ícones ou destaques */}
//     <Box mt={16}>
//       <Heading size="lg" textAlign="center" color="purple.700" mb={8}>
//         Por que escolher a REPPSI?
//       </Heading>
//       <Flex
//         direction={{ base: 'column', md: 'row' }}
//         justifyContent="space-between"
//         alignItems="flex-start"
//         gap={8}
//       >
//         <VStack spacing={4} align="center">
//           <Image
//             src="/images/secure-environment.jpg" // Exemplo: um ambiente seguro
//             alt="Ambiente seguro"
//             boxSize="150px"
//             borderRadius="full"
//           />
//           <Text fontSize="lg" textAlign="center" color="purple.700">
//             Garantimos um ambiente seguro e verificado para todas as consultas.
//           </Text>
//         </VStack>
//         <VStack spacing={4} align="center">
//           <Image
//             src="/images/personalized-care.jpg" // Exemplo: atendimento personalizado
//             alt="Atendimento personalizado"
//             boxSize="150px"
//             borderRadius="full"
//           />
//           <Text fontSize="lg" textAlign="center" color="purple.700">
//             Atendimento personalizado para atender suas necessidades específicas.
//           </Text>
//         </VStack>
//         <VStack spacing={4} align="center">
//           <Image
//             src="/images/easy-access.jpg" // Exemplo: fácil acesso
//             alt="Fácil acesso"
//             boxSize="150px"
//             borderRadius="full"
//           />
//           <Text fontSize="lg" textAlign="center" color="purple.700">
//             Plataforma simples, acessível e prática, com opções online e presenciais.
//           </Text>
//         </VStack>
//       </Flex>
//     </Box>

//     <Divider borderColor="purple.200" mt={16} />

//     {/* Terceira parte com mensagem final */}
//     <Box mt={16} textAlign="center">
//       <Heading size="lg" color="purple.700" mb={4}>
//         Nossa Missão
//       </Heading>
//       <Text fontSize="lg" color="purple.700" maxW="800px" mx="auto" lineHeight="1.8">
//         Promover o bem-estar emocional e a saúde mental de todas as pessoas,
//         facilitando a conexão com profissionais qualificados e criando um ambiente
//         confiável para suporte psicológico. Junte-se a nós e faça parte dessa
//         transformação!
//       </Text>
//     </Box>
//   </Box>
// );

// export default AboutSection;

