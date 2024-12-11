import React from 'react';
import { Box, Heading, Grid, GridItem, Text, VStack, Icon } from '@chakra-ui/react';
import { FaShieldAlt, FaUserFriends, FaLaptop } from 'react-icons/fa';

const BenefitsSection = () => (
  <Box id="benefits" py={16} px={8} bg="purple.50">
    <Heading size="lg" textAlign="center" color="purple.700" mb={8}>
      Benefícios da REPPSI
    </Heading>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={12}>
      {/* Benefício 1 */}
      <GridItem>
        <VStack spacing={4} align="center">
          <Icon as={FaUserFriends} boxSize={12} color="purple.700" />
          <Text fontSize="lg" fontWeight="bold" textAlign="center" color="purple.700">
            Acesso a psicólogos qualificados
          </Text>
          <Text fontSize="md" textAlign="center" color="purple.600">
            Encontre profissionais certificados e prontos para ajudar nas suas necessidades emocionais.
          </Text>
        </VStack>
      </GridItem>

      {/* Benefício 2 */}
      <GridItem>
        <VStack spacing={4} align="center">
          <Icon as={FaLaptop} boxSize={12} color="purple.700" />
          <Text fontSize="lg" fontWeight="bold" textAlign="center" color="purple.700">
            Consultas online e presenciais
          </Text>
          <Text fontSize="md" textAlign="center" color="purple.600">
            Escolha entre consultas presenciais ou virtuais com a mesma qualidade e cuidado.
          </Text>
        </VStack>
      </GridItem>

      {/* Benefício 3 */}
      <GridItem>
        <VStack spacing={4} align="center">
          <Icon as={FaShieldAlt} boxSize={12} color="purple.700" />
          <Text fontSize="lg" fontWeight="bold" textAlign="center" color="purple.700">
            Ambiente seguro e verificado
          </Text>
          <Text fontSize="md" textAlign="center" color="purple.600">
            Tenha confiança em um ambiente projetado para proteger sua privacidade e bem-estar.
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  </Box>
);

export default BenefitsSection;
