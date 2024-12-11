import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        as="header"
        bg="purple.700"
        color="white"
        py={4}
        px={8}
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="10"
        shadow="lg"
      >
        {/* Logo */}
        <Heading size="lg" cursor="pointer">
          REPPSI
        </Heading>

        {/* Desktop Navigation */}
        <HStack
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          as="nav"
        >
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            offset={-80} // Ajuste para compensar a altura do header
            style={{ cursor: 'pointer' }}
          >
            Sobre
          </ScrollLink>
          <ScrollLink
            to="benefits"
            smooth={true}
            duration={500}
            offset={-80} // Ajuste para compensar a altura do header
            style={{ cursor: 'pointer' }}
          >
            Benefícios
          </ScrollLink>
          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={500}
            offset={-80} // Ajuste para compensar a altura do header
            style={{ cursor: 'pointer' }}
          >
            Como Funciona
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            offset={-80} // Ajuste para compensar a altura do header
            style={{ cursor: 'pointer' }}
          >
            Contato
          </ScrollLink>
          <Button
            colorScheme="pink"
            variant="outline"
            size="sm"
            as="a"
            href="/login"
            _hover={{ bg: 'pink.600', color: 'white' }}
            cursor="pointer"
          >
            Login
          </Button>
          <Button
            colorScheme="pink"
            size="sm"
            as="a"
            href="/register"
            _hover={{ bg: 'pink.600', color: 'white' }}
            cursor="pointer"
          >
            Cadastro
          </Button>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Toggle navigation"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          bg="purple.500"
          _hover={{ bg: 'purple.600' }}
          color="white"
        />
      </Flex>

      {/* Mobile Navigation */}
      {isOpen && (
        <Box bg="purple.700" color="white" py={4} px={8}>
          <VStack as="nav" spacing={4} align="flex-start">
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              offset={-250} // Ajuste para compensar a altura do header
              style={{ cursor: 'pointer' }}
              onClick={onToggle}
            >
              Sobre
            </ScrollLink>
            <ScrollLink
              to="benefits"
              smooth={true}
              duration={500}
              offset={-250} // Ajuste para compensar a altura do header
              style={{ cursor: 'pointer' }}
              onClick={onToggle}
            >
              Benefícios
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              offset={-250} // Ajuste para compensar a altura do header
              style={{ cursor: 'pointer' }}
              onClick={onToggle}
            >
              Como Funciona
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-80} // Ajuste para compensar a altura do header
              style={{ cursor: 'pointer' }}
              onClick={onToggle}
            >
              Contato
            </ScrollLink>
            <Button
              colorScheme="pink"
              variant="outline"
              size="sm"
              as="a"
              href="/login"
              _hover={{ bg: 'pink.600', color: 'white' }}
              cursor="pointer"
              onClick={onToggle}
            >
              Login
            </Button>
            <Button
              colorScheme="pink"
              size="sm"
              as="a"
              href="/register"
              _hover={{ bg: 'pink.600', color: 'white' }}
              cursor="pointer"
              onClick={onToggle}
            >
              Cadastro
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Header;







// import React from 'react';
// import { Flex, Heading, HStack, Button, Link } from '@chakra-ui/react';

// const HeaderHome = () => (
//   <Flex
//     as="header"
//     bg="purple.700"
//     color="white"
//     py={4}
//     px={8}
//     justifyContent="space-between"
//     alignItems="center"
//   >
//     <Heading size="md">REPPSI</Heading>
//     <HStack spacing={4}>
//       <Link href="/about">Sobre</Link>
//       <Link href="/benefits">Benefícios</Link>
//       <Link href="/how-it-works">Como Funciona</Link>
//       <Link href="/contact">Contato</Link>
//       <Button colorScheme="pink" variant="outline" size="sm" as="a" href="/login">
//         Login
//       </Button>
//       <Button colorScheme="pink" size="sm" as="a" href="/cadastro">
//         Cadastro
//       </Button>
//     </HStack>
//   </Flex>
// );

// export default HeaderHome;
