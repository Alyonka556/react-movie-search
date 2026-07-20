import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrapper role="status" aria-live="polite">
      <Spinner />
      <LoaderText>Loading...</LoaderText>
    </LoaderWrapper>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  min-height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;

  border: 5px solid rgba(255, 255, 255, 0.25);
  border-top-color: #8b5cf6;
  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;
`;

const LoaderText = styled.p`
  margin: 0;
  font-size: 18px;
  color: #ffffff;
`;

export default Loader;
