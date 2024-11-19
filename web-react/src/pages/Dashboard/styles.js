import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;
`;

export const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

// src/pages/Dashboard/index.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DashboardContainer, 
  Header, 
  CardsGrid, 
  Card, 
  CardTitle, 
  CardValue 
} from './styles';

const Dashboard = () => {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    // TODO: Implement API call
    const mockData = [
      {
        pressureSystolic: 120,
        pressureDiastolic: 80,
        spo2: 98,
        heartRate: 75,
        temperature: 36.5,
        timestamp: '2024-03-19T10:00:00'
      }
    ];
    setHealthData(mockData);
  }, []);

  return (
    <DashboardContainer>
      <Header>
        <h1>IoMT Health Monitor</h1>
        <div>User Name</div>
      </Header>

      <CardsGrid>
        <Card>
          <CardTitle>Pressão Arterial</CardTitle>
          <CardValue>
            {healthData[0]?.pressureSystolic}/{healthData[0]?.pressureDiastolic} mmHg
          </CardValue>
        </Card>

        <Card>
          <CardTitle>SPO2 e Frequência Cardíaca</CardTitle>
          <CardValue>
            {healthData[0]?.spo2}% - {healthData[0]?.heartRate} bpm
          </CardValue>
        </Card>

        <Card>
          <CardTitle>Temperatura Corporal</CardTitle>
          <CardValue>{healthData[0]?.temperature}°C</CardValue>
        </Card>
      </CardsGrid>

      <Card>
        <CardTitle>Histórico</CardTitle>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData}>
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="pressureSystolic" 
                stroke="#8884d8" 
                name="Pressão Sistólica"
              />
              <Line 
                type="monotone" 
                dataKey="spo2" 
                stroke="#82ca9d" 
                name="SPO2"
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ffc658" 
                name="Temperatura"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;