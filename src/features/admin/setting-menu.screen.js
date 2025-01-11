import React, { useContext } from "react";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import {Header,SectionRowContainer,BlockItem,ContentTitle,ContentInfo,ProfileContainer,RoundedIcon} from '../../components/common/common.styles'
import { AuthenticationContext } from "../../services/authentication/authentication.context";

// Styled Components

// Reusable Section Row Component
const SectionRow = ({ iconComponent, title, info, link }) => (
    <SectionRowContainer onPress={link}>
      
            <RoundedIcon>{iconComponent}</RoundedIcon>
            <BlockItem>
                <ContentTitle>{title}</ContentTitle>
                {info && <ContentInfo>{info}</ContentInfo>}
        </BlockItem>
        <MaterialCommunityIcons name="arrow-right-bold-circle" size={34} color="black" />
    </SectionRowContainer>
);

const MenuItems = [
    {title: "Rate Setting", info: "Set Your Rate Here", icon: "ruler", link: "Rate"},
    {title: "Commission Setting", info: "Set Commission Range here", icon: "security", link: "Commission"},
    {title: "Banks Setting", info: "Add, Update Bank List", icon: "bank-transfer", link: "Bank"},
    {title: "Currency Setting", info: "Enable or Disable Trading Currency here", icon: "flag", link: "Currency"},
    {title: "Outstanding Payment", info: "Show Outstanding Payments by Agent and Manager", icon: "briefcase", link: "OutstandingOverview"},
    {title: "My Store Setting", info: "Set Store Information here", icon: "briefcase", link: "MyStoreUpdate"},
    {title: "Logout", info: "Log out, caps", icon: "logout", link: "onLogout"},

]
export const SettingMenuScreen = ({ navigation }) => {
    const { onLogout, authData } = useContext(AuthenticationContext);
    return (
        <ProfileContainer>

            {
                MenuItems.map((item, index) => (
                    <SectionRow
                        key={index}
                        iconComponent={<MaterialCommunityIcons name={item.icon} size={24} color="black" />}
                        title={item.title}
                        info={item.info}
                        link = {() => item.link === "onLogout" ? onLogout() : navigation.navigate(item.link)}
                    />
                ))
            }
           
        </ProfileContainer>
    );
};
