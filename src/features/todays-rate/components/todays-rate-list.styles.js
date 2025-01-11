import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const TodaysRateList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const TodaysRateButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  background-color:purple
  width: 80%;
  align-self: center;
`;
