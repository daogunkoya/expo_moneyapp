import React, { memo } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome,FontAwesome6, Entypo } from "@expo/vector-icons";
import { Text } from "../../components/typography/text.component";
import { useNavigation } from "@react-navigation/native";

import {
  CardWrapper,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Icon,
  TextItem,
  TextDescription,
  DescriptionWrapper
} from "./info-card.styles";

export const MemberInfoCard = memo(({
    name,
    role,
    navigateToMemberList,
    navigateToTransactionList,
    navigateToUpdate, 
    transactionCount,
    senderCount,
    receiverCount,
    listIcon = "account-group" 
   }) => {

 

  return (
    <CardWrapper elevation={2}>
      <Info>
        <Section>
        <SectionBegin>
          <Ionicons  name="person-circle-sharp" size={18} color="black" />
            <Text variant="body">{ name}</Text >
        </SectionBegin>
        <SectionEnd>
              <DescriptionWrapper>
                <TextDescription variant="small"> { role}</TextDescription>
              </DescriptionWrapper>
          </SectionEnd>
          
        </Section>
        <Section>
            <SectionBegin>
            <TouchableOpacity onPress={navigateToMemberList} >
              <FontAwesome name="users" size={14} color="black" />
              <TextItem> {role === 'Agent' ? `${senderCount} Senders` : ` ${receiverCount} Receivers`}</TextItem>
            </TouchableOpacity>
            </SectionBegin>
            <SectionEnd>
            <TouchableOpacity onPress={navigateToTransactionList} >
              <FontAwesome6 name="money-bill-transfer" size={14} color="black" />
              <TextItem> {transactionCount} Transactions</TextItem>
              </TouchableOpacity>
        </SectionEnd>
        </Section>
      </Info>
    </CardWrapper>
  );
});
