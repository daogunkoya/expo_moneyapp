import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import { ReceiversContext } from "../../services/receivers/receivers.context";
import { UtilitiesContext } from "../../services/utilities/utilities.context";
import { useNavigation } from "@react-navigation/native";

import {
  CardWrapper,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Icon,
  Address,
} from "./info-card.styles";

export const InfoCard = ({ name, phone, navigateToList,navigateToSend,navigateToUpdate, itemCount, isAdmin = false, listIcon = "account-group" }) => {

  const navigation = useNavigation();

  const { retrieveReceivers, retrieveBanks, clearReceivers } =
    useContext(ReceiversContext);
  const { updateMenu } = useContext(UtilitiesContext);

 


  return (
    <CardWrapper elevation={2}>
      <Info>
        <Section>
          <SectionBegin>
            <Ionicons name="person-circle-sharp" size={18} color="black" />
            <Text variant="heading1">{ name}</Text>
          </SectionBegin>
        </Section>
        <Section>
          <SectionBegin>
            <Ionicons name="phone-portrait-outline" size={14} color="black" />
            <Text variant="small">{ phone }</Text>
          </SectionBegin>
          <SectionEnd>
            {!isAdmin && (
            <Spacer position="left" size="medium">   
            <Button
                icon="play"
                uppercase="false"
                compact="true"
                mode="outlined"
                onPress={ navigateToSend}             >
                {itemCount}
              </Button>
            </Spacer>)}
            <Spacer position="left" size="medium">
              <Button
                icon={listIcon}
                uppercase="false"
                compact="true"
                mode="outlined"
                onPress={ navigateToList}
              >
                {itemCount}
              </Button>
            </Spacer>

            <Spacer position="left" size="medium">
              <Button
                icon="account-edit"
                uppercase="false"
                compact="true"
                mode="outlined"
                onPress={navigateToUpdate}
              ></Button>
            </Spacer>
          </SectionEnd>
        </Section>
       
      </Info>
    </CardWrapper>
  );
};
