import react from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from '@react-navigation/native';

 const RecentList = styled(FlatList).attrs({
    contentContainerStyle: {
     padding: 10,
    },
  })`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[4]};
`

const ItemContainer = styled.TouchableOpacity`
    align-items: center;
    padding: ${(props) => props.theme.space[2]};
    margin-left: ${(props) => props.theme.space[2]};
    border-width: 1px;
    border-color: ${colors.brand.primary};
    margin-bottom: ${(props) => props.theme.space[1]};
    border-radius: ${(props) => props.theme.space[1]};
`;

const ItemReceiverName = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.xsmall};
   
`;
const ItemReceiverBank = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.xsmall};

`;

const ListLabel = styled.Text`
margin-left: ${(props) => props.theme.space[2]};
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-bottom: ${(props) => props.theme.space[2]};
`;

export const HomeRecentTransaction = ({transactions}) => {
    const navigation = useNavigation();
    
console.log('recent=', transactions)
    return (
        <>
        <ListLabel>Send Again</ListLabel>
        <RecentList
           data = {transactions}
            renderItem={({ index, item }) => {
               if(index < 4){
                   return (
                       <ItemContainer
                           onPress={() => 
                               navigation.reset({
                                 index: 0,
                                 routes: [
                                   {
                                     name: "Send",
                                     params: { screen: "SendMoneyAmountCalculator" },
                                   },
                                 ],
                               })}>
                           <ItemReceiverName>{item.receiverFname.toUpperCase()} {item.receiverLname.toUpperCase()}</ItemReceiverName>
                           <ItemReceiverBank>{item.receiverBank['name']}</ItemReceiverBank>
                       </ItemContainer>
                   );
               }
            }

        }
            keyExtractor={(item) => item.transactionId}
        />
        </>
    );
}