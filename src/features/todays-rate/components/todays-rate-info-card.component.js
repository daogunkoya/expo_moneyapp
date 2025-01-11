import React,{useContext} from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { TodaysRateContext } from "../../../services/todays-rate/todays-rate.context";

import {
  TodaysRateCard,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Rating,
  Icon,
  Address,
  Title
} from "./todays-rate-info-card.styles";

export const TodaysRateInfoCard = ({todaysRate,count,navigation}) => {

  const { updateMenu } = useContext(UtilitiesContext);
  const {todaysRateDelete} = useContext(TodaysRateContext);

  const {
    rateId  = null,
    mainRate = 0,
    user = {},
    currency= {},
    bouRate = 0,
    soldRate=0,
    createdAt = "12/01/1970"
    } = todaysRate;

    //console.log(todaysRate)
  const onPressEdit = ()=>{
    
    updateMenu("TodaysRateSelectCurrency",{key:currency.currencyId, value:currency.currencyCode})
    updateMenu("TodaysRateSelectUser",{key:user.userId, value:user.userHandle})
    navigation.navigate("TodaysRateUpdate",{todaysRate:todaysRate})
  }

 
  

  return (
    <TodaysRateCard  elevation={2}>
    
      <Info>
        <SectionBegin>
              <Ionicons key={rateId} name="person-circle-sharp" size={18} color="black" />
              <Text variant="small">{createdAt}  </Text>
        </SectionBegin>
          <Section>
            <SectionBegin>
                  <Ionicons name="phone-portrait-outline" size={14} color="black" />
                  <Text variant="heading1">Rate:{mainRate}  {bouRate}, {soldRate}</Text>
              </SectionBegin>
            <SectionEnd>
              
                <Spacer position="left" size="large">
                        <Button icon="pen" uppercase="false" compact="true" mode="outlined" onPress={onPressEdit  }>
                          
                    </Button>
                </Spacer>
                <Spacer position="left" size="large">
                    <Button icon="delete" uppercase="false" compact="true" mode="outlined" onPress={() => todaysRateDelete(rateId)}>
                   Delete
                    </Button>
                </Spacer>
            </SectionEnd>
        
          </Section>
          <SectionBegin>
            <Ionicons name="location-outline" size={14} color="black" />
            <Address>All,  UK-NG</Address>
          </SectionBegin>
      </Info>
    </TodaysRateCard>
  );
};
