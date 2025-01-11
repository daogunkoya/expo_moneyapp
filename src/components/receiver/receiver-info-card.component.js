import React, {useContext} from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import { UtilitiesContext } from "../../services/utilities/utilities.context";

import {
  ReceiverCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Rating,
  Icon,
  Address,
  Title
} from "./receiver-info-card.styles";

export const ReceiverInfoCard = ({receiver, customer, navigation, count}) => {

  const {updateMenu} = useContext(UtilitiesContext)
//console.log('sender=', customer)
  const {
    receiverName = "Some Restaurant",
    receiverId = "Some Restaurant",
    receiverAddress = "22 nw road",
    receiverMobile = "0876567878",
    receiverPhone= "0876567878",
    receiverEmaail= "noemail@er.com",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://avatars.dicebear.com/api/adventurer/:seed.png",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = receiver;

  
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ReceiverCard  elevation={2}>
      
      <Info>
      <SectionBegin>
          <Ionicons key={receiverId} name="person-circle-sharp" size={18} color="black" />
          <Text variant="heading1">{receiverName}</Text>
        </SectionBegin>
        <Section>
              <SectionBegin>
                    <Ionicons name="phone-portrait-outline" size={14} color="black" />
                
                    <Text variant="small">{receiverPhone}</Text>
              </SectionBegin>

          
          
              <SectionEnd> 
                  <Spacer position="left" size="medium">
                       <Button icon="play" uppercase="false" compact="true" mode="outlined" onPress={() => {
                              // updateMenu('PaymentReceiverSelect', {key:receiverId, value:receiverName});
                              // updateMenu('PaymentSenderSelect', {key:customer.senderId, value:customer.senderName});
                              // navigation.navigate("PaymentAmount",{sender:customer, senderId:customer.senderId})
                              navigation.navigate('Send', {
                                screen: 'SendMoneyAmountCalculator',
                                params: { 
                                  sender: customer , 
                                  receiver: receiver,
                                  selectedOriginCurrency: customer?.userCurrency?.originCurrency?.originCurrency,
                                  selectedDestinationCurrency: customer?.userCurrency?.destinationCurrency?.destinationCurrency},
                              })
                        }   }>
                          </Button>
                      <Button icon="pen" compact="true" mode="outlined" onPress={() =>   navigation.navigate("ReceiverUpdate",{sender:customer, receiver})}>
                      </Button>
                      <Button icon="bank-transfer" uppercase="false" compact="true" mode="outlined" onPress={() => console.log('Pressed')}>  
                      </Button>
               
                  </Spacer>
                </SectionEnd>
            
          
        </Section>
        <SectionBegin>
            <Ionicons name="location-outline" size={14} color="black" />
            <Address>{receiverAddress}</Address>
        </SectionBegin>
      </Info>
    </ReceiverCard>
  );
};
