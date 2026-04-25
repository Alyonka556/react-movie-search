import React from 'react';
import styled from 'styled-components';

export const MovieSearch = ({ onSubmit, onChange, inputValue }) => {
  return (
    <StyledSearchbar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit">Search</SearchFormBtn>

        <StyledSearchFormInput
          type="text"
          placeholder="Search movie"
          name="inputValue"
          value={inputValue}
          onChange={onChange}
          required
        />
      </SearchForm>
    </StyledSearchbar>
  );
};
export default MovieSearch;

export const StyledSearchbar = styled.div`
  display: flex;
  max-width: 500px;
  margin: 15px auto 0;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);

  border-radius: 10px;
  overflow: hidden;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: transparent;
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchFormBtn = styled.button`
  font-family: monospace;
  background: transparent;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const StyledSearchFormBtnLabel = styled.span`
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  font-size: 22px;
`;

export const StyledSearchFormInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 12px 12px;

  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;
