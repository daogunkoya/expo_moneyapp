import React,{useContext} from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
// import star from "../../../../assets/star";
// import open from "../../../../assets/open";
import { ReceiversContext } from "../../services/receivers/receivers.context";
import { UtilitiesContext } from "../../services/utilities/utilities.context";

import {
  CustomerCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Rating,
  Icon,
  Address,
  Title
} from "./sender-info-card.styles";

export const CustomerInfoCard = ({customer,count,navigation}) => {

  const {
    countSenderReceivers=0,
    senderName = "Empty",
    senderId = "Empty",
    senderAddress = "22 nw road",
    senderMobile = "0876567878",

    rating = 4,
    isClosedTemporarily = true,
  } = customer;


  const { retrieveReceivers, retrieveBanks, clearReceivers  } = useContext(ReceiversContext);
  const {  updateMenu } = useContext(UtilitiesContext);

  const onReceiver = senderId=>{
   // console.log(senderId)
    // retrieveReceivers(senderId);
    // retrieveBanks();
    navigation.navigate("ReceiverList",{sender:customer, type:1});
  }
  
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <CustomerCard  elevation={2}>
      
      <Info>
        <SectionBegin>
              <Ionicons key={senderId} name="person-circle-sharp" size={18} color="black" />
              <Text variant="heading1">{senderName}</Text>
        </SectionBegin>
          <Section>
            <SectionBegin>
                  <Ionicons name="phone-portrait-outline" size={14} color="black" />
                  <Text variant="small">{senderMobile}</Text>
              </SectionBegin>
            <SectionEnd>
              
                <Spacer position="left" size="medium">
                        <Button icon="play" uppercase="false" compact="true" mode="outlined" onPress={() => {
                              clearReceivers();

                              updateMenu('PaymentReceiverSelect', {key:null, value:null});
                              updateMenu('PaymentSenderSelect', {key:senderId, value:senderName});
                              navigation.navigate("PaymentReceiver",{sender:customer, senderId:senderId})
                        }   }>
                          
                    </Button>
                </Spacer>
                <Spacer position="left" size="medium">
                    <Button icon="account-group" uppercase="false" compact="true" mode="outlined" onPress={() => onReceiver(senderId)}>
                    {countSenderReceivers}
                    </Button>
                </Spacer>

                <Spacer position="left" size="medium">
                        <Button icon="account-edit" uppercase="false" compact="true" mode="outlined" onPress={() =>  navigation.navigate("CustomerUpdate",{customer:customer})  }>
                          
                    </Button>
                </Spacer>
            </SectionEnd>
        
          </Section>
          <SectionBegin>
            <Ionicons name="location-outline" size={14} color="black" />
            <Address>{senderAddress}</Address>
          </SectionBegin>
      </Info>
    </CustomerCard>
  );
};
