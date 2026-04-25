import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/movies">Movies</StyledNavLink>
        </nav>
      </StyledHeader>
      <Suspense fallback={<h1>Loading...</h1>}>
        <StyledMainContent>
          <Outlet />
        </StyledMainContent>
      </Suspense>

      <StyledFooter>
        <h2>&copy; All right reserved 2026</h2>
      </StyledFooter>
    </StyledWrapper>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
  font-size: 32px;

  .search-box {
    margin-top: 15px;
  }

  nav {
    display: flex;
    gap: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  font-size: 32px;
  color: #fffbfb;

  &.active {
    color: #251526;
    text-decoration: underline;
  }

  &:focus {
    color: #251526;
    text-decoration: underline;
  }
  &:hover {
    color: #251526;
    text-decoration: underline;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledMainContent = styled.div`
  flex-grow: 1;
  display: flex;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
`;

const StyledFooter = styled.footer`
  /* padding: 0 20px; */
  background: rgba(255, 255, 255, 0.08);
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
`;

export default Layout;
