import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter(); // Instanciar o roteador para navegação

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

          <View style={styles.iconGroup}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/editar-dados')} // Redirecionar para editar-dados
            >
              <Ionicons name="pencil-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconText}>Editar Dados</Text>
          </View>
        </View>

        {/* Título de Dados Coletados */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>DADOS COLETADOS</Text>
        </View>

        {/* Cabeçalho da tabela */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Usuário</Text>
          <Text style={styles.tableHeaderText}>Data e Hora</Text>
          <Text style={styles.tableHeaderText}>Tipo</Text>
          <Text style={styles.tableHeaderText}>Valor1</Text>
          <Text style={styles.tableHeaderText}>Valor2</Text>
          <Text style={styles.tableHeaderText}>Em Casa</Text>
        </View>

        {/* Área Central */}
        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            Nenhum dado coletado ainda.
          </Text>
        </View>
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
});
