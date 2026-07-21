import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../Loader/Loader';
import { useHttp } from '../../hooks/useHttp';
import { fetchMoviesCast } from '../../services/movies-api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const FALLBACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

const CastMovies = () => {
  const { movieId } = useParams();

  const { data: cast, error, isLoading } = useHttp(fetchMoviesCast, movieId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StatusMessage role="alert">
        Unable to load cast. Please try again.
      </StatusMessage>
    );
  }

  if (!cast || cast.length === 0) {
    return (
      <StatusMessage>
        We don&apos;t have cast information for this movie.
      </StatusMessage>
    );
  }

  return (
    <CastList>
      {cast.map(actor => {
        const actorName = actor.name || 'Unknown actor';

        const profileImage = actor.profile_path
          ? `${IMAGE_BASE_URL}${actor.profile_path}`
          : FALLBACK_IMAGE;

        return (
          <CastItem key={actor.cast_id || actor.id}>
            <ActorImage src={profileImage} alt={actorName} loading="lazy" />

            <ActorName>{actorName}</ActorName>

            <CharacterName>
              Character: {actor.character || 'Not specified'}
            </CharacterName>
          </CastItem>
        );
      })}
    </CastList>
  );
};

const CastList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const CastItem = styled.li`
  overflow: hidden;
  padding-bottom: 16px;

  border: 1px solid #dddddd;
  border-radius: 8px;

  background-color: #ffffff;
`;

const ActorImage = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const ActorName = styled.p`
  margin: 12px 12px 6px;

  font-size: 17px;
  font-weight: 700;

`;

const CharacterName = styled.p`
  margin: 0 12px;

  font-size: 15px;
  line-height: 1.4;
`;

const StatusMessage = styled.p`
  margin: 32px 0;

  font-size: 18px;
  text-align: center;
`;

export default CastMovies;
