import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  IconButton,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import LogoutModal from './ModalLogout'; // Importa 


import logo from '../../img/LogoREPPSI.png';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure(); // Para o modal de logout
  //Mudar de Paginas
  const navigate = useNavigate();

  const Home = () => {
    navigate('/home');
  };
  const Perfil = () => {
    navigate('/perfil');
  };
  const PerfilC = () => {
    navigate('/perfil/cliente');
  };
  const PerfilP = () => {
    navigate('/perfil/psicologo');
  };
  const HistóricoConsulta = () => {
    navigate('/consultas');
  };
  const FeedPage = () => {
    navigate('/feed');
  };
  const configura = () => {
    navigate('/configuracao');
  };

  

  return (
    <>
      <Box bg="primary.300" color="white" px={10}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Botão de Menu (Hamburger) para abrir a Sidebar */}
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            color={'primary.300'}
            variant="ghost"
            aria-label="Open Menu"
            bg="primary.400"
            _hover={{ bg: "primary.500" }}
          />

          {/* Título do Header */}
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Flex alignItems="center" onClick={Home} cursor="pointer">
              <Avatar src={logo} size="md" />
            </Flex>
          </Box>

          {/* Avatar e Botão de Fechar Perfil */}
          <Flex alignItems="center" cursor="pointer">
            <Avatar name="Christian Nwamba" src="/path-to-profile-pic.jpg"  _hover={{ bg: "primary.700" }}
            onClick={Perfil}/> 
          </Flex>
        </Flex>

        {/* Sidebar (Drawer) */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent bg="primary.200">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                <Button variant="ghost" color={'primary.500'}  onClick={Home}>
                  Home
                </Button>
                <Button variant="ghost" color={'primary.500'} onClick={Perfil}>
                  Perfil
                </Button>
                <Button variant="ghost" color={'primary.500'} onClick={HistóricoConsulta}>
                  Consultas
                </Button>
                <Button variant="ghost" color={'primary.500'} onClick={FeedPage}>
                  Feed
                </Button>
                <Button variant="ghost" color={'primary.500'} onClick={configura}>
                  Configurações
                </Button>
                {/* Botão que abre o modal de Logout */}
                <Button variant="ghost" color={'primary.500'} onClick={onLogoutOpen}>
                  Logout
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Modal de Logout */}
      <LogoutModal isOpen={isLogoutOpen} onClose={onLogoutClose} />
    </>
  );
}

export default Header;
