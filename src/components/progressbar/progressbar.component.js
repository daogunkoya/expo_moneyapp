import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const BarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[4]};
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
`;

const StepContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

const Label = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[3]};
  text-align: center;
`;

const ActiveLine = styled.View`
  height: ${(props) => props.theme.space[2]};
  width: 100%;
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 2px;
`;





export const ProgressBarComponent = ({ steps, currentStep }) => {
  return (
    <BarContainer>
      {steps.map((step, index) => (
        <StepContainer key={index} >
          <Label>{step}</Label>
          
          {index == currentStep && <ActiveLine />}
        </StepContainer>
      ))}
    </BarContainer>
  );
};

