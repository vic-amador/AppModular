import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Ionicons from 'react-native-vector-icons/Ionicons';

async function logOutButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  // Sign out from Google Sign-In
  await GoogleSignin.signOut();

  // Sign out from Firebase
  await auth().signOut();
}

const CustomDrawer = props => {
  const handleLogout = async () => {
    try {
      // Cerrar sesión en Google Sign-In
      await GoogleSignin.signOut();
  
      // Cerrar sesión en Firebase
      await auth().signOut();
  
      // Navega a la pantalla de inicio de sesión
      props.navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  GoogleSignin.configure({
    webClientId: '1094751282763-h02am116fhr5evgb1ibghnnhi8uuu8ni.apps.googleusercontent.com',
  });
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'lightblue'}}>
        <ImageBackground
          source={require('../assets/Images/Background1.png')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/Images/userDef.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'BebasNeue-Regular',
            }}>
            User
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{padding: 10, borderTopWidth: 0.8, borderTopColor: 'black'}}>
        <TouchableOpacity onPress={handleLogout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: "black"
              }}>
              Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
