import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: "#DCDCDC"}}>
      <View style={{paddingHorizontal: 25, }}>

        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Image
            style={{height: 300, width: 300}}
            source={require('../assets/Images/recov.png')}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Louis-George-Cafe',
            fontSize: 40,
            marginBottom: 30,
            color: 'black',
          }}>
          Recuperar Cuenta
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 0.8,
            paddingBottom: 8,
            marginBottom: 20,
          }}>
          <FontAwesome name="user-circle" size={27} style={{marginRight: 5, color:'grey'}} />
          <TextInput
            style={{flex: 1, paddingVertical: 0, color:'black'}}
            placeholder="Correo electronico"
          />
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Datos enviados!',
                'Revisa tu correo de recuperacion.',
                [
                  {
                    text: 'Aceptar',
                    onPress: () => navigation.navigate('Login')
                  }
                ]
              );
            }}
            style={{
              backgroundColor: '#6495ED',
              padding: 10,
              width: '34%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
            <Text
              style={{
                fontFamily: 'Louis-George-Cafe',
                fontSize: 20,
                color: 'white',
              }}>
              Enviar Datos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: 'black',
              padding: 10,
              width: '34%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 115,
              marginTop: 20
            }}>
            <Text
              style={{
                fontFamily: 'Louis-George-Cafe',
                fontSize: 20,
                color: 'white',
              }}>
              Volver al Inicio
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;