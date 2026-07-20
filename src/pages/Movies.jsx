import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import MovieSearch from '../components/MovieSearch/MovieSearch';
import Loader from '../components/Loader/Loader';
import { fetchMoviesBySearch } from '../services/movies-api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const FALLBACK_POSTER =
  'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';

const Movies = () => {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get('query')?.trim() || '';

  useEffect(() => {
    if (!query) {
      setInputValue('');
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setInputValue(query);

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchMoviesBySearch(query);
        setMovies(results);
      } catch (error) {
        console.error('Failed to load movies:', error);
        setMovies([]);
        setError('Unable to load movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const normalizedQuery = inputValue.trim();

    if (!normalizedQuery) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: normalizedQuery });
  };

  return (
    <StyledContainer>
      <MovieSearch
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        inputValue={inputValue}
      />

      {isLoading && <Loader />}

      {!isLoading && error && (
        <StatusMessage role="alert">{error}</StatusMessage>
      )}

      {!isLoading && !error && query && movies.length === 0 && (
        <StatusMessage>No movies found for &quot;{query}&quot;.</StatusMessage>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList>
          {movies.map(movie => {
            const movieTitle = movie.title || movie.name || 'Untitled movie';

            const posterUrl = movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : FALLBACK_POSTER;

            return (
              <MovieItem key={movie.id}>
                <StyledNavLink
                  to={movie.id.toString()}
                  state={{ from: location }}
                >
                  <MoviePoster
                    src={posterUrl}
                    alt={`${movieTitle} poster`}
                    loading="lazy"
                  />

                  <MovieTitle>{movieTitle}</MovieTitle>
                </StyledNavLink>
              </MovieItem>
            );
          })}
        </MovieList>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.main`
  width: 100%;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;

  margin: 0;
  padding: 40px;
  list-style: none;

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    padding: 24px 16px;
  }
`;

const MovieItem = styled.li`
  overflow: hidden;
  border-radius: 8px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  height: 100%;
  flex-direction: column;

  color: white;
  text-decoration: none;

  transition:
    color 250ms ease,
    transform 250ms ease;

  &:hover,
  &:focus {
    color: #303f9f;
    transform: translateY(-4px);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieTitle = styled.p`
  margin: 12px 0 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin: 40px 16px;
  font-size: 20px;
  text-align: center;
`;

export default Movies;
