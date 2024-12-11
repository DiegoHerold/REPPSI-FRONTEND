import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import {  Navigate, useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import UserServices from '../../Services/UserServices';
// Usado para exibir mensagens (feedback)

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  const toast = useToast(); // Agora o hook useToast está corretamente dentro do componente
  const services = new UserServices;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ação de logout
    toast({
      title: 'Logout realizado com sucesso!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
    // return <Navigate to="/" />;
    
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="lg">
        <ModalHeader fontWeight="bold" color="primary.500">
          Confirmar Logout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" color="primary.400">
            Você tem certeza que deseja fazer logout?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={() => {
            services.logout();
            // Função adicional que você quer executar
            handleLogout();
            }}>
            Sair
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
