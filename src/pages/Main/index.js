import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, StatusBar, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const rides = [
  { id: '1', driver: 'João', destination: 'Centro da Cidade', time: '09:00', date: '2023-10-28', spots: 2, imageUrl: 'https://via.placeholder.com/80' },
  { id: '2', driver: 'Maria', destination: 'Shopping Metropolitano', time: '13:30', date: '2023-10-29', spots: 3, imageUrl: 'https://via.placeholder.com/80' },
  { id: '3', driver: 'Lucas', destination: 'Estação Jartim Oceânico', time: '18:00', date: '2023-10-30', spots: 1, imageUrl: 'https://via.placeholder.com/80' },
  { id: '4', driver: 'Ana', destination: 'Barra da Tijuca,', time: '07:30', date: '2023-11-01', spots: 2, imageUrl: 'https://via.placeholder.com/80' },
  { id: '5', driver: 'Carlos', destination: 'Terminal Alvorada, Barra da Tijuca', time: '12:00', date: '2023-11-02', spots: 3, imageUrl: 'https://via.placeholder.com/80' },
  { id: '6', driver: 'Beatriz', destination: 'Cristo Redentor', time: '16:00', date: '2023-11-03', spots: 1, imageUrl: 'https://via.placeholder.com/80' },
];

const Main = () => {
  const navigation = useNavigation();

  const handleInterest = (rideId) => {
    Alert.alert("Interesse Registrado", `Você manifestou interesse na carona ${rideId}`);
  };

  const renderRide = ({ item }) => {
    const rideDate = new Date(item.date);
    const fixedDate = new Date('2023-10-28'); // Data fixa para comparação
    const isExpired = rideDate <= fixedDate; // Verifica se a data da carona é anterior à data fixa

    return (
      <View style={styles.rideCard}>
        <View style={styles.cardRow}>
          <View style={styles.imageColumn}>
            <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
            <Text style={styles.driverName}>{item.driver}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.destinationText}>{item.destination}</Text>
            <View style={styles.infoRow}>
              <FontAwesome name="calendar" size={16} color="#888" />
              <Text style={styles.rideText}>{rideDate.toLocaleDateString("pt-BR")}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="clock-o" size={16} color="#888" />
              <Text style={styles.rideText}>{item.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="user" size={16} color="#888" />
              <Text style={styles.rideText}>Vagas: {item.spots}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.smallInterestButton, isExpired && styles.expiredButton]}
              onPress={() => !isExpired && handleInterest(item.id)} // Desativa o botão se expirado
              disabled={isExpired} // Impede interação se expirado
            >
              <Text style={[styles.buttonText, isExpired && styles.expiredButtonText]}>
                {isExpired ? "Expirado" : "Interesse"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#38A69D" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Vem Comigo</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Caronas Disponíveis</Text>
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("CreateRide")}
        >
          <Text style={styles.buttonText}>Oferecer Carona</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#38A69D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop:16,
    textAlign: 'center',
  },
  rideCard: {
    backgroundColor: '#fff',
    width: cardWidth,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
  },
  imageColumn: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  rideText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  smallInterestButton: {
    backgroundColor: '#38A69D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  expiredButton: {
    backgroundColor: '#d3d3d3', // Botão cinza claro para expirado
  },
  button: {
    backgroundColor: '#38A69D',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  expiredButtonText: {
    color: '#a1a1a1', // Cor do texto para botão expirado
  },
});
