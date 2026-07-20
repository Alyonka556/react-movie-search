import { useHttp } from 'hooks/useHttp';
import { Suspense, useRef } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { fetchMoviesId } from 'services/movies-api';
import styled from 'styled-components';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const goBackRef = useRef(location.state?.from ?? '/');

  const { data: movie, error, isLoading } = useHttp(fetchMoviesId, movieId);

  const handleGoBack = () => {
    navigate(goBackRef.current);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2>Unable to load movie details. Please try again.</h2>;
  }

  if (!movie) {
    return <h2>Movie not found.</h2>;
  }

  const {
    title,
    vote_average,
    overview,
    release_date,
    poster_path,
    media_type,
    genres,
  } = movie;
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';

  return (
    <StyledBox>
      <h2>Movie Details #{movieId}</h2>
      <hr />

      <StyledButton onClick={handleGoBack}>Go back</StyledButton>
      <StyledWrapper>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            width="120"
            alt={media_type}
          />
        )}
        <div>
          <StyledTitle>
            {title}({releaseYear})
          </StyledTitle>
          <StyledInfoScore>
            User Score:
            <StyledSpan>{(vote_average * 10).toFixed()}%</StyledSpan>
          </StyledInfoScore>
          <StyledInfo>
            <InfoStyle>Overview</InfoStyle> <StyledSpan> {overview}</StyledSpan>
          </StyledInfo>

          {genres && genres.length > 0 ? (
            <StyledInfo>
              <InfoStyle>Genres</InfoStyle>
              {genres.map(({ name, id }) => (
                <StyledSpanGenres key={id}> {name} </StyledSpanGenres>
              ))}
            </StyledInfo>
          ) : (
            <p>No genres available</p>
          )}
        </div>
      </StyledWrapper>

      <hr />

      <StyledInfo>Additional information</StyledInfo>

      <StyledNavLink to="cast">Cast</StyledNavLink>
      <StyledNavLink to="reviews">Reviews</StyledNavLink>

      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  list-style: none;
  padding: 40px 40px;
`;

export const StyledButton = styled.button`
  font-weight: bold;
  letter-spacing: 0.1em;
  border-radius: 1.1em;
  border: none;
  background-color: rgba(17, 24, 39, 1);
  color: rgba(156, 163, 175, 1);
  padding: 1em 2em;
  transition:
    box-shadow ease-in-out 0.3s,
    background-color ease-in-out 0.1s,
    letter-spacing ease-in-out 0.1s,
    transform ease-in-out 0.1s;
  &:hover {
    box-shadow:
      6px 6px 13px #121212,
      -6px -6px 13px #303030;
    background-color: #6650aa;
    color: white;
  }
`;

const StyledWrapper = styled.div`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 20px;

  overflow: hidden;

  img {
    width: 80%;
    height: 90%;
    margin: 0 auto;
    background-size: cover;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const StyledTitle = styled.h3`
  text-decoration: none;
  font-weight: 700;
  font-size: 32px;
  color: black;
`;

const StyledInfoScore = styled.h3`
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
  color: black;
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const StyledInfo = styled.p`
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
  color: black;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: baseline;
  flex-wrap: wrap;
`;

const InfoStyle = styled.span`
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
  color: black;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: baseline;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
`;

const StyledSpan = styled.span`
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  color: black;
  margin-right: 20px;
`;

const StyledSpanGenres = styled.span`
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  color: black;
  margin-right: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  font-size: 32px;
  color: black;
  margin-right: 20px;

  &.active {
    color: #303f9f;
    text-decoration: underline;
  }

  &:focus {
    color: #303f9f;
    text-decoration: underline;
  }

  &:hover {
    color: #303f9f;
    text-decoration: underline;
  }
`;
export default MovieDetails;
