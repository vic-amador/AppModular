import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons';

const CreateAcc = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: "#DCDCDC"}}>
    <View style={{paddingHorizontal: 25}}>

      <View style={{alignItems: 'center'}}>
        <Image
          style={{height: 300, width: 300}}
          source={require('../assets/Images/newacc.png')}
        />
      </View>

      <Text
        style={{
          fontFamily: 'Louis-George-Cafe',
          fontSize: 40,
          marginBottom: 30,
          color: "black",
        }}>
        Crear cuenta nueva
      </Text>

      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: 'black',
          borderBottomWidth: 0.8,
          paddingBottom: 8,
          marginBottom: 20,
          color: "grey"
        }}>
        <MaterialIcons2 name="alternate-email" size={27} style={{marginRight: 5, color: "grey"}} />
        <TextInput
          style={{flex: 1, paddingVertical: 0, color: "black"}}
          placeholder="Correo electrónico"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: 'black',
          borderBottomWidth: 0.8,
          paddingBottom: 8,
          marginBottom: 20,
        }}>
        <FontAwesome name="user-circle" size={27} style={{marginRight: 5, color: "grey"}} />
        <TextInput
          style={{flex: 1, paddingVertical: 0, color: "grey"}}
          placeholder="Nombre de usuario"
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
        <MaterialIcons name="key" size={27} style={{marginRight: 5, color: "grey"}} />
        <TextInput
          style={{flex: 1, paddingVertical: 0, color: "black"}}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
      </View>

      <View style={{flexDirection:"row"}}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Datos guarados!',
              'Revisa tu correo para confirmar.',
              [
                {
                  text: 'Aceptar',
                  onPress: () => navigation.navigate('Login')
                }
              ]
            );
          }}
          style={{
            backgroundColor: '#7FFFD4',
            padding: 10,
            width: '30%',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Louis-George-Cafe',
              fontSize: 20,
              color: 'black',
            }}>
            Guardar datos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login') }
          style={{
            backgroundColor: '#9932CC',
            padding: 10,
            width: '30%',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 145
          }}>
          <Text
            style={{
              fontFamily: 'Louis-George-Cafe',
              fontSize: 20,
              color: 'white',
            }}>
            Volver al inicio
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  </SafeAreaView>
  )
  
}

export default CreateAcc