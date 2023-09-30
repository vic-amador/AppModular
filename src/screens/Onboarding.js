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
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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

const Onboarding = ({navigation}) => {
  GoogleSignin.configure({
    webClientId: '1094751282763-h02am116fhr5evgb1ibghnnhi8uuu8ni.apps.googleusercontent.com',
  });
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
        onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Inicio'),console.log('Signed in with Google!'))}
        style={{
          backgroundColor: '#812628',
          padding: 20,
          width: '90%',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={Styles.bttn_inicio}>Iniciar</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="white" />
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