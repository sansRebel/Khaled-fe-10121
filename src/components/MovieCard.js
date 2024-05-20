import { Box, Image, Text, Heading } from '@chakra-ui/react';

const MovieCard = ({ movie }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={movie.Poster} alt={movie.Title} />
      <Box p="6">
        <Heading size="md" mb="2">{movie.Title}</Heading>
        <Text mb="2">{movie.Description}</Text>
        <Text>Rating: {movie.Overall_rating}</Text>
        <Text>Duration: {movie.Duration}</Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
