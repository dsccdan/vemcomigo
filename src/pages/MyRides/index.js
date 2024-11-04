import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MyRides = ({ route }) => {
  const { selectedRides } = route.params;

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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Caronas</Text>
      <FlatList
        data={selectedRides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
});
