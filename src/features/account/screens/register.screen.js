import React, { useState, useContext } from 'react';
import { View, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { AccountBackground, ErrorContainer } from '../../../components/sender/sender-create.styles';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AddressInputComponent } from '../../../components/address/address.component';
import { BioInputComponent } from '../../../components/input/bio.input.component';
import { ProgressBarComponent } from '../../../components/progressbar/progressbar.component';
import {NavigationButtonComponent} from '../../../components/button/navigation-button.component';
import { Summary } from '../../../components/summary/summary.component';
import { LoadingComponent} from "../../../components/loading.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from '../../../components/utility/safe-area.component';
import {AuthRegisterComponent} from "../../../features/account/components/auth-register.component";
import {validationSchema,  continueAction, initialValues} from '../utility'


export const RegisterScreen = ({  navigation }) => {

  const { onRegister:onSubmitData, isLoading, error } = useContext(AuthenticationContext);

  // const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [pageHeaders, setPageHeaders] = useState(["Auth", "Bio", "Address", "Summary"]);
  const [validationErrors, setValidationErrors] = useState([]);

 console.log('validationErrprs', validationErrors)
  

  const summaryData = (item) => ({
    "First Name": item?.fname,
    "Last Name": item?.lname,
    "Email": item?.email,
    "Date Of Birth": item?.dateOfBirth,
    "Phone": item?.phone,
    "Address": item?.address,
    "Postcode": item?.postcode,
  });

  const handleFormSubmit = (values) => {
    
    const updatedValues = {
      ...values,
      address: `${values.addressNo} ${values.address1} ${values.address2} ${values.city} ${values.postcode} ${values.country}`,
      metaData: {
        addressNo: values.addressNo ,
        address1: values.address1 ,
        address2: values.address2 ,
        city: values.city ,
        postcode: values.postcode ,
        country: values.country ,
      }
    };
      
    onSubmitData(updatedValues);
  };

  return (
    <SafeArea>
    <AccountBackground>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, validateForm }) => (
          <FlatList
            style={{ flex: 1, width: "100%", height: "100%" }}
            ListHeaderComponent={
              <>
                <View>
                  <ProgressBarComponent steps={pageHeaders} currentStep={page} />
                 
                 {page === 0 &&
                  <AuthRegisterComponent
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />}

                 {page === 1 &&
                  <BioInputComponent
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    createUser = {true}
                  />}
                  
                  {page === 2 &&
                      <AddressInputComponent
                      values={values}
                      errors={errors.address}
                      touched={touched.address}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    >
                   
                   
                  </AddressInputComponent>
                    }

                    { page === 3 &&
                      <Summary 
                      summaryItems={summaryData(values)} 
                      submitAction={null} 
                    />

                    } 

                   
                </View>
                <Spacer size="large">
                {isLoading? <LoadingComponent />
                :
                    <NavigationButtonComponent 
                      isLoading={isLoading}
                      firstTitle="Back"
                      secondTitle="Continue" 
                      firstAction={ page > 0 ? () => setPage(page - 1) : () => navigation.goBack() }
                      secondAction={ () => continueAction( validateForm, pageHeaders, handleSubmit, setPage, page, setValidationErrors) }
                    />
            }
                </Spacer>
                    {(error || validationErrors) && (
                          <ErrorContainer size="large">
                            <Text variant="error">{error?.errorMessage}</Text>
                            {validationErrors && validationErrors.map((error, index) => (
                              <Text key={index} variant="error">{error}</Text>
                            )) 
                            }
                          </ErrorContainer>
                        )}
              </>
            }
          />
        )}
      </Formik>
    </AccountBackground>
</SafeArea>
  );
};
