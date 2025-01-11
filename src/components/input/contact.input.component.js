import react, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import styled from "styled-components/native";
// import { TextInput } from "react-native-paper";
import { DatePickerComponent } from "../datetime/date-picker.component";
import {
  TextInput,
  InputContainer,
  OptionCover,
  Title,
} from "./input-create.styles";

export const ContactInputComponent = ({
  showErrorBorder,
  setContactData,
  sender,
  errorStyle,
  error,
}) => {
  const { senderEmail = "", senderMobile = "", senderDob = "" } = sender || {};

  const [email, setEmail] = useState(senderEmail);
  const [mobile, setMobile] = useState(senderMobile);
  const [dateOfBirth, setDateOfBirth] = useState(senderDob || "20/05/2021");
  const updateDatePicker = (dateValue) =>
    updateContactData("dateOfBirth", dateValue);

  const updateContactData = (field, value) => {
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;

      default:
        break;
    }
    console.log("value in object", email, mobile, dateOfBirth);
    // setUserAddress({ addressNo, address1, address2, city, postcode, country });
    setContactData({
      email,
      mobile,
      dateOfBirth,
    });
  };

 

  return (
    <View>
      <InputContainer>
        <DatePickerComponent
          updateParentDate={updateDatePicker}
          dob={dateOfBirth}
          errorStyle={errorStyle}
        />

        <Spacer size="large">
          <TextInput
            label="E-mail"
            value={email}
            style={showErrorBorder(error, "senderEmail")}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => updateContactData("email", u)}
          />
        </Spacer>
        {/* <Spacer size="large">
          <TextInput
            label="Mobile No"
            style={showErrorBorder(error, "senderMobile")}
            value={mobile}
            textContentType="name"
            autoCapitalize="none"
            onChangeText={(p) => updateContactData("mobile", p)}
          />
        </Spacer> */}
        <Spacer size="large">
          <TextInput
            label="Phone No"
            style={showErrorBorder(error, "senderPhone")}
            value={mobile}
            textContentType="name"
            autoCapitalize="none"
            onChangeText={(p) => updateContactData("mobile", p)}
          />
        </Spacer>
      </InputContainer>
    </View>
  );
};
