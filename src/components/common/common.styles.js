import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

export const Header = styled(View)`
    margin: ${(props) => props.theme.space[3]};
    padding: ${(props) => props.theme.space[1]};

    align-items: center;
    justify-content: center;
`;

export const ProfileContainer = styled(View)`
    flex: 1;
`;

export const ContentTitle = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    text-align: left;
    margin-left: 0;
    align-items: center;
`;

export const ContentInfo = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.xsmall};
    text-align: left;
    margin-left: 0;
`;

export const BlockItem = styled(View)`
margin-left: ${(props) => props.theme.space[2]};
    flex: 1;
    flex-direction: column;
    align-self: flex-start;
   
`;

export const SectionRowContainer = styled(TouchableOpacity)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${(props) => props.theme.space[3]};
`;

export const RoundedIcon = styled(View)`
margin-left: ${(props) => props.theme.space[2]};
    background-color: ${(props) => props.theme.colors.ui.tertiary};
    padding: ${(props) => props.theme.space[2]};
    border-radius: ${(props) => props.theme.space[2]};
    border-width: 1px;
`;
