import React, { useContext, useCallback, useEffect } from "react";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { ListComponent } from "../../../components/list/list.component";

import { userAsSender } from "../../../components/utilities.component";
import { MemberRenderComponent } from "../../../components/members/member-render.component";


export const ReceiversScreen = ({ route, navigation }) => {
  const {
    isLoading,
    receivers,
    hasError,
    totalReceiverCount,
    LoadMoreReceiverData,
    retrieveReceivers,
    prevFilterParams,
    setActiveSenderInUse,
    onRefresh, 
    refreshing
  } = useContext(ReceiversContext);

  const { user } = useContext(AuthenticationContext);
  const authUserAsSender = userAsSender(user);
  const { sender, otherParam } = route.params || {};

  const defaultSender =
    user?.userRoleType === "Agent"
      ? sender
      : user?.userRoleType === "Admin"
      ? sender
      : authUserAsSender;

  const navigateToList = () =>
    navigation.navigate("Transaction", {
      screen: "TransactionList",
      params: {
        sender: defaultSender,
        selectedOriginCurrency:
          defaultSender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency:
          defaultSender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

  const navigateToSendMoney = (receiver) =>
    navigation.navigate("Send", {
      screen: "SendMoneyAmountCalculator",
      params: {
        sender: defaultSender,
        receiver: receiver,
        selectedOriginCurrency:
          defaultSender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency:
        receiver?.receiverCurrency
         // defaultSender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

 

  useEffect(() => {
    setActiveSenderInUse(defaultSender);
    if(user?.userRoleType === "Agent" || user?.userRoleType === "Admin"){
      retrieveReceivers(true, {senderId:defaultSender?.senderId}, 1);
    }
  }, []);

  return (
    <>
<ListComponent
        members = {receivers}
        navigateToCreateScreen = {() => navigation.navigate("ReceiverCreate",{sender: defaultSender})}
        navigateToSendMoney = {(item) => navigateToSendMoney(item)}
        navigateToMemberDetail = {(item) => navigation.navigate("ReceiverDetail", { receiver: item,sender: defaultSender }) }
        navigateToMemberUpdate = {(item) => navigation.navigate("ReceiverUpdate", { receiver: item,sender: defaultSender })}
        navigateToMemberList = {() => navigateToList()}  
        onSearch = { (filtersParam) => retrieveReceivers(false, filtersParam) }
        retrieveMembers = {retrieveReceivers}
        loadMoreData = {() => LoadMoreReceiverData(prevFilterParams)}
        onRefresh = {() => onRefresh(prevFilterParams)}
        memberItemCount = {() => receivers?.length}
        memberItemName = {(item) => `${item?.receiverFname} ${item?.receiverLname}`}
        memberItemPhone = {(item) => item?.receiverPhone}
        totalMemberCount = {totalReceiverCount}
        isLoading = {isLoading}
        hasError = {hasError}
        fetchFilterParams = {prevFilterParams}
        refreshing = {refreshing}
        searchButtonTitle = {"New"}
        buttonIcon = {"account-multiple-plus"}
        listIcon = {"bank"}
      />

      
    </>
  );
};
