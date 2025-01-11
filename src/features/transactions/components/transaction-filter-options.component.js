import react from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";
import { TouchableOpacity } from "react-native";
import { TransactionFilterWrapperComponent } from "./transaction-filter-wrapper.component";
import {AntDesign} from "@expo/vector-icons";

const OptionContainer = styled(TouchableOpacity)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.space[0]};
    margin: ${(props) => props.theme.space[1]};
    `
const SearchTransactionOptionsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 10,
  },
})``;

const FilterText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  padding: ${(props) => props.theme.space[2]};
`;

export const TransactionFilterOptionsComponent = ({
  filterOptions,
  title,
  filterAction,
  submitAction,
  filters,
}) => {
    isOptionActive = (itemLabel) => Object.values(filters).includes(itemLabel)

  return (
    <TransactionFilterWrapperComponent
      filterOptions={filterOptions}
      title={title}
      filterAction={filterAction}
      submitAction={submitAction}
    >
      <SearchTransactionOptionsList
        data={filterOptions}
        renderItem={({ item }) => {
          return (
            <OptionContainer onPress={() => submitAction(item)}>
              <FilterText>{item.label}</FilterText>
              {
                isOptionActive(item.value) && <AntDesign name="check" size={14} color="black" />
              }
             
            </OptionContainer>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </TransactionFilterWrapperComponent>
  );
};
