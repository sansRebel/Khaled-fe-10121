// src/pages/timeslot.js
import { useState } from 'react';
import { Box, Heading, Button, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import path from 'path';
import fs from 'fs';

const timeslots = ['Morning', 'Afternoon', 'Evening', 'Night'];

const Timeslot = ({ initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterByTimeslot = (timeslot) => {
    setSelectedTimeslot(timeslot);
    if (timeslot === '') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter(
          (movie) =>
            movie.Timeslot &&
            typeof movie.Timeslot === 'string' &&
            movie.Timeslot.toLowerCase() === timeslot.toLowerCase()
        )
      );
    }
  };

  return (
    <Box>
      <Heading mb="4">Timeslot Page</Heading>
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
            {timeslots.map((timeslot) => (
              <Button
                key={timeslot}
                onClick={() => filterByTimeslot(timeslot)}
                colorScheme={selectedTimeslot === timeslot ? 'teal' : 'gray'}
                variant={selectedTimeslot === timeslot ? 'solid' : 'outline'}
                mr="2"
                mb="2"
              >
                {timeslot}
              </Button>
            ))}
            <Button
              onClick={() => filterByTimeslot('')}
              colorScheme={selectedTimeslot === '' ? 'teal' : 'gray'}
              variant={selectedTimeslot === '' ? 'solid' : 'outline'}
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

export default Timeslot;
