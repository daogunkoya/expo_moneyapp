import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";
import { Text } from "../typography/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SummaryCover = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; 
  background-color: rgba(255, 255, 255, 1);
   
`;

export const CenteredView = styled.View`
  flex: 1;
  margin-left: 50px;
`;

export const SectionRow = styled.View`
  flex-flow:row;
  justify-content:space-evenly
`;

export const CustomerContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  border-radius:5px;
`;

export const CustomerButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
background: ${(props) => props.theme.colors.ui.primary};
  padding: ${(props) => props.theme.space[2]};
  min-width: 100px;
  align-self:center;
`;


export const CustomerInput = styled(TextInput).attrs({
  placeholderTextColor: 'red',
})`
  width: 300px;
  border-style:solid;
  background-color:transparent;
  border-color:#D3D3D3;
  border-bottom-width:1px;
  margin:auto;
  
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
  padding: ${(props) => props.theme.space[2]};
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: rgba(255, 255, 255, 0.7);
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;


export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
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