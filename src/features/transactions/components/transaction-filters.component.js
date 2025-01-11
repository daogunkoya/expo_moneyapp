import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

const SearchContainer = styled.View`
    margin: ${(props) => props.theme.space[1]};
`;

const SearchOption = styled(Button).attrs((props) => ({
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

const SearchButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;

export const TransactionFilters = ({ filterAction, selectedFilter, filters }) => {
    const DATE = 'date';
    const STATUS = 'status';
    const CURRENCY = 'currency';

    const isFilterActive = (filterKey) => !!filters[filterKey];

    const SearchTransactionFilter = (option) => {
        filterAction(option);
    };

    return (
        <SearchContainer>
            <SearchButtonWrapper>
                <SearchOption 
                    isActive={isFilterActive(DATE)} 
                    onPress={() => SearchTransactionFilter(DATE)}
                >
                    Date Range
                </SearchOption>
                <SearchOption 
                    isActive={isFilterActive(STATUS)} 
                    onPress={() => SearchTransactionFilter(STATUS)}
                >
                    Status
                </SearchOption>
                <SearchOption 
                    isActive={isFilterActive(CURRENCY)} 
                    onPress={() => SearchTransactionFilter(CURRENCY)}
                >
                    Currency
                </SearchOption>
                {selectedFilter && (
                    <SearchOption onPress={() => SearchTransactionFilter('cancel')}>
                        Cancel
                    </SearchOption>
                )}
            </SearchButtonWrapper>
        </SearchContainer>
    );
};
