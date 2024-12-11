import React from 'react';
import { Box, Heading, Flex, Link, VStack, Text, IconButton } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const ContactSection = () => (
  <Box id="contact" bg="purple.700" color="white" py={16} px={8}>
    <Heading size="lg" textAlign="center" mb={8}>
      Entre em Contato
    </Heading>
    {/* Informações de Contato */}
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      align="center"
      gap={16}
      mb={12}
    >
      <VStack spacing={4} textAlign="center">
        <IconButton
          icon={<EmailIcon />}
          aria-label="Email"
          bg="white"
          color="purple.700"
          _hover={{ bg: 'purple.500', color: 'white' }}
          isRound
          size="lg"
        />
        <Text fontSize="lg" fontWeight="bold">
          Email
        </Text>
        <Link href="mailto:eppsi.psicologia@gmail.com" fontSize="md" _hover={{ textDecoration: 'underline' }}>
          reppsi.psicologia@gmail.com
        </Link>
      </VStack>
      <VStack spacing={4} textAlign="center">
        <IconButton
          icon={<PhoneIcon />}
          aria-label="Telefone"
          bg="white"
          color="purple.700"
          _hover={{ bg: 'purple.500', color: 'white' }}
          isRound
          size="lg"
        />
        <Text fontSize="lg" fontWeight="bold">
          Telefone
        </Text>
        <Link href="tel:+555198023-1465" fontSize="md" _hover={{ textDecoration: 'underline' }}>
          (51) 98023-1465
        </Link>
      </VStack>
    </Flex>

    {/* Redes Sociais */}
    <Heading size="md" textAlign="center" mb={4}>
      Conecte-se Conosco
    </Heading>
    <Flex justifyContent="center" gap={6}>
      <IconButton
        icon={<FaFacebook />}
        aria-label="Facebook"
        bg="white"
        color="purple.700"
        _hover={{ bg: 'purple.500', color: 'white' }}
        isRound
        size="lg"
        as="a"
        href="https://facebook.com/sua-pagina"
        target="_blank"
        rel="noopener noreferrer"
      />
      <IconButton
        icon={<FaInstagram />}
        aria-label="Instagram"
        bg="white"
        color="purple.700"
        _hover={{ bg: 'purple.500', color: 'white' }}
        isRound
        size="lg"
        as="a"
        href="https://instagram.com/sua-pagina"
        target="_blank"
        rel="noopener noreferrer"
      />
      <IconButton
        icon={<FaTiktok />}
        aria-label="TikTok"
        bg="white"
        color="purple.700"
        _hover={{ bg: 'purple.500', color: 'white' }}
        isRound
        size="lg"
        as="a"
        href="https://tiktok.com/@sua-pagina"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Flex>
  </Box>
);

export default ContactSection;
