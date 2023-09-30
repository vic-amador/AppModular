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
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {

  const [userEmail, setUserEmail] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);

  useEffect(() => {
    // Comprobar si hay un usuario autenticado
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Usuario autenticado, obtener correo electrónico e imagen de perfil
        setUserEmail(user.email);
        setUserPhotoURL(user.photoURL);
      } else {
        // No hay usuario autenticado
        setUserEmail(null);
        setUserPhotoURL(null);
      }
    });

    // ¡No olvides desuscribirte cuando el componente se desmonte!
    return () => unsubscribe();
  }, []);

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
          {userPhotoURL && (
            <Image
              source={{ uri: userPhotoURL }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          )}
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'BebasNeue-Regular',
            }}>
            {userEmail ? userEmail : 'User'}
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
