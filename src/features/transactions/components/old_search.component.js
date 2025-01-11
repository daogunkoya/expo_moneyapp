import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { TransactionsContext } from "../../../services/transactions/transactions.context";
import { Text } from "../../../components/typography/text.component";
import {LinkCover, LinkItem, LinkWrapper, LinkActive, LinkDisable,Section, FilterItem} from './transaction-list.styles'
import {  FontAwesome } from "@expo/vector-icons";
import {SearchDate} from "./search-date.component"
import { Spacer } from "../../../components/spacer/spacer.component";

const SearchContainer = styled.View`

  padding: ${(props) => props.theme.space[0]};
  
`;




export const Search = ({customerId}) => {
  const {retrieveTransactions,  totalTransactionCount, totalAmount} = useContext(TransactionsContext);
  const [searchKeyword, setSearchKeyword] = useState(null);

  const [linkPosition, setLinkPosition] = useState(0);


  const submitQuery = (value)  =>{
    setLinkPosition(value)
    const requestQuery = value?{moderation_status:value}: {moderation_status:0};
    retrieveTransactions(requestQuery, false);
   }
  
 
  return (
    <SearchContainer>
      <Spacer position= "top" size= "medium">
          <Searchbar
            placeholder="Search for a transaction"
            value={searchKeyword}
            onChangeText={(text) => {
              retrieveTransactions({search:text},false)
            }}
          />
        </Spacer>

    <Spacer position= "top" size= "medium">
    <Section>
          <FilterItem>Total Amount: £{totalAmount}</FilterItem>
          <FilterItem>Count: {totalTransactionCount}</FilterItem>
     </Section>
      </Spacer>

  <LinkCover>
        <LinkWrapper>
          <LinkItem
              onPress={() => submitQuery(0) } >
                ALL</LinkItem>
            {linkPosition == 0?<LinkActive/>:<LinkDisable/>}
          </LinkWrapper> 
          
          <LinkWrapper>
            <LinkItem onPress={() => submitQuery(1) }>PENDING</LinkItem>
            {linkPosition == 1?<LinkActive/>:<LinkDisable/>}
          </LinkWrapper> 
        
          <LinkWrapper>
              <LinkItem onPress={() => submitQuery(2) }>PAID</LinkItem>
              {linkPosition == 2?<LinkActive/>:<LinkDisable/>}
          </LinkWrapper> 
    </LinkCover>

            
     <SearchDate/>
     
             
    </SearchContainer>

    
  );
};
