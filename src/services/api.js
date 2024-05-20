// src/services/api.js
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import moviesData from '../../data/movies.json';
import axios from 'axios';

const API_BASE_URL = 'https://821f21ea-3d75-4b17-bac5-f8a0fc587ad2.mock.pstmn.io';
let serverCache = null;

const isClient = typeof window !== 'undefined';

const saveMoviesToLocalStorage = (movies) => {
  if (isClient) {
    localStorage.setItem('movies', JSON.stringify(movies));
  }
};

const getMoviesFromLocalStorage = () => {
  if (isClient) {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : null;
  }
  return null;
};

const getMoviesFromFile = () => {
  return moviesData.data;
};

export const fetchNewMovies = async () => {
  if (isClient && getMoviesFromLocalStorage()) {
    return getMoviesFromLocalStorage();
  }

  if (!isClient && serverCache) {
    return serverCache;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/new_movies`);
    const movies = response.data.data;

    if (isClient) {
      saveMoviesToLocalStorage(movies);
    } else {
      serverCache = movies;
    }

    return movies;
  } catch (error) {
    console.error('Error fetching new movies:', error);
    return getMoviesFromFile();
  }
};

export const addMovie = async (movieData) => {
  try {
    const newMovie = { ...movieData, Movie_ID: uuidv4() };

    if (isClient) {
      const movies = getMoviesFromLocalStorage() || [];
      movies.push(newMovie);
      saveMoviesToLocalStorage(movies);
    } else if (serverCache) {
      serverCache.push(newMovie);
    }

    // Simulate a POST request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newMovie);
      }, 1000);
    });
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};
