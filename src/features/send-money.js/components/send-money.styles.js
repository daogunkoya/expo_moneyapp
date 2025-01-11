import styled from "styled-components";
import { FlatList } from "react-native-gesture-handler";
import CountryFlag from "react-native-country-flag";
import { Text, TextInput, Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export const Title = styled(Text)`
  margin-left: ${(props) => props.theme.space[2]};
  font-size: 12px;
  text-align: center;
  background-color: transparent;
  margin: ${(props) => props.theme.space[2]};
`;

export const CountryIcon = styled(CountryFlag)`
  width: ${(props) => props.theme.sizes[2]};
  height: ${(props) => props.theme.sizes[2]};
  border-radius: ${(props) => parseInt(props.theme.sizes[2]) / 2}px;
`;

export const SendMoneyContainer = styled.View`
  flex: 1;
  background-color: ${colors.bg.secondary};
`;

export const SendWrapper = styled.View`
  flex-direction: row;
  margin: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  background-color: ${colors.bg.primary};
  justify-content: space-between;

  margin-bottom: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const SectionLeft = styled.View`
  flex: 1;
  align-self: flex-start;
`;

export const SectionRight = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-self: flex-end;
`;
export const TextItem = styled(Text)`
  font-size: ${(props) => props.theme.sizes[1]};
  color: ${colors.brand.primary};
`;
export const TextInfo = styled(Text)`
margin-top: ${(props) => props.theme.space[2]};
  font-size: ${(props) => props.theme.sizes[0]};
  color: ${colors.brand.primary};
  align-self: center;
`;

export const AmountInput = styled(TextInput).attrs({})`
  background-color: transparent;
  width: 150px;
`;

export const IconWrapper = styled.View`
  flex-direction: row;
  border-width: 1px;
 border-radius: ${(props) => parseInt(props.theme.sizes[4]) / 4}px;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  width:${(props) => props.theme.sizes[4]};
  padding: ${(props) => props.theme.space[2]};
`;

export const Seperator = styled.View`
  align-self: center;
  width: 3px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const RoundedIcon = styled(AntDesign).attrs({})`
  margin-left: ${(props) => props.theme.space[5]};
  width: 40px;
  height: 40px;
  padding: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.brand.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;


export const ChevronDownIcon = styled(MaterialCommunityIcons).attrs({})`
  align-self: center;
  color: ${(props) => props.theme.colors.brand.primary};

`;

export const  RoundedIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const ContinueButton = styled(Button).attrs({
  mode: "contained",
})`
position: absolute;
  bottom: 0;
  width: 100%;
  margin: ${(props) => props.theme.space[5]};
  align-self: center;
  color: #00000;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const SenderInfoCard = styled(Text).attrs({})`
  margin: ${(props) => props.theme.space[3]};

  align-items: center;
`;
export const SenderListContainer = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
  showsVerticalScrollIndicator: false,
  flex: 1,
});

