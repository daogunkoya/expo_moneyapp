import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";


export const TransactionContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.);
  padding: ${(props) => props.theme.space[1]};
  margin-top: ${(props) => props.theme.space[1]};
`;

export const TransactionList = styled(FlatList).attrs({
  contentContainerStyle: {
   padding: 10,
  },
})`
margin: ${(props) => props.theme.space[0]} ${(props) => props.theme.space[2]};
`;

export const TransactionButton = styled(Button).attrs(({colorInUse, muted}) => ({
  color: colors.brand.primary,
  contentStyle: {
    backgroundColor: colorInUse? colors.brand[colorInUse] : colors.brand.primary,
  },
  labelStyle: {
    color: muted?colors.ui.midnight:colors.ui.snow,
  },
}))`
  margin: ${(props) => props.theme.space[2]};

`;

export const SectionColumn = styled.View`
  justify-content: space-evenly;
`;

export const Section = styled.View`
  flex-direction: row;
  justify-content: space-evenly;

`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SectionBegin = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

export const TransactionItemWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin: auto ${(props) => props.theme.space[5]};
  padding: ${(props) => props.theme.space[3]};
justify-content: space-between;

`;

export const TransactionItemLabel = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const TransactionItemValue = styled(Text)` 
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;  

export const LinkCover = styled.View`
  
  flex-flow:row;
  font-size: 20px;
  justify-content:space-between;
  padding: ${(props) => props.theme.space[2]};
`;

export const LinkItem = styled(Text)`
text-align:center;
  font-size: 15px;
  color:${(props) => props.theme.colors.text.primary};
`;


export const LinkWrapper = styled.View`
justify-content:center;
width:30%;
`;





export const LinkActive = styled.View` 
            flex:1;
            border-bottom-width:2px; 
            border-bottom-color:red;
            padding-top: ${(props) => props.theme.space[2]};
           `;

  export const LinkDisable = styled.View` 
                      flex:1;
                      border-bottom-width:2px; 
                      border-bottom-color:transparent;
                      padding-top: ${(props) => props.theme.space[2]};
`;


 export const FilterItem = styled(Text)`
text-align:center;
  font-size: 12px;
  color:${(props) => props.theme.colors.text.primary};
`;

export const FilterWrapper = styled.View`
justify-content:center;

`;

 export const SearchDateContainer = styled.View`
 
`;
 export const DateInput = styled(TextInput)`
  width: 100%;
`;
 export const DateInputWrapper = styled.View`
  flex-flow:row;
  width: 100%;
  justify-content:flex-end;
  align-items:center;
  padding: ${(props) => props.theme.space[1]};
 
`;

export const TouchableReceipt = styled.TouchableOpacity`
flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[1]};
  align-self: center;
`;





