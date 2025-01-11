import react from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { CountryIcon, ChevronDownIcon, IconWrapper } from "./send-money.styles";
import { navigate } from "../../../utils/navigationRef";



export const CurrencySelectComponent = ({ currencyType, countryCode, currencyTitle }) => {
    return (
        <TouchableOpacity onPress={() => navigate("SendMoneyCurrencyList", {currencyType})}>
        <IconWrapper>
            <CountryIcon isoCode={countryCode} size={80} />
            <Text>{currencyTitle}</Text>
            <ChevronDownIcon name="chevron-down" size={30} color="green" />
        </IconWrapper>
    </TouchableOpacity>
    );
}