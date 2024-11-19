// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DataEntry from './pages/DataEntry';

const Nav = styled.nav`
  background: #1a365d;
  padding: 1rem;
  color: white;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function App() {
  return (
    <>
      <Nav>
        <NavMenu>
          <Link to="/">Dashboard</Link>
          <Link to="/data-entry">Entrada de Dados</Link>
          <Link to="/register">Cadastro</Link>
        </NavMenu>
      </Nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;