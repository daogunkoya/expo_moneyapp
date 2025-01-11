import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../infrastructure/theme/colors";

const SearchContainer = styled.View`
  margin: ${(props) => props.theme.space[1]};
`;

const FilterItem = styled(Button).attrs((props) => ({
  mode: 'contained',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  contentStyle: {
    backgroundColor: props.isActive ? colors.brand.primary : colors.ui.snow,
    padding: 0.2,
  },
  labelStyle: {
    color: props.isActive ? colors.ui.snow : colors.ui.midnight,
    fontSize: 9,
  },
}))`
  width: 100px; /* Set a fixed width */
`;

const FilterButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ListFilter = ({ filterAction, selectedFilter, filters, filterButtons }) => {


  const isFilterActive = (filterKey) => !!filters[filterKey];

  return (
    <SearchContainer>
      <FilterButtonWrapper>
        {filterButtons.map((option) => (
          <FilterItem
            key={option}
            isActive={isFilterActive(option)}
            onPress={() => filterAction(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </FilterItem>
        ))}
        {selectedFilter && (
          <FilterItem onPress={() => filterAction('cancel')}>
            Cancel
          </FilterItem>
        )}
      </FilterButtonWrapper>
    </SearchContainer>
  );
};
