import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, StatusBar, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { DrawerLayout } from 'react-native-gesture-handler';

const rides = [
  { id: '1', driver: 'João', destination: 'Centro da Cidade', time: '09:00', date: '2023-10-28', spots: 2, imageUrl: 'https://via.placeholder.com/80' },
  { id: '2', driver: 'Maria', destination: 'Shopping Metropolitano', time: '13:30', date: '2023-10-29', spots: 3, imageUrl: 'https://via.placeholder.com/80' },
  { id: '3', driver: 'Lucas', destination: 'Estação Jardim Oceânico', time: '18:00', date: '2023-10-30', spots: 1, imageUrl: 'https://via.placeholder.com/80' },
  { id: '4', driver: 'Ana', destination: 'Barra da Tijuca', time: '07:30', date: '2023-11-01', spots: 2, imageUrl: 'https://via.placeholder.com/80' },
];

const Main = () => {
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [userName, setUserName] = useState("Daniel S C Caldas");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [age, setAge] = useState("37");
  const [phone, setPhone] = useState("(21) 97879-7418");
  const [email, setEmail] = useState("dsccdan@gmail.com");

  const handleInterest = (rideId) => {
    Alert.alert("Interesse Registrado", `Você manifestou interesse na carona ${rideId}`);
  };

  const pickImage = async () => {
    // Solicita permissão para acessar a biblioteca de fotos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Permissão para acessar fotos é necessária!");
      return;
    }

    // Abre o seletor de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Atualiza a imagem de perfil com a URI selecionada
    }
  };

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
          <TouchableOpacity 
            style={styles.smallInterestButton}
            onPress={() => handleInterest(item.id)}
          >
            <Text style={styles.buttonText}>Interesse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.drawerProfileImage} />
      </TouchableOpacity>
      <Text style={styles.drawerLabelName}>{userName}</Text>
      <Text style={styles.drawerLabel}>{age} anos</Text>
      <Text style={styles.drawerLabel}>{phone}</Text>
      <Text style={styles.drawerLabel}>{email}</Text>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.drawerButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.replace("SignIn")}>
        <Text style={styles.drawerButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#38A69D" />
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
    backgroundColor: '#38A69D',
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
    color: '#38A69D',
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
    backgroundColor: '#d3d3d3',
  },
  button: {
    backgroundColor: '#38A69D',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#38A69D',
    width:'75%',
    borderBottomRightRadius:26
  },
  drawerProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
    marginTop:16
  },
  drawerLabelName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 26,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  drawerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  drawerButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  drawerButtonText: {
    color: '#38A69D',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
