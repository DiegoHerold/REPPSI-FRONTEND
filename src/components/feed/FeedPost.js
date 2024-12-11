import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Box,
  Text,
  Spinner,
  Stack,
  Image,
  Textarea,
  Divider,
  Flex,
  SimpleGrid,
  Button,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import LikeButton from '../icones/Heart'; // Importando o componente LikeButton

const Feed = ({ searchTerm }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // Estado para exibir o spinner inicial
  const [newComment, setNewComment] = useState('');
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Função para carregar mais itens da API
  const fetchMoreData = () => {
    const url = `${BACKEND_URL}/postagens/psicologos?key=${searchTerm}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        const sanitizedData = data.map((post) => ({
          ...post,
          comments: post.comments || [],
          liked: post.liked || false,
          showComments: post.showComments || false,
        }));

        setItems((prevItems) => (page === 1 ? sanitizedData : [...prevItems, ...sanitizedData]));
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.error('Erro ao carregar dados', error);
      })
      .finally(() => {
        setLoading(false); // Finaliza o estado de carregamento
      });
  };

  // Resetar o feed ao alterar o termo de pesquisa
  useEffect(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
    setLoading(true); // Inicia o carregamento
    fetchMoreData();
  }, [searchTerm]);

  const toggleComments = (id) => {
    const updatedItems = items.map((post) =>
      post._id === id ? { ...post, showComments: !post.showComments } : post
    );
    setItems(updatedItems);
  };

  const handleAddComment = (id) => {
    const updatedItems = items.map((post) =>
      post._id === id ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setItems(updatedItems);
    setNewComment('');
  };

  const handleLikeChange = (id, newLikedState) => {
    const updatedItems = items.map((post) =>
      post._id === id
        ? { ...post, liked: newLikedState, likes: newLikedState ? post.likes + 1 : post.likes - 1 }
        : post
    );
    setItems(updatedItems);
  };

  if (loading && items.length === 0) {
    // Exibe o spinner inicial enquanto os dados estão sendo carregados
    return (
      <Flex justify="center" align="center" height="100vh" direction="column" gap={4}>
        <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.400" />
        <Text fontSize="lg" color="primary.400">
          Carregando feed...
        </Text>
      </Flex>
    );
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <Flex justify="center" align="center" mt={4}>
          <Spinner size="lg" thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.400" />
        </Flex>
      }
      endMessage={
        <Text textAlign="center" mt={4}>
          <b>Você chegou ao fim!</b>
        </Text>
      }
      style={{ overflow: 'visible' }} // Garante que não cause scroll duplicado
    >
      <Box maxW="90%" mx="auto" mt={10} overflowX="hidden" minHeight="100vh">
        <SimpleGrid columns={columns} spacing={8}>
          {items.map((post) => (
            <Box key={post._id} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
              <Text fontWeight="bold" color="primary.400">
                {post.username}
              </Text>
              <Text color="blackAndWhite.600" mb={4} fontWeight="bold" fontSize="lg">
                {post.posts.title}
              </Text>

              {/* Renderizar Imagem */}
              {post.posts.imageURL && (
                <Image
                  src={post.posts.imageURL}
                  alt="Imagem da Postagem"
                  width="100%"
                  height="auto"
                  borderRadius="md"
                  mt={4}
                />
              )}

              {/* Renderizar Vídeo */}
              {post.posts.videoURL && (
                <Box mt={4}>
                  <video
                    controls
                    width="100%"
                    height="300px"
                    style={{ borderRadius: '8px' }}
                  >
                    <source src={post.posts.videoURL} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </Box>
              )}

              <Text color="blackAndWhite.600" mb={4} mt={4}>
                {post.posts.content}
              </Text>

              <Flex justify="space-between" align="center" mt={4}>
                <Flex align="center">
                  <LikeButton
                    isLiked={post.liked}
                    initialLikes={post.likes}
                    onLikeChange={(newLikedState) => handleLikeChange(post._id, newLikedState)}
                  />
                  <Text ml={2}> Amei</Text>
                </Flex>

                <Flex align="center">
                  <IconButton
                    aria-label="Comentar"
                    icon={<ChatIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => toggleComments(post._id)}
                  />
                  <Text>{post.comments.length} Comentários</Text>
                </Flex>
              </Flex>

              {post.showComments && (
                <>
                  <Stack spacing={4} mt={4}>
                    {post.comments.map((comment, index) => (
                      <Box key={index} bg="secondary.100" p={2} borderRadius="md">
                        <Text>{comment}</Text>
                      </Box>
                    ))}
                  </Stack>
                  <Divider my={4} />
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicionar um comentário..."
                    bg="white"
                    mb={2}
                    _placeholder={{ color: 'gray.500' }}
                  />
                  <Button onClick={() => handleAddComment(post._id)} size="sm" colorScheme="green">
                    Comentar
                  </Button>
                </>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </InfiniteScroll>
  );
};

export default Feed;