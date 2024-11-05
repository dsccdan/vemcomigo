import React, { useRef, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, StatusBar, Image, Dimensions } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { DrawerLayout } from 'react-native-gesture-handler';
import { RidesContext } from '../../context/RidesContext';

const Main = () => {
  const { rides, addRide, acceptedRides } = useContext(RidesContext);
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [userName, setUserName] = useState("Daniel S C Caldas");
  const [age, setAge] = useState("37");
  const [phone, setPhone] = useState("(21) 97879-7418");
  const [email, setEmail] = useState("dsccdan@gmail.com");

  const handleInterest = (rideId) => {
    const selectedRide = rides.find((ride) => ride.id === rideId);
    if (selectedRide && selectedRide.spots > 0 && !acceptedRides.some((ride) => ride.id === rideId)) {
      addRide(selectedRide);
      Alert.alert("Interesse Registrado", `Você manifestou interesse na carona para ${selectedRide.destination}`);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Permissão para acessar fotos é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderRide = ({ item }) => {
    const isAccepted = acceptedRides.some((ride) => ride.id === item.id);
    const isFull = item.spots === 0;

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
            <TouchableOpacity 
              style={[
                styles.smallInterestButton, 
                isAccepted && styles.acceptedButton, 
                isFull && !isAccepted && styles.fullButton
              ]}
              onPress={() => handleInterest(item.id)}
              disabled={isAccepted || isFull}
            >
              <Text style={[styles.buttonText, isFull && !isAccepted && styles.fullButtonText]}>
                {isFull && !isAccepted ? "Lotado" : isAccepted ? "Selecionada" : "Interesse"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.drawerProfileImage} />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.drawerLabelName}>{userName}</Text>
          <Text style={styles.drawerLabel}>{email}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
  
      <Text style={styles.drawerLabel}>{phone}</Text>
      <Text style={styles.drawerLabel}>{age} anos</Text>

      <View style={styles.divider} />
      
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("EditProfile")}>
          <MaterialIcons name="edit" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>Editar Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.replace("SignIn")}>
          <MaterialIcons name="logout" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={350}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1c1c1c" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <FontAwesome name="bars" size={24} color="#fff" />
          </TouchableOpacity>
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
    </DrawerLayout>
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
    backgroundColor: '#1c1c1c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 16,
    marginTop: 16,
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
    backgroundColor: '#1c1c1c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  acceptedButton: {
    backgroundColor: '#4CAF50',
  },
  fullButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fullButtonText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  drawerLabelName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  drawerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 8,
  },
  actionSection: {
    marginTop: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
  },
});
