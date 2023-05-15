import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>

        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 300, width: 300}}
            source={require('../assets/Images/login.png')}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Louis-George-Cafe',
            fontSize: 40,
            marginBottom: 30,
          }}>
          Iniciar Sesión
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 0.8,
            paddingBottom: 8,
            marginBottom: 20,
          }}>
          <FontAwesome name="user-circle" size={27} style={{marginRight: 5}} />
          <TextInput
            style={{flex: 1, paddingVertical: 0}}
            placeholder="Usuario"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 0.7,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <MaterialIcons name="key" size={27} style={{marginRight: 5}} />
          <TextInput
            style={{flex: 1, paddingVertical: 0}}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Inicio')}
            style={{
              backgroundColor: '#ad40af',
              padding: 10,
              width: '34%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Louis-George-Cafe',
                fontSize: 20,
                color: 'white',
              }}>
              Iniciar Sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Restor')}
            style={{
              backgroundColor: '#ad40af',
              padding: 10,
              width: '34%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 100
            }}>
            <Text
              style={{
                fontFamily: 'Louis-George-Cafe',
                fontSize: 18,
                color: 'white',
              }}>
              Olvide mi contraseña
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, alignItems:"center"}}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAcc')}>
            <Text>No tienes cuenta?,</Text>
            <Text style={{color:"#ad40af", marginLeft:23}}>crea una!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;

