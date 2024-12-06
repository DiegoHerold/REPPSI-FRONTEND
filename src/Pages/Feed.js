// Feed.js (Elemento Pai)
import React, { useState } from 'react';
import FeedPage from '../components/feed/FeedPost';
import Header from '../components/header/Header';
import PesquisaFeed from '../components/feed/PesquisaFeeds';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a pesquisa vinda do componente PesquisaFeed
  const handleSearch = (query) => {
    setSearchTerm(query); // Atualiza o termo de pesquisa
  };

  return (
    <>
      <Header />
      <PesquisaFeed onSearch={handleSearch} />
      <FeedPage searchTerm={searchTerm} />
    </>
  );
};

export default Feed;










// import React from 'react';

// import FeedPage from '../components/Feed';
// import Header from '../components/Header';
// import Pesquisa from '../components/PesquisaFeed';

//   const Feed = () => {
//     return (
//         <>
//         <Header />
//         <Pesquisa/>
//         <FeedPage/>
//         </>
//       );
//   };
  
//   export default Feed;