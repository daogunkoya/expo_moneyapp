import react, { useState, useContext, useEffect } from "react"; 
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { ProfileDetailsComponent } from "../../../components/profile/detail.component";
import { Button } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";



export const MyStoreScreen = ({ navigation }) => {
    const { retrieveMyStore,myStore } = useContext(UtilitiesContext);
    const {storeName,storeUrl,storPhone,storeEmail,storeAddress,storeCity,storeCountry,storePostcode,enableSms,enableCredit,enableMultipleReceipt } = myStore
    console.log('store', JSON.stringify(myStore, null, 2));
    const profileItems = [
        { label: "Store Name", value: storeName, iconName: "account" },
        { label: "Store Email", value: storeEmail, iconName: "email" },
        { label: "Store Phone", value: storPhone, iconName: "cellphone" },
        { label: "Store Address", value: storeAddress, iconName: "map-marker" },
        { label: "Store City", value: storeCity, iconName: "home-city" },
        { label: "Store Country", value: storeCountry, iconName: "flag" },
        { label: "Store Postal Code", value: storePostcode, iconName: "home-city" },
        { label: "Store URL", value: storeUrl, iconName: "home-city" },
       
    ];

    useEffect(() => {
        retrieveMyStore();
    }, []);
    return (
        <>
            <ProfileDetailsComponent profileItems={profileItems} />
            <Spacer position="top" size="medium"/>
            <Button icon="pen" mode="contained" onPress={() => navigation.navigate("MyStoreUpdate",{store:myStore})}>
                    Edit Store
                </Button>
        </>
    )
   
}