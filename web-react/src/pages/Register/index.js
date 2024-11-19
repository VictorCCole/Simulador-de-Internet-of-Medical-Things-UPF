import React, { useState } from 'react';
import { usuarioService } from '../../services/api';

function Register() {
  const [formData, setFormData] = useState({
    Nome: '',
    Nascimento: '',
    Sexo: 'M',
    Latitude: 0,
    Longitude: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await usuarioService.create(formData);
      console.log('Usuário criado:', response.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        onChange={e => setFormData({...formData, Nome: e.target.value})}
      />
      <input
        type="date"
        onChange={e => setFormData({...formData, Nascimento: e.target.value})}
      />
      <select onChange={e => setFormData({...formData, Sexo: e.target.value})}>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default Register;