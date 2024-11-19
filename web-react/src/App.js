import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Register from './pages/Register';

function App() {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/criar-dados" element={<DataEntry />} />
        <Route path="/editar-dados" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;