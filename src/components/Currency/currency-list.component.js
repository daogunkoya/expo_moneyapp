import react, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Divider } from "react-native-paper";
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

export const CurrencyListComponent = ({
  route,
  currencyList,
  currencyType,
  navigateTo,
}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [currecies, setCurrecies] = useState(currencyList);




  const searchCurrencyList = (search) => {};

  const handleSearch = (text) => {
    setSearchText(text);
    if(!text){
      setCurrecies(currencyList);
      return;
    }
    const filtered = currecies.filter((item) =>
      item["currencyCountry"].toLowerCase().includes(text.toLowerCase())
    );
    setCurrecies(filtered);
  };

  useEffect(() => {
    setCurrecies(currencyList);
  }, [currencyList]);

  return (
    <>
      {/* <Search onSearch={searchCurrencyList} placeholder="Search senders" /> */}
      <TextInput
        style={styles.input}
        placeholder="Search currency..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <MemberContainer>
        {currecies.length > 0 ? (
          <FlatList
            data={currecies}
            keyExtractor={(item) => item["currencyId"]}
            renderItem={({ item }) => {
            //  console.log("countrycode", item["currencyId"]);
              return (
                <TouchableOpacity onPress={() => navigateTo(item)}>
                  <MemberInfoCard>
                    <CountryIcon isoCode={item["currencySymbol"]} size={50} />
                    <ListItem>
                      {item["currencyCountry"]?.toUpperCase()}
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