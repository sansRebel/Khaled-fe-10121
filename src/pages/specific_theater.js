// src/pages/specific_theater.js
import { useState } from 'react';
import { Box, Heading, Button, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import path from 'path';
import fs from 'fs';

const theaters = ['ABC Movies', 'XYZ Cinemas', '123 Theater']; // Replace with actual theater names

const SpecificTheater = ({ initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterByTheater = (theater) => {
    setSelectedTheater(theater);
    if (theater === '') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter(
          (movie) =>
            movie.Theater_name &&
            typeof movie.Theater_name === 'string' &&
            movie.Theater_name.toLowerCase() === theater.toLowerCase()
        )
      );
    }
  };

  return (
    <Box>
      <Heading mb="4">Specific Theater Page</Heading>
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
            {theaters.map((theater) => (
              <Button
                key={theater}
                onClick={() => filterByTheater(theater)}
                colorScheme={selectedTheater === theater ? 'teal' : 'gray'}
                variant={selectedTheater === theater ? 'solid' : 'outline'}
                mr="2"
                mb="2"
              >
                {theater}
              </Button>
            ))}
            <Button
              onClick={() => filterByTheater('')}
              colorScheme={selectedTheater === '' ? 'teal' : 'gray'}
              variant={selectedTheater === '' ? 'solid' : 'outline'}
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

export default SpecificTheater;
