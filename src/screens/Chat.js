import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const ngrokUrl = 'https://9649-2806-2f0-51e0-ad30-7c9e-54ac-9fe4-468f.ngrok.io';

  const handleImageUpload = () => {
    launchImageLibrary({ title: 'Seleccionar imagen' }, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error al seleccionar imagen:', response.error);
      } else {
        const userMessageWithImage = { text: '', sender: 'user', image: response.assets[0].uri };
        setMessages(prevMessages => [...prevMessages, userMessageWithImage]);
        
        // Convertir la imagen a base64 y asignarla a selectedImage
        setSelectedImage(`data:${response.assets[0]};base64,${response.assets[0].base64}`);
        console.log(response.assets[0].base64)
        // Enviar el mensaje a Rasa
        sendMessageToRasa();
      }
    });
  };
  
  const sendMessageToRasa = async () => {
  try {
    // Construye el objeto JSON que se enviará a Rasa
    const messageData = {
      message: inputText,
      image: selectedImage, // Envia la imagen en formato base64
    };

    console.log('JSON enviado a Rasa:', JSON.stringify(messageData));

    const response = await fetch(`${ngrokUrl}/webhooks/rest/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData), // Envía el objeto JSON
    });

    const data = await response.json();

      // Construye el mensaje del usuario (con la imagen si existe)
    const userMessage = {
      text: inputText,
      sender: 'user',
      image: selectedImage,
    };

      // Construye el mensaje del bot
    //const botReplies = data.map(item => item.text); // Si quieres manejar múltiples respuestas del bot
    //const botReplies = data.map((item, index) => (
    //  <View key={index}>
    //    <Text>{item.text}</Text>
    //  </View>
    //));
    const botReplies = data.map((item) => ({
      text: item.text,
      sender: 'bot',
    }));
    //const botReply = data.length > 0 ? data[0].text : 'Disculpa, hubo un error.';
    
      // Agrega ambos mensajes al estado de mensajes
    setMessages(prevMessages => [
      ...prevMessages,
      userMessage, ...botReplies,
      //{ text: botReply, sender: 'bot' , image: null},
    ]);

    setInputText('');
    setSelectedImage(null);
    } catch (error) {
      console.error('Error al enviar mensaje a Rasa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            {item.image && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            )}
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <Button title="Subir imagen" onPress={handleImageUpload} />
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <Button title="Enviar" onPress={sendMessageToRasa} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DDF4C7',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E2E2',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#CCCCCC',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Chat;