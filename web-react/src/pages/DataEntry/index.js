import React, { useState, useEffect } from 'react';
import { dadosColetadosService } from '../../services/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const DataEntry = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
      codigo: 1, // ID do usuário logado
      DataHora: new Date().toISOString(),
      Tipo: 1,
      Valor1: '',
      Valor2: '',
      EmCasa: false
    });
  
    useEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
      try {
        const response = await dadosColetadosService.getAll();
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (currentItem.seq) {
          await dadosColetadosService.update(currentItem.seq, currentItem);
        } else {
          await dadosColetadosService.create(currentItem);
        }
        loadData();
        clearForm();
      } catch (error) {
        console.error('Erro ao salvar:', error);
      }
    };
  
    const handleDelete = async (seq) => {
      try {
        await dadosColetadosService.delete(seq);
        loadData();
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    };
  
    const clearForm = () => {
      setCurrentItem({
        codigo: 1,
        DataHora: new Date().toISOString(),
        Tipo: 1,
        Valor1: '',
        Valor2: '',
        EmCasa: false
      });
    };
  
    return (
      <Container>
        <h2>Cadastro de Medidas</h2>
        <Form onSubmit={handleSubmit}>
          {/* ... form fields ... */}
        </Form>
  
        <List>
          {items.map(item => (
            <Item key={item.seq}>
              <span>
                {`Tipo: ${item.Tipo} - Valor1: ${item.Valor1}${item.Valor2 ? ` - Valor2: ${item.Valor2}` : ''}`}
              </span>
              <div>
                <button onClick={() => setCurrentItem(item)}>Editar</button>
                <button onClick={() => handleDelete(item.seq)}>Excluir</button>
              </div>
            </Item>
          ))}
        </List>
      </Container>
    );
  };
  
  export default DataEntry;