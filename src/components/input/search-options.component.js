import react, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import styled from "styled-components/native";
import { Section,SectionEnd , TextInput , SectionBegin, CenteredView} from "../input/input-create.styles";
import { debounce } from "lodash";
import { TextInputComponent } from "./text-input.component";

const ApiResponse = styled(View)`
  flex: 1;
  flex-direction: column;
  padding: 0;

  background-color: transparent;
`;

const SearchWrapper = styled(View)`
  flex: 1;
 
  background-color: transparent;
`;

export const ToggleButton = styled(TouchableOpacity)`
  flex: 1;
  
  z-index: 999;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

export const SearchOptionComponent = ({onClickListItem, onFetch, list, showAddManually, searchWordInObject, label, inputValue, toggleListItemView}) => {
  const [dataState, setDataState] = useState(false);
  const searchIdentiferInObject = inputValue?.[searchWordInObject] || "";
  const [selectedValue, setSelectedValue] = useState(searchIdentiferInObject);
  
console.log('selectedValue',searchIdentiferInObject)

const debouncedFetch = useCallback(
  debounce((searchWord) => {
    onFetch(searchWord);
  }, 300), // Adjust the debounce delay as needed
  []
);

  const onSearch = (searchWord) => {
    setSelectedValue(searchWord);
    debouncedFetch(searchWord);
    setDataState(true)
  };

  return (
    
      <SearchWrapper>
        <View >
          {showAddManually && <ToggleButton onPress={() => toggleListItemView((prevVal) => !prevVal)}>
            <Text>Add Manually</Text>
          </ToggleButton> }

          <TextInputComponent
           value = { selectedValue }
            style={{ flex: 3 }}
            label = {label}
            onChangeText={(p) => {onSearch(p)}}
            textInputMode="flat"
           // onFocus={() => setDataState(true)}
          />
        </View>
        {dataState && (
          <ApiResponse>
            <FlatList
              style={{ flex: 1, marginTop: 10, marginHorizontal: 70 }}
              data={list}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setDataState(false);
                      onClickListItem(item);
                      setSelectedValue(item[searchWordInObject]);
                    }}
                  >
                    <Text>{item[searchWordInObject]}</Text>
                  </TouchableOpacity>
                );
              }}
              KeyExtractor={(item, index) => index.toString()}
            />
          </ApiResponse>
        )}
      </SearchWrapper>
   
  );
};
