import React,{useContext} from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
 import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { CommissionContext } from "../../../services/commissions/commissions.context";

import {
  CommissionCard,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Rating,
  Icon,
  Address,
  Title
} from "./commissions-info-card.styles";

export const CommissionInfoCard = ({commission,count,navigation}) => {

   const { updateMenu } = useContext(UtilitiesContext);
   const {CommissionDelete} = useContext(CommissionContext);

  const {
    currency = {},
    user = {},
    agentQuota  = 0,
    commissionId = null,
    currencyId = nul,
    endAt= 0,
    startFrom = 0,
    soldRate=0,
    userId = null,
    value = 0
    } = commission;

    //console.log(commission)
  const onPressEdit = ()=> {
    
    updateMenu("CommissionSelectCurrency",{key:currency.currencyId, value:currency.currencyCode})
    updateMenu("CommissionSelectUser",{key:user.userId, value:user.userHandle})
    navigation.navigate("CommissionUpdate",{commission:commission})
  }

 
  

  return (
    <CommissionCard  elevation={2}>
    
      <Info>
        <SectionBegin>
              <Ionicons key={commissionId} name="person-circle-sharp" size={18} color="black" />
              <Text variant="small">Agent Quotas: {agentQuota}%  </Text>
        </SectionBegin>
          <Section>
            <SectionBegin>
                  <Ionicons name="phone-portrait-outline" size={14} color="black" />
                  <Text variant="heading1">{startFrom} - {endAt} : {value}</Text>
              </SectionBegin>
            <SectionEnd>
              
                <Spacer position="left" size="large">
                        <Button icon="pen" uppercase="false" compact="true" mode="outlined" onPress={onPressEdit  }>
                          
                    </Button>
                </Spacer>
                <Spacer position="left" size="large">
                    <Button icon="delete" uppercase="false" compact="true" mode="outlined" onPress={() => CommissionDelete(commissionId)}>
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
    </CommissionCard>
  );
};
