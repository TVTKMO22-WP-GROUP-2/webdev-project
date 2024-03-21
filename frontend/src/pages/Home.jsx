import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';
import '../main.jsx'


function Home() {
  // Mock data
  const featuredMovies = [
    { id: 1, title: 'Frozen', image: 'frozen.jpg', description: 'Very cold lady' },
    { id: 2, title: 'Pirates of the caribbean', image: 'potc..jpg', description: 'Spooky pirates' },
    { id: 3, title: 'Shrek', image: 'shrek.jpg', description: 'Ugly ogre go grrrr' },
    { id: 4, title: 'Dune', image: 'dune.jpg', description: 'Guns and stuff' },
  ];

  // Karusellin asetukset
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="homePageContainer" style={{ paddingTop: '50px' }}>
      <h1>Welcome to Our Movie Website</h1>

      {/* Etusivun elokuvat */}
      <div className="featuredMoviesSection">
        <h2>Featured Movies:</h2>
        <Slider {...settings}>
          {featuredMovies.map(movie => (
            <div key={movie.id} className="featuredMovieItem">
              <img src={movie.image} alt={movie.title} style={{ maxWidth: '600px', height: 'auto' }}/>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* -- */}
    </div>
  );
}

export default Home;
