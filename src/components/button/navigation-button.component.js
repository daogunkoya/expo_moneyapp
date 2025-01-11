import React from "react"
import { Button , Text} from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../infrastructure/theme/colors";
import {  View } from "react-native";
import { LoadingComponent } from "../loading.component";
import { Spacer } from "../spacer/spacer.component";
import {ButtonContainer, SubmitButton} from "../../styles/common.style"




export const NavigationButtonComponent = ({ 
    isLoading = false,
     firstTitle = "Back", 
     secondTitle = "Submit",
      firstAction,
       secondAction,
       firstIcon = null,
       secondIcon = null
     }) => {
   return (
    <ButtonContainer flexDirection="column">
        {isLoading && <LoadingComponent isLoading={isLoading} />}

        {!isLoading &&
        <>
        <Spacer position="top" size="large" />
        <SubmitButton  onPress={firstAction} icon = {firstIcon} >
        {firstTitle}
            </SubmitButton>
        <SubmitButton  onPress={secondAction} icon = {secondIcon} >
        {secondTitle}
            </SubmitButton>
        </>
        }
    </ButtonContainer>
   );
    
}