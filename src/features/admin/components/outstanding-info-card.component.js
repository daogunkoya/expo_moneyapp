import React, { memo } from "react";
import styled from "styled-components/native";
import {  TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome,FontAwesome6, Entypo } from "@expo/vector-icons";
import { Button, Text, Card,Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SectionRow, Section, TextGrayBackground, SectionBegin, SectionEnd, ContainerCard, PaddedView, ValueText, TextItem } from "../../../styles/common.style";
import { Spacer } from "../../../components/spacer/spacer.component";




export const OutstandingInfoCard = memo(({
    name,
    role,
    navigateToOutstandingPaymentList,
    navigateToOutstandingCommissionList
   }) => {

    const navigation = useNavigation();

    return (
        <ContainerCard  elevation={2}>
          <PaddedView>
              <TextGrayBackground variant="small">{role}</TextGrayBackground>
           <Section>
             <TextItem variant="titleMedium">{name}</TextItem>
            </Section>
            <SectionRow>
            <Section>
                <TouchableOpacity onPress={ navigateToOutstandingCommissionList}>
                    <TextItem variant="bodySmall" > £124.00 Pending </TextItem>
                    <TextItem variant="bodySmall" > £124.00 Paid </TextItem>
                </TouchableOpacity>
                 
            </Section>
            <Section>
                <TouchableOpacity onPress={navigateToOutstandingPaymentList}>
                   
                    <TextItem variant="bodySmall" > £124.00 Pending </TextItem>
                    <TextItem variant="bodySmall" > £124.00 Paid </TextItem>
                 </TouchableOpacity>
            </Section>
               
            </SectionRow>
            <Spacer size="large" />
            <Divider />    
          </PaddedView>
        </ContainerCard>
      );
});
