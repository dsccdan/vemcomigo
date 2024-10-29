import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateRide() {
  const navigation = useNavigation();

  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [spots, setSpots] = useState("");

  const handleCreateRide = () => {
    if (!destination || !time || !spots) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert("Sucesso", "Carona cadastrada com sucesso!");
    // Aqui você pode adicionar a lógica para salvar a carona no backend

    // Navega de volta para a tela principal após o cadastro
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cadastrar Carona</Text>

      <Text style={styles.label}>Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o destino"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Horário de Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 14:30"
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Número de Vagas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número de vagas"
        value={spots}
        onChangeText={setSpots}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateRide}>
        <Text style={styles.buttonText}>Cadastrar Carona</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#38A69D",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
