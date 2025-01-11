import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../infrastructure/theme/colors";
import { Text } from "../components/typography/text.component";
import {Text as TextNative} from 'react-native-paper'
import CountryFlag from "react-native-country-flag";
import { Card } from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const CardWrapper = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;

export const ContainerCard = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const InputContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[3]};
  border-radius:5px;
`;


export const ValueText= styled(TextNative)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const PaddedView = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const CenteredView = styled.View`
  flex: 1;
  margin-left: 50px;
`;

export const WhiteBackgroundContainer = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  border-radius:5px;
`;

export const SectionRow = styled.View`
  flex-flow:row;
  justify-content:space-evenly;
`;
export const RowOnlySection = styled.View`
  flex-flow:row;
`;
export const HorizontallMaginSection = styled.View`
  margin: ${(props) => props.theme.space[3]};
  flex-flow:row;
  justify-content:space-evenly;
`;


export const CustomerContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  border-radius:5px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.color || props.theme.colors.ui.success};
`;


export const TextItem = styled(TextNative)`
margin-top: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.body};
`;
export const SuccessText = styled(TextNative)`
margin-top: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.ui.success};
`;
export const ErrorText = styled(TextNative)`
margin-top: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.ui.error};
`;



export const Title = styled(Text)`
margin-left: ${(props) => props.theme.space[2]};
  font-size: 24px;
  background-color:transparent;
`;

export const Item = styled(Text)`
margin: ${(props) => props.theme.space[1]};
  font-size: 13px;
  background-color:transparent;
  max-width: 200px; 
  text-transform: capitalize;
`;
export const ItemHeading = styled(Text)`

  font-size: 16px;
  font-weight:bold;
  margin-left: ${(props) => props.theme.space[0]};

`;
export const EditButton = styled(Button)`
  background-color: #007BFF;
  padding: 0;
  margin: 0;
  color: #ffffff;
  align-self: center;
`;



export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
  background-color: #007BFF;
  border-radius: 5px;

`;

export const Section = styled.View`
  flex-direction: column;
`;

export const SectionFullWidth = styled.View`
  width: 100%;
`;
export const SectionRowCentered = styled.View`
  flex-direction: row;
  justify-content: flex-start;
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
export const SectionCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const SectionRowVerticalCenter = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SpaceBetweenSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateGrayBackground = styled.Text`
  background-color: ${(props) => props.theme.colors.text.light};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: ${(props) => props.theme.space[1]};
`;

export const TextGrayBackground = DateGrayBackground


export const CountryIcon = styled(CountryFlag)`
width: ${(props) => props.theme.sizes[2]};
height: ${(props) => props.theme.sizes[2]};
border-radius: ${(props) => parseInt(props.theme.sizes[2]) / 2}px;
`;

export const ChevronDownIcon = styled(MaterialCommunityIcons).attrs({})`
align-self: center;
color: ${(props) => props.theme.colors.brand.primary};

`;


export const BorderedRowWrapper = styled.View`
flex-direction: row;
border-width: 1px;
border-radius: ${(props) => parseInt(props.theme.sizes[4]) / 4}px;
align-self: center;
justify-content: space-between;
align-items: center;
width:${(props) => props.theme.sizes[4]};
padding: ${(props) => props.theme.space[2]};
`;


// export const ButtonContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// `;

export const ButtonContainer = styled.View`
  flex-direction: ${(props) => props.flexDirection || "row"};
    margin-top: ${(props) => props.theme.space[4]};
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${(props) => props.theme.space[3]};
`;

export const SubmitButton = styled(Button).attrs((props) => ({
  color: colors.brand.primary,
  mode: 'contained',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  contentStyle: {
      // backgroundColor: props.isActive ? colors.brand.primary : colors.ui.snow,
      backgroundColor: props.isActive ? colors.brand.primary : colors.ui.primary,
      padding: 0.2
  },
  labelStyle: {
      color: props.isActive ? colors.ui.snow : colors.ui.snow,
      fontSize: 9
  },
}))`
  color: ${colors.brand.primary};
  margin-top: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[1]};
  width: 50%;
`;