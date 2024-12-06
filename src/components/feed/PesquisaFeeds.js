// PesquisaFeed.js
import React, { useState } from 'react';
import { Input, InputGroup, Box, IconButton, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const PesquisaFeed = ({ onSearch }) => {
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a entrada de texto no campo de pesquisa
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Função para quando o usuário pressionar o botão de pesquisar
  const handleSearch = () => {
    onSearch(searchTerm); // Passa o termo de pesquisa para o componente pai
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={8} position="relative">
      <Flex>
        <InputGroup size="lg" flex="1">
          {/* Campo de busca com ícone de pesquisa */}
          <Input
            placeholder="Pesquisar no feed..."
            value={searchTerm}
            onChange={handleInputChange}
            borderRadius="md"
            bg="white" // Cor do fundo branco
            color="black" // Texto dentro do input preto
            _placeholder={{ color: 'gray.500' }} // Placeholder em cinza
            shadow="md"
          />
        </InputGroup>
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={handleSearch} // Aciona a pesquisa ao clicar no ícone
          bg="primary.400" // Cor de fundo roxa
          color="white"
          _hover={{ bg: 'primary.500' }} // Muda para roxo escuro ao passar o mouse
          size="lg" // Ajuste de tamanho para combinar com o input
          ml={2} // Margem à esquerda para separá-lo do input
        />
      </Flex>
    </Box>
  );
};

export default PesquisaFeed;




// import React, { useState } from 'react';
// import { Input, InputGroup, Box, List, ListItem, IconButton, Flex } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';

// const PesquisaFeed = () => {
//   // Estado para armazenar o termo de pesquisa
//   const [searchTerm, setSearchTerm] = useState('');
//   // Estado para armazenar sugestões (podem vir de um histórico ou API)
//   const [suggestions, setSuggestions] = useState(['React', 'JavaScript', 'Chakra UI', 'APIs', 'Frontend']);
//   // Controle de visibilidade das sugestões
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   // Função para lidar com a entrada de texto no campo de pesquisa
//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);

//     // Mostrar sugestões se houver texto
//     if (value.length > 0) {
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   // Função ao clicar em uma sugestão
//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     setShowSuggestions(false);
//     // Aqui pode ser feita uma requisição de pesquisa para o feed
//     console.log(`Pesquisa realizada para: ${suggestion}`);
//   };

//   // Função para quando o usuário pressionar o botão de pesquisar
//   const handleSearch = () => {
//     console.log(`Pesquisa enviada: ${searchTerm}`);
//     // Lógica de pesquisa no feed aqui
//     setShowSuggestions(false);
//   };

//   return (
//     <Box maxWidth="600px" mx="auto" mt={8} position="relative">
//       <Flex>
//         <InputGroup size="lg" flex="1">
//           {/* Campo de busca com ícone de pesquisa */}
//           <Input
//             placeholder="Pesquisar no feed..."
//             value={searchTerm}
//             onChange={handleInputChange}
//             borderRadius="md"
//             bg="white" // Cor do fundo branco
//             color="black" // Texto dentro do input preto
//             _placeholder={{ color: 'gray.500' }} // Placeholder em cinza
//             shadow="md"
//           />
//         </InputGroup>
//         <IconButton
//           aria-label="Search database"
//           icon={<SearchIcon />}
//           onClick={handleSearch} // Aciona a pesquisa ao clicar no ícone
//           bg="primary.400" // Cor de fundo roxa
//           color="white"
//           _hover={{ bg: 'primary.500' }} // Muda para roxo escuro ao passar o mouse
//           size="lg" // Ajuste de tamanho para combinar com o input
//           ml={2} // Margem à esquerda para separá-lo do input
//         />
//       </Flex>

//       {/* Sugestões de pesquisa */}
//       {showSuggestions && (
//         <List
//           spacing={2}
//           mt={2}
//           border="1px solid"
//           borderColor="primary.300" // Borda em violeta médio
//           borderRadius="md"
//           bg="white"
//           shadow="md"
//           maxHeight="150px"
//           overflowY="auto"
//         >
//           {suggestions
//             .filter((suggestion) =>
//               suggestion.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//             .map((suggestion, index) => (
//               <ListItem
//                 key={index}
//                 px={4}
//                 py={2}
//                 _hover={{ bg: 'primary.100', cursor: 'pointer' }} // Lavanda clara ao passar o mouse
//                 onClick={() => handleSuggestionClick(suggestion)} // Ao clicar, realiza a busca
//               >
//                 {suggestion}
//               </ListItem>
//             ))}
//         </List>
//       )}
//     </Box>
//   );
// };

// export default PesquisaFeed;
