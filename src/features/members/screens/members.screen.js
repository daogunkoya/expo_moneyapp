import React, { useContext,useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { MemberListComponent } from "../../../components/member-list.component";
import  { MemberInfoCard } from "../../../components/info-card/member-info-card.component";
import { MainFilterComponent } from "../../../components/filter/main-filter.component";
import { userAsSender } from "../../../components/utilities.component";
import { FilterDateOption, FilterStatusOption , FilterCurrenciesOption, FilterTypeOption} from "../../../components/filter/constants";

import { MembersContext } from "../../../services/members/members.context";

export const MembersScreen = ({ navigation }) => {

  const [memberFilters, setMemberFilters ] = useState({});
  const buttonFilterValues = {"status":FilterStatusOption, "date": FilterDateOption, "currencies": FilterCurrenciesOption, 'type': FilterTypeOption}
  const filterOptions = ['date', 'status', 'type'];
  

  const {
    hasError,
    isLoading,
    members,
    totalMemberCount,
    retrieveMembers,
    LoadMoreData,
    searchWord,
    onRefresh,
    refreshing
  } = useContext(MembersContext);

  const navigateToList = (item) =>{
    const isAgent = item?.userRole === 'Agent';
    const routeTo = isAgent ?  'MemberSenderList' : 'MemberSenderReceiverList';
    const sender = !isAgent?userAsSender(item):item
    const params = {member: item, type: 1, sender: sender}
    console.log('params/route', params, routeTo)
    navigation.navigate(routeTo, params);
  }

  const renderMember = useCallback((item) => (
    <TouchableOpacity onPress={() =>   navigation.navigate("MemberDetail", { member: item })}>
      <Spacer position="bottom" size="large">
        <FadeInView>
          <MemberInfoCard
            name={`${item?.userFname} ${item?.userLname}`}
            role = {item?.userRole}
            phone={item?.userPhone}
            status={item?.userStatus}
            transactionCount={item?.transactionCount}
            senderCount={item?.senderCount}
            receiverCount={item?.receiverCount}
            itemCount={totalMemberCount}
            navigateToMemberList={() => navigateToList(item)}
            navigateToTransactionList={() =>{
              navigation.reset({
              index: 0,
              routes: [{ name: 'Transaction', params: { screen: 'TransactionList' , member: item, type: 1} }],
            });
            }}
            navigateItemDetail={() =>navigation.navigate("memberDetail", { member: user })}
            navigateToUpdate={(sender) => navigation.navigate("memberUpdate", { member: item })}
            navigateToList={() =>navigation.navigate("ReceiverList", { member: item, type: 1 }) }
            navigateToSend={() => navigateSendMoney(item)}
          />
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
  ));


  const onSubmitFilter = (
    selected,
    filters,
    selectedFilter,
    toggleFilterDateOption,
    setToggleFilterDateOption,
    setToggleFilterOptions,
    setFilters,
  ) => {
    const { label = "", value: selectedValue = "" } = selected;
    console.log("selected  ---", selected);
    
  
    if (selectedValue === "date-range") {
      setToggleFilterDateOption(!toggleFilterDateOption);
      setToggleFilterDateOption(!toggleFilterDateOption);
    } else {
          const filterObj = selectedValue?{ ...filters, [selectedFilter]: selectedValue } : {};
          const updatedFilter = Object.fromEntries(
            Object.entries(filterObj).filter(([key, value]) => value !== "all")
          );
  
      setFilters(updatedFilter);
      setMemberFilters(updatedFilter);
  
      retrieveMembers(false, updatedFilter);
    }
  
    setToggleFilterOptions(false);
  };


  return (
    <MainFilterComponent  onFilterSubmit = {onSubmitFilter} filterButtonValues = {buttonFilterValues} filterButtons = {filterOptions}>
        <MemberListComponent
          hasError={hasError}
          isLoading={isLoading}
          members={members}
          memberKeyId = {`userId`}
          retriveMembers={retrieveMembers}
          loadMoreMemberData={() => LoadMoreData(memberFilters)} 
          filterParam={searchWord}
          totalMemberCount={totalMemberCount}
          lastCustomerId={""}
          renderMember={renderMember}
          addSearchComponent = {false}
          refreshing={refreshing}
          onRefresh={() => onRefresh(memberFilters)}
        />
    </MainFilterComponent>
  );
};
