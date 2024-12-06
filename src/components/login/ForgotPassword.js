import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Container
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { validarEmail } from '../../Util/validadores';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarEmail(email)) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/esqueci-senha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Código enviado!',
          description: 'Verifique seu email para o código de recuperação',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/reset-password', { state: { email } });
      } else {
        toast({
          title: 'Erro',
          description: data.message || 'Erro ao enviar código de recuperação',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao conectar com o servidor',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Recuperação de Senha
        </Text>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu email cadastrado"
                />
              </FormControl>
              <Button
                colorScheme="blue"
                width="100%"
                type="submit"
                isLoading={isLoading}
              >
                Enviar Código de Recuperação
              </Button>
              <Button
                variant="ghost"
                width="100%"
                onClick={() => navigate('/login')}
              >
                Voltar ao Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default ForgotPassword; 