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

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {
  const handleLogout = () => {
    // Navega a la pantalla de inicio de sesión cuando se presiona "Cerrar sesión"
    props.navigation.navigate('Login'); // Usar props.navigation
  };
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
