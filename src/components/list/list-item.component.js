import react, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Divider,IconButton, MD3Colors } from "react-native-paper";
import { Search } from "../search.component";
import {
  CountryIcon,
  ChevronDownIcon,
  IconWrapper,
} from "../../features/send-money.js/components/send-money.styles";
import { useNavigation } from "@react-navigation/native";

const MemberContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const MemberInfoCard = styled.View`
  flex-direction: row;
  margin-top: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[2]};
`;
const ListItem = styled.Text`
  padding: ${(props) => props.theme.space[2]};
  font-size: 12px;
`;

const DividerStyled = styled(Divider)`
  margin-vertical: ${(props) => props.theme.space[2]};
`;

export const ListitemComponent = ({
  dataList,
  itemKey,
  itemName,
  //currencyType,
  onSelect,
}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(dataList);



  const searchCurrencyList = (search) => {};

  const handleSearch = (text) => {
    setSearchText(text);
    if(!text){
      setList(dataList);
      return;
    }
    const filtered = list.filter((item) =>
      item[itemName].toLowerCase().includes(text.toLowerCase())
    );
    setList(filtered);
  };

  useEffect(() => {
    setList(dataList);
  }, [dataList]);

  return (
    <>
      {/* <Search onSearch={searchCurrencyList} placeholder="Search senders" /> */}
      <TextInput
        style={styles.input}
        placeholder="Search ..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <MemberContainer>
        {list.length > 0 ? (
          <FlatList
            data={list}
            keyExtractor={(item) => item[itemKey]}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => onSelect(item)}>
                  <MemberInfoCard>
                  {/* <IconButton
                        icon="camera"
                        iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => console.log('Pressed')}
                      /> */}
                    <ListItem>
                      {item[itemName]?.toUpperCase()}
                    </ListItem>
                  </MemberInfoCard>

                  <DividerStyled />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text>No data found</Text>
        )}
      </MemberContainer>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
  
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});