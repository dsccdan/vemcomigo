import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'


export default function Welcome() {

  const navegation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require("../../assets/logo.png")}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Sair de casa nunca foi tão fácil!</Text>
        <Text style={styles.text}>Encontre caronas no condomínio, reserve sua vaga e receba notificações em tempo real. Vem com a gente!</Text>

        <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.6}
        onPress={()=> navegation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38A69D",
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#38A69D",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 24,
    fontWeight:'bold',
    marginTop:'5%',
    marginBottom:'5%'
  },
  text:{
    color:'#a1a1a1',
    fontSize:18,
    
  },
  button:{
    position: 'absolute',
    backgroundColor:"#38A69D",
    borderRadius: 50,
    paddingVertical:8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18,
    color:'#fff',
    fontWeight: 'bold'
  }
});
