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
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();


async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

async function logOutButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign out from Google Sign-In
    await GoogleSignin.signOut();

    // Sign out from Firebase
    await auth().signOut();
}
const Login = ({navigation}) => {
  GoogleSignin.configure({
    webClientId: '58109736951-5qj55001ddahhaefpb12mvr257g48l8k.apps.googleusercontent.com',
  });
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Inicio'),console.log('Signed in with Google!'))}
    />
      <Button
      title="Google Sign-Out"
      onPress={() => logOutButtonPress().then(() => navigation.navigate('Login'),console.log('Signout in with Google!'))}
    />
      <View style={{paddingHorizontal: 25, }}>

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
            color: 'black',
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
          <FontAwesome name="user-circle" size={27} style={{marginRight: 5, color:'grey'}} />
          <TextInput
            style={{flex: 1, paddingVertical: 0, color:'black'}}
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
          <MaterialIcons name="key" size={27} style={{marginRight: 5, color:'grey'}} />
          <TextInput
            style={{flex: 1, paddingVertical: 0, color:'black'}}
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
            <Text style={{color:"black"}}>No tienes cuenta?,</Text>
            <Text style={{color:"#ad40af", marginLeft:23}}>crea una!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;

