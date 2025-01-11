import React, { useContext, useState , useEffect} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DateInput} from '../../../components/date-input.component';
import {RadioButton} from '../../../components/radiobutton-input.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { UserContext } from '../../../services/user/user.context';
import { LoadingComponent } from '../../../components/loading.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { CurrencySelectMenuComponent } from '../../../components/Currency/currency-select-menu.component';
// Validation Schema
const validationSchema = Yup.object().shape({
  selectCurrency: Yup.string().required('Currency is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required'),
  
});

export const AccountStatementScreen = ({ navigation, route }) => {
  const { authData } = useContext(AuthenticationContext);
  const { isLoading, error, onGenerateTransactionReport } = useContext(UserContext);
  const [currencySelected, setCurrencySelected] = useState('');

  const [format, setFormat] = useState('PDF'); // Default format

  const [initialValues, setInitialValues] = useState({
    selectCurrency: route.params?.selectedDestinationCurrency || '',
    startDate: '',
    endDate: '',
    format: format,
  });

  useEffect(() => {
    if (route.params?.selectedDestinationCurrency) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        selectCurrency: route.params?.selectedDestinationCurrency?.currencyId,
      }));
    }
  }, [route.params?.selectedDestinationCurrency]);


  return (
    <View style={styles.container}>
        {isLoading && <LoadingComponent />}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} // To update the form when initialValues change
        validationSchema={validationSchema}
        onSubmit={(values) => {
           // console.log('initial values=', initialCurrency)
           onGenerateTransactionReport({
            selectCurrency: values.selectCurrency,
             startDate: values.startDate,
              endDate: values.endDate, 
              format: values.format.toLowerCase()});
              if(error){
                Alert.alert('Error', error);
               // Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
              }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) =>  (
          <View>
            <CurrencySelectMenuComponent
              navigateTo={() => navigation.navigate('AccountStatementCurrencySearch')}
              currencyCode={route.params?.selectedDestinationCurrency?.currencySymbol}
              countryTitle = {route.params?.selectedDestinationCurrency?.currencyTitle}/>
          
            {touched.selectCurrency && errors.selectCurrency && (
              <Text style={styles.errorText}>{errors.selectCurrency}</Text>
            )}

            <Spacer size="large"/>

            <DateInput
              label="DD/MM/YYYY"
              value={values.startDate}
              onChange={(date) => setFieldValue('startDate', date)}
              error={errors.startDate}
              touched={touched.startDate}
              textInputMode="outlined"
            />

            <Spacer size="large"/>

            <DateInput
              label="DD/MM/YYYY"
              value={values.endDate}
              onChange={(date) => setFieldValue('endDate', date)}
              error={errors.endDate}
              touched={touched.endDate}
            />

              <Spacer size="large"/>

            <View style={styles.radioGroup}>
              <RadioButton
                label="PDF"
                value="PDF"
                selectedValue={values.format}
                onPress={(value) => {
                  setFieldValue('format', value);
                  setFormat(value);
                }}
              />
              <RadioButton
                label="Excel"
                value="Excel"
                selectedValue={values.format}
                onPress={(value) => {
                  setFieldValue('format', value);
                  setFormat(value);
                }}
              />
            </View>
            {touched.format && errors.format && (
              <Text style={styles.errorText}>{errors.format}</Text>
            )}

            
           { !isLoading && <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Get Statement
            </Button>}
          </View>
        )
        }
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
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});

export default AccountStatementScreen;
