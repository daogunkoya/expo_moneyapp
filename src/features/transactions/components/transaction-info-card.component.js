import React,{memo} from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Text as TextItem } from "react-native-paper";

import {Divider} from 'react-native-paper';

import {
  TransactionCard,
  Numbering,
  Info,
  Section,
  SectionEnd,
  SectionBegin,
  Amount,
  ReceiverName,
  DateCover
} from "./transaction-info-card.styles";

export const TransactionInfoCard = memo(({transaction}) => {
//console.log('transaction', JSON.stringify(transaction, null, 2));
//console.log('fetched Transactionss', JSON.stringify(transaction, null, 2));



  const {
    createdAt = '',
    localAmount = "",
    totalAmount = "",
    receiverFname = "",
    receiverLname = "",
    transactionStatus = 1,
  } = transaction;

  
  

  return (
    <TransactionCard  elevation={2}>
      <Info>
          <DateCover variant="small">{createdAt}</DateCover>
       <Section>
         <TextItem variant="titleMedium">{transaction?.receiverFname} {transaction?.receiverLname}</TextItem>
        </Section>
        <Section>
              <SectionEnd>
                      <Amount> {totalAmount} GPB  </Amount>
                     
             </SectionEnd>
        </Section>
        <Section>
        <SectionBegin>
              <Text variant="small">{transactionStatus}</Text>
              </SectionBegin>

          <SectionEnd>
          <Amount> {localAmount} NGN </Amount>
            </SectionEnd>
         </Section>
        <Spacer size="large" />
        <Divider />    
      </Info>
    </TransactionCard>
  );
});
