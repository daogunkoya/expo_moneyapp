import React from "react";
import { ErrorText } from "../../styles/common.style";
import { View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { DateInput } from '../../components/date-input.component';
import { TextInput, InputContainer, InputContentwrapper } from "./input-create.styles";
import { TextInputComponent } from '../input/text-input.component';

export const BioInputComponent = ({ values, errors, touched, handleChange, handleBlur, createUser = false }) => {
  return (
    <View>
      <InputContainer>
        <InputContentwrapper>
          <Spacer size="large">
            <TextInputComponent
              label="First name"
              value={values.fname}
              onChangeText={handleChange('fname')}
              onBlur={handleBlur('fname')}
              onError={touched.fname && errors.fname}
            />
            {touched.fname && errors.fname && (
                  <ErrorText >{errors.fname}</ErrorText>
                )}
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="Last name"
              value={values.lname}
              onChangeText={handleChange('lname')}
              onBlur={handleBlur('lname')}
              onError={touched.lname && errors.lname}
            />
            {touched.lname && errors.lname && (
                  <ErrorText >{errors.lname}</ErrorText>
                )}
          </Spacer>
          <Spacer size="large">
          <DateInput
            onChange={handleChange("dateOfBirth")}
            label={ "Date of Birth"}
            value={values.dateOfBirth}
            updateParentDate={() => {}}
            defaultValue={values.dateOfBirth}
            textInputMode="outlined"
            style={{ borderBottomWidth: 7, borderBottomColor: "#D3D3D3", backgroundColor:"transparent" }}
          />
          </Spacer>
        {(!values.email || !createUser) &&
          <Spacer size="large">
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
          </Spacer> }

          <Spacer size="large">
            <TextInputComponent
              label="Phone No"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              onError={touched.phone && errors.phone}
            />
            {touched.phone && errors.phone && (
                  <ErrorText >{errors.phone}</ErrorText>
                )}
          </Spacer>
        </InputContentwrapper>
      </InputContainer>
    </View>
  );
};
