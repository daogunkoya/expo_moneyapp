import React, { useContext , useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputComponent } from '../../../components/input/text-input.component';
import { RateContext } from "../../../services/rates/rates.context";
import { CurrencySelectMenuComponent } from '../../../components/Currency/currency-select-menu.component';
import { LoadingComponent } from '../../../components/loading.component';
import { SpaceBetweenSection, Section, SectionRow } from '../../../styles/common.style';
import  {BankContext} from '../../../services/banks/banks.context';
import {RadioButton} from '../../../components/radiobutton-input.component';
import { Spacer } from '../../../components/spacer/spacer.component';

// Validation Schema
const validationSchema = Yup.object().shape({
 name: Yup.string().required('Bank name is required'),
 currencyId: Yup.string().required('Currency is required'),
 bankCategory: Yup.string().required('Bank Category is required'),

});

export const BankCreateScreen = ({ navigation, route }) => {
  const { onBankAdd, isLoading } = useContext(BankContext);
  const [category, setCategory] = useState('b'); // Default format
  const [initialValues, setInitialValues] = useState({
    name: '',
    currencyId: route.params?.currency?.currencyId || '',
    bankCategory:category
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (route.params?.currency?.currencyId) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        currencyId: route.params.currency.currencyId,
      }));
    }
  }, [route.params?.currency?.currencyId]);

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            console.log('submitted values',values);
            onBankAdd(values)
            if(error){
              Alert.alert('Error', error);
            }else{
              navigation.navigate("Bank");
            }
          
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <CurrencySelectMenuComponent 
              navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "BankCreate" })}
              currencyCode={route.params?.currency?.currencySymbol} 
              countryTitle={route.params?.currency?.currencyCountry}
              />
               {touched.currencyId && errors.currencyId && (
              <Text style={styles.errorText}>{errors.currencyId}</Text>
            )}

            <Spacer size="medium" />
           <SectionRow>
              <RadioButton
                label="Bank"
                value="b"
                selectedValue={values.bankCategory}
                onPress={(value) => {
                  setFieldValue('bankCategory', "b");
                  setCategory(value);
                }}
              />
              <RadioButton
                label="Pick Up"
                value="p"
                selectedValue={values.bankCategory}
                onPress={(value) => {
                  setFieldValue('bankCategory', "p");
                  setCategory(value);
                }}
              />
              
            </SectionRow>
            {touched.bankCategory && errors.bankCategory && (
              <Text style={styles.errorText}>{errors.bankCategory}</Text>
            )}

            <Spacer size="medium" />
                <TextInputComponent
                  label="Bank Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onError={touched.name && errors.name}
                  autoCapitalize="none"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}


              {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {
            isLoading ? <LoadingComponent size = {20} /> : 
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >Add </Button>
            }

              
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

export default BankCreateScreen;
