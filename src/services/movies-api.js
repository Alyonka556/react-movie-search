import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMoviesTrend = async () => {
  const { data } = await axios.get('trending/movie/day', {
    params: {
      api_key: API_KEY,
    },
  });
  // console.log(data);
  return data.results;
};

export const fetchMoviesId = async id => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  // console.log(data);
  return data;
};

export const fetchMoviesReviews = async id => {
  const { data } = await axios.get(`/movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  // console.log(data);
  return data.results;
};

export const fetchMoviesCast = async id => {
  const { data } = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  // console.log(data);
  return data.cast;
};

export const fetchMoviesBySearch = async inputValue => {
  const { data } = await axios.get(`search/movie`, {
    params: {
      api_key: API_KEY,
      query: inputValue,
    },
  });
  // console.log(data);
  return data.results;
};
