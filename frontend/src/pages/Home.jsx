import React from 'react';
import '../index.css';
import Header from '../components/Header.jsx';
import MovieSwiper from '../components/MovieSwiper.jsx'

function Home() {
  const slides = [
    {
      _id: 1,
      previewImg: '../../public/shrek.jpg',
    },
    {
      _id: 2,
      previewImg: '../../public/frozen.jpg',
    },
    {
      _id: 3,
      previewImg: '../../public/dune.jpg',
    },
    {
      _id: 5,
      previewImg: '../../public/65.jpg',
    },
    {
      _id: 6,
      previewImg: '../../public/ape.jpg',
    },
    {
      _id: 7,
      previewImg: '../../public/the-black-demon.jpg',
    },
    {
      _id: 8,
      previewImg: '../../public/the-covenant.jpg',
    },
    {
      _id: 9,
      previewImg: '../../public/transformer.jpg',
    },
    {
      _id: 10,
      previewImg: '../../public/assassin.jpg',
    },
    {
      _id: 11,
      previewImg: '../../public/the-little-mermaid.jpeg',
    },
  
  ];

  const handleSlideChange = (slideId) => {
    console.log('Slide changed:', slideId);
  };

  return (
    <div className="homePageContainer">
      <Header />
      <div className="homepageText">
        <p>Welcome to our Movie Website!</p>
      </div>
      <MovieSwiper slides={slides} slideChange={handleSlideChange} />
    </div>
  );
}

export default Home;
