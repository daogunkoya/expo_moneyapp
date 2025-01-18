import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { SendMoneyContext } from "../../../services/sendmoney.context";

export const SendMoneyCaptureImagesScreen = () => {

    const { uploadIdentification } = useContext(SendMoneyContext);
  const [idImage, setIdImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);

  const pickImage = async (type) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need your permission to access your photo library.');
      return;
    }

   
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

    if (!result.canceled) {
      if (type === 'id') {
        setIdImage(result.assets[0].uri);
      } else {
        setSelfieImage(result.assets[0].uri);
      }
    }
  };

  const submitImages = async () => {
    if (!idImage || !selfieImage) {
      Alert.alert('Incomplete', 'Please select both ID and Selfie images.');
      return;
    }

    const formData = new FormData();
    formData.append('id_image', {
      uri: idImage,
      name: 'id_image.jpg',
      type: 'image/jpeg',
    });
    formData.append('selfie_image', {
      uri: selfieImage,
      name: 'selfie_image.jpg',
      type: 'image/jpeg',
    });

    uploadIdentification(formData);

    // try {
    //   const response = await fetch('http://localhost/v1/documents/upload', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     Alert.alert('Success', 'Images uploaded successfully!');
    //   } else {
    //     Alert.alert('Error', result.message || 'Failed to upload images.');
    //   }
    // } catch (error) {
    //   Alert.alert('Error', error.message || 'Something went wrong.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Verify Your Identity
      </Text>
      <Button mode="contained" onPress={() => pickImage('id')} style={styles.button}>
        Pick ID Image
      </Button>
      {idImage && <Image source={{ uri: idImage }} style={styles.imagePreview} />}
      <Button mode="contained" onPress={() => pickImage('selfie')} style={styles.button}>
        Pick Selfie Image
      </Button>
      {selfieImage && <Image source={{ uri: selfieImage }} style={styles.imagePreview} />}
      <Button mode="contained" onPress={submitImages} style={styles.submitButton}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
    resizeMode: 'contain',
  },
});
