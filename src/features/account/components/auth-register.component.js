import React, { useState, useContext } from "react";
import { View } from "react-native";
import { TextInputComponent} from "../../../components/input/text-input.component";
import {InputContainer} from "../../../styles/common.style"
import { ErrorText } from "../../../styles/common.style";

import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const AuthRegisterComponent = ({ values, errors, touched, handleChange, handleBlur }) => {
  
  return (
    <View>
      <InputContainer>
            
              
                  <TextInputComponent
                    label="E-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onErrorrror={touched.email && errors.email}
                  />
                  {touched.email && errors.email && (
                        <ErrorText >{errors.email}</ErrorText>
                      )}
                <Spacer size="large" />
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

                  <Spacer size="large" />

                  <TextInputComponent
                    label="Confirm Password"
                    value={values.cpassword}
                    textType="password"
                    onChangeText={handleChange('cpassword')}
                    onBlur={handleBlur('cpassword')}
                    onError={touched.cpassword && errors.cpassword}
                  />
                  {touched.cpassword && errors.cpassword && (
                        <ErrorText >{errors.cpassword}</ErrorText>
                      )}
              {/* <Spacer size="large">
                <AuthInput
                  label="Password"
                  value={password}
                  textContentType="password"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(p) => setPassword(p)}
                />
              </Spacer>
              <Spacer size="large">
                <AuthInput
                  label="Repeat Password"
                  value={repeatedPassword}
                  textContentType="password"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(p) => setRepeatedPassword(p)}
                />
              </Spacer> */}
        </InputContainer>
    </View>
  );
};
