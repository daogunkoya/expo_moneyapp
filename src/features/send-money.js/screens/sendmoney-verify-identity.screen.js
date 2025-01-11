import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, RadioButton, Card } from 'react-native-paper';

export const SendMoneyVerifyIdentityScreen = ({ navigation }) => {
  const [selectedIdType, setSelectedIdType] = useState('');

  const handleContinue = () => {
    if (!selectedIdType) {
      alert('Please select an ID type.');
      return;
    }
    // Navigate to camera screen or handle camera logic
    navigation.navigate('CaptureImages', { idType: selectedIdType });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Text variant="headlineMedium" style={styles.header}>
        Verify Your Identity
      </Text> */}

      {/* Description */}
      <Text variant="bodyMedium" style={styles.description}>
        To comply with financial regulations and prevent fraud and identity theft, we require both a photo of your ID and a selfie to verify your identity.
      </Text>

      {/* Tips for Photo ID */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>Tips for Photo ID</Text>
          <Text>• Ensure all text in the ID is readable.</Text>
          <Text>• Make sure the entire ID is visible, and there is no reflection on the ID.</Text>
        </Card.Content>
      </Card>

      {/* Tips for Selfie */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>Tips for Selfie</Text>
          <Text>• Use good lighting. Keep your face clearly visible.</Text>
          <Text>• Remove anything obscuring your face (e.g., glasses, hats, scarves).</Text>
        </Card.Content>
      </Card>

      {/* Select an ID Type */}
      <Text variant="titleMedium" style={styles.subHeader}>Select an ID Type</Text>
      <RadioButton.Group onValueChange={(newValue) => setSelectedIdType(newValue)} value={selectedIdType}>
        <View style={styles.radioOption}>
          <View style={styles.radioButtonWrapper}>
            <RadioButton 
              value="Passport" 
              color="green" 
              uncheckedColor="grey" 
            />
          </View>
          <Text style={styles.radioText}>Passport</Text>
        </View>

        <View style={styles.radioOption}>
          <View style={styles.radioButtonWrapper}>
            <RadioButton 
              value="Drivers License" 
              color="green" 
              uncheckedColor="grey" 
            />
          </View>
          <Text style={styles.radioText}>Driver's License</Text>
        </View>

        <View style={styles.radioOption}>
          <View style={styles.radioButtonWrapper}>
            <RadioButton 
              value="Identity Card" 
              color="green" 
              uncheckedColor="grey" 
            />
          </View>
          <Text style={styles.radioText}>Identity Card</Text>
        </View>
      </RadioButton.Group>

      {/* Continue Button */}
      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.continueButton}
        buttonColor="green"
        textColor="white"
      >
        Continue
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
  header: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#eef6fc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subHeader: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButtonWrapper: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 50, // Circular border
    padding: 4,
    marginRight: 8,
  },
  radioText: {
    fontSize: 16,
  },
  continueButton: {
    alignSelf: 'center',
    width: 200,
    marginTop: 16,
    borderRadius: 24,
  },
});


