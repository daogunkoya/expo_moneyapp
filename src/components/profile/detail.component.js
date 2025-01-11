import React from "react";  
import { ScrollView } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const ProfileContainer = styled.View`
    flex: 1;
    padding: ${(props) => props.theme.space[3]};
`;

const SectionRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.space[1]};
    padding: ${(props) => props.theme.space[2]};
    border-bottom-width: 1px;
    border-bottom-color: lightgray;
`;

const Section = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${(props) => props.theme.space[2]};
    margin-top: ${(props) => props.theme.space[2]};
`;

const Label = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    margin-left: ${(props) => props.theme.space[2]};
`;

const Value = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.small};
`;

const ProfileItem = ({ label, value, iconName }) => {
    return (
        <SectionRow>
            <Section>
                <MaterialCommunityIcons name={iconName} size={24} color="black" />
                <Label>{label}</Label>
            </Section>
            <Section>
                <Value>{value}</Value>
            </Section>
        </SectionRow>
    );
}

export const ProfileDetailsComponent = ({ profileItems }) => {
    return (
        <ScrollView>
            <ProfileContainer>
                {profileItems.map((item, index) => (
                    <ProfileItem 
                        key={index}
                        label={item.label}
                        value={item.value}
                        iconName={item.iconName}
                    />
                ))}
            </ProfileContainer>
        </ScrollView>
    );
}
