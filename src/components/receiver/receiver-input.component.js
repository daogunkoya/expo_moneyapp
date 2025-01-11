import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import {  View, FlatList } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputComponent } from "../input/text-input.component";

import { SearchOptionComponent } from "../input/search-options.component";
import {
  AccountBackground,
  CustomerButton,
  ErrorContainer,
  ButtonContainer,
} from "./receiver-create.styles";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";

export const ReceiverInputComponent = ({
  submitReceiverData,
  error,
  isLoading,
  receiver,
  retrieveBankList,
  bankList,
  senderId,
}) => {
  const {
    receiverAddress= "",
    accountNumber = "",
    receiverBanks = {},
    receiverFname = "",
    receiverLname = "",
    receiverPhone = "",
  } = receiver || {};

  const validationSchema = Yup.object().shape({
    receiverFname: Yup.string().required('First name is required'),
    receiverLname: Yup.string().required('Last name is required'),
    receiverAddress: Yup.string().required('Address is required'),
    receiverPhone: Yup.string().required('Phone number is required'),
    accountNumber: Yup.string().required('Account number is required'),
    receiverBanks: Yup.object().required('Bank is required'),
  });

  const initialValues = {
    receiverFname,
    receiverLname,
    receiverAddress,
    receiverPhone,
    accountNumber,
    receiverBanks,
  };

  const onSubmit = (values) => {
    const formData = {
      fname: values.receiverFname,
      lname: values.receiverLname,
      phone: values.receiverPhone,
      address: values.receiverAddress,
      accountNumber: values.accountNumber,
      bank: values.receiverBanks,
      senderId: senderId
    };

    console.log("formData =", formData);

   submitReceiverData(formData,receiver);
  };

  return (
    <AccountBackground>
      <FlatList
        style={{ flex: 1, width: "100%", height: "100%", }}
        ListHeaderComponent={
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <>
                <View style={{ marginHorizontal:7}}>
                  <Spacer size="large">
                    <TextInputComponent
                      label="First name"
                      disabled={true}
                      value={values.receiverFname}
                      onChangeText={handleChange('receiverFname')}
                      onBlur={handleBlur('receiverFname')}
                      onError={touched.receiverFname && errors.receiverFname}
                      textContentType="name"
                      autoCapitalize="none"
                    />
                  </Spacer>
                  <Spacer size="large">
                    <TextInputComponent
                      label="Last name"
                      disabled={true}
                      value={values.receiverLname}
                      onChangeText={handleChange('receiverLname')}
                      onBlur={handleBlur('receiverLname')}
                      onError={touched.receiverLname && errors.receiverLname}
                      textContentType="name"
                      autoCapitalize="none"
                    />
                  </Spacer>
                  <Spacer size="large">
                    <TextInputComponent
                      label="Address"
                      value={values.receiverAddress}
                      onChangeText={handleChange('receiverAddress')}
                      onBlur={handleBlur('receiverAddress')}
                      onError={touched.receiverAddress && errors.receiverAddress}
                      autoCapitalize="none"
                    />
                  </Spacer>
                  <Spacer size="large">
                    <TextInputComponent
                      label="Phone No"
                      value={values.receiverPhone}
                      onChangeText={handleChange('receiverPhone')}
                      onBlur={handleBlur('receiverPhone')}
                      onError={touched.receiverPhone && errors.receiverPhone}
                      autoCapitalize="none"
                    />
                  </Spacer>
                  <Spacer size="large">
                    <TextInputComponent
                      label="Account Number"
                      disabled={true}
                      value={values.accountNumber}
                      onChangeText={handleChange('accountNumber')}
                      onBlur={handleBlur('accountNumber')}
                      onError={touched.accountNumber && errors.accountNumber}
                      autoCapitalize="none"
                    />
                  </Spacer>
                  <Spacer size="large">
                  <TextInputComponent
                      label="Bank"
                      disabled={true}
                      value={values.receiverBanks?.name}
                      onChangeText={handleChange('receiverBanks')}
                      onBlur={handleBlur('receiverBanks')}
                      onError={touched.receiverBanks && errors.receiverBanks}
                      autoCapitalize="none"
                    />
                  </Spacer>
                  {(errors.receiverBanks && touched.receiverBanks) && (
                    <Spacer size="large">
                      <ErrorContainer size="large">
                        <Text variant="error" style={{ color: "white" }}>
                          {errors.receiverBanks}
                        </Text>
                      </ErrorContainer>
                    </Spacer>
                  )}
                
                </View>
                <Spacer size="large">
                  <ButtonContainer>
                    {!isLoading ? (
                      <CustomerButton
                        icon={receiver ? "pencil" : "plus"}
                        mode="contained"
                        onPress={handleSubmit}
                      >
                        {receiver ? "Update" : "Add"}
                      </CustomerButton>
                    ) : (
                      <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    )}
                  </ButtonContainer>
                </Spacer>
              </>
            )}
          </Formik>
        }
      />
    </AccountBackground>
  );
};
