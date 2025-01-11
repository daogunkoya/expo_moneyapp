import React, { useContext , useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {PasswordInput} from '../components/password-input.component';  // Import your PasswordInput component
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

// Validation Schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ResetPasswordScreen = () => {
    const { authData, onPasswordReset } = useContext(AuthenticationContext);
    const [error, setError] = useState('');
   // console.log('Email=', authData.user['userEmail'])
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            setError(''); // Clear any previous errors
         console.log('submitted values',values);
          onPasswordReset( authData.user['userEmail'], values.oldPassword, values.newPassword, values.confirmPassword, setError)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <PasswordInput
              label="Old Password"
              value={values.oldPassword}
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              error={errors.oldPassword}
              touched={touched.oldPassword}
            />
            {touched.oldPassword && errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
            )}

            <PasswordInput
              label="New Password"
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              error={errors.newPassword}
              touched={touched.newPassword}
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            <PasswordInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Reset Password
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default ResetPasswordScreen;
