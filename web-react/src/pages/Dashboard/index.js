// src/pages/Dashboard/index.js
import React from 'react';
import { DashboardContainer, Card, Title } from './styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Title>Dashboard IoMT</Title>
      <Card>
        // Conteúdo do card
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;