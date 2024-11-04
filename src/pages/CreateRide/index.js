import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CreateRide() {
  const navigation = useNavigation();

  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [spots, setSpots] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateRide = () => {
    if (!destination || !time || !spots) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert("Sucesso", "Carona cadastrada com sucesso!");
    // Lógica para salvar a carona no backend pode ser adicionada aqui

    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Para manter o DatePicker visível no iOS
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cadastrar Carona</Text>
      </View>

      <Text style={styles.label}>Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o destino"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Data da Viagem</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toLocaleDateString("pt-BR")}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Horário de Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 14:30"
        value={time}
        onChangeText={setTime}
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#1c1c1c",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
