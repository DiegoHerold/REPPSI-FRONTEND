import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Badge,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  Icon,
  Select,
  RadioGroup,
  Radio,
  Stack,
  useToast,
  Collapse,
} from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Importando o CSS customizado
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Componente de estrelas
const StarRating = ({ rating = 0 }) => {
  return (
    <HStack spacing="1" justify="center">
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <Box key={i} position="relative" display="inline-block" w="24px" h="24px">
            <Icon as={StarIcon} color="gray.300" w="24px" h="24px" />
            <Box
              position="absolute"
              top="0"
              left="0"
              width={`${fillPercentage}%`}
              height="100%"
              overflow="hidden"
            >
              <Icon as={StarIcon} color="yellow.400" w="24px" h="24px" />
            </Box>
          </Box>
        );
      })}
    </HStack>
  );
};

const PsychologistDetails = ({ open, onClose, psychologist }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedMode, setSelectedMode] = useState(
    psychologist?.perfil?.metodologia?.length === 1 ? psychologist.perfil.metodologia[0] : ''
  );
  const [calendarVisible, setCalendarVisible] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('authToken');

  const handleViewProfile = () => {
    const profileUrl = `/profile/${psychologist._id}`;
    window.open(profileUrl, '_blank');
  };

  const confirmAppointment = async () => {
    if (selectedDate && selectedHour !== null && paymentMethod && selectedMode) {
      // Formatar a data no formato dia/mês/ano
      const formattedDate = selectedDate
        ? `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${selectedDate.getFullYear()}`
        : null;
  
      const appointmentData = {
        token,
        psychologistId: psychologist._id,
        namePsychologist: psychologist.nome || 'Psicólogo',
        duration: 60,
        appointmentType: selectedMode,
        price: psychologist.perfil?.valorConsulta || 100.0,
        status: 'agendada',
        date: `${formattedDate} - ${selectedHour.toString().padStart(2, '0')}:00`, // Salva a data no formato dia/mês/ano - horário
        paymentMethod,
        paymentStatus: 'pago',
        notes: 'Sessão inicial para avaliação',
      };
  
      try {
        const response = await fetch(`${BACKEND_URL}/consulta/criar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        });
  
        if (response.ok) {
          toast({
            title: 'Consulta Agendada',
            description: 'A consulta foi agendada com sucesso.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        } else {
          throw new Error('Erro ao agendar a consulta');
        }
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro ao agendar a consulta. Tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Campos Incompletos',
        description: 'Por favor, selecione todos os campos antes de confirmar.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>Detalhes do Psicólogo</Text>
            <Button
              size="sm"
              mr={30}
              colorScheme="blue"
              rightIcon={<ExternalLinkIcon />}
              onClick={handleViewProfile}
              variant="outline"
            >
              Ver Perfil
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="500px" p="6">
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap="6" mb="4">
            <Avatar
              size="2xl"
              name={psychologist.nome || 'Psicólogo'}
              src={psychologist.perfil?.foto || 'https://via.placeholder.com/150'}
            />
            <VStack align="start" spacing="2">
              <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                {psychologist.nome || 'Nome Indisponível'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {psychologist.perfil?.descricao || 'Sem descrição disponível'}
              </Text>
              <HStack spacing="2" align="center">
                <StarRating rating={psychologist.avaliacoes?.avaliacaoMedia || 0} />
                <Text color="gray.600">
                  {psychologist.avaliacoes?.avaliacaoMedia
                    ? `${psychologist.avaliacoes.avaliacaoMedia.toFixed(1)} / 5`
                    : 'Sem avaliações'}
                </Text>
              </HStack>
              <Text fontWeight="bold" color="teal.700">
                R$ {psychologist.perfil?.valorConsulta || 'N/A'},00 por consulta
              </Text>
            </VStack>
          </Flex>
          <Divider mb="4" />
          <Box>
            <Text fontWeight="bold" mb="2" color="teal.600">
              Modalidades Disponíveis
            </Text>
            {psychologist.perfil?.metodologia?.length > 1 ? (
              <RadioGroup onChange={setSelectedMode} value={selectedMode}>
                <Stack direction="row" spacing="4">
                  {psychologist.perfil?.metodologia.includes('online') && (
                    <Radio value="online" colorScheme="green">
                      Online
                    </Radio>
                  )}
                  {psychologist.perfil?.metodologia.includes('presencial') && (
                    <Radio value="presencial" colorScheme="blue">
                      Presencial
                    </Radio>
                  )}
                </Stack>
              </RadioGroup>
            ) : (
              <Badge colorScheme={selectedMode === 'online' ? 'green' : 'blue'}>
                {selectedMode === 'online' ? 'Online' : 'Presencial'}
              </Badge>
            )}
          </Box>
          <Box mt="4">
            <Button
              onClick={() => setCalendarVisible((prev) => !prev)}
              colorScheme="teal"
              mb="2"
              size="sm"
            >
              {calendarVisible ? 'Ocultar Calendário' : 'Escolher Data'}
            </Button>
            <Collapse in={calendarVisible} animateOpacity>
              <Calendar
                className="custom-calendar"
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              />
            </Collapse>
          </Box>
          <Box mt="4">
            <Text fontWeight="bold" mb="2" color="teal.600">
              Horários Disponíveis
            </Text>
            <Grid templateColumns="repeat(6, 1fr)" gap="2">
              {Array.from({ length: 24 }).map((_, hour) => (
                <Button
                  key={hour}
                  size="sm"
                  variant={selectedHour === hour ? 'solid' : 'outline'}
                  colorScheme={selectedHour === hour ? 'teal' : 'gray'}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour.toString().padStart(2, '0')}:00
                </Button>
              ))}
            </Grid>
          </Box>
          <Divider my="4" />
          <Box>
            <Text fontWeight="bold" mb="2" color="teal.600">
              Forma de Pagamento
            </Text>
            <Select
              placeholder="Selecione uma forma de pagamento"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
              <option value="pix">Pix</option>
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={confirmAppointment}>
            Confirmar Agendamento
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PsychologistDetails;

// import React, { useState } from 'react';
// import {
//   Box,
//   Flex,
//   Avatar,
//   Badge,
//   Text,
//   VStack,
//   HStack,
//   Button,
//   Divider,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Grid,
//   Icon,
//   Select,
//   RadioGroup,
//   Radio,
//   Stack,
//   useToast,
//   Collapse,
// } from '@chakra-ui/react';
// import { StarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './CustomCalendar.css'; // Importando o CSS customizado

// // Componente de estrelas
// const StarRating = ({ rating = 0 }) => {
//   return (
//     <HStack spacing="1" justify="center">
//       {Array.from({ length: 5 }, (_, i) => {
//         const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

//         return (
//           <Box key={i} position="relative" display="inline-block" w="24px" h="24px">
//             <Icon as={StarIcon} color="gray.300" w="24px" h="24px" />
//             <Box
//               position="absolute"
//               top="0"
//               left="0"
//               width={`${fillPercentage}%`}
//               height="100%"
//               overflow="hidden"
//             >
//               <Icon as={StarIcon} color="yellow.400" w="24px" h="24px" />
//             </Box>
//           </Box>
//         );
//       })}
//     </HStack>
//   );
// };

// const PsychologistDetails = ({ open, onClose, psychologist }) => {
//   const [selectedHour, setSelectedHour] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [selectedMode, setSelectedMode] = useState(
//     psychologist?.perfil?.metodologia?.length === 1 ? psychologist.perfil.metodologia[0] : ''
//   );
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const toast = useToast();

//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmIyNGJiZmYyMjkzMzY4ZTViYzYwOCIsImlhdCI6MTczMTg5MTk3OSwiZXhwIjoxNzMxOTc4Mzc5fQ.7x7K64L_rZBHKEkdyWNyp_IwK0qdVJ85x1x0hFN6fQg';

//   const handleViewProfile = () => {
//     const profileUrl = `/profile/${psychologist._id}`;
//     window.open(profileUrl, '_blank');
//   };

//   const confirmAppointment = async () => {
//     if (selectedDate && selectedHour !== null && paymentMethod && selectedMode) {
//       const appointmentData = {
//         token,
//         psychologistId: psychologist._id,
//         namePsychologistId: psychologist.nome || 'Psicólogo',
//         duration: 60,
//         appointmentType: selectedMode,
//         price: psychologist.perfil?.valorConsulta || 100.0,
//         status: 'agendada',
//         date: `${selectedDate.toISOString().split('T')[0]} - ${selectedHour.toString().padStart(2, '0')}:00`,
//         paymentMethod,
//         paymentStatus: 'pago',
//         notes: 'Sessão inicial para avaliação',
//       };

//       try {
//         const response = await fetch('http://localhost:5000/consulta/criar', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(appointmentData),
//         });

//         if (response.ok) {
//           toast({
//             title: 'Consulta Agendada',
//             description: 'A consulta foi agendada com sucesso.',
//             status: 'success',
//             duration: 5000,
//             isClosable: true,
//           });
//           onClose();
//         } else {
//           throw new Error('Erro ao agendar a consulta');
//         }
//       } catch (error) {
//         toast({
//           title: 'Erro',
//           description: 'Ocorreu um erro ao agendar a consulta. Tente novamente.',
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } else {
//       toast({
//         title: 'Campos Incompletos',
//         description: 'Por favor, selecione todos os campos antes de confirmar.',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Modal isOpen={open} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>
//           <Flex justify="space-between" align="center">
//             <Text>Detalhes do Psicólogo</Text>
//             <Button
//               size="sm"
//               mr={30}
//               colorScheme="blue"
//               rightIcon={<ExternalLinkIcon />}
//               onClick={handleViewProfile}
//               variant="outline"
//             >
//               Ver Perfil
//             </Button>
//           </Flex>
//         </ModalHeader>
//         <ModalCloseButton />
//         <ModalBody overflowY="auto" maxH="500px" p="6">
//           <Flex direction={{ base: 'column', md: 'row' }} align="center" gap="6" mb="4">
//             <Avatar
//               size="2xl"
//               name={psychologist.nome || 'Psicólogo'}
//               src={psychologist.perfil?.foto || 'https://via.placeholder.com/150'}
//             />
//             <VStack align="start" spacing="2">
//               <Text fontSize="2xl" fontWeight="bold" color="teal.600">
//                 {psychologist.nome || 'Nome Indisponível'}
//               </Text>
//               <Text fontSize="sm" color="gray.500">
//                 {psychologist.perfil?.descricao || 'Sem descrição disponível'}
//               </Text>
//               <HStack spacing="2" align="center">
//                 <StarRating rating={psychologist.avaliacoes?.avaliacaoMedia || 0} />
//                 <Text color="gray.600">
//                   {psychologist.avaliacoes?.avaliacaoMedia
//                     ? `${psychologist.avaliacoes.avaliacaoMedia.toFixed(1)} / 5`
//                     : 'Sem avaliações'}
//                 </Text>
//               </HStack>
//               <Text fontWeight="bold" color="teal.700">
//                 R$ {psychologist.perfil?.valorConsulta || 'N/A'},00 por consulta
//               </Text>
//             </VStack>
//           </Flex>
//           <Divider mb="4" />
//           <Box>
//             <Text fontWeight="bold" mb="2" color="teal.600">
//               Modalidades Disponíveis
//             </Text>
//             {psychologist.perfil?.metodologia?.length > 1 ? (
//               <RadioGroup onChange={setSelectedMode} value={selectedMode}>
//                 <Stack direction="row" spacing="4">
//                   {psychologist.perfil?.metodologia.includes('online') && (
//                     <Radio value="online" colorScheme="green">
//                       Online
//                     </Radio>
//                   )}
//                   {psychologist.perfil?.metodologia.includes('presencial') && (
//                     <Radio value="presencial" colorScheme="blue">
//                       Presencial
//                     </Radio>
//                   )}
//                 </Stack>
//               </RadioGroup>
//             ) : (
//               <Badge colorScheme={selectedMode === 'online' ? 'green' : 'blue'}>
//                 {selectedMode === 'online' ? 'Online' : 'Presencial'}
//               </Badge>
//             )}
//           </Box>
//           <Box mt="4">
//             <Button
//               onClick={() => setCalendarVisible((prev) => !prev)}
//               colorScheme="teal"
//               mb="2"
//               size="sm"
//             >
//               {calendarVisible ? 'Ocultar Calendário' : 'Escolher Data'}
//             </Button>
//             <Collapse in={calendarVisible} animateOpacity>
//               <Calendar
//                 className="custom-calendar"
//                 onChange={setSelectedDate}
//                 value={selectedDate}
//                 minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
//               />
//             </Collapse>
//           </Box>
//           <Box mt="4">
//             <Text fontWeight="bold" mb="2" color="teal.600">
//               Horários Disponíveis
//             </Text>
//             <Grid templateColumns="repeat(6, 1fr)" gap="2">
//               {Array.from({ length: 24 }).map((_, hour) => (
//                 <Button
//                   key={hour}
//                   size="sm"
//                   variant={selectedHour === hour ? 'solid' : 'outline'}
//                   colorScheme={selectedHour === hour ? 'teal' : 'gray'}
//                   onClick={() => setSelectedHour(hour)}
//                 >
//                   {hour.toString().padStart(2, '0')}:00
//                 </Button>
//               ))}
//             </Grid>
//           </Box>
//           <Divider my="4" />
//           <Box>
//             <Text fontWeight="bold" mb="2" color="teal.600">
//               Forma de Pagamento
//             </Text>
//             <Select
//               placeholder="Selecione uma forma de pagamento"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="debito">Débito</option>
//               <option value="credito">Crédito</option>
//               <option value="pix">Pix</option>
//             </Select>
//           </Box>
//         </ModalBody>
//         <ModalFooter>
//           <Button variant="ghost" onClick={onClose}>
//             Cancelar
//           </Button>
//           <Button colorScheme="teal" onClick={confirmAppointment}>
//             Confirmar Agendamento
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default PsychologistDetails;


