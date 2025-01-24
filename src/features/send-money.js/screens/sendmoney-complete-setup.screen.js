import React, { useContext, Alert } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, RadioButton, Card } from 'react-native-paper';
import { UserContext } from "../../../services/user/user.context";



export const SendMoneyCompleteSetupScreen = ({ route, navigation }) => {
  const { user, sender, receiver, isCustomer, userEmailverified, userIdentityverified } = route?.params;
  const [checked, setChecked] = React.useState(false);

  const { onVerifyEmail , onVerifyIdentity} = useContext(UserContext);

  const isEmailVerified = userEmailverified; // Check email verification status
  const isIdentityVerified = userIdentityverified; // Check identity verification status

  return (
    <View style={styles.container}>
      {/* Title and Subheadings */}
      {/* <Text variant="headlineLarge" style={styles.title}>
        Complete Your Setup
      </Text> */}
      <Text variant="bodyMedium" style={styles.subheading}>
        Secure your account and do more
      </Text>
      <Text variant="bodySmall" style={styles.nextSubheading}>
        Next
      </Text>

      {/* Conditionally render the banners */}
      {isEmailVerified ? (
        // If the email is verified, show "Verify Proof of Identity"
        <Card style={styles.banner}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.bannerTitle}>
              Verify Proof of Your Identity
            </Text>
            <Text variant="bodySmall">
              Complete your identity verification to secure your account and enable recovery features.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        // If the email is NOT verified, show "Verify Your Email"
        <Card style={styles.banner}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.bannerTitle}>
              Verify Your Email
            </Text>
            <Text variant="bodySmall">
              Complete your email verification to secure your account and activate the recovery feature.
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Button for verifying email or identity */}
      <Button
        mode="contained"
        onPress={() => {
          if (isEmailVerified) {
           navigation.navigate('VerifyIdentity', { 
            user: user,
            sender: sender,
             receiver: receiver,
              isCustomer: isCustomer,
              userEmailverified: userEmailverified,
               userIdentityverified: userIdentityverified
             });
          } else {
            onVerifyEmail();
          
          }
        }}
        style={styles.button}
        buttonColor="green"
        textColor="white"
      >
        {isEmailVerified ? 'Verify Identity' : 'Verify Email'}
      </Button>

      {/* Always show the "Verify Your Identity" radio button if the email is not verified */}
      {!isEmailVerified && (
        <View>
          <Text variant="bodyMedium" style={styles.pending}>
            Pending
          </Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioButtonWrapper}>
              <RadioButton
                value="verifyIdentity"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color="green"
              />
            </View>
            <Text variant="bodySmall" style={styles.radioText}>
              Verify Your Identity
            </Text>
          </View>
        </View>
      )}
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
    marginBottom: 8,
  },
  subheading: {
    textAlign: 'center',
    marginBottom: 4,
  },
  nextSubheading: {
    textAlign: 'center',
    marginBottom: 16,
  },
  banner: {
    backgroundColor: '#eef6fc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  bannerTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    width: 200,
    marginVertical: 16,
    borderRadius: 24,
  },
  pending: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonWrapper: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 12,
    padding: 2,
  },
  radioText: {
    marginLeft: 8,
  },
});
