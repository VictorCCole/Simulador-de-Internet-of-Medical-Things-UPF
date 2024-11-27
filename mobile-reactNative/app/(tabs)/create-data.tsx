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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import axios from 'axios';

export default function CreateDataScreen() {
  const [codigoUsuario, setCodigoUsuario] = useState('');
  const [tipo, setTipo] = useState('');
  const [isModalVisibleTipo, setIsModalVisibleTipo] = useState(false);
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [emCasa, setEmCasa] = useState(null); // Estado para "Em Casa"
  const [isModalVisibleEmCasa, setIsModalVisibleEmCasa] = useState(false);

  const API_BASE_URL = 'http://34.55.164.18:8000'; // Nova URL da API

  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Timeout de 5 segundos
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const tipos = [
      { id: 1, label: 'Pressão Arterial' },
      { id: 2, label: 'SPO2 e Frequência Cardíaca' },
      { id: 3, label: 'Temperatura Corporal' },
    ];

  const handleCreate = async () => {
    try {
      // Validar campos obrigatórios
      if (!codigoUsuario || !tipo || !valor1) {
        Alert.alert('Erro', 'Preencha todos os campos obrigatórios (*).');
        return;
      }

  console.log("Victor ", tipos)
  
      // Dados que serão enviados para a API
      const dado = {
        codigo: parseInt(codigoUsuario, 10), // Código do usuário como número inteiro
        DataHora: new Date().toISOString(), // Data no formato ISO
        Tipo: parseInt("1", 10), // Tipo como número inteiro
        Valor1: parseFloat(valor1), // Valor1 como número decimal
        Valor2: valor2 ? parseFloat(valor2) : 0, // Valor2 como número decimal (0 se vazio)
        EmCasa: emCasa, // Booleano: true ou false
      };
  
      console.log('Enviando dado para a API:', JSON.stringify(dado));
  
      // Enviar para a API
      const response = await api.post('/dadosColetados/', dado);
  
      Alert.alert('Sucesso', 'Dado criado com sucesso!');
      console.log('Resposta da API:', response.data);
  
      // Limpar os campos após sucesso
      setCodigoUsuario('');
      setTipo('');
      setValor1('');
      setValor2('');
      setEmCasa(false);
    } catch (error) {
      console.error('Erro ao criar dado:', error);

  
      if (error.response) {
        console.error('Erro de Resposta:', error.response.data);
        Alert.alert(
          'Erro',
          `Erro da API: ${error.response.status} - ${JSON.stringify(
            error.response.data.detail
          )}`
        );
      } else if (error.request) {
        console.error('Erro de Requisição:', error.request);
        Alert.alert('Erro', 'Não foi possível conectar à API. Verifique sua rede.');
      } else {
        console.error('Erro Genérico:', error.message);
        Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
      }
    }
  };
  
  
  


  

  const handleSelectTipo = (selectedTipo) => {
    setTipo(selectedTipo);
    setIsModalVisibleTipo(false);
  };

  const handleSelectEmCasa = (selectedOption) => {
    setEmCasa(selectedOption === 'Sim');
    setIsModalVisibleEmCasa(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>CRIAR DADOS</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Código do Usuário *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o código do usuário"
            value={codigoUsuario}
            keyboardType="numeric"
            onChangeText={(text) => setCodigoUsuario(text.replace(/[^0-9]/g, ''))}
          />

          <Text style={styles.label}>Tipo *</Text>
          <TouchableOpacity
            style={[styles.input, styles.selectInput]}
            onPress={() => setIsModalVisibleTipo(true)}
          >
            <Text style={styles.selectText}>{tipo || 'Selecione o tipo'}</Text>
          </TouchableOpacity>

          <Modal visible={isModalVisibleTipo} transparent={true} animationType="slide">
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

          <Text style={styles.label}>Valor1 *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o Valor 1"
            value={valor1}
            keyboardType="decimal-pad"
            onChangeText={setValor1}
          />

          <Text style={styles.label}>Valor2 (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o Valor 2"
            value={valor2}
            keyboardType="decimal-pad"
            onChangeText={setValor2}
          />

          <Text style={styles.label}>Em Casa *</Text>
          <TouchableOpacity
            style={[styles.input, styles.selectInput]}
            onPress={() => setIsModalVisibleEmCasa(true)}
          >
            <Text style={styles.selectText}>
              {emCasa === null ? 'Selecione uma opção' : emCasa ? 'Sim' : 'Não'}
            </Text>
          </TouchableOpacity>

          <Modal visible={isModalVisibleEmCasa} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Está em Casa?</Text>
                <FlatList
                  data={[
                    { id: '1', label: 'Sim' },
                    { id: '2', label: 'Não' },
                  ]}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelectEmCasa(item.label)}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setIsModalVisibleEmCasa(false)}
                >
                  <Text style={styles.modalCloseText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4682B4',
    marginVertical: 20,
    textAlign: 'center',
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
