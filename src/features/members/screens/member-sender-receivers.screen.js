import React, { useContext, useState, useEffect } from "react";

import { ReceiversContext } from "../../../services/receivers/receivers.context";

import { MemberListComponent } from "../../../components/member-list.component";
import { LoadingComponent } from "../../../components/loading.component";
import { ErrorComponent } from "../../../components/error/error.component";
import { MemberRenderComponent } from "../../../components/members/member-render.component";
import { Search } from "../../../components/search.component";

export const MemberSenderReceiversScreen = ({ route, navigation }) => {
  const {
    isLoading,
    receivers,
    hasError,
    totalReceiverCount,
    LoadMoreReceiverData,
    retrieveReceivers,
    searchWord,
    fetchFilterParams,
    setActiveSenderInUse,
  } = useContext(ReceiversContext);

  const { sender } = route.params || {};
  console.log('member sender for receiver', sender)

  const navigateToList = () =>
    navigation.navigate("Transaction", {
      screen: "TransactionList",
      params: {
        sender: sender,
        selectedOriginCurrency:
          sender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency:
          sender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

 

    const renderMember = (item) => (
            <MemberRenderComponent
               name = {`${item?.receiverFname} ${item?.receiverLname}`}
               phone = {item?.receiverPhone}
              count={totalReceiverCount}
              listIcon = "bank-transfer"
              itemCount={item?.countreceiverReceivers}
              navigateItemDetail={() =>navigation.navigate("MemberReceiverDetail", { receiver: item,sender: sender })}
              navigateToUpdate={() => navigation.navigate("MemberSenderReceiverUpdate", { receiver: item,sender: sender })}
              navigateToList= {  navigateToList} 
              navigateToSend={null}
              isAdmin = {true}
            />
    );

  useEffect(() => {
     console.log("sender for receiver list", JSON.stringify(sender, null, 2));
    setActiveSenderInUse(sender);
      retrieveReceivers(true, {senderId:sender?.senderId}, null);
  }, []);

  return (
    <>
      {isLoading && <LoadingComponent />}

      {hasError && <ErrorComponent />}

      <Search
        buttonIcon="account-multiple-plus"
        buttonTitle=""
        onSearch={retrieveReceivers}
        filterParam={fetchFilterParams}
        navigateToScreen={() => navigation.navigate("ReceiverCreate",{sender: sender})}
      /> 

      {!isLoading && (
        <MemberListComponent
        hasError={hasError}
        isLoading={isLoading}
        members={receivers}
        memberKeyId = "receiverId"
        retriveMembers={retrieveReceivers}
        loadMoreMemberData={() => LoadMoreReceiverData(fetchFilterParams)}
        totalMemberCount={totalReceiverCount}
        filterParam={{...fetchFilterParams, senderId: sender?.senderId}}
        renderMember={renderMember}
      />

      )}
    </>
  );
};
