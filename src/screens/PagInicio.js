import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';

export default function PagInicio() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 17, fontFamily: 'couture-bld', color: "black"}}>
            Hola 'Usuario'
          </Text>
          <ImageBackground
            source={require('../assets/Images/image.png')}
            style={{width: 35, height: 35}}
            imageStyle={{borderRadius: 25}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
