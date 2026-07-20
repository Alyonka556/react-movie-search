import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../Loader/Loader';
import { useHttp } from '../../hooks/useHttp';
import { fetchMoviesReviews } from '../../services/movies-api';

const ReviewsMovies = () => {
  const { movieId } = useParams();

  const {
    data: reviews,
    error,
    isLoading,
  } = useHttp(fetchMoviesReviews, movieId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StatusMessage role="alert">
        Unable to load reviews. Please try again.
      </StatusMessage>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <StatusMessage>
        We don&apos;t have any reviews for this movie.
      </StatusMessage>
    );
  }

  return (
    <ReviewsList>
      {reviews.map(review => (
        <ReviewItem key={review.id}>
          <Author>Author: {review.author || 'Anonymous'}</Author>
          <ReviewText>{review.content}</ReviewText>
        </ReviewItem>
      ))}
    </ReviewsList>
  );
};

const ReviewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const ReviewItem = styled.li`
  padding: 20px;

  border: 1px solid #dddddd;
  border-radius: 8px;

  background-color: #ffffff;
`;

const Author = styled.p`
  margin: 0 0 12px;

  font-size: 18px;
  font-weight: 700;
  color: black;
`;

const ReviewText = styled.p`
  margin: 0;

  font-size: 16px;
  line-height: 1.6;
  color: black;
`;

const StatusMessage = styled.p`
  margin: 32px 0;
  font-size: 18px;
  text-align: center;
  color: black;
`;

export default ReviewsMovies;
