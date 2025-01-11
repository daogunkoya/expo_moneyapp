import react, { useState, useContext } from "react"; 
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ProfileDetailsComponent } from "../../../components/profile/detail.component";



export const ProfileDetailsScreen = () => {
    const { authData } = useContext(AuthenticationContext);
    const {userName,userDob, userAddress1, userAddress2, userCity, userCountry, userPostcode, userPhone, userEmail } = authData.user;

    const profileItems = [
        { label: "Name", value: userName, iconName: "account" },
        { label: "Email", value: userEmail, iconName: "email" },
        { label: "Phone", value: userPhone, iconName: "cellphone" },
        { label: "Address", value: userAddress1, iconName: "map-marker" },
        { label: "City", value: userCity, iconName: "home-city" },
        { label: "Country", value: userCountry, iconName: "flag" },
        { label: "Postal Code", value: userPostcode, iconName: "home-city" },
    ];
    return (
        <ProfileDetailsComponent profileItems={profileItems} />
    )
   
}