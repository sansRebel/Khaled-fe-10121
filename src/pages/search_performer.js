// src/pages/search_performer.js
import { useState } from 'react';
import { Box, Heading, Input, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import path from 'path';
import fs from 'fs';

const SearchPerformer = ({ initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter(
          (movie) =>
            movie.Performers.some((performer) => performer.toLowerCase().includes(term)) ||
            movie.Title.toLowerCase().includes(term)
        )
      );
    }
  };

  return (
    <Box>
      <Heading mb="4">Search Performer Page</Heading>
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
          <Input
            placeholder="Search by performer or movie title"
            value={searchTerm}
            onChange={handleSearch}
            mb="4"
          />
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

export default SearchPerformer;
