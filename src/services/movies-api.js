import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchMoviesTrend = async () => {
  const response = await moviesApi.get('/trending/movie/day');

  return response.data.results ?? [];
};

export const fetchMoviesBySearch = async query => {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery) {
    return [];
  }

  const response = await moviesApi.get('/search/movie', {
    params: {
      query: normalizedQuery,
      include_adult: false,
    },
  });

  return response.data.results ?? [];
};

export const fetchMoviesId = async movieId => {
  if (!movieId) {
    throw new Error('Movie ID is required');
  }

  const response = await moviesApi.get(`/movie/${movieId}`);

  return response.data;
};

export const fetchMoviesCast = async movieId => {
  if (!movieId) {
    return [];
  }

  const response = await moviesApi.get(`/movie/${movieId}/credits`);

  return response.data.cast ?? [];
};

export const fetchMoviesReviews = async movieId => {
  if (!movieId) {
    return [];
  }

  const response = await moviesApi.get(`/movie/${movieId}/reviews`);

  return response.data.results ?? [];
};
