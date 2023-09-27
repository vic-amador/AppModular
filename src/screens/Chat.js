import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, Image,} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const flatListRef = useRef(null);

  const onScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (contentOffset.y + event.nativeEvent.layoutMeasurement.height >= contentHeight) {
      // El usuario ha llegado al final del chat
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const ngrokUrl =
    'https://b391-2806-2f0-5001-f35f-c803-9b17-dfa4-4528.ngrok.io';

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo', // Asegúrate de especificar el tipo de media como 'photo'
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'user',
            image: response.assets[0].uri,
          },
        ]);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async (selectedImage) => {
    if (selectedImage) {
      const imageName = selectedImage.split('/').pop(); // Obtener el nombre del archivo de la URL
      const file = {
        uri: selectedImage,
        name: imageName,
        type: 'image/jpeg',
      };

      const S3Options = {
        keyPrefix: "uploads/",
        bucket: "imagenes-react",
        region: "us-east-1",
        accessKey: "AKIAS6HBXBRRHSOJCO6M",
        secretKey: "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",
        awsUrl: "s3.amazonaws.com",
        successActionStatus: 201
      };

      console.log('imagename: ', file);
      RNS3.put(file, S3Options)
        .progress(event => console.log(`Progress: ${event.percent}%`))
        .then(response => {
          if (response.status !== 201) {
            console.log('Failed to upload image to S3', response.body);
          } else {
            const objectUrl = response.body.postResponse.location;

            console.log('Image uploaded to S3', response.body);
            console.log('La url del objeto es', objectUrl);

            sendImageToRasa(objectUrl);

          }
        });
    }
  };

  const sendMessageToRasa = async () => {
    try {
      // Construye el objeto JSON que se enviará a Rasa
      const messageData = {
        message: inputText,
        image: selectedImage,
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
      const botReplies = data.map(item => ({
        text: item.text,
        sender: 'bot',
      }));

      // Agrega ambos mensajes al estado de mensajes
      setMessages(prevMessages => [
        ...prevMessages,
        userMessage,
        ...botReplies,
        
      ]);

      flatListRef.current.scrollToEnd();

      setInputText('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error al enviar mensaje a Rasa:', error);
    }
  };

  const sendImageToRasa = async (objectUrl) => {
    try {
      // Construye el objeto JSON que se enviará a Rasa
      const messageData = {
        message: objectUrl
      };

      console.log('JSON enviado a Rasa:', JSON.stringify(messageData));

      // Envía el objeto JSON a Rasa
      const response = await fetch(`${ngrokUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      // Procesa la respuesta de Rasa
      const data = await response.json();

      // Construye el mensaje del bot
      const botReplies = data.map(item => ({
        text: item.text,
        sender: 'bot',
      }));

      // Agrega el mensaje del bot al estado `messages`
      setMessages(prevMessages => [
        ...prevMessages,
        ...botReplies,
      ]);

      // Llama a la función para hacer el auto scroll
      flatListRef.current.scrollToEnd();

      setInputText('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error al enviar mensaje a Rasa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.message,
              item.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}>
            {item.image && (
              <View style={styles.imageContainer}>
                <Image source={{uri: item.image}} style={styles.image} />
              </View>
            )}
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScrollEnd={onScrollEnd}
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

export default Chat;
