import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

// import { Container } from './styles';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}> Email </Text>
        <TextInput placeholder="Digite um e-mail..." style={styles.input} />
        <Text style={styles.title}> Senha </Text>
        <TextInput placeholder="Sua senha." style={styles.input} />

        <TouchableOpacity activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={styles.buttonRegister}>
          <Text style={styles.registerText}>
            Não possui uma conta? Registra-se
          </Text>

        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#38A69D"
  },
  containerHeader:{
    marginTop:'14%',
    marginBottom:'8%',
    paddingStart:'5%'
  },
  message:{
    fontSize: 28,
    fontWeight:'bold',
    color:'#fff'
  },
  containerForm:{
    flex:1,
    backgroundColor:'#fff',
    borderTopLeftRadius:26,
    borderTopRightRadius:26,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 20,
    marginTop: 28,
    fontWeight:'bold',
  },
  input:{
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    fontSize:16
  },
  button:{
    backgroundColor:"#38A69D",
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold'
  },
  buttonRegister:{
    marginTop:14,
    alignSelf:'center'
  },
  registerText:{
    color:'#a1a1a1'
  }



});
