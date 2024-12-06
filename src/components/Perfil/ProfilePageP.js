import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Avatar,
  Stack,
  Tag,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Post from "./Post";
import ModalEditarPsicologo from "./ModalEditarPsicologo";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function ProfilePageP() {
  const [formData, setFormData] = useState({
    nome: "",
    perfil: {
      especialidades: [],
      valorConsulta: "",
      metodologia: "",
      datasDisponiveis: [],
      descricao: "",
      localizacao: "",
      foto: "",
    },
    informacoesContato: {
      telefone: "",
      email: "",
      endereco: "",
    },
  });
  const [profilePicture, setProfilePicture] = useState(""); // Estado para a foto de perfil
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  useEffect(() => {
    // Faz a requisição para buscar a foto de perfil e dados do usuário
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
        setProfilePicture(data.perfil?.foto || "https://via.placeholder.com/150"); // Configura a foto ou padrão
        setFormData({
          nome: data.nome || "",
          perfil: {
            especialidades: data.perfil?.especialidades || [],
            valorConsulta: data.perfil?.valorConsulta || "",
            metodologia: data.perfil?.metodologia || "",
            datasDisponiveis: data.perfil?.datasDisponiveis || [],
            descricao: data.perfil?.bio || "",
            localizacao: data.perfil?.localizacao || "",
            foto: data.perfil?.foto || "",
          },
          informacoesContato: {
            telefone: data.informacoesContato?.telefone || "",
            email: data.informacoesContato?.email || "",
            endereco: data.informacoesContato?.endereco || "",
          },
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados:", error.message);
        setProfilePicture("https://via.placeholder.com/150"); // Imagem padrão em caso de erro
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        perfil: {
          ...prev.perfil,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = () => {
    const filteredData = {
      nome: formData.nome,
      perfil: formData.perfil,
      informacoesContato: formData.informacoesContato,
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
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
        onClose();
      })
      .catch((error) => console.error("Erro ao atualizar o perfil:", error.message));
  };

  return (
    <Box maxW="80%" mx="auto" p={4}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        {/* Box de Informações Básicas */}
        <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
          <Flex direction="column" align="center">
            <Avatar
              src={profilePicture} // Foto de perfil
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
              {formData.perfil.localizacao}
            </Text>
            <Flex align="center" mb={4}>
              {[...Array(5)].map((_, index) => (
                <Text key={index} color={index < 4 ? "yellow.400" : "gray.300"}>
                  ★
                </Text>
              ))}
              <Text ml={2} color="primary.400">
                (4.0)
              </Text>
            </Flex>
            <Stack direction="row" spacing={4} mb={4}>
              {formData.perfil.especialidades.map((spec, index) => (
                <Tag key={index} size="md" variant="solid" bg="primary.400" color="white">
                  {spec}
                </Tag>
              ))}
            </Stack>
            <Button size={{ base: "sm", md: "md" }} variant="solid" onClick={onOpen}>
              Editar Perfil
            </Button>
          </Flex>
        </Box>

        <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
          {/* Apresentação */}
          <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
            Apresentação
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
            {formData.perfil.descricao || "Sem descrição disponível."}
          </Text>

          {/* Valor da Consulta */}
          <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
            Valor da Consulta
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
            R$ {formData.perfil.valorConsulta || "N/A"},00 por sessão
          </Text>
        </Box>
      </Grid>

      <Post />

      <ModalEditarPsicologo
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export default ProfilePageP;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Grid,
//   Avatar,
//   Stack,
//   Tag,
//   Button,
//   useDisclosure,
// } from "@chakra-ui/react";
// import Post from "./Post";
// import ModalEditarPsicologo from "./ModalEditarPsicologo";

// function ProfilePageP() {
//   const [formData, setFormData] = useState({
//     nome: "",
//     perfil: {
//       especialidades: [],
//       valorConsulta: "",
//       metodologia: "",
//       datasDisponiveis: [],
//       descricao: "",
//       localizacao: "",
//       foto: "",
//     },
//     informacoesContato: {
//       telefone: "",
//       email: "",
//       endereco: "",
//     },
//   });

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const token = localStorage.getItem("authToken");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     fetch("http://localhost:5000/usuario", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token, role }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao buscar os dados do usuário");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setFormData({
//           nome: data.nome || "",
//           perfil: {
//             especialidades: data.perfil?.especialidades || [],
//             valorConsulta: data.perfil?.valorConsulta || "",
//             metodologia: data.perfil?.metodologia || "",
//             datasDisponiveis: data.perfil?.datasDisponiveis || [],
//             descricao: data.perfil?.descricao || "",
//             localizacao: data.perfil?.localizacao || "",
//             foto: data.perfil?.foto || "",
//           },
//           informacoesContato: {
//             telefone: data.informacoesContato?.telefone || "",
//             email: data.informacoesContato?.email || "",
//             endereco: data.informacoesContato?.endereco || "",
//           },
//         });
//       })
//       .catch((error) => console.error("Erro ao carregar os dados:", error.message));
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name in formData) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         perfil: {
//           ...prev.perfil,
//           [name]: value,
//         },
//       }));
//     }
//   };

//   const handleSubmit = () => {
//     const filteredData = {
//       nome: formData.nome,
//       perfil: formData.perfil,
//       informacoesContato: formData.informacoesContato,
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
//         setFormData((prev) => ({
//           ...prev,
//           ...data,
//         }));
//         onClose();
//       })
//       .catch((error) => console.error("Erro ao atualizar o perfil:", error.message));
//   };

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('title', 'Título da postagem');
//     formData.append('content', 'Conteúdo da postagem');
//     formData.append('username', formData.nome);

//     try {
//       const response = await fetch(`http://localhost:5000/upload/${token}`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Erro no upload');
      
//       const data = await response.json();
//       // Atualizar o estado com a nova postagem incluindo a URL da imagem
//       setFormData(prev => ({
//         ...prev,
//         posts: [...prev.posts, data]
//       }));
//     } catch (error) {
//       console.error('Erro no upload:', error);
//     }
//   };

//   return (
//     <Box maxW="80%" mx="auto" p={4}>
//       <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
//         {/* Box de Informações Básicas */}
//         <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//           <Flex direction="column" align="center">
//             <Avatar
//               src={formData.perfil.foto || "https://picsum.photos/200"}
//               alt="Profile Picture"
//               size={{ base: "2xl", md: "3xl" }}
//               border="2px solid"
//               borderColor="primary.400"
//               mb={4}
//             />
//             <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
//               {formData.nome}
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
//               {formData.perfil.localizacao}
//             </Text>
//             <Flex align="center" mb={4}>
//               {[...Array(5)].map((_, index) => (
//                 <Text key={index} color={index < 4 ? "yellow.400" : "gray.300"}>
//                   ★
//                 </Text>
//               ))}
//               <Text ml={2} color="primary.400">
//                 (4.0)
//               </Text>
//             </Flex>
//             <Stack direction="row" spacing={4} mb={4}>
//               {formData.perfil.especialidades.map((spec, index) => (
//                 <Tag key={index} size="md" variant="solid" bg="primary.400" color="white">
//                   {spec}
//                 </Tag>
//               ))}
//             </Stack>
//             <Button size={{ base: "sm", md: "md" }} variant="solid" onClick={onOpen}>
//               Editar Perfil
//             </Button>
//           </Flex>
//         </Box>

//         <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//           {/* Apresentação */}
//           <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//             Apresentação
//           </Text>
//           <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
//             {formData.perfil.descricao || "Sem descrição disponível."}
//           </Text>

//           {/* Valor da Consulta */}
//           <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//             Valor da Consulta
//           </Text>
//           <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
//             R$ {formData.perfil.valorConsulta || "N/A"},00 por sessão
//           </Text>
//         </Box>
      
//       </Grid>

//       <Post />

//       <ModalEditarPsicologo
//         isOpen={isOpen}
//         onClose={onClose}
//         formData={formData}
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//       />
//     </Box>
//   );
// }

// export default ProfilePageP;




// import React, { useState } from 'react';
// import { Box, Flex, Text, Button, Stack, Textarea, Image, IconButton, SimpleGrid, Input, Icon, Grid } from '@chakra-ui/react';
// import { StarIcon, DeleteIcon, EditIcon, ChatIcon } from '@chakra-ui/icons';
// import { useToast,Avatar, Tag } from '@chakra-ui/react';

// // Ícone de coração usando o Chakra UI diretamente
// const HeartIcon = (props) => (
//   <Icon viewBox="0 0 24 24" fill="currentColor" {...props}>
//     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//   </Icon>
// );

// function ProfilePageP() {
//   const [posts, setPosts] = useState([
//     { id: 1, type: 'text', content: 'Minha primeira postagem sobre saúde mental!', likes: 10, comments: ['Muito bom!', 'Ótimo conteúdo!'], showComments: false },
//     { id: 2, type: 'image', content: 'https://picsum.photos/300', caption: 'Uma imagem relaxante', likes: 25, comments: ['Linda imagem!', 'Inspirador!'], showComments: false },
//     { id: 3, type: 'video', content: 'https://www.w3schools.com/html/mov_bbb.mp4', caption: 'Meu último vídeo sobre meditação', likes: 30, comments: ['Amei o vídeo!', 'Muito útil!'], showComments: false }
//   ]);
  
//   const [newPost, setNewPost] = useState('');
//   const [newImage, setNewImage] = useState(null);
//   const [newVideo, setNewVideo] = useState(null);
//   const toast = useToast();
  
//   const handleAddPost = (type, content, caption = '') => {
//     const newPost = {
//       id: posts.length + 1,
//       type,
//       content,
//       caption,
//       likes: 0,
//       comments: [],
//       showComments: false
//     };
//     setPosts([newPost, ...posts]);
//   };
  
//   const handleDeletePost = (id) => {
//     setPosts(posts.filter(post => post.id !== id));
//     toast({
//       title: 'Postagem apagada.',
//       status: 'success',
//       duration: 2000,
//       isClosable: true,
//     });
//   };
  
//   const handleEditPost = (id, updatedContent) => {
//     const updatedPosts = posts.map(post => post.id === id ? { ...post, content: updatedContent } : post);
//     setPosts(updatedPosts);
//     toast({
//       title: 'Postagem atualizada.',
//       status: 'success',
//       duration: 2000,
//       isClosable: true,
//     });
//   };
  
//   const toggleComments = (id) => {
//     setPosts(posts.map(post => post.id === id ? { ...post, showComments: !post.showComments } : post));
//   };
  
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewImage(reader.result);
//         handleAddPost('image', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewVideo(reader.result);
//         handleAddPost('video', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

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
//                 src="https://picsum.photos/200"
//                 alt="Profile Picture"
//                 size={{ base: "2xl", md: "3xl" }}
//                 border="2px solid"
//                 borderColor="primary.400"
//                 mb={4}
//               />
//               <Text fontSize={{ base: "2xl", md: "3xl" }} color="primary.400" fontWeight="bold">
//                 Dr. Psicólogo
//               </Text>
//               <Text fontSize={{ base: "md", md: "lg" }} color="primary.300" mb={4}>
//                 CRP: 123456 | São Paulo
//               </Text>

//               {/* Avaliação com estrelas */}
//               <Flex align="center" mb={4}>
//                 {[...Array(5)].map((_, index) => (
//                   <StarIcon key={index} color={index < 4 ? 'yellow.400' : 'gray.300'} />
//                 ))}
//                 <Text ml={2} color="primary.400">(4.0)</Text>
//               </Flex>

//               {/* Especializações com tags */}
//               <Stack direction="row" spacing={4} mb={4}>
//                 <Tag size="md" variant="solid" bg="primary.400" color="white">
//                   TCC
//                 </Tag>
//                 <Tag size="md" variant="solid" bg="primary.400" color="white">
//                   Mindfulness
//                 </Tag>
//                 <Tag size="md" variant="solid" bg="primary.400" color="white">
//                   Terapia Familiar
//                 </Tag>
//               </Stack>

//               <Button size={{ base: "sm", md: "md" }} variant="solid">
//                 Editar Perfil
//               </Button>
//             </Flex>
//           </Box>

//           {/* Box de Informações Profissionais */} 
//           <Box bg="primary.100" p={6} borderRadius="lg" boxShadow="lg">
//             {/* Formação Acadêmica */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Formação Acadêmica
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
//               - Graduação: Psicologia, Universidade de São Paulo (USP)
//               <br />
//               - Pós-Graduação: Terapia Cognitivo-Comportamental, PUC-SP
//             </Text>

//             {/* Outras Formações */}
//             <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={2}>
//               Outras Formações
//             </Text>
//             <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
//               - Especialização em Mindfulness
//               <br />
//               - Curso Avançado de Saúde Mental
//             </Text>
//           </Box>
//         </Grid>

//         {/* Seção de Postagens do Psicólogo */}
//         <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//     <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={4}>
//       Postagens
//     </Text>

//     {/* Formulário para criar nova postagem */}
//     <Stack spacing={4}>
//       <Textarea
//         placeholder="O que você gostaria de compartilhar?"
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//       />
//       <Flex gap={4}>
//         <Input type="file" accept="image/*" onChange={handleImageUpload} />
//         <Input type="file" accept="video/*" onChange={handleVideoUpload} />
//       </Flex>
//       <Button
//         onClick={() => handleAddPost('text', newPost)}
//         colorScheme="primary"
//         bg="primary.400"
//         color="white"
//         _hover={{ bg: 'primary.500' }}
//       >
//         Postar
//       </Button>
//     </Stack>

//     {/* Listagem de Postagens com grid responsivo */}
//     <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//       {posts.map(post => (
//         <Box key={post.id} bg="primary.100" p={4} borderRadius="md" boxShadow="md">
//           {post.type === 'text' && <Text color="gray.600">{post.content}</Text>}
//           {post.type === 'image' && (
//             <>
//               <Image src={post.content} alt="Post Image" borderRadius="md" mb={2} />
//               <Text>{post.caption}</Text>
//             </>
//           )}
//           {post.type === 'video' && (
//             <>
//               <video controls width="100%" style={{ borderRadius: '8px', marginBottom: '8px' }}>
//                 <source src={post.content} type="video/mp4" />
//                 Seu navegador não suporta vídeos HTML5.
//               </video>
//               <Text>{post.caption}</Text>
//             </>
//           )}

//           {/* Botões de Curtida, Comentário, Editar e Apagar */}
//           <Flex justify="space-between" align="center" mt={4}>
//             <IconButton
//               aria-label="Amei"
//               icon={<HeartIcon />}
//               colorScheme="red"
//               onClick={() => alert('Você amou esta postagem!')}
//             />
//             <IconButton
//               aria-label="Editar"
//               icon={<EditIcon />}
//               onClick={() => handleEditPost(post.id, prompt('Editar Postagem', post.content))}
//             />
//             <IconButton
//               aria-label="Apagar"
//               icon={<DeleteIcon />}
//               colorScheme="red"
//               onClick={() => handleDeletePost(post.id)}
//             />
//             <Button size="sm" onClick={() => toggleComments(post.id)} leftIcon={<ChatIcon />} variant="outline">
//               Comentários
//             </Button>
//           </Flex>

//           {/* Comentários expansíveis */}
//           {post.showComments && (
//             <Stack mt={2} spacing={1}>
//               {post.comments.map((comment, index) => (
//                 <Text key={index} color="gray.500">- {comment}</Text>
//               ))}
//             </Stack>
//               )}
//                 </Box>
//               ))}
//             </SimpleGrid>
//           </Box>

//       </Box>
//     </>
//   );
// }

// export default ProfilePageP;


