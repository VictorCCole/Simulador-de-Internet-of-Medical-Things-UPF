import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

export default function CadastrarUsuarioScreen() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [isSexoModalVisible, setIsSexoModalVisible] = useState(false);
  const [latitude, setLatitude] = useState('0.000000');
  const [longitude, setLongitude] = useState('0.000000');

  // Função para obter a localização do dispositivo
  const pegarLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Não foi possível acessar a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (location?.coords) {
        setLatitude(location.coords.latitude.toFixed(6));
        setLongitude(location.coords.longitude.toFixed(6));
      } else {
        throw new Error('Localização inválida');
      }
    } catch (error) {
      console.error('Erro ao pegar localização:', error.message);
      Alert.alert('Erro', 'Não foi possível acessar a localização.');
    }
  };

  const gerarCoordenadasAleatorias = () => {
    setLatitude((Math.random() * 180 - 90).toFixed(6));
    setLongitude((Math.random() * 360 - 180).toFixed(6));
  };

  const handleCadastrar = () => {
    if (!codigo || !nome || !dataNascimento || !sexo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const usuario = {
      codigo,
      nome,
      dataNascimento,
      sexo,
      latitude,
      longitude,
    };

    console.log('Usuário cadastrado:', usuario);
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
  };

  const handleSelectSexo = (selectedSexo) => {
    setSexo(selectedSexo);
    setIsSexoModalVisible(false);
  };

  const opcoesSexo = [
    { id: '1', label: 'Feminino' },
    { id: '2', label: 'Masculino' },
    { id: '3', label: 'Outro' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>CADASTRAR USUÁRIOS</Text>

        <View style={styles.form}>
          {/* Campo Código */}
          <Text style={styles.label}>Código</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o código"
            keyboardType="numeric"
            value={codigo}
            onChangeText={(text) => setCodigo(text.replace(/[^0-9]/g, ''))}
          />

          {/* Campo Nome */}
          <Text style={styles.label}>Digite seu Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={(text) => setNome(text.replace(/[^a-zA-Z\s]/g, ''))}
          />

          {/* Campo Data de Nascimento */}
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/aaaa"
            value={dataNascimento}
            keyboardType="numeric"
            onChangeText={(text) =>
              setDataNascimento(
                text
                  .replace(/[^0-9/]/g, '')
                  .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
              )
            }
          />

          {/* Campo Sexo */}
          <Text style={styles.label}>Escolha seu Sexo</Text>
          <TouchableOpacity
            style={[styles.input, styles.selectInput]}
            onPress={() => setIsSexoModalVisible(true)}
          >
            <Text style={styles.selectText}>{sexo || 'Selecione o sexo'}</Text>
          </TouchableOpacity>

          {/* Modal para selecionar Sexo */}
          <Modal
            visible={isSexoModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Escolha seu Sexo</Text>
                <FlatList
                  data={opcoesSexo}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelectSexo(item.label)}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setIsSexoModalVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Campo Latitude */}
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={latitude}
            onChangeText={setLatitude}
          />

          {/* Campo Longitude */}
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={longitude}
            onChangeText={setLongitude}
          />

          {/* Botão para obter localização */}
          <TouchableOpacity style={styles.button} onPress={pegarLocalizacao}>
            <Text style={styles.buttonText}>Obter Localização Atual</Text>
          </TouchableOpacity>

          {/* Botão para gerar coordenadas aleatórias */}
          <TouchableOpacity
            style={styles.button}
            onPress={gerarCoordenadasAleatorias}
          >
            <Text style={styles.buttonText}>Gerar Coordenadas Aleatórias</Text>
          </TouchableOpacity>

          {/* Botão para cadastrar */}
          <TouchableOpacity
            style={[styles.button, styles.cadastrarButton]}
            onPress={handleCadastrar}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4682B4',
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  selectInput: {
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cadastrarButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
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
