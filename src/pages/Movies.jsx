import MovieSearch from '../components/MovieSearch/MovieSearch';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesBySearch } from 'services/movies-api';
import Loader from 'components/Loader/Loader';
import styled from 'styled-components';
const imgLink = 'https://image.tmdb.org/t/p/w500';

const Movie = () => {
  const [inputValue, setInputValue] = useState('');
  const [moviesData, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateQueryString = e => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!query) {
      setInputValue('');
      setMovies([]);
      setError(null);
      return;
    }

    setInputValue(query);

    const getSearchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchMoviesBySearch(query);
        setMovies(results);
      } catch (error) {
        setError('Unable to load movies. Please try again.');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    getSearchMovies();
    // if (query) {
    //   setInputValue(query);
    //   async function getSearchMovies() {
    //     try {
    //       const moviesDataNew = await fetchMoviesBySearch(query);
    //       setMovies(moviesDataNew);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   getSearchMovies();
    // } else {
    //   setInputValue('');
    //   setMovies([]);
    // }
  }, [query]);

  // const onSubmit = event => {
  //   event.preventDefault();
  //   setSearchParams({ query: inputValue });
  // };
  const onSubmit = event => {
    event.preventDefault();
    if (!inputValue) {
      setSearchParams({});
    } else {
      setSearchParams({ query: inputValue });
    }
  };

  return (
    <>
      <StyledContainer>
        <MovieSearch
          onSubmit={onSubmit}
          onChange={updateQueryString}
          inputValue={inputValue}
        />
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {!isLoading && !error && query && moviesData.length === 0 && (
          <p>No movies found for "{query}".</p>
        )}
        {!isLoading && !error && moviesData.length > 0 && (
          <StyledBox>
            <StyledList>
              {moviesData.map(movie => (
                <li key={movie.id}>
                  <StyledNavLink
                    state={{ from: location }}
                    to={movie.id.toString()}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${imgLink}${movie.poster_path}`
                          : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png'
                      }
                      alt={`${movie.title} poster`}
                      loading="lazy"
                    />

                    <p>{movie.title}</p>
                  </StyledNavLink>
                </li>
              ))}
            </StyledList>
          </StyledBox>
        )}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledBox = styled.div`
  list-style: none;
  padding: 40px 40px;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  li {
    overflow: hidden;
    display: flex;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      transition: all 0.5s ease-in-out;
      &:hover {
        transform: scale(1.03);
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  width: 100%;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  color: white;
  margin: 0 auto;
  &:active {
    color: #303f9f;
    text-decoration: underline;
  }
  &:hover {
    color: #303f9f;
    text-decoration: underline;
  }
`;

export default Movie;
