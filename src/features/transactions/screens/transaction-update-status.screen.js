import React, { useContext } from "react";
import * as Yup from "yup";
import { UpdateStatusComponent } from "../../../components/members/update-status.component";

import { TransactionsContext } from "../../../services/transactions/transactions.context";

export const TransactionUpdateStatusScreen = ({ navigation, route }) => {
  const { transactionStatusUpdate, isLoading, error } =
    useContext(TransactionsContext);

  const { transaction } = route.params || {};

  const filterButtonOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Paid", value: "Paid" },
    { label: "Failed", value: "Failed" },
  ];

  submitAction = (values) => {
    console.log("submitted values", values);
    transactionStatusUpdate(values?.status, transaction?.transactionId);
    if (error) {
      Alert.alert("Error", error);
    } else {
      navigation.navigate("TransactionList");
    }
  };

  return (
    <>
      <UpdateStatusComponent
        onSubmit={(values) => submitAction(values)}
        optionList={filterButtonOptions}
        defaultValue={transaction?.transactionStatus}
        isLoading={isLoading}
      />
    </>
  );
};
