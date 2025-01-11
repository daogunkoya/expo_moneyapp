import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components/native";
import { Searchbar, Text } from "react-native-paper";
import { Button } from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";
import { debounce } from 'lodash';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  justify-content: space-around;
  color: colors.brand.primary;
`;


const TitleWrapper = styled.View`
margin-left: ${(props) => props.theme.space[4]};
margin-right: ${(props) => props.theme.space[4]};
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  color: colors.brand.primary;
  justify-content: space-between;
`;

const SearchIconWrapper = styled.View`
  align-self: flex-end;
`;

export const SearchWithHeaderComponent = ({title,  filterAction, onSearch}) => {
  const [searchKeyword, setSearchKeyword] = useState(null);

  const [showTitle, setShowTitle] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const debouncedSearch = useCallback(
    debounce((onSearch,text) => {
      console.log("debounce", text);
      onSearch({ label: "search", value: text });
    }, 200),
    []
  );

  const handleSearchChange = (text) => {
    filterAction("search");
    setSearchKeyword(text);
    debouncedSearch(onSearch,text);
  };

  const StyledSearchBar = styled(Searchbar)`
    width: 80%;
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 12px;
    border-width: 0;
  `;

  
 
  return (
    <>
       {showSearchInput && <SearchContainer>
          <StyledSearchBar
            placeholder="Search"
            value={searchKeyword}
            
           onChangeText={handleSearchChange}
          />
          <Button
            onPress={() => {
              setShowTitle(!showTitle)
              setShowSearchInput(!showSearchInput)
            }}
          >Cancel</Button>
        </SearchContainer>}
        
        {showTitle &&
        <TitleWrapper>
          <Text variant="labelMedium">{title}</Text>
            <SearchIconWrapper>
                <AntDesign
                  name="search1"
                  size={24}
                  color="black"
                  onPress={() => {
                    setShowTitle(!showTitle)
                  setShowSearchInput(!showSearchInput)
                  }}
              />
              </SearchIconWrapper>
              
        </TitleWrapper>}

        
    </>
  );
};
