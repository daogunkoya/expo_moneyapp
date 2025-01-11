import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";

export const CustomerList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const CustomerButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[0]};
  margin-bottom:0;
  margin-top:0;
 border-radius: 0;
  align-self: center;
`;
