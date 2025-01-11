import React, { useContext, useCallback, useEffect } from "react";
import { CustomersContext } from "../../../services/senders/senders.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ListComponent } from "../../../components/list/list.component";

export const SendersScreen = ({ navigation }) => {
  const {
    isLoading,
    customers,
    hasError,
    retrieveCustomers,
    LoadMoreCustomerData,
    totalCustomerCount,
    searchWord,
    fetchFilterParams,
    lastCustomerId,
    onRefresh,
     refreshing
  } = useContext(CustomersContext);


  const navigateSendMoney = (sender) =>
    navigation.navigate("Send", {
      screen: "SendMoneyAmountCalculator",
      params: {
        sender: sender,
        selectedOriginCurrency: sender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency: sender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

    
  return (
    <SafeArea>
    <ListComponent
        members = {customers}
        navigateToCreateScreen = {() => navigation.navigate("CustomerCreate")}
        navigateToSendMoney = {(item) => navigateSendMoney(item)}
        navigateToMemberDetail = {(item) => navigation.navigate("CustomerDetail", { sender: item })}
        navigateToMemberUpdate = {(item) => navigation.navigate("CustomerUpdate", { sender: item })}
        navigateToMemberList = {(item) => navigation.navigate("ReceiverList", { sender: item, type: 1 }) }
        onSearch = { (filtersParam) => retrieveCustomers(false, filtersParam) }
        retrieveMembers = {retrieveCustomers}
        loadMoreData = {() => LoadMoreCustomerData(fetchFilterParams)}
        onRefresh = {() => onRefresh(fetchFilterParams)}
        memberItemCount ={ (item) => item?.countSenderReceivers}
        memberItemName = {(item) => item?.senderName}
        memberItemPhone = {(item) => item?.senderPhone}
        totalMemberCount = {totalCustomerCount}
        isLoading = {isLoading}
        hasError = {hasError}
        fetchFilterParams = {fetchFilterParams}
        refreshing = {refreshing}
        searchButtonTitle = {"New"}
        buttonIcon = {"plus" }
        listIcon = "account-group"
      />
    </SafeArea>
  );
};
