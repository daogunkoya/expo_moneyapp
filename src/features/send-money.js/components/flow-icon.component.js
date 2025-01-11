import React from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../infrastructure/theme/colors";

const iconSize = 40;

const RoundedIcon = styled(AntDesign).attrs({})`
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: ${iconSize / 2}px;
  padding: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.brand.primary};
  align-items: center;
`;

const TextInfo = styled.Text`
  font-size: ${(props) => props.theme.sizes[0]};
  color: ${colors.brand.primary};
`;

const RoundedIconContainer = styled.View`
margin-left: ${(props) => props.theme.space[7]};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

`;

export const FlowIconComponent = ({ totalAmount, iconName }) => {
  return (
    <RoundedIconContainer>
      <ContentWrapper>
        <RoundedIcon name={iconName} size={30} color="green" />
        <TextInfo>{totalAmount}</TextInfo>
      </ContentWrapper>
    </RoundedIconContainer>
  );
};
