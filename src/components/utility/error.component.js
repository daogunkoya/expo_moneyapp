import React from 'react'
import { Text } from "../typography/text.component";
import styled from "styled-components/native";

 const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const ErrorMessageComponent = ({error})=>{

    let errorMessage = null
    if(error) errorMessage = error.errorMessage

    return  errorMessage ? (
        <ErrorContainer size="large">
          <Text variant="error">{errorMessage}</Text>
        </ErrorContainer>
      ):null

}