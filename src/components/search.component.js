import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../infrastructure/theme/colors";


const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  justify-content: space-around;
  color: colors.brand.primary;

  
`;
const ActionButton = styled(Button).attrs({
  'color': colors.brand.primary,
  'background-color': 'transparent',
  
})`
  padding: ${(props) => props.theme.space[0]};
  margin-bottom:0;
  margin-top:0;
  margin-right: ${(props) => props.theme.space[4]};
 border-radius: ${(props) => props.theme.sizes[2]};
  align-self: center;
  
  color: red;
`;

export const Search = ({buttonTitle, buttonIcon, navigateToScreen, onSearch, filterParam}) => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  
 
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        style={{width:'100%',marginTop:0,marginBottom:0,marginLeft:12,borderRadius:0, borderWidth:0, backgroundColor:'white'}}
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
