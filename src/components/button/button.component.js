import React from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";

export const StyledButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[0]};
  margin-bottom: 0;
  margin-top: 0;
  border-radius: 0;
  align-self: center;
`;

const SubmitButton = styled(Button).attrs((props) => ({
  color: colors.brand.primary,
  mode: 'contained',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  contentStyle: {
      backgroundColor: props.isActive ? colors.brand.primary : colors.ui.snow,
      padding: 0.2
  },
  labelStyle: {
      color: props.isActive ? colors.ui.snow : colors.ui.midnight,
      fontSize: 9
  },
}))`
  color: ${colors.brand.primary};
`;

export const ButtonComponent = ({  buttonLabel, navigateOnPress }) => {
  const navigation = useNavigation();

  return (
    <Spacer position="bottom" size="large">
      {/* <StyledButton
        icon="pen"
        mode="contained"    
        onPress={navigateOnPress}
      >
        {buttonLabel} 
      </StyledButton> */}

      <SubmitButton  icon="pen">
         {buttonLabel}
      </SubmitButton>
    </Spacer>
  );
};
