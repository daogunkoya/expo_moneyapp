import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { ReceiversContext } from "../../../services/receivers/receivers.context";


const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({customerId}) => {
  const {retrieveReceivers} = useContext(ReceiversContext);
  const [searchKeyword, setSearchKeyword] = useState(null);
  
 
  return (
    <SearchContainer>
      <Searchbar
        // icon={isFavouritesToggled ? "heart" : "heart-outline"}
        // onIconPress={onFavouritesToggle}
        placeholder="Search for a receiver"
        value={searchKeyword}
      // 
        onChangeText={(text) => {
          //console.log('editing')
          retrieveReceivers(customerId,text)
        //  setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
