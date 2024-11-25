import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function CreateDataScreen() {
  const [codigoUsuario, setCodigoUsuario] = useState('');
  const [tipo, setTipo] = useState('');
  const [isModalVisibleTipo, setIsModalVisibleTipo] = useState(false);
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');

  const API_BASE_URL = 'http://localhost:8000'; // Substitua pelo endereço da sua API

  const handleCreate = async () => {
    try {
      // Dados que serão enviados para a API
      const dado = {
        codigo: parseInt(codigoUsuario, 10),
        tipo: tipo,
        valor1: parseFloat(valor1),
        valor2: parseFloat(valor2),
      };

      // Enviar para a API
      const response = await axios.post(`${API_BASE_URL}/dadosColetados/`, dado);

      Alert.alert('Sucesso', 'Dado criado com sucesso!');
      console.log('Resposta da API:', response.data);

      // Limpar os campos após o envio
      setCodigoUsuario('');
      setTipo('');
      setValor1('');
      setValor2('');
    } catch (error) {
      console.error('Erro ao criar dado:', error);
      Alert.alert('Erro', 'Não foi possível criar o dado.');
    }
  };

  const tipos = [
    { id: '1', label: 'Pressão Arterial' },
    { id: '2', label: 'SPO2 e Frequência Cardíaca' },
    { id: '3', label: 'Temperatura Corporal' },
  ];

  const handleSelectTipo = (selectedTipo) => {
    setTipo(selectedTipo);
    setIsModalVisibleTipo(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRIAR DADOS</Text>

      <View style={styles.form}>
        {/* Campo Código do Usuário */}
        <Text style={styles.label}>Código do Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o código do usuário"
          value={codigoUsuario}
          keyboardType="numeric"
          onChangeText={(text) => setCodigoUsuario(text.replace(/[^0-9]/g, ''))}
        />

        {/* Campo Tipo */}
        <Text style={styles.label}>Tipo</Text>
        <TouchableOpacity
          style={[styles.input, styles.selectInput]}
          onPress={() => setIsModalVisibleTipo(true)} // Abre a modal
        >
          <Text style={styles.selectText}>
            {tipo || 'Selecione o tipo'}
          </Text>
        </TouchableOpacity>

        {/* Modal para seleção de tipo */}
        <Modal
          visible={isModalVisibleTipo}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione o Tipo</Text>
              <FlatList
                data={tipos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelectTipo(item.label)}
                  >
                    <Text style={styles.modalItemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsModalVisibleTipo(false)}
              >
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Campo Valor1 */}
        <Text style={styles.label}>Valor1</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Valor 1"
          value={valor1}
          keyboardType="decimal-pad"
          onChangeText={setValor1}
        />

        {/* Campo Valor2 */}
        <Text style={styles.label}>Valor2</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Valor 2"
          value={valor2}
          keyboardType="decimal-pad"
          onChangeText={setValor2}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
    marginVertical: 20,
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#4682B4',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  selectInput: {
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
