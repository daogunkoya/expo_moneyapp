import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Spacer } from "../../../components/spacer/spacer.component";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { TransactionsContext } from "../../../services/transactions/transactions.context";
import { Text } from "../../../components/typography/text.component";
import {DateInput,SearchDateContainer,DateInputWrapper,Section, LinkCover, FilterItem, LinkWrapper, LinkActive, LinkDisable, FilterWrapper} from './transaction-list.styles'






export const SearchDate = ({customerId}) => {
  const {retrieveTransactions} = useContext(TransactionsContext);
  const [linkPosition, setLinkPosition] = useState(0);

  //date values
  const [date, setDate] = useState(new Date());
  const [startEndStatus, setStartEndStatus] = useState(0);
  const [dateStart, setDateStart] = useState('20/05/2021');
  const [dateEnd, setDateEnd] = useState('20/05/2021');
  
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const updatedDate = currentDate.toLocaleDateString('en-GB')
    
    if(startEndStatus == 1)setDateStart(updatedDate)
    if(startEndStatus == 2)setDateEnd(updatedDate)

    setShow(false)

  };


  // const showMode = (currentMode ='date', startEnd) => {
  //   setStartEndStatus(startEnd);
  //   setShow(!show);
  //   setMode(currentMode);
  // };

  const filterQuery = (value)  =>{
   setStartEndStatus(value);

   if(value == 1 || value ==  2){
        setShow(!show);
   } 
    setMode('date');

    setLinkPosition(value)

    requestQuery = null;
    
    switch(value){
        case 1:
         requestQuery = {date_start:dateStart,date_end:dateEnd};
         break;
        case 2:
         requestQuery = {date_start:dateStart,date_end:dateEnd};
        break;
        case 3:
         requestQuery = {date_length:"today"};
        break;
        case 4:
         requestQuery = {date_length:"yesterday"};
        break;
        default:
          return;

    }
    retrieveTransactions(requestQuery, false);
   }

 
  return (
    <SearchDateContainer>
            <DateInputWrapper>
               <Spacer position= "right" size= "medium">
                <Section>

                   <FontAwesome name="calendar" size={18} color="black" style ={{padding:0}} />
                  <FilterWrapper>
                      <FilterItem onPress={() => filterQuery(3)}> | Today | </FilterItem>
                      {linkPosition == 3 ?<LinkActive/>:<LinkDisable/>}
                  </FilterWrapper>
                 
                  <FilterWrapper>
                     <FilterItem onPress={() => filterQuery(4)}>Yesterday  </FilterItem>
                     {linkPosition == 4?<LinkActive/>:<LinkDisable/>}
                  </FilterWrapper>
                  
                </Section>

                
              </Spacer> 
                <Spacer position= "right" size= "medium">
                  <DateInput
                    label="Date Start"
                  // style={showErrorBorder(error,'senderDob')}
                    editable = {false}
                    value = {dateStart}
                    onPressIn={ ()=>filterQuery(1 )}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={(p) => setDateStart(p)}
                  />
                </Spacer>

                <Spacer position= "right" size= "medium">
                  <DateInput
                    label="Date end"
                  // style={showErrorBorder(error,'senderDob')}
                     editable = {false}
                    value = {dateEnd}
                    onPressIn={ ()=>filterQuery(2)}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={(p) => setDateEnd(p)}
                  />
                </Spacer>
            </DateInputWrapper>
        
         
          
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
      )}
        
     
    </SearchDateContainer>

    
  );
};
