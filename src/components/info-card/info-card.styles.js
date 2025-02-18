import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Text} from 'react-native'

export const Title = styled(Text)`
  font-size: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const CardWrapper = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
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
export const TextDescription = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
 
  align-self: flex-start;
  
`;

export const DescriptionWrapper = styled.View`
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.success};
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.space[1]};
`;
export const TextItem = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
