import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RidesContext } from '../../context/RidesContext';

const MyRides = () => {
  const { acceptedRides, removeRide } = useContext(RidesContext);

  const renderRide = ({ item }) => (
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
            <Text style={styles.rideText}>{new Date(item.date).toLocaleDateString("pt-BR")}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={16} color="#888" />
            <Text style={styles.rideText}>{item.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="user" size={16} color="#888" />
            <Text style={styles.rideText}>Vagas: {item.spots}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeRide(item.id)} style={styles.removeButton}>
          <MaterialIcons name="delete" size={24} color="red" />
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Caronas</Text>
      {acceptedRides.length > 0 ? (
        <FlatList
          data={acceptedRides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.noRidesText}>Você ainda não tem caronas selecionadas.</Text>
      )}
    </View>
  );
};

export default MyRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 16,
    textAlign: 'center',
  },
  noRidesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  rideCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 4,
  },
});
