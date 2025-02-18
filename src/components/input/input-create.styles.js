import styled from "styled-components/native";
import { Button, TextInput  as NativeTextInput} from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";
import { Text } from "../../components/typography/text.component";

export const Title = styled(Text)`
margin-left: ${(props) => props.theme.space[2]};
text-align: center;
  font-size:  ${(props) => props.theme.sizes[1]};
  background-color:transparent;
`;

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
  margin:${(props) => props.theme.sizes[1]} auto;
`;


export const SectionRow = styled.View`
  flex-flow:row;
  justify-content:space-evenly
`;

export const InputContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[1]};

  border-radius:5px;
`;
export const  InputContentwrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
  border-radius:5px;
`;

export const InputButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  align-self:center;
`;


export const TextInput = styled(NativeTextInput).attrs({
  // placeholderTextColor: 'red',
})`
  width: 100%;
  border-style:solid;
  background-color:transparent;
  border-color:#D3D3D3;
  border-bottom-width:1px;
  margin:auto;
  
`;



export const Item = styled(Text)`
margin: ${(props) => props.theme.space[2]};
  font-size: 14px;
  background-color:transparent;
`;
export const EditButton = styled(Button)`
border-bottom-width: 1px;
border-bottom-color: ${colors.brand.primary};
padding: 0;
margin: 0;
color: #ffffff;
align-self: center;
`;



export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;


export const OptionCover = styled.View`
  position: absolute;
  padding-top:30px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 1);
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