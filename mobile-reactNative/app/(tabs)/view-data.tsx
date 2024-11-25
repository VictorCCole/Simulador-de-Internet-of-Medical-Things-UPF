import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';

export default function ViewDataScreen() {
  const params = useSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Criados</Text>

      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Código do Usuário: {params.codigoUsuario}</Text>
        <Text style={styles.dataText}>Tipo: {params.tipo}</Text>
        <Text style={styles.dataText}>Valor 1: {params.valor1}</Text>
        <Text style={styles.dataText}>Valor 2: {params.valor2}</Text>
        <Text style={styles.dataText}>Em Casa: {params.emCasa}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4682B4',
  },
  dataContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  dataText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
