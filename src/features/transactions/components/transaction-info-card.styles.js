import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Text} from 'react-native'


export const Numbering = styled(Text)`
  font-size: 11px;
  height: ${(props) => props.theme.sizes[1]};
  width: ${(props) => props.theme.sizes[1]};
  border-color: ${(props) => props.theme.colors.brand.primary};
  border-width:1px;
  text-align:center;
  border-radius: ${(props) => props.theme.sizes[0]};
  margin-right: ${(props) => props.theme.space[1]};
  margin-left: -4px;;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

//export const TransactionCard = styled(Card)`
export const TransactionCard = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 100%;
  align-self: center;

`;

export const LinkCover = styled.View`
  display:flex;
  flex-flow:row;
  justify-content:space-between;
  padding: ${(props) => props.theme.space[3]};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const DateCover = styled.Text`
  

  background-color: ${(props) => props.theme.colors.text.light};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: ${(props) => props.theme.space[1]};
`;
export const Amount = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const SenderName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color:${(props) => props.theme.colors.text.error};
  text-transform:uppercase;;
`;
export const ReceiverName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  text-transform:uppercase;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
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
