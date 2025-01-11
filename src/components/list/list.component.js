import React, { useContext, useCallback } from "react";
import { MemberListComponent } from "../member-list.component";
import { MemberRenderComponent } from "../members/member-render.component";
import { Search } from "../search.component";
import { SafeArea } from "..//utility/safe-area.component";
import { LoadingComponent } from "..//loading.component";
import { ErrorComponent } from "../error/error.component";
import { useNavigation } from "@react-navigation/native";

export const ListComponent = ({ 
    members,
    navigateToCreateScreen,
    navigateToSendMoney, 
    navigateToMemberDetail ,
    navigateToMemberUpdate,
    navigateToMemberList,
    onSearch,
    retrieveMembers,
    loadMoreData,
    onRefresh,
    memberItemCount, 
    memberItemName,
    memberItemPhone, 
    totalMemberCount,
    isLoading,
    hasError,
    fetchFilterParams,
    refreshing,
    listIcon,
    searchButtonTitle,
    buttonIcon,
    infoCardToRender
}) => {
            
 const navigation = useNavigation();
 
    const renderMember = useCallback((item) => (
      <MemberRenderComponent
        name={memberItemName(item)}
        phone={memberItemPhone(item)}
        count={totalMemberCount}
        itemCount={memberItemCount(item)}
        listIcon={listIcon}
        navigateItemDetail={ () => navigateToMemberDetail(item)}
        navigateToUpdate={ () => navigateToMemberUpdate(item)}
        navigateToList= {() => navigateToMemberList(item)}
        navigateToSend={() =>navigateToSendMoney(item) }
        infoCardToRender = {infoCardToRender}
      />
   
), [navigation]);

  return (
    <SafeArea>
     {isLoading && <LoadingComponent />}
      <ErrorComponent error={hasError} hasError={hasError} />
     <Search
        buttonIcon={buttonIcon}
        buttonTitle={searchButtonTitle}
        onSearch={ onSearch }
        filterParam={fetchFilterParams}
        navigateToScreen={navigateToCreateScreen}
      /> 
    <MemberListComponent
      hasError={hasError}
      isLoading={isLoading}
      members={members}
      memberKeyId = {`senderId`}
      retriveMembers={retrieveMembers}
      loadMoreMemberData={loadMoreData}
      totalMemberCount={totalMemberCount}
      filterParam={fetchFilterParams}
      renderMember={renderMember}
      refreshing={refreshing}
      onRefresh={() => onRefresh(transactionFilters)}
    />
    </SafeArea>
  );
};
