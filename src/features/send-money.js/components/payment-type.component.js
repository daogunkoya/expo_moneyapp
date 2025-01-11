import React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "../../../components/radiobutton-input.component";
import { styles } from "../components/send-money.styles";
import {
  Section,
  SectionBegin,
  SectionEnd,
  SectionCenter,
  HorizontallMaginSection,
  CardWrapper,
  SubmitButton,
  InputContainer,
} from "../../../styles/common.style";
import { Spacer } from "../../../components/spacer/spacer.component";

export const PaymentTypeComponent = ({handleOption}) => {
  return (
    <InputContainer>
      <RadioButton
        label="Manual Payment"
        value="Transfer Payment"
        selectedValue={"Transfer Payment"}
        onPress = {handleOption}
        // onPress={(value) => {
        // setFieldValue('format', value);
        // setFormat(value);
        // }}
      />

      <Spacer size="large" />

      <RadioButton
        label="Card Payment"
        value="Card"
        selectedValue={"Transfer Payment"}
        onPress = {handleOption}
        // onPress={(value) => {
        // setFieldValue('format', value);
        // setFormat(value);
        // }}
      />

      <Spacer size="large" />

      <RadioButton
        label="Bank Transfer"
        value="Bank Transfer"
        selectedValue={"Transfer Payment"}
        onPress = {handleOption}
        // onPress={(value) => {
        // setFieldValue('format', value);
        // setFormat(value);
        // }}
      />
    </InputContainer>
  );
};
