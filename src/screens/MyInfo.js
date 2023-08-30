import { 
  Text,
  View, 
  ImageBackground, 
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

/*#export class MyInfo extends Component {*/
  const MyInfo = ({navigation}) => {
    return (
      <View>
        <ImageBackground
            source={require('../assets/Images/userDef.png')}
            style={{width: 120, height: 120, marginLeft: 130, marginTop: 75}}
            imageStyle={{borderRadius: 40}}
          />
        <Text
          style={{
            fontFamily: 'Louis-George-Cafe',
            fontSize: 20,
            marginTop: 20,
            marginBottom: 15,
            marginLeft: 20, 
          }}>
          Nombre: </Text>
        <Text
          style={{
            fontFamily: 'Louis-George-Cafe',
            fontSize: 20,
            marginTop: 10,
            marginBottom: 15,
            marginLeft: 20, 
          }}>
          Correo: </Text>
          <Text
            style={{
              fontFamily: 'Louis-George-Cafe',
              fontSize: 20,
              marginTop: 10,
              marginBottom: 30,
              marginLeft: 20, 
            }}>
          Cantidad de reportes: </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Inicio')}
            style={{
              backgroundColor: '#ad40af',
              padding: 10,
              width: '34%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 120,
              marginLeft: 120,
            }}>
            <Text
              style={{
                fontFamily: 'Louis-George-Cafe',
                fontSize: 20,
                color: 'white',
              }}>
              Inicio
            </Text>
          </TouchableOpacity>
      </View>
      
    )
  }
/*}*/

export default MyInfo

