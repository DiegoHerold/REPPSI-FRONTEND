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
  InputGroup,
  useToast,

} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import UserService from '../../Services/UserServices'
import { validarEmail, validarSenha } from '../../Util/validadores'
const userService = new UserService()
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Login = () => {
  ;
  const [showPassword] = useState(false); // Estado para mostrar/esconder senha
  const navigate = useNavigate();
  ///começo de mudanças
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();
  

  const validadorInput = () => {
    return validarEmail(email) && validarSenha(senha)
  }
  //fim de mudanças



  // Função para enviar os dados do formulário para a API
  const handleLogin = () => {
    const url = `${BACKEND_URL}/login`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('nome', data.usuario.nome);
          localStorage.setItem('role', data.role);
          localStorage.setItem('email', data.usuario.email);
        

          toast({
            title: 'Login realizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          
          // Forçar o redirecionamento usando window.location
          window.location.href = '/home';
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

  // Função para alternar entre mostrar e esconder a senha

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
          Login
        </Heading>

        <VStack spacing={4} mb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              name='email'
              // onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                name='password'
                // onChange={handleChange}
                onChange={(e) => setSenha(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Flex justify="flex-end" width="100%">
            <Link
              color="blue.500"
              onClick={() => navigate('/forgot-password')}
              _hover={{ textDecoration: 'underline' }}
              fontSize="sm"
            >
              Esqueci minha senha
            </Link>
          </Flex>

          <Button
           type='submit'
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
            w="full"
            onClick={handleLogin}
            disabled={loading === true || !validadorInput()}
            // onClick={handleLogin}
          >
            Entrar
          </Button>
        </VStack>

        {/* Link para redirecionar para a página de cadastro */}
        <Flex justify="center" mt={6}>
          <Text>
            Não tem uma conta?{' '}
            <Link color="blue.500" onClick={() => navigate('/cadastro')} fontWeight="bold">
              Cadastre-se
            </Link>
          </Text>
        </Flex>

        
      </Box>
    </Flex>
  );
};

export default Login;
