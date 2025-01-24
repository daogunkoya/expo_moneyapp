import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../infrastructure/theme/colors";



const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center; /* Ensure proper vertical alignment */
  justify-content: space-between; /* Space between elements */
`;

const ActionButton = styled(Button).attrs({
  'color': colors.brand.primary,
  'background-color': 'transparent',
})`
  margin-left: ${(props) => props.theme.space[4]};

`;

export const Search = ({buttonTitle, buttonIcon, navigateToScreen, onSearch, filterParam}) => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  
 
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        style={{
          flex: 1, // Take up remaining space
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 12,
          borderRadius: 0,
          borderWidth: 0,
          backgroundColor: 'white',
        }}

          onChangeText={(text) => {
            setSearchKeyword(text)
            onSearch({...filterParam,search:text})
          //  setSearchKeyword(text);
          }}
        //iconColor="red"
        // icon={isFavouritesToggled ? "heart" : "heart-outline"}
        // onIconPress={onFavouritesToggle}
      // 
      />
    
    {buttonTitle &&
    <ActionButton
    style={{backgroundColor:colors.brand.primary}}
      icon={buttonIcon}
      mode="contained"
      onPress={navigateToScreen }
    >{buttonTitle} </ActionButton>}
    </SearchContainer>
  );
};
