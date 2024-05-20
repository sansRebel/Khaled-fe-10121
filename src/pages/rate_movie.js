// src/pages/rate_movie.js
import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, FormLabel } from '@chakra-ui/react';
import { fetchNewMovies } from '../services/api';

const RateMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchNewMovies();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add rating and review handling logic here
    console.log('Movie:', selectedMovie);
    console.log('Rating:', rating);
    console.log('Review:', review);
    window.location.href = '/'; // Redirect to home
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="md" mx="auto">
      <FormLabel>Movie</FormLabel>
      <Input
        list="movies"
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
      />
      <datalist id="movies">
        {movies.map((movie) => (
          <option key={movie.Movie_ID} value={movie.Title} />
        ))}
      </datalist>

      <FormLabel>Rating</FormLabel>
      <Input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <FormLabel>Review</FormLabel>
      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button type="submit" mt={4} colorScheme="teal">
        Submit
      </Button>
    </Box>
  );
};

export default RateMovie;
