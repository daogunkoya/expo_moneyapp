import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";
import { CustomersContext } from "../../services/senders/senders.context";


import {
  InputContainer,
  TextInput,
  SummaryCover,
  CenteredView,
  Item,
  Title,
  EditButton,
 ButtonContainer,
  ItemHeading,
} from "./sender-create.styles";

const SubmitButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  max-width: 300px;
  margin-top: 30px;
  align-self: center;
`;

const BlockItem = styled(View)`
  flex: 1;
  margin-top: ${(props) => props.theme.space[1]};
`;

export const SenderSummayComponent = ({
  submitAction,
  updateVisibility,
  senderData,
}) => {
  const { onCustomerRegister, isLoading, error, showErrorBorder } =
    useContext(CustomersContext);

  const editSender = (value) => {
    updateVisibility(value);
  };

  const {
    title,
    fname,
    lname,
    mname,
    dob,
    email,
    phone,
    address,
    postcode,
    additionalData,
  } = senderData;

  const submitSenderData = () => {
    submitAction(senderData);

    if (!error) {
      // navigate("CustomerList");
    }
    updateVisibility("bioBlock");
  };

  return (
    <SummaryCover>
      <CenteredView>
        <Title>Submit Summary</Title>
        <BlockItem>
          <ItemHeading> Name </ItemHeading>
          <Item>{`${fname} ${lname}`}</Item>
        </BlockItem>

        <BlockItem>
          <ItemHeading> Phone </ItemHeading>
          <Item>{`${phone}`} </Item>
        </BlockItem>

        <BlockItem>
          <ItemHeading> Date Of Birth </ItemHeading>
          <Item>{`${dob}`}</Item>
        </BlockItem>

        <BlockItem>
          <ItemHeading> Email </ItemHeading>
          <Item>{`${email}`} </Item>
        </BlockItem>

        <BlockItem>
          <ItemHeading> Address </ItemHeading>
          <Item>{`${address} `} </Item>
        </BlockItem>

        <BlockItem>
          <ItemHeading> Postcode </ItemHeading>
          <Item>{`${postcode} `} </Item>
        </BlockItem>

    <ButtonContainer>
        <SubmitButton icon="send" mode="contained" onPress={submitSenderData}>
          Submit
        </SubmitButton>
        <SubmitButton
          icon="send"
          mode="contained"
          onPress={() => updateVisibility("summaryBlock")}
        >
          Back
        </SubmitButton>
</ButtonContainer>
      </CenteredView>
    </SummaryCover>
  );
};
