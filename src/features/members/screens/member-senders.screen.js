import React, { useContext, useEffect, useCallback } from "react";
import { CustomersContext } from "../../../services/senders/senders.context";
import { MemberRenderComponent } from "../../../components/members/member-render.component";
import { MemberListComponent } from "../../../components/member-list.component";
import { Search } from "../../../components/search.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ErrorComponent } from "../../../components/error/error.component";


export const MemberSendersScreen = ({ navigation, route }) => {
  const {
    isLoading,
    customers,
    hasError,
    retrieveCustomers,
    LoadMoreCustomerData,
    totalCustomerCount,
    searchWord,
    lastCustomerId,
    fetchFilterParams,
    refreshing,
    onRefresh,
  } = useContext(CustomersContext);

  const { member } = route.params;

  useEffect(() => {
    retrieveCustomers(true,{ userId: member?.userId }, 1);
  }, [member?.userId]);

  const renderMember = useCallback((item) => (
    <MemberRenderComponent
      key={item?.senderId} // Ensure a unique key for each component
      name={item?.senderName}
      phone={item?.senderPhone}
      count={totalCustomerCount}
      itemCount={item?.countSenderReceivers}
      navigateItemDetail={() =>
        navigation.navigate("MemberSenderDetail", { sender: item, member: member })
      }
      navigateToUpdate={() =>
        navigation.navigate("MemberSenderUpdate", { sender: item, member: member })
      }
      navigateToList={() =>
        navigation.navigate("MemberSenderReceiverList", { sender: item, type: 1, member: member })
      }
      navigateToSend={() => navigateSendMoney(item)}
      isAdmin = {true}
    />
  ), [navigation]);

  return (
    <SafeArea>
    <ErrorComponent error={hasError} hasError={hasError} />
     <Search
        buttonIcon="account-multiple-plus"
        buttonTitle=""
        onSearch={(filterParams) => retrieveCustomers(false, filterParams)}
        filterParam={fetchFilterParams}
        navigateToScreen={() => navigation.navigate("CustomerCreate")}
      /> 

    <MemberListComponent
      hasError={hasError}
      isLoading={isLoading}
      members={customers}
      memberKeyId="senderId"
      retrieveMembers={retrieveCustomers}
      loadMoreMemberData={() => LoadMoreCustomerData(fetchFilterParams)}
      totalMemberCount={totalCustomerCount}
      filterParam={searchWord}
      lastCustomerId={lastCustomerId}
      renderMember={renderMember}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
    </SafeArea>
  );
};


// import React, { useContext, useCallback, useEffect } from "react";
// import { CustomersContext } from "../../../services/senders/senders.context";
// import { SafeArea } from "../../../components/utility/safe-area.component";
// import { ListComponent } from "../../../components/list/list.component";

// export const MemberSendersScreen = ({ navigation, route }) => {
//   const {
//     isLoading,
//     customers,
//     hasError,
//     retrieveCustomers,
//     LoadMoreCustomerData,
//     totalCustomerCount,
//     searchWord,
//     fetchFilterParams,
//     lastCustomerId,
//     onRefresh,
//      refreshing
//   } = useContext(CustomersContext);

//   const navigateSendMoney = (sender) =>
//     navigation.navigate("Send", {
//       screen: "SendMoneyAmountCalculator",
//       params: {
//         sender: sender,
//         selectedOriginCurrency: sender?.userCurrency?.originCurrency?.originCurrency,
//         selectedDestinationCurrency: sender?.userCurrency?.destinationCurrency?.destinationCurrency,
//       },
//     });

//       const { member } = route.params;

//   useEffect(() => {
//     retrieveCustomers(true,{ userId: member?.userId }, 1);
//   }, [member?.userId]);
    
//   return (
//     <SafeArea>
//     <ListComponent
//         members = {customers}
//         navigateToCreateScreen = {() => navigation.navigate("CustomerCreate")}
//         navigateToSendMoney = {(item) => navigateSendMoney(item)}
//         navigateToMemberDetail = {(item) => navigation.navigate("CustomerDetail", { sender: item })}
//         navigateToMemberUpdate = {(item) => navigation.navigate("CustomerUpdate", { sender: item })}
//         navigateToMemberList = {(item) => navigation.navigate("ReceiverList", { sender: item, type: 1 }) }
//         onSearch = { (filtersParam) => retrieveCustomers(false, filtersParam) }
//         retrieveMembers = {retrieveCustomers}
//         loadMoreData = {() => LoadMoreCustomerData(fetchFilterParams)}
//         onRefresh = {() => onRefresh(fetchFilterParams)}
//         memberItemCount ={ (item) => item?.countSenderReceivers}
//         memberItemName = {(item) => item?.senderName}
//         memberItemPhone = {(item) => item?.senderPhone}
//         totalMemberCount = {totalCustomerCount}
//         isLoading = {isLoading}
//         hasError = {hasError}
//         fetchFilterParams = {fetchFilterParams}
//         refreshing = {refreshing}
//         searchButtonTitle = {"New"}
//         buttonIcon = {"plus" }
//         listIcon = "account-group"
//       />
//     </SafeArea>
//   );
// };
