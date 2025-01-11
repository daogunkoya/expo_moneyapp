import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import {Header,SectionRowContainer,BlockItem,ContentTitle,ContentInfo,ProfileContainer,RoundedIcon} from '../../../components/common/common.styles'
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

// Styled Components

// Reusable Section Row Component
const SectionRow = ({ iconComponent, title, info, link }) => (
    <SectionRowContainer onPress={link}>
      
            <RoundedIcon>{iconComponent}</RoundedIcon>
            <BlockItem>
                <ContentTitle>{title}</ContentTitle>
                {info && <ContentInfo>{info}</ContentInfo>}
        </BlockItem>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </SectionRowContainer>
);

export const UserProfileScreen = ({ navigation }) => {
    const { onLogout, authData } = useContext(AuthenticationContext);
    return (
        <ProfileContainer>
            <Header>
                    <ContentTitle>{authData.user['userName'].toUpperCase()}</ContentTitle>
                    <ContentInfo>{authData.user['userEmail']}</ContentInfo>
            </Header>

            <SectionRow
                iconComponent={<AntDesign name="user" size={24} color="black" />}
                title="Account Information"
                info="Information about your account"
                link = {() => navigation.navigate("UserProfile")}
            />
            <SectionRow
                iconComponent={<MaterialIcons name="security" size={24} color="black" />}
                title="Login And Security"
                info="Keep your account secure"
                link={() => navigation.navigate("ResetPassword")}
            />
             <SectionRow
                iconComponent={<MaterialIcons name="cloud-download" size={24} color="black" />}
                title="Account Statement"
                info="Download your account statement"
                link={() => navigation.navigate("AccountStatement")}
            />
            <SectionRow
                iconComponent={<Ionicons name="document" size={24} color="black" />}
                title="About"
                info="Information about our business"

            />

            <SectionRow
                iconComponent={<AntDesign name="logout" size={24} color="black" />}
                title="Logout"
                info=""
                link = {onLogout}
            />
        </ProfileContainer>
    );
};
