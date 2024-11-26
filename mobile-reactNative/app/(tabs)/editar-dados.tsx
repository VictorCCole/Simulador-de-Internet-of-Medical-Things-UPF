import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function EditDataScreen() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'http://34.55.164.18:8000'; // Substitua pelo endereço correto da sua API

  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Buscar dados da API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dadosColetados/');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dado na API
  const updateData = async (dadoAtualizado) => {
    try {
      const response = await api.put(`/dadosColetados/${dadoAtualizado.Codigo}`, dadoAtualizado);
      Alert.alert('Sucesso', 'Dado atualizado com sucesso!');
      fetchData(); // Recarrega os dados
    } catch (error) {
      console.error('Erro ao atualizar dado:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o dado.');
    }
  };

  // Deletar dado na API
  const deleteData = async (codigo) => {
    try {
      await api.delete(`/dadosColetados/${codigo}`);
      Alert.alert('Sucesso', 'Dado excluído com sucesso!');
      fetchData(); // Recarrega os dados
    } catch (error) {
      console.error('Erro ao deletar dado:', error);
      Alert.alert('Erro', 'Não foi possível excluir o dado.');
    }
  };

  // Renderizar cada item
  const renderItem = ({ item }) => {
    const [editValor1, setEditValor1] = useState(item.Valor1.toString());
    const [editValor2, setEditValor2] = useState(item.Valor2?.toString() || '');
    const [editEmCasa, setEditEmCasa] = useState(item.EmCasa);

    const handleUpdate = () => {
      const dadoAtualizado = {
        ...item,
        Valor1: parseFloat(editValor1),
        Valor2: editValor2 ? parseFloat(editValor2) : null,
        EmCasa: editEmCasa,
      };
      updateData(dadoAtualizado);
    };

    return (
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={item.Codigo.toString()}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={item.DataHora}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={item.Tipo}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={editValor1}
          keyboardType="decimal-pad"
          onChangeText={setEditValor1}
        />
        <TextInput
          style={styles.input}
          value={editValor2}
          keyboardType="decimal-pad"
          onChangeText={setEditValor2}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setEditEmCasa(!editEmCasa)}
        >
          <Text>{editEmCasa ? 'Sim' : 'Não'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteData(item.Codigo)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDITAR DADOS</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Usuário</Text>
        <Text style={styles.headerText}>DataHora</Text>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Valor1</Text>
        <Text style={styles.headerText}>Valor2</Text>
        <Text style={styles.headerText}>Em Casa</Text>
        <Text style={styles.headerText}>Ações</Text>
      </View>
      <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item) => item.Codigo.toString()}
        refreshing={loading}
        onRefresh={fetchData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    fontSize: 12,
    width: 80,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});
