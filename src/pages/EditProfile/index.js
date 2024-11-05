import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar @expo/vector-icons ou substitua por outro ícone caso não esteja usando Expo

const EditProfile = ({ navigation }) => {
  const [userName, setUserName] = useState("Usuário");
  const [age, setAge] = useState("25");
  const [phone, setPhone] = useState("(11) 12345-6789");
  const [email, setEmail] = useState("usuario@email.com");

  const handleSave = () => {
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      <TextInput style={styles.input} value={userName} onChangeText={setUserName} placeholder="Nome" />
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Idade" keyboardType="numeric" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefone" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" keyboardType="email-address" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
