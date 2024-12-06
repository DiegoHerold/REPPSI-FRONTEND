import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Tag,
  Grid,
  Select,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, CloseIcon } from '@chakra-ui/icons';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function ConsultationsPage({ onPsychologistClick }) {
 


  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteAllOpen, onOpen: onDeleteAllOpen, onClose: onDeleteAllClose } = useDisclosure();
  const { isOpen: isVideoOpen, onOpen: onVideoOpen, onClose: onVideoClose } = useDisclosure();


  const token = localStorage.getItem('authToken');
  const url = `${BACKEND_URL}/consultas/get?token=${token}`;
  const toast = useToast();

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar as consultas');
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn('Resposta da API não é um array. Configurando como vazio.');
          setConsultations([]);
        } else {
          setConsultations(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar as consultas:', error.message);
        setConsultations([]); // Garante que consultations seja sempre um array
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const uniqueDates = [
    ...new Set(consultations.map((consultation) => new Date(consultation.createdAt).toLocaleDateString())),
  ];

  const filteredConsultations = consultations.filter(
    (consultation) =>
      (!filter || consultation.status === filter) &&
      (!dateFilter || new Date(consultation.createdAt).toLocaleDateString() === dateFilter)
  );

  const upcomingConsultations = consultations.filter(
    (consultation) => consultation.status === 'agendada'
  );

  const consultationsHistory = filteredConsultations.filter(
    (consultation) => consultation.status !== 'agendada'
  );


  const load = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar as consultas');
      }
  
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.warn('Resposta da API não é um array. Configurando como vazio.');
        setConsultations([]);
      } else {
        setConsultations(data);
      }
    } catch (error) {
      console.error('Erro ao buscar as consultas:', error.message);
      setConsultations([]); // Garante que consultations seja sempre um array
    }
  };
  




  const deleteConsultation = async (id) => {
    
    let url = `${BACKEND_URL}/consulta/apagar?idConsulta=${id}`
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      if (response.ok) {
        toast({
          title: "Consulta deletada.",
          description: "A consulta foi removida com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        load();
      } else {
        const error = await response.json();
        toast({
          title: "Erro ao deletar consulta.",
          description: error.message || "Não foi possível deletar a consulta.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao deletar consulta.",
        description: "Ocorreu um erro ao tentar se conectar ao servidor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erro ao deletar consulta:", error);
    }
  };

  const deleteAllHistory = async (userId) => {
    console.log('Deletando todo o histórico de consultas',userId);
    let url = `${BACKEND_URL}/consultas/apagar?idUser=${userId}`
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      if (response.ok) {
        toast({
          title: "Histórico deletado.",
          description: "histórico removido com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        load();
      } else {
        const error = await response.json();
        toast({
          title: "Erro ao deletar histórico.",
          description: error.message || "Não foi possível deletar o histórico.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao deletar histórico.",
        description: "Ocorreu um erro ao tentar se conectar ao servidor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erro ao deletar consulta:", error);
    }
  };

  const cancelConsultation = async(id) => {
    console.log(`Cancelando consulta com ID: ${id}`);
    let url = `${BACKEND_URL}/consulta/atualizar?idConsulta=${id}`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({ status: "cancelada" }),
      });
  
      if (response.ok) {
        toast({
          title: "consulta cancelada.",
          description: "consulta cancelada com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        load();
      } else {
        const error = await response.json();
        toast({
          title: "Erro ao cancelar.",
          description: error.message || "Não foi possível cancelar.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao cancelar consulta.",
        description: "Ocorreu um erro ao tentar se conectar ao servidor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erro ao deletar consulta:", error);
    }
  };

  const handleOpenModal = (consultation) => {
    setSelectedConsultation(consultation);
    onOpen();
  };

  const handleConfirmAction = () => {
    if (selectedConsultation?.status === 'agendada') {
      cancelConsultation(selectedConsultation._id);
    } else {
      deleteConsultation(selectedConsultation._id);
    }
    onClose();
  };
  const mandarUserId = () => {
    if (selectedConsultation) {
      deleteAllHistory(selectedConsultation.userId);   
  }}
  const entrarVideochamada = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/videochamada/iniciar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          idPsicologo: selectedConsultation.psychologistId,
          idPaciente: selectedConsultation.userId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Navegar para a página de videochamada com os dados necessários
        // navigate(`/videochamada/${selectedConsultation._id}`, {
        //   state: {
        //     channelData: data.data
        //   }
        // });
      } else {
        toast({
          title: 'Erro ao iniciar videochamada',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error('Erro ao iniciar videochamada:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível iniciar a videochamada',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    onVideoClose();
  };

  if (loading) {
    return <Text>     Carregando...</Text>;
  }

  return (
    <Box maxW="80%" mx="auto" p={6}>
      {/* Consultas Agendadas */}
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="primary.400">
          Consultas Agendadas
        </Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          {upcomingConsultations.length > 0 ? (
            upcomingConsultations.map((consultation) => (
              <Box
                key={consultation._id}
                p={6}
                bg="primary.100"
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
                onClick={() => onPsychologistClick(consultation.psychologistId)}
                cursor="pointer"
              >
                <Text fontWeight="bold" color="primary.400">
                  Data: {consultation.date}
                </Text>
                <Text mb={4} color="primary.300">
                  Psicólogo: {consultation.namePsychologist}
                </Text>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConsultation(consultation); // Certifique-se de que a consulta selecionada está definida
                    onVideoOpen(); // Abre o modal de videoconferência
                  }}
                >
                  Entrar na Chamada
                </Button>

                <IconButton
                  icon={<CloseIcon />}
                  colorScheme="red"
                  size="sm"
                  position="absolute"
                  top="10px"
                  right="10px"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(consultation);
                  }}
                  title="Cancelar Consulta"
                />
              </Box>
            ))
          ) : (
            <Text>Nenhuma consulta agendada encontrada.</Text>
          )}
        </Grid>
      </Box>

      {/* Histórico de Consultas */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="primary.400">
            Histórico de Consultas
          </Text>
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="ghost"
            onClick={onDeleteAllOpen}
            title="Apagar todo o histórico"
          />
        </Flex>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4} mb={8}>
          <Select
            placeholder="Filtrar por status"
            value={filter}
            onChange={handleFilterChange}
            bg="white"
            color="primary.400"
          >
            <option value="">Todos</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
            <option value="pendente">Pendente</option>
          </Select>
          <Select
            placeholder="Filtrar por Data"
            value={dateFilter}
            onChange={handleDateFilterChange}
            bg="white"
            color="primary.400"
          >
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </Grid>
        <Stack spacing={4}>
          {consultationsHistory.length > 0 ? (
            consultationsHistory.map((consultation) => (
              <Box
                key={consultation._id}
                p={6}
                bg="primary.100"
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
                onClick={() => onPsychologistClick(consultation.psychologistId)}
                cursor="pointer"
              >
                <Text fontWeight="bold" color="primary.400">
                  Data: {new Date(consultation.createdAt).toLocaleString()}
                </Text>
                <Text color="primary.300">
                  Psicólogo: {consultation.namePsychologistId || 'Nome não disponível'}
                </Text>
                <Tag
                  size="lg"
                  mt={2}
                  bg={
                    consultation.status === 'concluida'
                      ? 'green.500'
                      : consultation.status === 'cancelada'
                      ? 'red.500'
                      : 'yellow.500'
                  }
                  color="white"
                >
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </Tag>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  position="absolute"
                  top="10px"
                  right="10px"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(consultation);
                  }}
                  title="Apagar Consulta"
                />
              </Box>
            ))
          ) : (
            <Text>Nenhum histórico encontrado.</Text>
          )}
        </Stack>
      </Box>

      {/* Modal de Confirmação */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza que deseja{' '}
            {selectedConsultation?.status === 'agendada' ? 'cancelar' : 'apagar'} esta consulta?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmAction}>
              Confirmar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isVideoOpen} onClose={onVideoClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza que deseja entrar na videochamada?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={entrarVideochamada}>
              Confirmar
            </Button>
            <Button variant="ghost" onClick={onVideoClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* Modal de Apagar Todo o Histórico */}
      <Modal isOpen={isDeleteAllOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>Tem certeza que deseja apagar todo o histórico de consultas?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={mandarUserId}>
              Confirmar
            </Button>
            <Button variant="ghost" onClick={onDeleteAllClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ConsultationsPage;
