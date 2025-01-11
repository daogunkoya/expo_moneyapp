import React, { useState, useContext } from "react";
import { NavigationButtonComponent } from "../../../components/button/navigation-button.component";
import { TextInputComponent } from "../../../components/input/text-input.component";
import { Formik } from 'formik';
import {SafeArea} from '../../../components/utility/safe-area.component';
import * as Yup from 'yup';
import { ErrorText } from "../../../styles/common.style";
import { LoadingComponent } from "../../../components/loading.component";
import {AccountBackground,  AccountCover,ErrorContainer, InputContainer,  Title, SectionFullWidth, SectionCenter, ContainerCard} from "../../../styles/common.style"

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

 const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginScreen = ({ navigation }) => {
  const [initialValues, setInitialValues] = useState({email: '',password: '',  });

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <SafeArea>
              <AccountBackground>
                <AccountCover />
                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={ (values) => onLogin(values.email, values.password)}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, validateForm }) => (
                          //  <FlatList
                          //  style={{ flex:1, width: "100%", height: "100%" , alignItems: "center" }}
                          //  ListHeaderComponent={ 
                           <SectionFullWidth>
                               <Title style={{textAlign: "center"}}>Login</Title>
                              <InputContainer>
                                <TextInputComponent
                                label="E-mail"
                                value={values.email}
                                textType="email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                onErrorrror={touched.email && errors.email}
                              />
                              {touched.email && errors.email && (
                                    <ErrorText >{errors.email}</ErrorText>
                                  )}
                    
                              <TextInputComponent
                                  label="Password"
                                  textType="password"
                                  value={values.password}
                                  onChangeText={handleChange('password')}
                                  onBlur={handleBlur('password')}
                                  onError={touched.password && errors.password}
                                />
                                {touched.password && errors.password && (
                                      <ErrorText >{errors.password}</ErrorText>
                                    )}
                              {error && (
                                <ErrorContainer size="large">
                                  <Text variant="error">{error}</Text>
                                </ErrorContainer>
                              )}
                              {isLoading && <LoadingComponent/>}
                              {!isLoading && (   
                                  <NavigationButtonComponent
                                    firstTitle="Login"
                                    secondTitle="Back"
                                    firstAction={handleSubmit}  
                                    secondAction={() => navigation.goBack()}
                                  />
                              )}
                          </InputContainer>
                            </SectionFullWidth>
                          //  }
                          //  />
                      )}
                    </Formik>
              </AccountBackground>
            </SafeArea>
  );
};
