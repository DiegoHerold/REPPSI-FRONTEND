import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Link,
  useToast
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SignupPsicologoPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [crp, setCrp] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleCadastroPsicologo = () => {
    const url = `${BACKEND_URL}/cadastrar`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        papel: 'psicologo',
        crp,
        especialidade,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: 'Cadastro realizado com sucesso!',
            description: 'Seu cadastro será analisado pela nossa equipe.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/login');
        } else {
          toast({
            title: 'Erro',
            description: data.message || 'Verifique as informações e tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Erro ao conectar-se à API',
          description: 'Verifique sua conexão ou tente novamente mais tarde.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        p={6}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} fontWeight="bold">
          Cadastro de Psicólogo
        </Heading>

        <VStack spacing={4} mb={6}>
          <FormControl isRequired>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CRP</FormLabel>
            <Input
              placeholder="Digite seu número de CRP"
              value={crp}
              onChange={(e) => setCrp(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Especialidade</FormLabel>
            <Input
              placeholder="Digite sua especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="green"
            rightIcon={<ArrowForwardIcon />}
            w="full"
            onClick={handleCadastroPsicologo}
          >
            Cadastrar como Psicólogo
          </Button>
        </VStack>

        <Flex justify="center" mt={6}>
          <Text>
            Já tem uma conta?{' '}
            <Link color="blue.500" onClick={() => navigate('/login')} fontWeight="bold">
              Faça login
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignupPsicologoPage; 