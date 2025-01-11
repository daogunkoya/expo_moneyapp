import React, { useContext , useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputComponent } from '../../../components/input/text-input.component';
import { RateContext } from "../../../services/rates/rates.context";
import { CurrencySelectMenuComponent } from '../../../components/Currency/currency-select-menu.component';
import { LoadingComponent } from '../../../components/loading.component';

// Validation Schema
const validationSchema = Yup.object().shape({
  currencyId: Yup.string().required('Currency is required'),
 mainRate: Yup.number().required('Main Rate is required'),
 bouRate: Yup.number('Bou Rate should be a number'),
 soldRate: Yup.number('Bou Rate should be a number'),
});

export const RateCreateScreen = ({ navigation, route }) => {
  const { onRateAdd, isLoading } = useContext(RateContext);
  const [initialValues, setInitialValues] = useState({
    mainRate: '',
    bouRate: '',
    soldRate: '',
    currencyId: route.params?.currency?.currencyId || '',
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
            onRateAdd(values)
            if(error){
              Alert.alert('Error', error);
            }else{
              navigation.navigate("Rate");
            }
          
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <CurrencySelectMenuComponent 
              navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "RateCreate" })}
              currencyCode={route.params?.currency?.currencySymbol} 
              countryTitle={route.params?.currency?.currencyCountry}
              />
               {touched.currencyId && errors.currencyId && (
              <Text style={styles.errorText}>{errors.currencyId}</Text>
            )}

            <TextInputComponent
              label="Main Rate"
              value={values.mainRate}
              onChangeText={handleChange('mainRate')}
              onBlur={handleBlur('mainRate')}
              onError={touched.mainRate && errors.mainRate}
              autoCapitalize="none"
            />
            {touched.mainRate && errors.mainRate && (
              <Text style={styles.errorText}>{errors.mainRate}</Text>
            )}

            <TextInputComponent
              label="Bou Rate"
              value={values.bouRate}
              onChangeText={handleChange('bouRate')}
              onBlur={handleBlur('bouRate')}
              error={errors.bouRate}
              touched={touched.bouRate}
            />
            {touched.bouRate && errors.bouRate && (
              <Text style={styles.errorText}>{errors.bouRate}</Text>
            )}

            <TextInputComponent
              label="Sold Rate"
              value={values.soldRate}
              onChangeText={handleChange('soldRate')}
              onBlur={handleBlur('soldRate')}
              error={errors.soldRate}
              touched={touched.soldRate}
            />
            {touched.soldRate && errors.soldRate && (
              <Text style={styles.errorText}>{errors.soldRate}</Text>
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

export default RateCreateScreen;
