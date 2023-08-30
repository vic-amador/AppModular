import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <Text style={Styles.titulo}>Hola, bienvenido</Text>
      </View>

      <Image
        source={require('../assets/Images/tonaLogo.png')}
        style={{width: 350, height: 300}}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#812628',
          padding: 20,
          width: '90%',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={Styles.bttn_inicio}>Iniciar</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;

const Styles = StyleSheet.create({
  titulo: {
    fontSize: 40,
    color: 'black',
    fontFamily: 'Louis-George-Cafe',
  },
  bttn_inicio: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Oswald-VariableFont-wght',
  },
});