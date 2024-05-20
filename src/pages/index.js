import { useEffect, useState } from 'react';
import { Box, Heading, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import Head from 'next/head';
import path from 'path';
import fs from 'fs';

const Home = ({ initialMovies }) => {
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialMovies.length === 0) {
      setLoading(true);
      fetch('/api/new_movies')
        .then(res => res.json())
        .then(data => {
          setMovies(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [initialMovies]);

  return (
    <>
      <Head>
        <title>Home - New Movies</title>
        <meta name="description" content="Discover the latest movies available now. Browse, rate, and add new movies to your watchlist." />
        <meta name="keywords" content="movies, new movies, movie reviews, movie ratings, watchlist" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box>
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
            <Heading mb="8" textAlign="center">New Movies</Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="6">
              {movies.map((movie) => (
                <MovieCard key={movie.Movie_ID} movie={movie} />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export async function getServerSideProps() {
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
}

export default Home;
