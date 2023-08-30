import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: "uploads/",
  bucket: "imageprocess",
  region: "us-east-1",
  accessKey: "AKIAS6HBXBRRLQUJLIPE",
  secretKey: "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",
  successActionStatus: 201,
};

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
        console.log(selectedImage);
      }
    });
  };

  const uploadImage = () => {
    if (selectedImage) {
      const file = {
        uri: selectedImage,
        name: selectedImage.substr(selectedImage.lastIndexOf('/') + 1),
        type: 'image/jpeg',
      };

      RNS3.put(file, options)
        .progress(event => console.log(`Progress: ${event.percent}%`))
        .then(response => {
          if (response.status !== 201) {
            console.log('Failed to upload image to S3', response.body);
          } else {
            console.log('Image uploaded to S3', response.body);
          }
        });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar imagen" onPress={selectImage} />
      <Button title="Subir imagen" onPress={uploadImage} disabled={!selectedImage} />
    </View>
  );
};

export default App;

