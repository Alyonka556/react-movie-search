import { Suspense, useRef } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../components/Loader/Loader';
import { useHttp } from '../hooks/useHttp';
import { fetchMoviesId } from '../services/movies-api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const FALLBACK_POSTER =
  'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const goBackPath = useRef(location.state?.from ?? '/movies');

  const { data: movie, error, isLoading } = useHttp(fetchMoviesId, movieId);

  const handleGoBack = () => {
    navigate(goBackPath.current);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StatusMessage role="alert">
        Unable to load movie details. Please try again.
      </StatusMessage>
    );
  }

  if (!movie) {
    return <StatusMessage>Movie not found.</StatusMessage>;
  }

  const {
    title,
    name,
    vote_average: voteAverage,
    overview,
    release_date: releaseDate,
    first_air_date: firstAirDate,
    poster_path: posterPath,
    genres = [],
  } = movie;

  const movieTitle = title || name || 'Untitled movie';
  const date = releaseDate || firstAirDate;

  const releaseYear = date ? new Date(date).getFullYear() : null;

  const userScore =
    typeof voteAverage === 'number'
      ? `${Math.round(voteAverage * 10)}%`
      : 'Not available';

  const posterUrl = posterPath
    ? `${IMAGE_BASE_URL}${posterPath}`
    : FALLBACK_POSTER;

  return (
    <PageContainer>
      <BackButton type="button" onClick={handleGoBack}>
        ← Go back
      </BackButton>

      <MovieCard>
        <Poster src={posterUrl} alt={`${movieTitle} poster`} />

        <MovieInformation>
          <MovieTitle>
            {movieTitle}
            {releaseYear && <Year> ({releaseYear})</Year>}
          </MovieTitle>

          <InformationSection>
            <SectionTitle>User score</SectionTitle>
            <SectionText>{userScore}</SectionText>
          </InformationSection>

          <InformationSection>
            <SectionTitle>Overview</SectionTitle>
            <SectionText>{overview || 'No overview available.'}</SectionText>
          </InformationSection>

          <InformationSection>
            <SectionTitle>Genres</SectionTitle>

            {genres.length > 0 ? (
              <GenresList>
                {genres.map(genre => (
                  <GenreItem key={genre.id}>{genre.name}</GenreItem>
                ))}
              </GenresList>
            ) : (
              <SectionText>No genres available.</SectionText>
            )}
          </InformationSection>
        </MovieInformation>
      </MovieCard>

      <AdditionalSection>
        <AdditionalTitle>Additional information</AdditionalTitle>

        <Navigation>
          <AdditionalLink to="cast">Cast</AdditionalLink>
          <AdditionalLink to="reviews">Reviews</AdditionalLink>
        </Navigation>

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AdditionalSection>
    </PageContainer>
  );
};

const PageContainer = styled.main`
  width: 100%;
  padding: 40px;

  @media screen and (max-width: 767px) {
    padding: 24px 16px;
  }
`;

const BackButton = styled.button`
  margin-bottom: 24px;
  padding: 12px 20px;

  border: none;
  border-radius: 8px;

  font-family: inherit;
  font-size: 16px;
  font-weight: 600;

  color: white;
  background-color: #303f9f;
  cursor: pointer;

  transition:
    background-color 250ms ease,
    transform 250ms ease;

  &:hover,
  &:focus {
    background-color: #1f2a72;
    transform: translateY(-2px);
  }
`;

const MovieCard = styled.section`
  display: grid;
  grid-template-columns: minmax(250px, 380px) 1fr;
  gap: 40px;
  align-items: start;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Poster = styled.img`
  width: 100%;
  max-width: 380px;
  aspect-ratio: 2 / 3;
  object-fit: cover;

  margin: 0 auto;
  border-radius: 10px;
`;

const MovieInformation = styled.div`
  min-width: 0;
`;

const MovieTitle = styled.h1`
  margin: 0 0 28px;

  font-size: 36px;
  line-height: 1.2;
  color: black;

  @media screen and (max-width: 767px) {
    font-size: 28px;
  }
`;

const Year = styled.span`
  font-weight: 400;
`;

const InformationSection = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 22px;
  color: black;
`;

const SectionText = styled.p`
  margin: 0;

  font-size: 18px;
  line-height: 1.6;
  color: black;
`;

const GenresList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const GenreItem = styled.li`
  padding: 6px 12px;

  border-radius: 20px;

  font-size: 16px;
  color: white;
  background-color: #303f9f;
`;

const AdditionalSection = styled.section`
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #cccccc;
`;

const AdditionalTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 24px;
  color: black;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
`;

const AdditionalLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 600;
  color: black;
  text-decoration: none;

  &.active,
  &:hover,
  &:focus {
    color: #303f9f;
    text-decoration: underline;
  }
`;

const StatusMessage = styled.p`
  margin: 40px 16px;
  font-size: 20px;
  text-align: center;
`;

export default MovieDetails;
