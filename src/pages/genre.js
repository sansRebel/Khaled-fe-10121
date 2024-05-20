import { useState, useEffect } from 'react';
import { Box, Heading, Button, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import path from 'path';
import fs from 'fs';

const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

const Genre = ({ initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === '') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.Genre.toLowerCase() === genre.toLowerCase()));
    }
  };

  return (
    <Box>
      <Heading mb="4">Genre Page</Heading>
      {loading ? (
        <Box textAlign="center" mt="8">
          <Spinner size="xl" />
        </Box>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Box>
          <Box mb="4">
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => filterByGenre(genre)}
                colorScheme={selectedGenre === genre ? 'teal' : 'gray'}
                variant={selectedGenre === genre ? 'solid' : 'outline'}
                mr="2"
                mb="2"
              >
                {genre}
              </Button>
            ))}
            <Button
              onClick={() => filterByGenre('')}
              colorScheme={selectedGenre === '' ? 'teal' : 'gray'}
              variant={selectedGenre === '' ? 'solid' : 'outline'}
              mb="2"
            >
              All
            </Button>
          </Box>
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.Movie_ID} movie={movie} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps = async () => {
  const filePath = path.resolve('./data/movies.json');
  
  const getMoviesFromFile = () => {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData).data;
  };
  
  try {
    const initialMovies = getMoviesFromFile();
    return {
      props: {
        initialMovies: initialMovies.length ? initialMovies : [],
      },
    };
  } catch (error) {
    console.error('Error fetching initial movies:', error);
    return {
      props: {
        initialMovies: [],
      },
    };
  }
};

export default Genre;
