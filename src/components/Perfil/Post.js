import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  Textarea,
  SimpleGrid,
  useToast,
  Image,
  Flex,
  IconButton,
  Spinner,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon, ChatIcon, AttachmentIcon } from '@chakra-ui/icons';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const username = localStorage.getItem('nome');
  const token = localStorage.getItem('authToken');
  const url = `${BACKEND_URL}/files/${token}`;

  // Função para buscar postagens da API
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao carregar postagens.');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao carregar postagens.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar postagens ao montar o componente
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewFile(file);
    toast({
      title: `Arquivo selecionado: ${file.name}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newContent.trim() || !newFile) {
      toast({
        title: 'Preencha todos os campos e selecione um arquivo.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Monta o FormData para envio
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('content', newContent);
    formData.append('file', newFile);
    formData.append('username', username);

    try {
      const response = await fetch(`${BACKEND_URL}/upload/?token=${token}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar postagem.');
      }

      toast({
        title: 'Postagem adicionada com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Recarrega as postagens
      fetchPosts();
    } catch (error) {
      console.error('Erro ao adicionar postagem:', error);
      toast({
        title: 'Erro ao adicionar postagem.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeletePost = async (filename, postId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/file/delete?filename=${filename}&postId=${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao apagar o arquivo.');
      }

      toast({
        title: 'Arquivo apagado com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Recarrega as postagens
      fetchPosts();
    } catch (error) {
      console.error('Erro ao apagar o arquivo:', error);
      toast({
        title: 'Erro ao apagar o arquivo.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toggleComments = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  return (
    <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
      <Text fontSize={{ base: 'lg', md: 'xl' }} color="primary.400" fontWeight="bold" mb={4}>
        Criar Postagem
      </Text>
      <Stack spacing={4}>
        <Input
          placeholder="Título da postagem"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          borderRadius="md"
          bg="white"
          _placeholder={{ color: 'gray.400' }}
        />
        <Textarea
          placeholder="Descrição"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          borderRadius="md"
          bg="white"
          _placeholder={{ color: 'gray.400' }}
        />
        <Flex align="center">
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            id="file-upload"
            style={{ display: 'none' }}
          />
          <IconButton
            as="label"
            htmlFor="file-upload"
            aria-label="Adicionar arquivo"
            icon={<AttachmentIcon />}
            colorScheme="blue"
            variant="outline"
            size="lg"
            _hover={{ bg: 'blue.100', color: 'blue.600' }}
          />
          <Text ml={4} color="gray.500">
            {newFile ? newFile.name : 'Nenhum arquivo selecionado'}
          </Text>
        </Flex>
        <Button
          onClick={handleAddPost}
          colorScheme="green"
          bg="primary.400"
          color="white"
          _hover={{ bg: 'primary.500' }}
        >
          Postar
        </Button>
      </Stack>

      <Text fontSize="lg" color="primary.400" fontWeight="bold" mt={8}>
        Lista de Postagens
      </Text>
      {isLoading ? (
        <Flex justify="center" align="center" mt={8}>
          <Spinner size="xl" color="primary.400" />
        </Flex>
      ) : posts.length === 0 ? (
        <Text textAlign="center" mt={8} color="gray.500">
          Nenhuma postagem encontrada.
        </Text>
      ) : (
        <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {posts.map((post) => (
          <Box key={post._id} bg="white" p={4} borderRadius="lg" boxShadow="md">
            {post.posts && post.posts.title ? (
              <Text color="gray.700" fontWeight="bold" fontSize="lg">
                {post.posts.title}
              </Text>
            ) : (
              <Text color="gray.500" fontStyle="italic">
                Sem título
              </Text>
            )}
            {post.posts && post.posts.imageURL ? (
              <Image
                src={post.posts.imageURL}
                alt="Imagem da Postagem"
                borderRadius="md"
                mb={4}
              />
            ) : (
              <Text color="gray.500" fontStyle="italic">
                Nenhuma imagem disponível
              </Text>
            )}
            <Text color="gray.600" mt={2} mb={4}>
              {post.posts && post.posts.content ? post.posts.content : 'Sem conteúdo'}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              Curtidas: {post.posts && post.posts.likes ? post.posts.likes : 0}
            </Text>
            <Flex justify="space-between" align="center" mt={4}>
              <IconButton
                aria-label="Apagar postagem"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDeletePost(post.posts?.imageURL, post._id)}
              />
              <Button
                size="sm"
                onClick={() => toggleComments(post._id)}
                leftIcon={<ChatIcon />}
                variant="outline"
                colorScheme="blue"
              >
                Mostrar Comentários
              </Button>
            </Flex>
          </Box>
        ))}

        </SimpleGrid>
      )}
    </Box>
  );
};

export default Post;



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Text,
//   Button,
//   Stack,
//   Textarea,
//   SimpleGrid,
//   useToast,
//   Image,
//   Flex,
//   IconButton,
//   Spinner,
//   Input,
//   Divider,
// } from '@chakra-ui/react';
// import { DeleteIcon, ChatIcon, AttachmentIcon } from '@chakra-ui/icons';

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [newTitle, setNewTitle] = useState('');
//   const [newContent, setNewContent] = useState('');
//   const [newFile, setNewFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();
//   const token = localStorage.getItem('authToken');
//   const url = `http://localhost:5000/postagens?token=${token}`;

//   // Função para buscar postagens da API
//   const fetchPosts = () => {
//     setIsLoading(true);
//     fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Erro ao carregar postagens.');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const sanitizedData = data.map((post) => ({
//           ...post,
//           comments: Array.isArray(post.comments) ? post.comments : [],
//         }));
//         setPosts(sanitizedData);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: 'Erro ao carregar postagens.',
//           status: 'error',
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .finally(() => setIsLoading(false));
//   };

//   // Carregar postagens ao montar o componente
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setNewFile(file);
//     toast({
//       title: `Arquivo selecionado: ${file.name}`,
//       status: 'info',
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   const handleAddPost = () => {
//     if (!newTitle.trim() || !newContent.trim()) {
//       toast({
//         title: 'Preencha todos os campos.',
//         status: 'warning',
//         duration: 2000,
//         isClosable: true,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', newTitle);
//     formData.append('content', newContent);
//     if (newFile) formData.append('file', newFile);

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Erro ao adicionar postagem.');
//         }
//         return response.json();
//       })
//       .then((newPost) => {
//         setPosts([newPost, ...posts]);
//         setNewTitle('');
//         setNewContent('');
//         setNewFile(null);
//         toast({
//           title: 'Postagem adicionada com sucesso.',
//           status: 'success',
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: 'Erro ao adicionar postagem.',
//           status: 'error',
//           duration: 2000,
//           isClosable: true,
//         });
//       });
//   };

//   const handleDeletePost = (id) => {
//     fetch(`${url}/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Erro ao apagar postagem.');
//         }
//         setPosts(posts.filter((post) => post._id !== id));
//         toast({
//           title: 'Postagem apagada.',
//           status: 'success',
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: 'Erro ao apagar postagem.',
//           status: 'error',
//           duration: 2000,
//           isClosable: true,
//         });
//       });
//   };

//   const toggleComments = (id) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === id ? { ...post, showComments: !post.showComments } : post
//       )
//     );
//   };

//   return (
//     <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//       <Text fontSize={{ base: 'lg', md: 'xl' }} color="primary.400" fontWeight="bold" mb={4}>
//         Criar Postagem
//       </Text>
//       <Stack spacing={4}>
//         <Input
//           placeholder="Título da postagem"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           borderRadius="md"
//           bg="white"
//           _placeholder={{ color: 'gray.400' }}
//         />
//         <Textarea
//           placeholder="Descrição"
//           value={newContent}
//           onChange={(e) => setNewContent(e.target.value)}
//           borderRadius="md"
//           bg="white"
//           _placeholder={{ color: 'gray.400' }}
//         />
//         <Flex align="center">
//           <Input
//             type="file"
//             accept="image/*,video/*"
//             onChange={handleFileChange}
//             id="file-upload"
//             style={{ display: 'none' }}
//           />
//           <IconButton
//             as="label"
//             htmlFor="file-upload"
//             aria-label="Adicionar arquivo"
//             icon={<AttachmentIcon />}
//             colorScheme="blue"
//             variant="outline"
//             size="lg"
//             _hover={{ bg: 'blue.100', color: 'blue.600' }}
//           />
//           <Text ml={4} color="gray.500">
//             {newFile ? newFile.name : 'Nenhum arquivo selecionado'}
//           </Text>
//         </Flex>
//         <Button
//           onClick={handleAddPost}
//           colorScheme="green"
//           bg="primary.400"
//           color="white"
//           _hover={{ bg: 'primary.500' }}
//         >
//           Postar
//         </Button>
//       </Stack>

//       <Text fontSize="lg" color="primary.400" fontWeight="bold" mt={8}>
//         Lista de Postagens
//       </Text>
//       {isLoading ? (
//         <Flex justify="center" align="center" mt={8}>
//           <Spinner size="xl" color="primary.400" />
//         </Flex>
//       ) : posts.length === 0 ? (
//         <Text textAlign="center" mt={8} color="gray.500">
//           Nenhuma postagem encontrada.
//         </Text>
//       ) : (
//         <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//           {posts.map((post) => (
//             <Box key={post._id} bg="white" p={4} borderRadius="lg" boxShadow="md">
//               <Text color="gray.700" fontWeight="bold" fontSize="lg">
//                 {post.title}
//               </Text>
//               {post.imageURL && (
//                 <Image src={post.imageURL} alt="Imagem da Postagem" borderRadius="md" mb={4} />
//               )}
//               {post.videoURL && (
//                 <video controls width="100%" style={{ borderRadius: '8px', marginBottom: '8px' }}>
//                   <source src={post.videoURL} type="video/mp4" />
//                   Seu navegador não suporta vídeos HTML5.
//                 </video>
//               )}
//               <Text color="gray.600" mt={2} mb={4}>
//                 {post.content}
//               </Text>
//               <Text fontSize="sm" color="gray.500" mb={2}>
//                 Curtidas: {post.likes}
//               </Text>
//               <Stack spacing={2}>
//                 {Array.isArray(post.comments) && post.comments.length > 0 ? (
//                   post.comments.map((comment, index) => (
//                     <Text key={index} color="gray.600" bg="gray.50" p={2} borderRadius="md">
//                       {comment}
//                     </Text>
//                   ))
//                 ) : (
//                   <Text color="gray.500" bg="gray.50" p={2} borderRadius="md">
//                     Nenhum comentário.
//                   </Text>
//                 )}
//               </Stack>
//               <Flex justify="space-between" align="center" mt={4}>
//                 <IconButton
//                   aria-label="Apagar postagem"
//                   icon={<DeleteIcon />}
//                   colorScheme="red"
//                   onClick={() => handleDeletePost(post._id)}
//                 />
//                 <Button
//                   size="sm"
//                   onClick={() => toggleComments(post._id)}
//                   leftIcon={<ChatIcon />}
//                   variant="outline"
//                   colorScheme="blue"
//                 >
//                   Mostrar Comentários
//                 </Button>
//               </Flex>
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default Post;




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Text,
//   Button,
//   Stack,
//   Textarea,
//   SimpleGrid,
//   useToast,
//   Image,
//   Flex,
//   IconButton,
//   Spinner,
//   Input,
// } from "@chakra-ui/react";
// import { DeleteIcon, ChatIcon, AttachmentIcon } from "@chakra-ui/icons";

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [newFile, setNewFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();
//   const token = localStorage.getItem("authToken");
//   const url = `http://localhost:5000/postagens?token=${token}`; // Substitua pela URL da sua API

//   // Função para buscar postagens da API
//   const fetchPosts = () => {
//     setIsLoading(true);
//     fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao carregar postagens.");
//         }
//         console.log("response:",response.json())
//         return response.json();
//       })
//       .then((data) => setPosts(data))
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: "Erro ao carregar postagens.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .finally(() => setIsLoading(false));
//   };

//   // Carregar postagens ao montar o componente
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setNewFile(file);
//     toast({
//       title: `Arquivo selecionado: ${file.name}`,
//       status: "info",
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   const handleAddPost = () => {
//     if (!newTitle.trim() || !newContent.trim()) {
//       toast({
//         title: "Preencha todos os campos.",
//         status: "warning",
//         duration: 2000,
//         isClosable: true,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", newTitle);
//     formData.append("content", newContent);
//     if (newFile) formData.append("file", newFile);

//     fetch(`http://localhost:5000//postagem/criar?token=${token}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao adicionar postagem.");
//         }
//         return response.json();
//       })
//       .then((newPost) => {
//         setPosts([newPost, ...posts]);
//         setNewTitle("");
//         setNewContent("");
//         setNewFile(null);
//         toast({
//           title: "Postagem adicionada com sucesso.",
//           status: "success",
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: "Erro ao adicionar postagem.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//       });
//   };

//   const handleDeletePost = (id) => {
//     fetch(`${url}/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao apagar postagem.");
//         }
//         setPosts(posts.filter((post) => post._id !== id));
//         toast({
//           title: "Postagem apagada.",
//           status: "success",
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: "Erro ao apagar postagem.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//       });
//   };

//   const toggleComments = (id) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === id ? { ...post, showComments: !post.showComments } : post
//       )
//     );
//   };

//   return (
//     <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//       <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={4}>
//         Criar Postagem
//       </Text>
//       <Stack spacing={4}>
//         <Input
//           placeholder="Título da postagem"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           borderRadius="md"
//           bg="white"
//           _placeholder={{ color: "gray.400" }}
//         />
//         <Textarea
//           placeholder="Descrição"
//           value={newContent}
//           onChange={(e) => setNewContent(e.target.value)}
//           borderRadius="md"
//           bg="white"
//           _placeholder={{ color: "gray.400" }}
//         />
//         <Flex align="center">
//           <Input
//             type="file"
//             accept="image/*,video/*"
//             onChange={handleFileChange}
//             id="file-upload"
//             style={{ display: "none" }}
//           />
//           <IconButton
//             as="label"
//             htmlFor="file-upload"
//             aria-label="Adicionar arquivo"
//             icon={<AttachmentIcon />}
//             colorScheme="blue"
//             variant="outline"
//             size="lg"
//             _hover={{ bg: "blue.100", color: "blue.600" }}
//           />
//           <Text ml={4} color="gray.500">
//             {newFile ? newFile.name : "Nenhum arquivo selecionado"}
//           </Text>
//         </Flex>
//         <Button
//           onClick={handleAddPost}
//           colorScheme="green"
//           bg="primary.400"
//           color="white"
//           _hover={{ bg: "primary.500" }}
//         >
//           Postar
//         </Button>
//       </Stack>

//       <Text fontSize="lg" color="primary.400" fontWeight="bold" mt={8}>
//         Lista de Postagens
//       </Text>
//       {isLoading ? (
//         <Flex justify="center" align="center" mt={8}>
//           <Spinner size="xl" color="primary.400" />
//         </Flex>
//       ) : posts ? (
//         <Text textAlign="center" mt={8} color="gray.500">
//           Nenhuma postagem encontrada.
//         </Text>
//       ) : (
//         <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//           {posts.map((post) => (
//             <Box key={post._id} bg="white" p={4} borderRadius="lg" boxShadow="md">
//               <Text color="gray.700" fontWeight="bold" fontSize="lg">
//                 {post.title}
//               </Text>
//               {post.imageURL && (
//                 <Image src={post.imageURL} alt="Imagem da Postagem" borderRadius="md" mb={4} />
//               )}
//               {post.videoURL && (
//                 <video controls width="100%" style={{ borderRadius: "8px", marginBottom: "8px" }}>
//                   <source src={post.videoURL} type="video/mp4" />
//                   Seu navegador não suporta vídeos HTML5.
//                 </video>
//               )}
//               <Text color="gray.600" mt={2} mb={4}>
//                 {post.content}
//               </Text>
//               <Text fontSize="sm" color="gray.500" mb={4}>
//                 Curtidas: {post.likes}
//               </Text>
//               <Text fontSize="sm" color="gray.500" mb={4}>
//                 Comentários:
//               </Text>
//               <Stack spacing={2}>
//                 {post.comments? (
//                   post.comments.map((comment, index) => (
//                     <Text key={index} color="gray.600" bg="gray.50" p={2} borderRadius="md">
//                       {comment}
//                     </Text>
//                   ))
//                 ) : (
//                   <Text color="gray.500" bg="gray.50" p={2} borderRadius="md">
//                     Nenhum comentário.
//                   </Text>
//                 )}
//               </Stack>
//               <Flex justify="space-between" align="center" mt={4}>
//                 <IconButton
//                   aria-label="Apagar"
//                   icon={<DeleteIcon />}
//                   colorScheme="red"
//                   onClick={() => handleDeletePost(post._id)}
//                 />
//                 <Button
//                   size="sm"
//                   onClick={() => toggleComments(post._id)}
//                   leftIcon={<ChatIcon />}
//                   variant="outline"
//                   colorScheme="blue"
//                 >
//                   Mostrar Comentários
//                 </Button>
//               </Flex>
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default Post;




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Text,
//   Button,
//   Stack,
//   Textarea,
//   SimpleGrid,
//   useToast,
//   Image,
//   Flex,
//   IconButton,
//   Spinner,
// } from "@chakra-ui/react";
// import { EditIcon, DeleteIcon, ChatIcon, AttachmentIcon } from "@chakra-ui/icons";
// import HeartIcon from "./icones/Heart"; // Ícone personalizado do coração

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();
//   const token = localStorage.getItem('authToken')
//   const url = `http://localhost:5000/postagens?token=${token}`; // Substitua pela URL da sua API

//   // Função para buscar postagens da API
//   const fetchPosts = () => {
//     setIsLoading(true);
//     fetch(url, {
//       method: "GET", // Método POST
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao carregar postagens.");
//         }
//         return response.json();
//       })
//       .then((data) => setPosts(data))
//       .catch((error) => {
//         console.error(error);
//         toast({
//           title: "Erro ao carregar postagens.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//       })
//       .finally(() => setIsLoading(false));
//   };

//   // Carregar postagens ao montar o componente
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleAddPost = (type, content, caption = "") => {
//     const newPost = {
//       id: posts.length + 1,
//       type,
//       content,
//       caption,
//       likes: 0,
//       comments: [],
//       showComments: false,
//     };
//     setPosts([newPost, ...posts]);
//   };

//   const handleDeletePost = (id) => {
//     setPosts(posts.filter((post) => post.id !== id));
//     toast({
//       title: "Postagem apagada.",
//       status: "success",
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   const handleEditPost = (id, updatedContent) => {
//     const updatedPosts = posts.map((post) =>
//       post.id === id ? { ...post, content: updatedContent } : post
//     );
//     setPosts(updatedPosts);
//     toast({
//       title: "Postagem atualizada.",
//       status: "success",
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   const toggleComments = (id) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === id ? { ...post, showComments: !post.showComments } : post
//       )
//     );
//   };

//   return (
//     <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
//       <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={4}>
//         Postagens
//       </Text>
//       <Stack spacing={4}>
//         <Textarea
//           placeholder="O que você gostaria de compartilhar?"
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//           borderRadius="md"
//           bg="white"
//           _placeholder={{ color: "gray.400" }}
//         />
//         <Button
//           onClick={() => handleAddPost("text", newPost)}
//           colorScheme="green"
//           bg="primary.400"
//           color="white"
//           _hover={{ bg: "primary.500" }}
//         >
//           Postar
//         </Button>
//       </Stack>

//       <Text fontSize="lg" color="primary.400" fontWeight="bold" mt={8}>
//         Lista de Postagens
//       </Text>
//       {isLoading ? (
//         <Flex justify="center" align="center" mt={8}>
//           <Spinner size="xl" color="primary.400" />
//         </Flex>
//       ) : (
//         <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//           {posts.map((post) => (
//             <Box key={post.id} bg="white" p={4} borderRadius="lg" boxShadow="md">
//               {post.type === "text" && <Text color="gray.700">{post.content}</Text>}
//               {post.type === "image" && (
//                 <>
//                   <Image src={post.content} alt="Post Image" borderRadius="md" mb={2} />
//                   <Text color="gray.600">{post.caption}</Text>
//                 </>
//               )}
//               {post.type === "video" && (
//                 <>
//                   <video controls width="100%" style={{ borderRadius: "8px", marginBottom: "8px" }}>
//                     <source src={post.content} type="video/mp4" />
//                     Seu navegador não suporta vídeos HTML5.
//                   </video>
//                   <Text color="gray.600">{post.caption}</Text>
//                 </>
//               )}

//               <Flex justify="space-between" align="center" mt={4}>
//                 <IconButton
//                   aria-label="Amei"
//                   icon={<HeartIcon />}
//                   colorScheme="red"
//                   onClick={() => alert("Você amou esta postagem!")}
//                 />
//                 <IconButton
//                   aria-label="Editar"
//                   icon={<EditIcon />}
//                   onClick={() => handleEditPost(post.id, prompt("Editar Postagem", post.content))}
//                 />
//                 <IconButton
//                   aria-label="Apagar"
//                   icon={<DeleteIcon />}
//                   colorScheme="red"
//                   onClick={() => handleDeletePost(post.id)}
//                 />
//                 <Button
//                   size="sm"
//                   onClick={() => toggleComments(post.id)}
//                   leftIcon={<ChatIcon />}
//                   variant="outline"
//                   colorScheme="blue"
//                 >
//                   Comentários
//                 </Button>
//               </Flex>

//               {post.showComments && (
//                 <Stack mt={4} spacing={2}>
//                   {post.comments.map((comment, index) => (
//                     <Text key={index} color="gray.500" bg="gray.50" p={2} borderRadius="md">
//                       {comment}
//                     </Text>
//                   ))}
//                 </Stack>
//               )}
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default Post;
