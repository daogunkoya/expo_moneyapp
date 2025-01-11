import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputComponent } from '../../../components/input/text-input.component';
import { LoadingComponent } from '../../../components/loading.component';
import { CommonContext } from '../../../services/utilities/common.context';
import { Section, SectionRow } from '../../../styles/common.style';
import { Spacer } from '../../../components/spacer/spacer.component';

// Validation Schema
const validationSchema = Yup.object().shape({
  storeName: Yup.string().required('Store Name is required'),
  storeSlogan: Yup.string().required('Store Slogan is required'),
  storePhone: Yup.string().required('Store Phone is required'),
  storeMobile: Yup.string().required('Store Mobile is required'),
  storeEmail: Yup.string().required('Store Email is required'),
  storeAddress: Yup.string().required('Store Address is required'),
  storeCity: Yup.string().required('Store City is required'),
  storeCountry: Yup.string().required('Store Country is required'),
  storePostcode: Yup.string().required('Store Postcode is required'),
  storeUrl: Yup.string().required('Store Url is required'),
});

export const StoreUpdateScreen = ({ navigation, route }) => {
  // const { store } = route.params;
  const { onUpdateMyStore, isLoading, error, store } = useContext(CommonContext);

  const [initialValues, setInitialValues] = useState({
    storeName: store?.storeName || '',
    storeSlogan: store?.storeSlogan || '',
    storePhone: store?.storePhone || '',
    storeMobile: store?.storeMobile || '',
    storeEmail: store?.storeEmail || '',
    storeAddress: store?.storeAddress || '',
    storeCity: store?.storeCity || '',
    storeCountry: store?.storeCountry || '',
    storePostcode: store?.storePostcode || '',
    storeUrl: store?.storeUrl || '',
    enableSms: store?.enableSms || false,
    enableCredit: store?.enableCredit || false,
    enableMultipleReceipt: store?.enableMultipleReceipt || false,
  });

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('submitted values', values);
          onUpdateMyStore(values);
          if (error) {
            Alert.alert('Error', error);
          } else {
            navigation.navigate('MyStore');
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView>
            {/* Dynamic Text Inputs */}
            {[
              { label: 'Store Name', key: 'storeName' },
              { label: 'Store Slogan', key: 'storeSlogan' },
              { label: 'Store Phone', key: 'storePhone' },
              { label: 'Store Mobile', key: 'storeMobile' },
              { label: 'Store Email', key: 'storeEmail' },
              { label: 'Store Address', key: 'storeAddress' },
              { label: 'Store Postcode', key: 'storePostcode' },
              { label: 'Store City', key: 'storeCity' },
              { label: 'Store Country', key: 'storeCountry' },
              { label: 'Store Url', key: 'storeUrl' },
            ].map((input) => (
              <View key={input.key}>
                <TextInputComponent
                  label={input.label}
                  value={values[input.key]}
                  onChangeText={handleChange(input.key)}
                  onBlur={handleBlur(input.key)}
                  error={touched[input.key] && errors[input.key]}
                />
                {touched[input.key] && errors[input.key] && (
                  <Text style={styles.errorText}>{errors[input.key]}</Text>
                )}
                <Spacer size="large" position="top" />
              </View>
            ))}

            {/* Toggle Switches */}
            <SectionRow>
              {[
                { label: 'Enable Credit', key: 'enableCredit' },
                { label: 'Enable Sms', key: 'enableSms' },
                { label: 'Enable Multiple Receipt', key: 'enableMultipleReceipt' },
              ].map((toggle) => (
                <Section key={toggle.key}>
                  <Text variant="labelLarge">{toggle.label}</Text>
                  <IconButton
                    icon={values[toggle.key] ? 'toggle-switch' : 'toggle-switch-off-outline'}
                    iconColor={MD3Colors.error40}
                    size={30}
                    onPress={() => setFieldValue(toggle.key, !values[toggle.key])}
                  />
                </Section>
              ))}
            </SectionRow>

            {/* Error Handling */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Submit Button */}
            {isLoading ? (
              <LoadingComponent size={20} />
            ) : (
              <Button icon="pen" mode="contained" onPress={handleSubmit} style={styles.button}>
                Add
              </Button>
            )}
          </ScrollView>
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
