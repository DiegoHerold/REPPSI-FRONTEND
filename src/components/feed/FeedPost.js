import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Box,
  Text,
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

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem('authToken');
  const [newComment, setNewComment] = useState('');
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Função para carregar mais itens da API
  const fetchMoreData = () => {
    const url =`${BACKEND_URL}/postagens/psicologos?key=${searchTerm}`
      

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
      });
  };

  // Resetar o feed ao alterar o termo de pesquisa
  useEffect(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
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
      post._id === id ? { ...post, liked: newLikedState, likes: newLikedState ? post.likes + 1 : post.likes - 1 } : post
    );
    setItems(updatedItems);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      mx={10}
      loader={<h4 >     Carregando...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Você chegou ao fim!</b>
        </p>
      }
    >
      <Box maxW="90%" mx="auto" mt={10}>
        <SimpleGrid columns={columns} spacing={8}>
          {items.map((post) => (
            <Box key={post._id} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
              <Text fontWeight="bold" color="primary.400">
                {post.username}
              </Text>
              <Text color="blackAndWhite.600" mb={4}>
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

                <Text color="blackAndWhite.600" mb={4}>
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
