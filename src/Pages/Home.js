import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SearchForm from '../components/home/SearchForm';
import PsychologistList from '../components/home/PsychologistCard'; // Substituído por PsychologistList
import PsychologistDetails from '../components/home/PsychologistDetails'; // Novo componente de detalhes
import Header from '../components/header/Header';

const Home = () => {
  const [filters, setFilters] = useState(null); // Filtros de busca
  const [selectedPsychologist, setSelectedPsychologist] = useState(null); // Psicólogo selecionado
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // Estado para controlar o modal

  const handleSearch = (newFilters) => {
    setFilters(newFilters); // Atualiza os filtros
  };

  const handlePsychologistClick = (psychologist) => {
    setSelectedPsychologist(psychologist); // Define o psicólogo selecionado
    setIsDetailsOpen(true); // Abre o modal
  };

  const handleCloseDetails = () => {
    setSelectedPsychologist(null); // Limpa o psicólogo selecionado
    setIsDetailsOpen(false); // Fecha o modal
  };

  return (
    <Box>
      <Header />
      <Box mx="10" my="5">
        <SearchForm onSearch={handleSearch} />
        <PsychologistList filters={filters} onCardClick={handlePsychologistClick} />
      </Box>

      {/* Modal de Detalhes */}
      {selectedPsychologist && (
        <PsychologistDetails
          open={isDetailsOpen}
          onClose={handleCloseDetails}
          psychologist={selectedPsychologist}
        />
      )}
    </Box>
  );
};

export default Home;
