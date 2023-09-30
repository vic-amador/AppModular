import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/app';

export default function PagInicio() {
  const [userName, setUserName] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);

  useEffect(() => {
    // Comprobar si hay un usuario autenticado
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Usuario autenticado, obtener nombre e imagen de perfil
        setUserName(user.displayName);
        setUserPhotoURL(user.photoURL);
      } else {
        // No hay usuario autenticado
        setUserName(null);
        setUserPhotoURL(null);
      }
    });

    // ¡No olvides desuscribirte cuando el componente se desmonte!
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, padding: 20, maxHeight: '98%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text
            style={{fontSize: 17, fontFamily: 'couture-bld', color: 'black'}}>
            {userName ? `Hola ${userName}` : 'Hola Usuario'}
          </Text>
          {userPhotoURL && (
            <ImageBackground
              source={{uri: userPhotoURL}}
              style={{width: 40, height: 40}}
              imageStyle={{borderRadius: 25}}
            />
          )}
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'thin',
              color: 'black',
              textAlign: 'justify',
            }}>
            ¡Hola y bienvenido a nuestra aplicación! Estamos emocionados de
            tenerte aquí, ya que eres parte fundamental para mantener nuestra
            ciudad hermosa y libre de grafitis no deseados. En Tonala, nos
            enorgullece nuestra comunidad, y juntos, podemos hacer que nuestros
            espacios públicos sean aún más atractivos.
          </Text>

          <Text
            style={{
              marginTop: 20,
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'justify',
            }}>
            ¿Cómo funciona?
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'thin',
              color: 'black',
              textAlign: 'justify',
            }}>
            1- Genera Reportes: Utiliza nuestro chatbot para reportar cualquier
            graffiti que encuentres en la ciudad. Solo tienes que tomar una
            foto, proporcionar algunos detalles y enviarlo. ¡Estás contribuyendo
            al cambio!
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'thin',
              color: 'black',
              textAlign: 'justify',
            }}>
            2- Seguimiento en Tiempo Real: Mantente informado sobre el progreso
            de la limpieza de graffiti en tu área. Te notificaremos cuando se
            haya completado la limpieza.
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'thin',
              color: 'black',
              textAlign: 'justify',
            }}>
            3- Colaboración Ciudadana: Invita a tus amigos y vecinos a unirse.
            Cuantas más personas se involucren, más rápido podremos mantener
            Tonala limpio.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
