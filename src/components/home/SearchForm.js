import React, { useState } from 'react';
import {
  HStack,
  VStack,
  Input,
  Select,
  Button,
  Box,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';


const SearchForm = ({ onSearch }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [specialization, setSpecialization] = useState('');
  const [date, setDate] = useState('');
  const [methodology, setMethodology] = useState('');

  const handleSearchClick = () => {
    const filters = {
      especializacao: specialization || undefined,
      valorMin: priceRange[0],
      valorMax: priceRange[1],
      data: date || undefined,
      metodologia: methodology || undefined,
    };
    onSearch(filters); // Envia os filtros para o componente pai
  };

  const handlePriceConfirm = () => {
    onClose(); // Fecha o modal após confirmação
  };

  return (
    <Box w="100%">
      {isMobile ? (
        <VStack spacing={4} mb={5} align="start" w="100%">
          <Select
            placeholder="Área de Especialização"
            bg="primary.100"
            borderColor="primary.400"
            w="100%"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="Terapia Cognitivo-Comportamental">Terapia Cognitivo-Comportamental</option>
            <option value="Terapia Familiar">Terapia Familiar</option>
            <option value="Terapia de Casal">Terapia de Casal</option>
            <option value="Psicologia Infantil">Psicologia Infantil</option>
            <option value="Psicanálise">Psicanálise</option>
          </Select>

          <Box w="100%">
            <Text>Valor da Consulta (R$ {priceRange[0]} - R$ {priceRange[1]})</Text>
            <RangeSlider
              aria-label={['min', 'max']}
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
              colorScheme="purple"
            >
              <RangeSliderTrack bg="primary.200">
                <RangeSliderFilledTrack bg="primary.400" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </Box>

          <Select
            placeholder="Data Disponível"
            bg="primary.100"
            borderColor="primary.400"
            w="100%"
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="2024-11-17">17 de Novembro</option>
            <option value="2024-11-18">18 de Novembro</option>
          </Select>

          <Select
            placeholder="Presencial ou Online"
            bg="primary.100"
            borderColor="primary.400"
            w="100%"
            onChange={(e) => setMethodology(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </Select>

          <Box w="100%" textAlign="center">
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="primary"
              bg="primary.400"
              color="white"
              _hover={{ bg: 'primary.500' }}
              size="md"
              w="100%"
              onClick={handleSearchClick}
            >
              Pesquisar
            </Button>
          </Box>
        </VStack>
      ) : (
        <HStack spacing={4} mb={5} w="100%">
          <Select
            placeholder="Área de Especialização"
            bg="primary.100"
            borderColor="primary.400"
            w="100%"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="Terapia Cognitivo-Comportamental">Terapia Cognitivo-Comportamental</option>
            <option value="Terapia Familiar">Terapia Familiar</option>
            <option value="Terapia de Casal">Terapia de Casal</option>
            <option value="Psicologia Infantil">Psicologia Infantil</option>
            <option value="Psicanálise">Psicanálise</option>
          </Select>

          <Box w="100%">
            <Input
              placeholder={`Valor da Consulta (R$ ${priceRange[0]} - R$ ${priceRange[1]})`}
              bg="primary.100"
              borderColor="primary.400"
              readOnly
              onClick={onOpen}
              cursor="pointer"
              w="100%"
            />
          </Box>

          <Select placeholder="Data Disponível" bg="primary.100" borderColor="primary.400" w="100%">
//             <option value="Segunda">Seg-Sex</option>
//             <option value="Segunda">Sab-Dom</option>
//             <option value="Segunda">Segunda</option>
//             <option value="Terça">Terça</option>
//             <option value="Quarta">Quarta</option>
//             <option value="Quinta">Quinta</option>
//             <option value="Sexta">Sexta</option>
//             <option value="Sabado">Sábado</option>
//             <option value="Domingo">Domingo</option>
//           </Select>

          <Select
            placeholder="Presencial ou Online"
            bg="primary.100"
            borderColor="primary.400"
            w="100%"
            onChange={(e) => setMethodology(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </Select>

          <Box w="100%">
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="primary"
              bg="primary.400"
              color="white"
              _hover={{ bg: 'primary.500' }}
              size="md"
              w="100%"
              onClick={handleSearchClick}
            >
              Pesquisar
            </Button>
          </Box>
        </HStack>
      )}

      {!isMobile && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecionar Valor da Consulta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>Valor da Consulta (R$ {priceRange[0]} - R$ {priceRange[1]})</Text>
              <RangeSlider
                aria-label={['min', 'max']}
                min={0}
                max={500}
                step={10}
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                colorScheme="purple"
              >
                <RangeSliderTrack bg="primary.200">
                  <RangeSliderFilledTrack bg="primary.400" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                <RangeSliderThumb boxSize={6} index={1} />
              </RangeSlider>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="primary" bg="primary.400" mr={3} onClick={handlePriceConfirm}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default SearchForm;






// import React, { useState } from 'react';
// import { HStack, VStack, Input, Select, Button, Box, useBreakpointValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Text, useDisclosure } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';

// const SearchForm = () => {
//   const isMobile = useBreakpointValue({ base: true, md: false });
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [priceRange, setPriceRange] = useState([50, 200]);

//   const handlePriceConfirm = () => {
//     onClose();
//   };

//   return (
//     <Box w="100%">
//       {/* Layout para Mobile */}
//       {isMobile ? (
//         <VStack spacing={4} mb={5} align="start" w="100%">
//           <Select placeholder="Área de Especialização" bg="primary.100" borderColor="primary.400" w="100%">
//             <option value="TCC">Terapia Cognitivo-Comportamental</option>
//             <option value="Familiar">Terapia Familiar</option>
//             <option value="Familiar">Terapia de Casal</option>
//             <option value="Familiar">Terapia Sexual</option>
//             <option value="Familiar">Psicologia Infantil</option>
//             <option value="Familiar">Psicanálise</option>
//             <option value="Familiar">Neuropsicologia</option>
            
            
//           </Select>

//           {/* Filtro de preço diretamente no mobile */}
//           <Box w="100%">
//             <Text>Valor da Consulta (R$ {priceRange[0]} - R$ {priceRange[1]})</Text>
//             <RangeSlider
//               aria-label={['min', 'max']}
//               min={0}
//               max={500}
//               step={10}
//               value={priceRange}
//               onChange={(val) => setPriceRange(val)}
//               colorScheme="purple"
//             >
//               <RangeSliderTrack bg="primary.200">
//                 <RangeSliderFilledTrack bg="primary.400" />
//               </RangeSliderTrack>
//               <RangeSliderThumb boxSize={6} index={0} />
//               <RangeSliderThumb boxSize={6} index={1} />
//             </RangeSlider>
//           </Box>

//           

//           <Select placeholder="Presencial ou Online" bg="primary.100" borderColor="primary.400" w="100%">
//             <option value="Presencial">Presencial</option>
//             <option value="Online">Online</option>
//           </Select>

//           <Box w="100%" textAlign="center">
//             <Button leftIcon={<SearchIcon />} colorScheme="primary" bg="primary.400" color="white" _hover={{ bg: 'primary.500' }} size='md' w="100%">
//               Pesquisar
//             </Button>
//           </Box>
//         </VStack>
//       ) : (
//         // Layout para Desktop (usando modal para preço)
//         <HStack spacing={4} mb={5} w="100%">
//           <Select placeholder="Área de Especialização" bg="primary.100" borderColor="primary.400" w="100%">
//           <option value="TCC">Terapia Cognitivo-Comportamental</option>
//             <option value="Familiar">Terapia Familiar</option>
//             <option value="Familiar">Terapia de Casal</option>
//             <option value="Familiar">Terapia Sexual</option>
//             <option value="Familiar">Psicologia Infantil</option>
//             <option value="Familiar">Psicanálise</option>
//             <option value="Familiar">Neuropsicologia</option>
//           </Select>

//           {/* Botão para abrir o modal de preço no desktop */}
//           <Box w="100%">
//             <Input
//               placeholder={`Valor da Consulta (R$ ${priceRange[0]} - R$ ${priceRange[1]})`}
//               bg="primary.100"
//               borderColor="primary.400"
//               readOnly
//               onClick={onOpen}
//               cursor="pointer"
//               w="100%"
//             />
//           </Box>

//           <Select placeholder="Data Disponível" bg="primary.100" borderColor="primary.400" w="100%">
//           <option value="Segunda">Seg-Sex</option>
//             <option value="Segunda">Sab-Dom</option>
//             <option value="Segunda">Segunda</option>
//             <option value="Terça">Terça</option>
//             <option value="Quarta">Quarta</option>
//             <option value="Quinta">Quinta</option>
//             <option value="Sexta">Sexta</option>
//             <option value="Sabado">Sábado</option>
//             <option value="Domingo">Domingo</option>
//           </Select>

//           <Select placeholder="Presencial ou Online" bg="primary.100" borderColor="primary.400" w="100%">
//             <option value="Presencial">Presencial</option>
//             <option value="Online">Online</option>
//           </Select>

//           <Box w="100%">
//             <Button leftIcon={<SearchIcon />} colorScheme="primary" bg="primary.400" color="white" _hover={{ bg: 'primary.500' }} size='md' w="100%">
//               Pesquisar
//             </Button>
//           </Box>
//         </HStack>
//       )}

//       {/* Modal para o RangeSlider em telas maiores */}
//       {!isMobile && (
//         <Modal isOpen={isOpen} onClose={onClose} isCentered>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Selecionar Valor da Consulta</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Text mb={4}>Valor da Consulta (R$ {priceRange[0]} - R$ {priceRange[1]})</Text>
//               <RangeSlider
//                 aria-label={['min', 'max']}
//                 min={0}
//                 max={500}
//                 step={10}
//                 value={priceRange}
//                 onChange={(val) => setPriceRange(val)}
//                 colorScheme="purple"
//               >
//                 <RangeSliderTrack bg="primary.200">
//                   <RangeSliderFilledTrack bg="primary.400" />
//                 </RangeSliderTrack>
//                 <RangeSliderThumb boxSize={6} index={0} />
//                 <RangeSliderThumb boxSize={6} index={1} />
//               </RangeSlider>
//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme="primary" bg="primary.400" mr={3} onClick={handlePriceConfirm}>
//                 Confirmar
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </Box>
//   );
// };

// export default SearchForm;

