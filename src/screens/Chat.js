import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { RNS3 } from 'react-native-aws3';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const awsOptions = {
    keyPrefix: 'img/', 
    bucket: 'imageprocess',
    region: 'us-east-1', 
    accessKey: 'AKIAS6HBXBRRJS2HATQR',
    secretKey: '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',
    successActionStatus: 201,
  };

  const ngrokUrl = 'https://31ed-2806-2f0-51e0-ad30-d03a-cb8d-85c8-b61.ngrok.io';

  const handleImageUpload = () => {
    launchImageLibrary({ title: 'Seleccionar imagen' }, response => {
      console.log('Image selected:', response.assets[0].uri);
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error al seleccionar imagen:', response.error);
      } else {
        uploadImageToS3(response.assets[0].uri);
      }
    });
  };

  const uploadImageToS3 = async (imageUri) => {
    const file = {
      uri: imageUri,
      name: `image_${Date.now()}.jpg`,
      type: 'image/jpeg',
    };

    const options = {
      ...awsOptions,
      key: `${awsOptions.keyPrefix}${file.name}`,
      contentType: file.type,
    };

    try {
      const response = await RNS3.put(file, options);
      console.log('Response from AWS S3:', response);
      if (response.status === 201) {
        const imageUrl = response.body.postResponse.location;
        sendImageURLToRasa(imageUrl);
      } else {
        console.error('Error al subir imagen:', response.body);
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  };

  const sendImageURLToRasa = async (imageUrl) => {
    try {
      const response = await fetch(`${ngrokUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
      });

    } catch (error) {
      console.error('Error al enviar URL de imagen a Rasa:', error);
    }
  };

  const sendMessageToRasa = async () => {
    try {
      const response = await fetch(`${ngrokUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
        }),
      });
  
      const data = await response.json();
  
      const botReplies = data && data.length > 0 ? data.map(item => item.text) : ['Disculpa hubo un error, puedes volver a escribir...'];
  
      const newMessages = [
        ...messages,
        { text: inputText, sender: 'user' },
        ...botReplies.map(reply => ({ text: reply, sender: 'bot' })),
      ];
  
      setMessages(newMessages);
  
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
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
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