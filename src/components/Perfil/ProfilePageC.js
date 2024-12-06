import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Tag,
  Avatar,
  Divider,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import ModalEditarPaciente from "./ModalEditarPaciente"; // Importação do modal externo

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function ProfilePage() {
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const [profilePicture, setProfilePicture] = useState(""); // Estado para a foto de perfil
  const [formData, setFormData] = useState({
    nome: "",
    perfil: {
      idade: "",
      localizacao: "",
      bio: "",
      preferencias: {
        interessesEspecialidade: [],
      },
    },
  }); // Estado inicializado para evitar erros
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controle do modal
  const token = localStorage.getItem("authToken"); // Obtém o token do localStorage

  useEffect(() => {
    // Faz a requisição para buscar a imagem de perfil e os dados do usuário
    fetch(`${BACKEND_URL}/files/profile/picture/${token}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar foto de perfil");
        }
        return response.json();
      })
      .then((data) => {
        // Configura a imagem de perfil e os dados do usuário
        setProfilePicture(data.perfil.foto || "https://via.placeholder.com/150");
        setUserData(data);
        setFormData({
          nome: data.nome || "",
          perfil: {
            idade: data.perfil?.idade || "",
            localizacao: data.perfil?.localizacao || "",
            bio: data.perfil?.bio || "",
            preferencias: {
              interessesEspecialidade: data.perfil?.preferencias?.interessesEspecialidade || [],
            },
          },
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do usuário:", error.message);
        setProfilePicture("https://via.placeholder.com/150"); // Imagem padrão em caso de erro
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (["bio", "idade", "localizacao"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        perfil: { ...prev.perfil, [name]: value },
      }));
    }
  };

  const handleAddTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      perfil: {
        ...prev.perfil,
        preferencias: {
          ...prev.perfil.preferencias,
          interessesEspecialidade: [
            ...prev.perfil.preferencias.interessesEspecialidade,
            tag,
          ],
        },
      },
    }));
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      perfil: {
        ...prev.perfil,
        preferencias: {
          ...prev.perfil.preferencias,
          interessesEspecialidade: prev.perfil.preferencias.interessesEspecialidade.filter(
            (item) => item !== tag
          ),
        },
      },
    }));
  };

  const handleSubmit = () => {
    const filteredData = {
      nome: formData.nome,
      perfil: {
        bio: formData.perfil.bio,
        idade: formData.perfil.idade,
        localizacao: formData.perfil.localizacao,
        preferencias: {
          interessesEspecialidade: formData.perfil.preferencias.interessesEspecialidade,
        },
      },
    };

    fetch(`${BACKEND_URL}/atualizar?token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar os dados do usuário");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Perfil atualizado com sucesso:", data);
        setUserData(data);
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil:", error.message);
      });
  };

  if (!userData) {
    return <Text>      Carregando...</Text>;
  }

  return (
    <>
      <Box maxW="80%" mx="auto" p={4}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
            <Flex direction="column" align="center">
            <Avatar
              src={profilePicture}
              alt="Profile Picture"
              boxSize={{ base: "250px", md: "450px" }} // Define um tamanho fixo
              border="2px solid"
              borderColor="primary.400"
              mb={4}
            />
              <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
                {formData.nome}
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
                {"Idade:"} {formData.perfil.idade} /{" "}
                {formData.perfil.localizacao || "Localização não informada"}
              </Text>
              <Button size={{ base: "sm", md: "md" }} colorScheme="purple" onClick={onOpen}>
                Editar Perfil
              </Button>
            </Flex>
          </Box>

          <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
            <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
              Biografia
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
              {formData.perfil.bio || "Sem biografia disponível"}
            </Text>
            <Divider my={4} borderColor="primary.300" />
            <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
              Gostos e Interesses
            </Text>
            <Stack direction="row" spacing={4} flexWrap="wrap">
              {formData.perfil.preferencias.interessesEspecialidade.map((interesse, index) => (
                <Tag key={index} size={{ base: "md", md: "lg" }} bg="teal.500" color="white">
                  {interesse}
                </Tag>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Box>

      <ModalEditarPaciente
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default ProfilePage;



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   Stack,
//   Tag,
//   Avatar,
//   Divider,
//   Grid,
//   useDisclosure,
// } from "@chakra-ui/react";
// import ModalEditarPaciente from "./ModalEditarPaciente"; // Importação do modal externo

// function ProfilePage() {
//   const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
//   const [formData, setFormData] = useState({
//     nome: "",
//     perfil: {
//       idade: "",
//       localizacao: "",
//       bio: "",
//       preferencias: {
//         interessesEspecialidade: [],
//       },
//     },
//   }); // Estado inicializado para evitar erros
//   const { isOpen, onOpen, onClose } = useDisclosure(); // Controle do modal
//   const token = localStorage.getItem("authToken"); // Obtém o token do localStorage
//   const role = localStorage.getItem("role"); // Obtém o role do localStorage

//   useEffect(() => {
//     // Faz a requisição para buscar os dados do usuário
//     fetch("http://localhost:5000/usuario", {
//       method: "POST", // Método POST
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token, role }), // Envia o token e role no corpo da requisição
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao buscar os dados do usuário");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data); // Armazena os dados no estado
//         setFormData({
//           nome: data.nome || "",
//           perfil: {
//             idade: data.perfil?.idade || "",
//             localizacao: data.perfil?.localizacao || "",
//             bio: data.perfil?.bio || "",
//             preferencias: {
//               interessesEspecialidade: data.perfil?.preferencias?.interessesEspecialidade || [],
//             },
//           },
//         });
//       })
//       .catch((error) => {
//         console.error("Erro ao buscar os dados do usuário:", error.message);
//       });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "nome") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     } else if (["bio", "idade", "localizacao"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         perfil: { ...prev.perfil, [name]: value },
//       }));
//     }
//   };

//   const handleAddTag = (tag) => {
//     setFormData((prev) => ({
//       ...prev,
//       perfil: {
//         ...prev.perfil,
//         preferencias: {
//           ...prev.perfil.preferencias,
//           interessesEspecialidade: [
//             ...prev.perfil.preferencias.interessesEspecialidade,
//             tag,
//           ],
//         },
//       },
//     }));
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData((prev) => ({
//       ...prev,
//       perfil: {
//         ...prev.perfil,
//         preferencias: {
//           ...prev.perfil.preferencias,
//           interessesEspecialidade: prev.perfil.preferencias.interessesEspecialidade.filter(
//             (item) => item !== tag
//           ),
//         },
//       },
//     }));
//   };

//   const handleSubmit = () => {
//     const filteredData = {
//       nome: formData.nome,
//       perfil: {
//         bio: formData.perfil.bio,
//         idade: formData.perfil.idade,
//         localizacao: formData.perfil.localizacao,
//         preferencias: {
//           interessesEspecialidade: formData.perfil.preferencias.interessesEspecialidade,
//         },
//       },
//     };

//     fetch(`http://localhost:5000/atualizar?token=${token}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(filteredData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao atualizar os dados do usuário");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Perfil atualizado com sucesso:", data);
//         setUserData(data);
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Erro ao atualizar o perfil:", error.message);
//       });
//   };

//   if (!userData) {
//     return <Text>Carregando...</Text>;
//   }

//   return (
//     <>
//       <Box maxW="80%" mx="auto" p={4}>
//         <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             <Flex direction="column" align="center">
//               <Avatar
//                 src={"https://via.placeholder.com/150"}
//                 alt="Profile Picture"
//                 size={{ base: "2xl", md: "3xl" }}
//                 border="2px solid"
//                 borderColor="primary.400"
//                 mb={4}
//               />
//               <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
//                 {formData.nome}
//               </Text>
//               <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
//               {"Idade:"} {formData.perfil.idade} /{" "}
//                 {formData.perfil.localizacao || "Localização não informada"}
//               </Text>
//               <Button size={{ base: "sm", md: "md" }} colorScheme="purple" onClick={onOpen}>
//                 Editar Perfil
//               </Button>
//             </Flex>
//           </Box>

//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Biografia
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
//               {formData.perfil.bio || "Sem biografia disponível"}
//             </Text>
//             <Divider my={4} borderColor="primary.300" />
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Gostos e Interesses
//             </Text>
//             <Stack direction="row" spacing={4} flexWrap="wrap">
//               {formData.perfil.preferencias.interessesEspecialidade.map((interesse, index) => (
//                 <Tag key={index} size={{ base: "md", md: "lg" }} bg="teal.500" color="white">
//                   {interesse}
//                 </Tag>
//               ))}
//             </Stack>
//           </Box>
//         </Grid>
//       </Box>

//       <ModalEditarPaciente
//         isOpen={isOpen}
//         onClose={onClose}
//         formData={formData}
//         handleInputChange={handleInputChange}
//         handleAddTag={handleAddTag}
//         handleRemoveTag={handleRemoveTag}
//         handleSubmit={handleSubmit}
//       />
//     </>
//   );
// }

// export default ProfilePage;





// import React, { useEffect, useState } from 'react';
// import { Box, Flex, Text, Button, Stack, Tag, Avatar, Divider, Grid } from '@chakra-ui/react';

// function ProfilePage() {
//   const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
//   const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
//   const role = localStorage.getItem('role'); // Obtém o role do localStorage
//   console.log("token no front:",token);
//   console.log("role no front:",role);
//   useEffect(() => {
//     // Faz a requisição para buscar os dados do usuário
//     fetch('http://localhost:5000/usuario', {
//       method: 'POST', // Método POST
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token, role }), // Envia o token e role no corpo da requisição
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Erro ao buscar os dados do usuário');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data); // Armazena os dados no estado
//       })
//       .catch((error) => {
//         console.error('Erro ao buscar os dados do usuário:', error.message);
//       });
//   }, []);

//   // Se os dados ainda não foram carregados, exibe uma mensagem de carregamento
//   if (!userData) {
//     return <Text>Carregando...</Text>;
//   }

//   return (
//     <>
//       {/* Página de perfil com Chakra UI */}
//       <Box maxW="80%" mx="auto" p={4}>
//         {/* Seção do perfil - Flex container para alinhar os boxes */}
//         <Grid
//           templateColumns={{ base: '1fr', lg: '1fr 1fr' }} // 1 coluna em telas menores, 2 colunas em telas maiores
//           gap={6}
//         >
//           {/* Box da Apresentação */}
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             <Flex direction="column" align="center">
//               <Avatar
//                 src={userData.perfil.foto || 'https://via.placeholder.com/150'} // Foto do usuário ou placeholder
//                 alt="Profile Picture"
//                 size={{ base: "2xl", md: "3xl" }}
//                 border="2px solid"
//                 borderColor="primary.400"
//                 mb={4}
//               />
//               <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
//                 {userData.nome} {/* Nome do usuário */}
//               </Text>

//               <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
//               idade: {userData.perfil.idade} / {userData.perfil.localizacao || 'Localização não informada'} {/* Localização do usuário */}
//               </Text>
//               <Button size={{ base: "sm", md: "md" }} variant="solid">
//                 Editar Perfil
//               </Button>
//             </Flex>
//           </Box>

//           {/* Box de Apresentação e Gostos */}
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             {/* Apresentação */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Biografia
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
//               {userData.perfil.bio || 'Sem biografia disponível'} {/* Biografia do usuário */}
//             </Text>
//             <Divider my={4} borderColor="primary.300" />
//             {/* Tags de Gostos/Interesses */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Gostos e Interesses
//             </Text>
//             <Stack direction="row" spacing={4} flexWrap="wrap">
//               {userData.perfil.preferencias.interessesEspecialidade.map((interesse, index) => (
//                 <Tag key={index} size={{ base: "md", md: "lg" }} bg="teal.500" color="white">
//                   {interesse}
//                 </Tag>
//               ))}
//             </Stack>
//           </Box>
//         </Grid>

//         {/* Box de Forma de Pagamento */}
//         <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//           <Text fontSize={{ base: "lg", md: "xl" }} color="success.500" fontWeight="bold" mb={2}>
//             Forma de Pagamento
//           </Text>
//           <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
//           </Text>
//           <Button mt={4} size={{ base: "sm", md: "md" }} colorScheme="green">
//             Verificar Pagamento
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default ProfilePage;






// import React from 'react';
// import { Box, Flex, Text, Button, Stack, Tag, Avatar, Grid } from '@chakra-ui/react';


// function ProfilePage() {
//   return (
//     <>

//       {/* Página de perfil com Chakra UI */}
//       <Box maxW="80%" mx="auto" p={4}>
//         {/* Seção do perfil - Flex container para alinhar os boxes */}
//         <Grid
//           templateColumns={{ base: '1fr', lg: '1fr 1fr' }} // 1 coluna em telas menores, 2 colunas em telas maiores
//           gap={6}
//         >
//           {/* Box da Apresentação */}
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             <Flex direction="column" align="center">
//               <Avatar
//                 src="/path-to-profile-pic.jpg"
//                 alt="Profile Picture"
//                 size={{ base: "2xl", md: "3xl" }}
//                 border="2px solid"
//                 borderColor="primary.400" // Cor personalizada roxa
//                 mb={4}
//               />
//               <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
//                 Nome do Usuário
//               </Text>
//               <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
//                 Idade: 25 | Localização: São Paulo
//               </Text>
//               <Button size={{ base: "sm", md: "md" }} variant="solid">
//                 Editar Perfil
//               </Button>
//             </Flex>
//           </Box>

//           {/* Box de Apresentação e Gostos */}
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             {/* Apresentação */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Apresentação
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
//               Olá! Eu sou um psicólogo dedicado, apaixonado por ajudar as pessoas a encontrarem o equilíbrio emocional. Gosto de meditação, autoajuda e sou entusiasta da saúde mental.
//             </Text>

//             {/* Tags de Gostos/Interesses */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Gostos e Interesses
//             </Text>
//             <Stack direction="row" spacing={4} flexWrap="wrap">
//               <Tag size={{ base: "md", md: "lg" }} variant="solid">
//                 Autoajuda
//               </Tag>
//               <Tag size={{ base: "md", md: "lg" }} bg="success.500" color="white">
//                 Meditação
//               </Tag>
//               <Tag size={{ base: "md", md: "lg" }} bg="secondary.300" color="white">
//                 Bem-estar
//               </Tag>
//             </Stack>
//           </Box>
//         </Grid>

//         {/* Box de Forma de Pagamento (ficando abaixo dos outros boxes em resoluções maiores) */}
//         <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//           <Text fontSize={{ base: "lg", md: "xl" }} color="success.500" fontWeight="bold" mb={2}>
//             Forma de Pagamento
//           </Text>
//           <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
//             Você precisa verificar sua forma de pagamento via e-mail para continuar.
//           </Text>
//           <Button mt={4} size={{ base: "sm", md: "md" }} colorScheme="green">
//             Verificar Pagamento
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default ProfilePage;
