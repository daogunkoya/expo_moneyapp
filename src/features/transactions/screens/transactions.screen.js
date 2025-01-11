import React, { useContext,useState,useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { MemberListComponent } from "../../../components/member-list.component";
import { MainFilterComponent } from "../../../components/filter/main-filter.component";
import { userAsSender } from "../../../components/utilities.component";

import { FilterDateOption, TransactionFilterStatusOption , FilterCurrenciesOption} from "../../../components/filter/constants";
import { TransactionInfoCard } from "../components/transaction-info-card.component";
import { TransactionsContext } from "../../../services/transactions/transactions.context";

export const TransactionsScreen = ({ navigation }) => {

  const [transactionFilters, setTransactionFilters ] = useState({});
  
  const buttonFilterValues = {"status":TransactionFilterStatusOption, "date": FilterDateOption, "currencies": FilterCurrenciesOption}
  const filterOptions = ['date', 'status', 'currency'];
  

  const { isLoading,transactions, retrieveTransactions, hasError , totalTransactionCount,
    LoadMoreTransactionData,searchWord, onRefresh, refreshing } = useContext(TransactionsContext);

  const navigateToList = (item) =>{
    const isAgent = item?.userRole === 'Agent';
    const routeTo = isAgent ?  'MemberSenderList' : 'MemberSenderReceiverList';
    const sender = !isAgent?userAsSender(item):item
    const params = {member: item, type: 1, sender: sender}
    console.log('params/route', params, routeTo)
    navigation.navigate(routeTo, params);
  }

  const renderMember = useCallback((item) => (
    <TouchableOpacity onPress={() => navigation.navigate("TransactionDetail", { transaction: item })}>
      <Spacer position="bottom" size="large">
        <FadeInView>
          <TransactionInfoCard transaction={item} />
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
  ), [navigation]);


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
      setTransactionFilters(updatedFilter);
  
      retrieveTransactions(false, updatedFilter);
    }
  
    setToggleFilterOptions(false);
  };


  return (
    <MainFilterComponent  onFilterSubmit = {onSubmitFilter} filterButtonValues = {buttonFilterValues} filterButtons = {filterOptions} >
        <MemberListComponent
          hasError={hasError}
          isLoading={isLoading}
          members={transactions}
          memberKeyId = {`transactionId`}
          retriveMembers={retrieveTransactions}
          filterParam={searchWord}
          totalMemberCount={totalTransactionCount}
          lastCustomerId={""}
          renderMember={renderMember}
          addSearchComponent = {false}
          loadMoreMemberData={() => LoadMoreTransactionData(transactionFilters)} 
          refreshing={refreshing}
          onRefresh={() => onRefresh(transactionFilters)}
        />
    </MainFilterComponent>
  );
};
