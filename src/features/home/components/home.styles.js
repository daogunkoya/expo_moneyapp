import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

export const Numbering = styled(Text)`
  font-size: 9px;
  border-color: ${(props) => props.theme.colors.brand.primary};
  text-align: center;

  margin-left: 1px;
`;

export const Rounded = styled.View`
  background-color: ${(props) => props.theme.colors.ui.snow};
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => parseInt(props.theme.sizes[2]) / 2}px;
  width: ${(props) => props.theme.sizes[2]};
  height: ${(props) => props.theme.sizes[2]};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

export const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

export const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const Title = styled(Text)`
  padding: ${(props) => props.theme.space[3]};
  text-align: center;
  font-size: 22px;
`;

export const SectionContainer = styled.View`
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[4]};
  justify-content: space-evenly;
  align-items: center;
`;

export const SectionWrapper = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[4]};
  justify-content: space-evenly;
  align-items: center;
`;

export const Section = styled.View`
flex-direction: row;
`;


export const SectionItem = styled.View`
  align-items: center;
`;

export const SectionItemRow = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const SectionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Item = styled(Text)`
  font-size: 13px;
`;

export const ItemNumber = styled(Text)`
  font-size: 13px;
  color: red;
`;


export const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const ProfileImage = styled(Avatar.Image)`
  margin-right: ${(props) => props.theme.space[3]};
`;

export const SendMoneyContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;