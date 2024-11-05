import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserRegister = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 
  const validateBirthDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
  };

  const handleRegister = () => {
    if (!name || !email || !phone || !birthDate || !password || !confirmPassword) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }


    if (!validateBirthDate(birthDate)) {
      Alert.alert("Erro", "Digite a data de nascimento no formato DD/MM/AAAA.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem. Por favor, verifique.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Exibe o alerta de sucesso e, depois disso, navega para a tela de login
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
      { text: "OK", onPress: () => navigation.navigate("SignIn") }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone (XX) XXXXX-XXXX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserRegister;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#1c1c1c',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
