import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useTheme } from '../../Util/ThemeContext';

const SettingPage = () => {
  // Estado inicial
  const [language, setLanguage] = useState('pt');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const toast = useToast();
  const { themeName, changeTheme } = useTheme();
  const email = localStorage.getItem('email');

  // Função para alterar o tema
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    changeTheme(newTheme);
    toast({
      title: 'Tema alterado!',
      description: `Você mudou para o tema ${newTheme}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Função para enviar email de alteração de senha
  const handleSendEmail = () => {
    if (!email) {
      toast({
        title: 'Erro',
        description: 'Email não encontrado',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    window.location.href = `/forgot-password?email=${encodeURIComponent(email)}`;
  };

  // Função para salvar todas as configurações
  const handleSaveSettings = () => {
    toast({
      title: 'Configurações salvas com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box w="100%" maxW="800px" mx="auto" mt={10} p={5} bg="secondary.100" borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={5} color="primary.400">
        Configurações da Conta
      </Heading>

      {/* Seção de Dados Pessoais */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <VStack spacing={6}>
            <Box w="100%">
              <Text fontWeight="bold" color="primary.500">Email:</Text>
              <Input
                value={email}
                isReadOnly
                bg="primary.100"
                borderColor="primary.300"
              />
            </Box>
            <Box w="100%">
              <Text fontWeight="bold" color="primary.500">Senha:</Text>
              <HStack spacing={4}>
                <Text>******</Text>
                <Button size="sm" colorScheme="primary" onClick={handleSendEmail}>
                  Mudar senha
                </Button>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* Configurações de Privacidade */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Configurações de Privacidade</Heading>
          <HStack justify="space-between" w="full">
            <Text>Perfil Privado</Text>
            <Switch
              colorScheme="teal"
              isChecked={isPrivateProfile}
              onChange={(e) => setIsPrivateProfile(e.target.checked)}
            />
          </HStack>
        </CardBody>
      </Card>

      {/* Forma de Pagamento */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Forma de Pagamento</Heading>
          <Select
            placeholder="Escolha uma forma de pagamento"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            bg="primary.100"
            borderColor="primary.300"
          >
            <option value="creditCard">Cartão de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="boleto">Boleto Bancário</option>
          </Select>
          {paymentMethod && (
            <Input
              placeholder="Insira os dados do pagamento"
              mt={4}
              bg="primary.100"
              borderColor="primary.300"
            />
          )}
        </CardBody>
      </Card>

      {/* Idioma Padrão */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Idioma Padrão</Heading>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            bg="primary.100"
            borderColor="primary.300"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="es">Espanhol</option>
          </Select>
        </CardBody>
      </Card>

      {/* Configurações de Tema */}
      <Box p={6} maxW="600px" mx="auto" bg="secondary.100" borderRadius="md">
        <Heading mb={4} size="lg" textAlign="center" color="primary.500">
          Configurações de Tema
        </Heading>
        <Text mb={4} color="primary.400" textAlign="center">
          Escolha o tema para personalizar a aparência do site.
        </Text>
        <Select
          placeholder="Selecione o tema"
          value={themeName}
          onChange={handleThemeChange}
          mb={4}
          borderColor="primary.400"
          focusBorderColor="primary.500"
        >
          <option value="violet">Violeta</option>
          <option value="purple">Roxo</option>
          <option value="blue">Azul</option>
          <option value="green">Verde</option>
          <option value="blackAndWhite">Preto e Branco</option>
          <option value="gray">Cinza</option>
        </Select>
      </Box>

      {/* Notificações */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Notificações</Heading>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <Text>Notificações por Email</Text>
              <Switch
                colorScheme="teal"
                isChecked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
            </HStack>
            <HStack justify="space-between" w="full">
              <Text>Notificações por SMS</Text>
              <Switch
                colorScheme="teal"
                isChecked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Segurança */}
      <Card borderRadius="lg" mb={5}>
        <CardBody>
          <Heading as="h3" size="md" mb={4} color="primary.400">Segurança</Heading>
          <HStack justify="space-between" w="full">
            <Text>Autenticação em Duas Etapas</Text>
            <Switch
              colorScheme="teal"
              isChecked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
            />
          </HStack>
        </CardBody>
      </Card>

      {/* Salvar Configurações */}
      <Button onClick={handleSaveSettings} colorScheme="green" size="lg" w="full">
        Salvar Configurações
      </Button>
    </Box>
  );
};

export default SettingPage;


// import React, { useState } from 'react';
// import {
//   Box, Heading, Input, Button, Select, VStack, HStack, Text, Grid, Flex, useToast, Card, CardBody, Stack, Switch,ChakraProvider
// } from '@chakra-ui/react';
// import { useTheme } from '../../Util/ThemeContext';

// const SettingPage = () => {
// // Tema padrão
//   const [language, setLanguage] = useState('pt');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [isPrivateProfile, setIsPrivateProfile] = useState(false);
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [smsNotifications, setSmsNotifications] = useState(false);
//   const [twoFactorAuth, setTwoFactorAuth] = useState(false);
//   const toast = useToast();
//   const { themeName, changeTheme } = useTheme();
//   const email = localStorage.getItem('email');

//   const handleThemeChange = (event) => {
//     const newTheme = event.target.value;
//     changeTheme(newTheme);
//     toast({
//       title: 'Tema alterado!',
//       description: `Você mudou para o tema ${newTheme}`,
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//   };


//   // Função para enviar email de alteração de senha
//   const handleSendEmail = () => {
//     const email = localStorage.getItem('email');
//     if (!email) {
//       toast({
//         title: 'Erro',
//         description: 'Email não encontrado',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     // Redirecionar para a página de esqueci senha com o email
//     window.location.href = `/forgot-password?email=${encodeURIComponent(email)}`;
//   };

//   // Função para salvar todas as configurações
//   const handleSaveSettings = () => {
//     toast({
//       title: 'Configurações salvas com sucesso.',
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   return (
//     <Box w="100%" maxW="800px" mx="auto" mt={10} p={5} bg="secondary.100" borderRadius="lg" boxShadow="lg">
//       <Heading as="h2" mb={5} color="primary.400">
//         Configurações da Conta
//       </Heading>

//       {/* Seção de Dados Pessoais */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <VStack spacing={6}>
//             <VStack spacing={4} align="start" w="100%">
//               <Box w="100%">
//                 <Text fontWeight="bold" color="primary.500">Email:</Text>
//                 <Input
//                   value={email}
//                   isReadOnly
//                   bg="primary.100"
//                   borderColor="primary.300"
//                 />
//               </Box>
//               <Box w="100%">
//                 <Text fontWeight="bold" color="primary.500">Senha:</Text>
//                 <HStack spacing={4}>
//                   <Text>******</Text>
//                   <Button size="sm" colorScheme="blue" onClick={handleSendEmail}>
//                     Mudar senha
//                   </Button>
//                 </HStack>
//               </Box>
//             </VStack>
//           </VStack>
//         </CardBody>
//       </Card>

//       {/* Seção de Privacidade */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <Heading as="h3" size="md" mb={4} color="primary.400">Configurações de Privacidade</Heading>
//           <HStack justify="space-between" w="full">
//             <Text>Perfil Privado</Text>
//             <Switch
//               colorScheme="teal"
//               isChecked={isPrivateProfile}
//               onChange={(e) => setIsPrivateProfile(e.target.checked)}
//             />
//           </HStack>
//         </CardBody>
//       </Card>

//       {/* Seção de Forma de Pagamento */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <Heading as="h3" size="md" mb={4} color="primary.400">Forma de Pagamento</Heading>
//           <Select
//             placeholder="Escolha uma forma de pagamento"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             bg="primary.100"
//             borderColor="primary.300"
//           >
//             <option value="creditCard">Cartão de Crédito</option>
//             <option value="paypal">PayPal</option>
//             <option value="boleto">Boleto Bancário</option>
//           </Select>
//           {paymentMethod && (
//             <Input placeholder="Insira os dados do pagamento" mt={4} bg="primary.100" borderColor="primary.300" />
//           )}
//         </CardBody>
//       </Card>

//       {/* Seção de Idioma Padrão */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <Heading as="h3" size="md" mb={4} color="primary.400">Idioma Padrão</Heading>
//           <Select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             bg="primary.100"
//             borderColor="primary.300"
//           >
//             <option value="pt">Português</option>
//             <option value="en">Inglês</option>
//             <option value="es">Espanhol</option>
//           </Select>
//         </CardBody>
//       </Card>

//       {/* Seção de Mudança de Tema */}
//       <Box p={6} maxW="600px" mx="auto" bg="secondary.100" borderRadius="md">
//       <Heading mb={4} size="lg" textAlign="center" color="primary.500">
//         Configurações de Tema
//       </Heading>
//       <Text mb={4} color="primary.400" textAlign="center">
//         Escolha o tema para personalizar a aparência do site.
//       </Text>
//       <Select
//         placeholder="Selecione o tema"
//         value={themeName}
//         onChange={handleThemeChange}
//         mb={4}
//         borderColor="primary.400"
//         focusBorderColor="primary.500"
//       >
//         <option value="violet">Violeta</option>
//         <option value="blue">Azul</option>
//         <option value="green">Verde</option>
//         <option value="blackAndWhite">Preto e Branco</option>
//         <option value="coral">Coral</option>
//         <option value="gray">Cinza</option>
//       </Select>
//     </Box>

//       {/* Seção de Notificações */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <Heading as="h3" size="md" mb={4} color="primary.400">Notificações</Heading>
//           <VStack align="start" spacing={4}>
//             <HStack justify="space-between" w="full">
//               <Text>Notificações por Email</Text>
//               <Switch
//                 colorScheme="teal"
//                 isChecked={emailNotifications}
//                 onChange={(e) => setEmailNotifications(e.target.checked)}
//               />
//             </HStack>
//             <HStack justify="space-between" w="full">
//               <Text>Notificações por SMS</Text>
//               <Switch
//                 colorScheme="teal"
//                 isChecked={smsNotifications}
//                 onChange={(e) => setSmsNotifications(e.target.checked)}
//               />
//             </HStack>
//           </VStack>
//         </CardBody>
//       </Card>

//       {/* Seção de Segurança */}
//       <Card borderRadius="lg" mb={5}>
//         <CardBody>
//           <Heading as="h3" size="md" mb={4} color="primary.400">Segurança</Heading>
//           <HStack justify="space-between" w="full">
//             <Text>Autenticação em Duas Etapas</Text>
//             <Switch
//               colorScheme="teal"
//               isChecked={twoFactorAuth}
//               onChange={(e) => setTwoFactorAuth(e.target.checked)}
//             />
//           </HStack>
//         </CardBody>
//       </Card>

//       {/* Botão para salvar todas as configurações */}
//       <Button onClick={handleSaveSettings} colorScheme="green" size="lg" w="full">
//         Salvar Configurações
//       </Button>
//     </Box>
//   );
// };

// export default SettingPage;

