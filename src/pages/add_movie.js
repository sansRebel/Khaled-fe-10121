// src/pages/add_movie.js
import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, FormLabel, Alert, AlertIcon } from '@chakra-ui/react';
import { addMovie } from '../services/api';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    release: '',
    length: '',
    description: '',
    mpaa_rating: '',
    genre: '',
    director: '',
    performer: '',
    language: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiChange = (e, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = await addMovie(formData);
      console.log('Added movie:', newMovie);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Optionally, you can navigate to another page here
        // router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="md" mx="auto">
      <FormLabel>Title</FormLabel>
      <Input name="title" value={formData.title} onChange={handleChange} />

      <FormLabel>Release Date</FormLabel>
      <Input name="release" type="date" value={formData.release} onChange={handleChange} />

      <FormLabel>Length (in minutes)</FormLabel>
      <Input name="length" value={formData.length} onChange={handleChange} />

      <FormLabel>Description</FormLabel>
      <Textarea name="description" value={formData.description} onChange={handleChange} />

      <FormLabel>MPAA Rating</FormLabel>
      <Input name="mpaa_rating" value={formData.mpaa_rating} onChange={handleChange} />

      <FormLabel>Genres (comma separated)</FormLabel>
      <Input name="genre" value={formData.genre} onChange={(e) => handleMultiChange(e, 'genre')} />

      <FormLabel>Director</FormLabel>
      <Input name="director" value={formData.director} onChange={handleChange} />

      <FormLabel>Performers (comma separated)</FormLabel>
      <Input name="performer" value={formData.performer} onChange={(e) => handleMultiChange(e, 'performer')} />

      <FormLabel>Language</FormLabel>
      <Input name="language" value={formData.language} onChange={handleChange} />

      <Button type="submit" mt={4} colorScheme="teal">
        Add Movie
      </Button>

      {success && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Movie added successfully!
        </Alert>
      )}
    </Box>
  );
};

export default AddMovie;
