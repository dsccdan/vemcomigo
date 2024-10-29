import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, StatusBar, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const rides = [
  { id: '1', driver: 'João', destination: 'Centro', time: '09:00', spots: 2, imageUrl: 'https://via.placeholder.com/60' },
  { id: '2', driver: 'Maria', destination: 'Shopping', time: '13:30', spots: 3, imageUrl: 'https://via.placeholder.com/60' },
  { id: '3', driver: 'Lucas', destination: 'Estação', time: '18:00', spots: 1, imageUrl: 'https://via.placeholder.com/60' },
  { id: '4', driver: 'Ana', destination: 'Universidade', time: '07:30', spots: 2, imageUrl: 'https://via.placeholder.com/60' },
  { id: '5', driver: 'Carlos', destination: 'Terminal', time: '12:00', spots: 3, imageUrl: 'https://via.placeholder.com/60' },
  { id: '6', driver: 'Beatriz', destination: 'Parque', time: '16:00', spots: 1, imageUrl: 'https://via.placeholder.com/60' },
];

const Main = ({ navigation }) => {
  const handleInterest = (rideId) => {
    Alert.alert("Interesse Registrado", `Você manifestou interesse na carona ${rideId}`);
  };



  const renderRide = ({ item }) => (
    <View style={styles.rideCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.cardContent}>
        <Text style={styles.rideTitle}>{item.driver}</Text>
        <Text style={styles.destinationText}>{item.destination}</Text>
        <View style={styles.infoRow}>
          <FontAwesome name="clock-o" size={14} color="#888" />
          <Text style={styles.rideText}>{item.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="user" size={14} color="#888" />
          <Text style={styles.rideText}>Vagas: {item.spots}</Text>
        </View>
        <TouchableOpacity 
          style={styles.smallInterestButton} 
          onPress={() => handleInterest(item.id)}
        >
          <Text style={styles.buttonText}>Interesse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigator = useNavigation();

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
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigator.navigate("CreateRide")}
        >
          <Text style={styles.buttonText}>Oferecer Carona</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 32;

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
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#fff',
    width: cardWidth,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  destinationText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  rideText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  smallInterestButton: {
    backgroundColor: '#38A69D',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
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
});
