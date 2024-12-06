// LikeButton.js
import React, { useState } from 'react';

const LikeButton = ({ isLiked = false, initialLikes = 0, onLikeChange }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes(newLikedState ? likes + 1 : likes - 1);

    // Chama a função callback passada como prop para informar sobre a mudança de estado
    if (onLikeChange) {
      onLikeChange(newLikedState);
    }
  };

  return (
    <button onClick={handleLike} style={{
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill={liked ? 'red' : 'none'}
        stroke={liked ? 'red' : 'gray'}
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span style={{ marginLeft: '8px', color: liked ? 'red' : 'gray' }}>{likes}</span>
    </button>
  );
};

export default LikeButton;

