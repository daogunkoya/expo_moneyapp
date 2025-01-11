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
import  {CommissionContext} from '../../../services/commissions/commissions.context';

// Validation Schema
const validationSchema = Yup.object().shape({
  currencyId: Yup.string().required('Currency is required'),
 startFrom: Yup.number().required('Start From  is required').required('Start From is required'),
 endAt: Yup.number('End At should be a number').required('End At is required'),
 value: Yup.number('value should be a number').required('value is required'),
 agentQuota: Yup.number('Agent Quota should be a number').required('Agent Quota is required'),
 
});

export const CommissionCreateScreen = ({ navigation, route }) => {
  const { onCommissionAdd, isLoading } = useContext(CommissionContext);
  const [initialValues, setInitialValues] = useState({
    startFrom: '',
    endAt: '',
    value: '',
    agentQuota: '',
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
            onCommissionAdd(values)
            if(error){
              Alert.alert('Error', error);
            }else{
              navigation.navigate("Commission");
            }
          
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <CurrencySelectMenuComponent 
              navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "CommissionCreate" })}
              currencyCode={route.params?.currency?.currencySymbol} 
              countryTitle={route.params?.currency?.currencyCountry}
              />
               {touched.currencyId && errors.currencyId && (
              <Text style={styles.errorText}>{errors.currencyId}</Text>
            )}

                <TextInputComponent
                  label="Start From"
                  value={values.startFrom}
                  onChangeText={handleChange('startFrom')}
                  onBlur={handleBlur('startFrom')}
                  onError={touched.startFrom && errors.startFrom}
                  autoCapitalize="none"
                />
                {touched.startFrom && errors.startFrom && (
                  <Text style={styles.errorText}>{errors.startFrom}</Text>
                )}

                <TextInputComponent
                  label="End At"
                  value={values.endAt}
                  onChangeText={handleChange('endAt')}
                  onBlur={handleBlur('endAt')}
                  error={errors.endAt}
                  touched={touched.endAt}
                />
                {touched.endAt && errors.endAt && (
                  <Text style={styles.errorText}>{errors.endAt}</Text>
                )}

              <TextInputComponent
                  label="Value"
                  value={values.value}
                  onChangeText={handleChange('value')}
                  onBlur={handleBlur('value')}
                  error={errors.value}
                  touched={touched.value}
                />
                {touched.value && errors.value && (
                  <Text style={styles.errorText}>{errors.value}</Text>
                )}      

                <TextInputComponent
                  label="Agent Quota"
                  value={values.agentQuota}
                  onChangeText={handleChange('agentQuota')}
                  onBlur={handleBlur('agentQuota')}
                  error={errors.agentQuota}
                  touched={touched.agentQuota}
                />
            {touched.agentQuota && errors.agentQuota && (
              <Text style={styles.errorText}>{errors.agentQuota}</Text>
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

export default CommissionCreateScreen;
