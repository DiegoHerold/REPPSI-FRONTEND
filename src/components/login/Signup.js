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
import md5 from 'md5';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SignupPage= () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  // Função para enviar os dados do formulário para a API
  const handleCadastro = () => {
    // Define a URL da API
    const url = `${BACKEND_URL}/cadastrar`;

    // Envia a requisição para a API usando fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        papel: 'paciente',
        senha: md5(senha) ,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: 'Cadastro realizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/login'); // Redireciona para a página home após cadastro
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
        mx={10}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} fontWeight="bold">
          Criar Conta
        </Heading>

        <VStack spacing={4} mb={6}>
          <FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
            w="full"
            onClick={handleCadastro}
          >
            Cadastrar
          </Button>
        </VStack>

        {/* Link para redirecionar para a página de login */}
        <VStack spacing={2} mt={6}>
          <Text>
            Já tem uma conta?{' '}
            <Link color="blue.500" onClick={() => navigate('/login')} fontWeight="bold">
              Faça login
            </Link>
          </Text>
          <Text>
            É um profissional de psicologia?{' '}
            <Link color="green.500" onClick={() => navigate('/signup-psicologo')} fontWeight="bold">
              Cadastre-se aqui
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignupPage;
