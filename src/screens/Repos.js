import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const selectImage = () => {
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
      }
      const imageUrl = '';
    });
  };

  const uploadImage = () => {
    if (selectedImage) {
      const imageName = selectedImage.split('/').pop(); // Obtener el nombre del archivo de la URL
      const file = {
        uri: selectedImage,
        name: imageName,
        type: 'image/jpeg',
      };

      const options = {
        keyPrefix: "uploads/",
        bucket: "imagenes-react",
        region: "us-east-1",
        accessKey: "AKIAS6HBXBRRHSOJCO6M",
        secretKey: "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",
        awsUrl: "s3.amazonaws.com",
        successActionStatus: 201
      };

      console.log('imagename: ', file);
      RNS3.put(file, options)
        .progress(event => console.log(`Progress: ${event.percent}%`))
        .then(response => {
          if (response.status !== 201) {
            console.log('Failed to upload image to S3', response.body);
          } else {
            const objectUrl = response.body.postResponse.location;

            console.log('Image uploaded to S3', response.body);
            console.log('La url del objeto es', objectUrl);
          }
        });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 224, height: 224 }} />}
      <Button title="Seleccionar imagen" onPress={selectImage} />
      <Button title="Subir imagen" onPress={uploadImage} disabled={!selectedImage} />
    </View>
  );
};

export default App;