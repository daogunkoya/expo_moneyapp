import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export const SendMoneyCaptureImagesScreen = () => {
  const [selfieUri, setSelfieUri] = useState(null);
  const [idDocumentUri, setIdDocumentUri] = useState(null);

  const pickImage = async (setImageUri) => {
    // Request permissions to access camera or gallery
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera access is required to capture images.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType.IMAGE,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!selfieUri || !idDocumentUri) {
      Alert.alert('Incomplete', 'Please capture both your selfie and ID document.');
      return;
    }

    // Send images to the backend
    const formData = new FormData();
    formData.append('selfie', {
      uri: selfieUri,
      name: 'selfie.jpg',
      type: 'image/jpeg',
    });
    formData.append('id_document', {
      uri: idDocumentUri,
      name: 'id_document.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://your-backend-api-url.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const data = await response.json();
      Alert.alert('Success', 'Images uploaded successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload images.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Capture Images
      </Text>

      <View style={styles.imageContainer}>
        <Text variant="titleMedium">Selfie</Text>
        {selfieUri && <Image source={{ uri: selfieUri }} style={styles.image} />}
        <Button mode="contained" onPress={() => pickImage(setSelfieUri)} style={styles.button}>
          Capture Selfie
        </Button>
      </View>

      <View style={styles.imageContainer}>
        <Text variant="titleMedium">ID Document</Text>
        {idDocumentUri && <Image source={{ uri: idDocumentUri }} style={styles.image} />}
        <Button mode="contained" onPress={() => pickImage(setIdDocumentUri)} style={styles.button}>
          Capture ID Document
        </Button>
      </View>

      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Submit Images
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
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 8,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: 'green',
  },
});
