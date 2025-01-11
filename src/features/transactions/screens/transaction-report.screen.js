import react, { useState, useContext } from "react";
import { TransactionInfoCard } from "../components/transaction-info-card.component";
import { View, Text, Alert } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components";
import { TextInput, Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import axios from "axios";
import Endpoints from "../../../utils/apis";
import service from "../../../utils/request";
import { TransactionsContext } from "../../../services/transactions/transactions.context";

const SubmitButton = styled(Button).attrs({
    contentStyle: {
        paddingVertical: 3,
        backgroundColor:colors.brand.primary,
    },
    labelStyle: {
        color: colors.ui.snow
    }
})`
    width: 100%;
    align-self: center;
    margin-top: 20px;
`;
const ReportContainer = styled(View)`
    padding: ${(props) => props.theme.space[2]};
    margin: ${(props) => props.theme.space[2]};
    justify-content: center;
`;
const ReportLabel = styled(Text)`
    font-size: 15px;
    margin-top: ${(props) => props.theme.space[4]};
    text-align: center;
    font-family: ${(props) => props.theme.fonts.body};
`;

const AttachImageButton = styled(Button).attrs({
    mode: 'outlined',
    contentStyle: {
        paddingVertical: 3,
        backgroundColor:colors.ui.snow,
    },
    labelStyle: {
        color: colors.ui.midnight
    }
})`
    width: 100%;
    align-self: center;
    margin-top: 20px;
`;

const ReportInputText = styled(TextInput).attrs({
    mode: 'outlined',
})`
    margin-top: ${(props) => props.theme.space[4]};
    margin-bottom: ${(props) => props.theme.space[2]};
    font-family: ${(props) => props.theme.fonts.body};
    birder-radius: ${(props) => props.theme.space[2]};
`;


export const TransactionReportScreen = ({ navigation , route}) => {

    const { submitTransactionReport, handleImagePicker } = useContext(TransactionsContext);
    const { transaction } = route.params;
  const [description, setDescription] = useState("");



  


    return (
        <SafeArea>
      <ReportContainer>
        <TransactionInfoCard index="1" count="0" transaction={transaction} />
        <ReportLabel>
          Tell us as much as you can about the problem and we will be in touch soon
        </ReportLabel>
        <ReportInputText
          multiline
          numberOfLines={8}
          placeholder="Tell us about the problem"
          value={description}
          onChangeText={setDescription}
        />
        <AttachImageButton onPress={handleImagePicker}>Attach Image</AttachImageButton>
        <SubmitButton onPress={() => submitTransactionReport(transaction, description)}>Submit</SubmitButton>
      </ReportContainer>
    </SafeArea>

    );
}