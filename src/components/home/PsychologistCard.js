import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Avatar, Badge, Icon, Grid, Wrap, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
// Função para criar estrelas preenchidas de acordo com o rating fracionado
const StarRating = ({ rating }) => {
  return (
    <HStack spacing="0.5" justify="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1);

          return (
            <Box key={i} position="relative" display="inline-block">
              <Icon as={StarIcon} color="gray.300" />
              <Box
                position="absolute"
                top="0"
                left="0"
                width={`${fill * 100}%`}
                height="100%"
                overflow="hidden"
              >
                <Icon as={StarIcon} color="primary.500" />
              </Box>
            </Box>
          );
        })}
    </HStack>
  );
};

const PsychologistCard = ({ psychologist, onClick }) => {
  if (!psychologist) {
    return null;
  }

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
      maxW="350px"
      mx="auto"
      cursor="pointer"
      onClick={onClick} // Chama a função ao clicar no card
    >
      <VStack spacing={4} align="center">
        <Avatar size="2xl" src={psychologist.perfil?.foto || 'https://via.placeholder.com/150'} />
        <Text fontWeight="bold" fontSize="xl" color="primary.500" textAlign="center">
          {psychologist.nome}
        </Text>
        <Text color="gray.500" fontSize="sm" textAlign="center" noOfLines={2}>
          {psychologist.perfil?.descricao || 'Sem descrição disponível'}
        </Text>
        <HStack spacing={2} justify="center" align="center">
          <StarRating rating={psychologist.avaliacoes?.avaliacaoMedia || 0} />
          <Text color="primary.500" fontWeight="bold" fontSize="md">
            {psychologist.avaliacoes?.avaliacaoMedia !== undefined
              ? psychologist.avaliacoes.avaliacaoMedia.toFixed(1)
              : '0.0'}
          </Text>
        </HStack>
        <Badge bg={'primary.500'} variant="solid">
          R$ {psychologist.perfil?.valorConsulta || 'N/A'},00
        </Badge>

        <Text>
          {psychologist.perfil?.metodologia?.includes('online') && (
            <Text as="span" color="green.500" mr={2}>
              Online
            </Text>
          )}
          {psychologist.perfil?.metodologia?.includes('presencial') && (
            <Text as="span" color="blue.500">
              Presencial
            </Text>
          )}
        </Text>

        <Wrap mt={2} justify="center">
          {psychologist.perfil?.especialidades?.map((specialization, index) => (
            <Badge key={index} colorScheme="teal" variant="solid">
              {specialization}
            </Badge>
          )) || 'Sem especialidades'}
        </Wrap>
      </VStack>
    </Box>
  );
};

const PsychologistList = ({ filters, onCardClick }) => {
  const [psychologists, setPsychologists] = useState([]); // Estado para armazenar os psicólogos

  const fetchPsychologists = async () => {
    try {
      const url = `${BACKEND_URL}/usuario/filtrar`;

      // Adapta os filtros para garantir que `valorMin` e `valorMax` estejam no formato correto
      const adaptedFilters = {
        ...filters,
        valorMin: filters?.valorMin || 0,
        valorMax: filters?.valorMax || 500,
      };

      const response = await fetch(url, {
        method: 'POST', // Mudado para POST para enviar o JSON no corpo da requisição
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adaptedFilters), // Enviando os filtros no corpo
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }

      const data = await response.json();

      // Verifica se o retorno é uma lista
      if (!Array.isArray(data)) {
        throw new Error('Resposta inválida da API');
      }

      setPsychologists(data); // Define os psicólogos no estado
    } catch (error) {
      console.error('Erro ao buscar psicólogos:', error.message);
      setPsychologists([]); // Garante que a lista esteja vazia em caso de erro
    }
  };

  // Atualiza a lista sempre que os filtros mudarem
  useEffect(() => {
    fetchPsychologists();
  }, [filters]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)"
      }}
      gap={6}
      mt={5}
    >
      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist._id}
          psychologist={psychologist}
          onClick={() => onCardClick(psychologist)} // Envia o JSON completo
        />
      ))}
    </Grid>
  );
};

export default PsychologistList;




// import React, { useEffect, useState } from 'react';
// import { Box, VStack, Text, Avatar, Badge, Icon, Grid, Wrap, HStack } from '@chakra-ui/react';
// import { StarIcon } from '@chakra-ui/icons';

// // Função para criar estrelas preenchidas de acordo com o rating fracionado
// const StarRating = ({ rating }) => {
//   return (
//     <HStack spacing="0.5" justify="center">
//       {Array(5).fill('').map((_, i) => {
//         const fill = Math.min(Math.max(rating - i, 0), 1);

//         return (
//           <Box key={i} position="relative" display="inline-block">
//             <Icon as={StarIcon} color="gray.300" />
//             <Box
//               position="absolute"
//               top="0"
//               left="0"
//               width={`${fill * 100}%`}
//               height="100%"
//               overflow="hidden"
//             >
//               <Icon as={StarIcon} color="primary.500" />
//             </Box>
//           </Box>
//         );
//       })}
//     </HStack>
//   );
// };

// const PsychologistCard = ({ psychologist, onClick }) => {
//   if (!psychologist) {
//     return null;
//   }

//   return (
//     <Box
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="lg"
//       bg="white"
//       p={6}
//       transition="all 0.3s"
//       _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
//       maxW="350px"
//       mx="auto"
//       cursor="pointer"
//       onClick={() => onClick(psychologist._id)} // Quando clicado, chama a função passando o ID
//     >
//       <VStack spacing={4} align="center">
//         <Avatar size="2xl" src={psychologist.perfil?.foto || 'https://via.placeholder.com/150'} />
//         <Text fontWeight="bold" fontSize="xl" color="primary.500" textAlign="center">
//           {psychologist.nome}
//         </Text>
//         <Text color="gray.500" fontSize="sm" textAlign="center" noOfLines={2}>
//           {psychologist.perfil?.descricao || 'Sem descrição disponível'}
//         </Text>
//         <HStack spacing={2} justify="center" align="center">
//           <StarRating rating={psychologist.avaliacoes?.avaliacaoMedia || 0} />
//           <Text color="primary.500" fontWeight="bold" fontSize="md">
//             {psychologist.avaliacoes?.avaliacaoMedia !== undefined
//               ? psychologist.avaliacoes.avaliacaoMedia.toFixed(1)
//               : '0.0'}
//           </Text>
//         </HStack>
//         <Badge bg={'primary.500'} variant="solid">
//           R$ {psychologist.perfil?.valorConsulta || 'N/A'},00
         
//         </Badge>

//         <Text>
//           {psychologist.perfil?.metodologia?.includes('online') && (
//             <Text as="span" color="green.500" mr={2}>
//               Online
//             </Text>
//           )}
//           {psychologist.perfil?.metodologia?.includes('presencial') && (
//             <Text as="span" color="blue.500">
//               Presencial
//             </Text>
//           )}
//         </Text>

//         <Wrap mt={2} justify="center">
//           {psychologist.perfil?.especialidades?.map((specialization, index) => (
//             <Badge key={index} colorScheme="teal" variant="solid">
//               {specialization}
//             </Badge>
//           )) || 'Sem especialidades'}
//         </Wrap>
//       </VStack>
//     </Box>
//   );
// };

// const PsychologistList = ({ filters, onCardClick  }) => {
//   const [psychologists, setPsychologists] = useState([]); // Estado para armazenar os psicólogos

//   const fetchPsychologists = async () => {
//     try {
//       const url = "http://localhost:5000/usuario/filtrar";

//       // Adapta os filtros para garantir que `valorMin` e `valorMax` estejam no formato correto
//       const adaptedFilters = {
//         ...filters,
//         valorMin: filters?.valorMin || 0,
//         valorMax: filters?.valorMax || 500,
//       };

//       const response = await fetch(url, {
//         method: 'POST', // Mudado para POST para enviar o JSON no corpo da requisição
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adaptedFilters), // Enviando os filtros no corpo
//       });

//       if (!response.ok) {
//         throw new Error('Erro ao buscar os dados da API');
//       }

//       const data = await response.json();
//       setPsychologists(data); // Define os psicólogos no estado
//     } catch (error) {
//       console.error('Erro ao buscar psicólogos:', error.message);
//       setPsychologists([]); // Garante que a lista esteja vazia em caso de erro
//     }
//   };

//   // Atualiza a lista sempre que os filtros mudarem
//   useEffect(() => {
//     fetchPsychologists();
//   }, [filters]);

//   return (
//     <Grid
//       templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
//       gap={6}
//       mt={5}
//     >
//       {psychologists.map((psychologist) => (
//         <PsychologistCard 
//         key={psychologist._id} 
//         psychologist={psychologist} 
//         onClick={onCardClick(psychologist)} // Passa a função de clique como prop
//         />
//       ))}
//     </Grid>
//   );
// };

// export default PsychologistList;

// import React, { useEffect, useState } from 'react';
// import { Box, VStack, Text, Avatar, Badge, Icon, Grid, Wrap, HStack } from '@chakra-ui/react';
// import { StarIcon } from '@chakra-ui/icons';

// // Função para criar estrelas preenchidas de acordo com o rating fracionado
// const StarRating = ({ rating }) => {
//   return (
//     <HStack spacing="0.5" justify="center">
//       {Array(5).fill('').map((_, i) => {
//         const fill = Math.min(Math.max(rating - i, 0), 1);

//         return (
//           <Box key={i} position="relative" display="inline-block">
//             <Icon as={StarIcon} color="gray.300" />
//             <Box
//               position="absolute"
//               top="0"
//               left="0"
//               width={`${fill * 100}%`}
//               height="100%"
//               overflow="hidden"
//             >
//               <Icon as={StarIcon} color="primary.500" />
//             </Box>
//           </Box>
//         );
//       })}
//     </HStack>
//   );
// };

// const PsychologistCard = ({ psychologist }) => {
//   if (!psychologist) {
//     return null;
//   }

//   return (
//     <Box
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="lg"
//       bg="white"
//       p={6}
//       transition="all 0.3s"
//       _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
//       maxW="350px"
//       mx="auto"
//     >
//       <VStack spacing={4} align="center">
//         <Avatar size="2xl" src={psychologist.perfil?.foto || 'https://via.placeholder.com/150'} />
//         <Text fontWeight="bold" fontSize="xl" color="primary.500" textAlign="center">
//           {psychologist.nome}
//         </Text>
//         <Text color="gray.500" fontSize="sm" textAlign="center" noOfLines={2}>
//           {psychologist.perfil?.descricao || 'Sem descrição disponível'}
//         </Text>
//         <HStack spacing={2} justify="center" align="center">
//           <StarRating rating={psychologist.avaliacoes?.avaliacaoMedia || 0} />
//           <Text color="primary.500" fontWeight="bold" fontSize="md">
//             {psychologist.avaliacoes?.avaliacaoMedia !== undefined
//               ? psychologist.avaliacoes.avaliacaoMedia.toFixed(1)
//               : '0.0'}
//           </Text>
//         </HStack>
//         <Badge colorScheme="purple" variant="solid">
//           R$ {psychologist.perfil?.valorConsulta || 'N/A'},00
//         </Badge>

//         <Text>
//           {psychologist.perfil?.metodologia?.includes('online') && (
//             <Text as="span" color="green.500" mr={2}>
//               Online
//             </Text>
//           )}
//           {psychologist.perfil?.metodologia?.includes('presencial') && (
//             <Text as="span" color="blue.500">
//               Presencial
//             </Text>
//           )}
//         </Text>

//         <Wrap mt={2} justify="center">
//           {psychologist.perfil?.especialidades?.map((specialization, index) => (
//             <Badge key={index} colorScheme="teal" variant="solid">
//               {specialization}
//             </Badge>
//           )) || 'Sem especialidades'}
//         </Wrap>
//       </VStack>
//     </Box>
//   );
// };

// const PsychologistList = ({ filters }) => {
//   const [psychologists, setPsychologists] = useState([]); // Estado para armazenar os psicólogos

//   const fetchPsychologists = async () => {
//     try {
//       const url = "http://localhost:5000/usuario/filtrar";

//       // Adapta os filtros para garantir que `valorMin` e `valorMax` estejam no formato correto
//       const adaptedFilters = {
//         ...filters,
//         valorMin: filters?.valorMin || 0,
//         valorMax: filters?.valorMax || 500,
//       };

//       const response = await fetch(url, {
//         method: 'POST', // Mudado para POST para enviar o JSON no corpo da requisição
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adaptedFilters), // Enviando os filtros no corpo
//       });

//       if (!response.ok) {
//         throw new Error('Erro ao buscar os dados da API');
//       }

//       const data = await response.json();
//       setPsychologists(data); // Define os psicólogos no estado
//     } catch (error) {
//       console.error('Erro ao buscar psicólogos:', error.message);
//       setPsychologists([]); // Garante que a lista esteja vazia em caso de erro
//     }
//   };

//   // Atualiza a lista sempre que os filtros mudarem
//   useEffect(() => {
//     fetchPsychologists();
//   }, [filters]);

//   return (
//     <Grid
//       templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
//       gap={6}
//       mt={5}
//     >
//       {psychologists.map((psychologist) => (
//         <PsychologistCard key={psychologist._id} psychologist={psychologist} />
//       ))}
//     </Grid>
//   );
// };

// export default PsychologistList;