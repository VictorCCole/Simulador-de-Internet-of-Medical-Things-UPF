// src/pages/Dashboard/index.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Dashboard = () => {
  return (
    <Container>
      <Title>Dashboard IoMT</Title>
    </Container>
  );
};

export default Dashboard;