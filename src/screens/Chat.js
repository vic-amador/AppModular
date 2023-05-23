import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const ngrokUrl = 'https://9457-2806-2f0-5001-dab6-87b-d994-cdc6-79c9.ngrok.io';

  const handleImageUpload = () => {
    ImagePicker.showImagePicker({ title: 'Seleccionar imagen' }, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error al seleccionar imagen:', response.error);
      } else {
        setSelectedImage(response.uri);
      }
    });
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

      const botReply = data && data.length > 0 ? data[0].text : 'Disculpa hubo un error, puedes volver a escribir...';

      setMessages(prevMessages => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
        { text: botReply, sender: 'bot' },
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