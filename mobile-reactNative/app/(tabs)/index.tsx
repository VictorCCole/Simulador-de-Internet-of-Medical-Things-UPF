import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Estado para o controle de refresh

  const tipos = [
      { id: 1, label: 'Pressão Arterial' },
      { id: 2, label: 'SPO2 e Frequência Cardíaca' },
      { id: 3, label: 'Temperatura Corporal' },
  ];

  const fetchDados = async () => {
    try {
      const response = await fetch('http://34.55.164.18:8000/dadosColetados');
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data = await response.json();
      setDados(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // Finaliza o refresh quando os dados forem carregados
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  const handleUpdate = () => {
      setLoading(true); // Ativar o carregamento enquanto atualiza
      fetchDados(); // Chama a função para recarregar os dados
    };

  const onRefresh = () => {
      setRefreshing(true);
      fetchDados(); // Recarregar os dados quando o usuário puxar para atualizar
    };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar os dados: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Barra Superior */}
        <View style={styles.header}>
          <View style={styles.iconGroup}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/create-data')}
            >
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconText}>Criar Dados</Text>
          </View>

          <View style={styles.iconGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="grid-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconText}>Dashboard</Text>
          </View>

            {/*
          <View style={styles.iconGroup}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/editar-dados')}
            >
              <Ionicons name="pencil-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconText}>Editar Dados</Text>
          </View>
          */}

        </View>

        {/* Título de Dados Coletados
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>DADOS COLETADOS</Text>
        </View>

        {/* Botão de Atualizar */}
                <View style={styles.updateButtonContainer}>
                  <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Atualizar Dados</Text>
                  </TouchableOpacity>
                </View>

        {/* Cabeçalho da Tabela */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Usuário</Text>
          <Text style={styles.tableHeaderText}>Data e Hora</Text>
          <Text style={styles.tableHeaderText}>Tipo</Text>
          <Text style={styles.tableHeaderText}>Valor1</Text>
          <Text style={styles.tableHeaderText}>Valor2</Text>
          <Text style={styles.tableHeaderText}>Em Casa</Text>
        </View>

        {/* Conteúdo da Tabela */}
        {dados.length > 0 ? (
          dados.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.codigo || 'N/A'}</Text>
              <Text style={styles.tableCell}>{new Date(item.DataHora).toLocaleDateString() || 'N/A'}</Text>
              <Text style={styles.tableCell}>{item.Tipo || 'N/A'}</Text>
              <Text style={styles.tableCell}>{item.Valor1 || 'N/A'}</Text>
              <Text style={styles.tableCell}>{item.Valor2 !== null ? item.Valor2 : 'N/A'}</Text>
              <Text style={styles.tableCell}>{item.EmCasa ? 'Sim' : 'Não'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>Nenhum dado coletado ainda.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    paddingVertical: 10,
  },
  iconGroup: {
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  titleContainer: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },

    tableRow: { // Simula <tr>
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    tableCell: { // Simula <td>
      flex: 1,
      textAlign: 'center',
      fontSize: 14,
      padding: 5,
    },

updateButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  updateButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
