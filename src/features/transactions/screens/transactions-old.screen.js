import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { TransactionsContext } from "../../../services/transactions/transactions.context";
import { TransactionInfoCard } from "../components/transaction-info-card.component";
import { TransactionList, TransactionContainer } from "../components/transaction-list.styles";
import {TransactionFilters}  from '../components/transaction-filters.component'
import {TransactionFilterOptionsComponent} from '../components/transaction-filter-options.component'
import {TransactionFilterDateComponent} from '../components/transaction-filter-date.component'
import { SearchWithHeaderComponent } from "../../../components/search-with-header.component";
import { LoadingComponent } from "../../../components/loading.component";
import { TransactionFilterDateOption, TransactionFilterStatusOption , TransactionFilterCurrenciesOption} from "../transaction.constant";




export const TransactionsScreen = (props) => {
 const  { navigation,route } = props
 const { params = ""}  = route
 

 
  const { isLoading,transactions, retrieveTransactions, hasError , totalTransactionCount,
     LoadMoreTransactionData,searchWord } = useContext(TransactionsContext);

  const [isToggled, setIsToggled] = useState(false);
  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
  const [toggleFilterDateOption, setToggleFilterDateOption] = useState(false);
  const [filterButtonOptions, setFilterButtonOptions] = useState({})
  const [filters, setFilters] = useState({});
  const [selectedFilter , setSelectedFilter] = useState(null);

  
  
  const filterButtonAction = (option = null, data = null) => {
    setSelectedFilter(option)
    switch (option) {
      case "date":
        setFilterButtonOptions(TransactionFilterDateOption);
        setToggleFilterOptions(!toggleFilterOptions)
        break;
      case "status":
        setFilterButtonOptions(TransactionFilterStatusOption); //['All Status', 'All Status', 'Success', 'Failed', 'In Progress']);
        setToggleFilterOptions(!toggleFilterOptions)
        break;
      case "currency":
        setFilterButtonOptions(TransactionFilterCurrenciesOption); //['All Currencies', 'NGN', 'USD']);
        setToggleFilterOptions(!toggleFilterOptions)
        break;
        case "cancel":
          setFilterButtonOptions([ ]);
          setFilters({})
          setSelectedFilter(null)
          setToggleFilterOptions(false)
          setToggleFilterDateOption(false)
          retrieveTransactions({});
        break;
          
      default:
        return;

    }

    
   
  }

  const submitSearchQuery = (selected) => {
    const {label,value:selectedValue} = selected

    console.log("submiting ---", selectedValue)

    if(selectedValue === 'date-range'){
      setToggleFilterDateOption(!toggleFilterDateOption)
      setToggleFilterDateOption(!toggleFilterDateOption)
    }else{
      const filterObj = { ...filters, [selectedFilter]: selectedValue }
  
      const updatedFilter = Object.fromEntries(
        Object.entries(filterObj).filter(([key, value]) => value !== 'all'));
        
    
        setFilters(updatedFilter)
      
        retrieveTransactions(updatedFilter);
    }
   
      setToggleFilterOptions(false)
    
  }

  const subDateRangeAction = (selected) => {
    const {startDate, endDate} = selected
    // console.log("submiting ---", startDate, endDate)

    setToggleFilterOptions(false)
    setToggleFilterDateOption(!toggleFilterDateOption)

    submitSearchQuery({label:'date',value:{from:startDate,to:endDate}})
  }
  
  return (
    <SafeArea>
      <SearchWithHeaderComponent title = "Transaction History" onSearch = {submitSearchQuery}  filterAction={filterButtonAction}/>
      <TransactionContainer>
      {isLoading && <LoadingComponent/>}
     
      <TransactionFilters
      selectedFilter = {selectedFilter}
      filters = {filters}
       filterAction={filterButtonAction}
       color = "red"
      />
    
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}

   
   

      {!hasError && (
        <TransactionList
          data={transactions}
          style={{
            opacity: toggleFilterOptions ? 0.4 : 1,
          }}
          renderItem={( {item, index} ) => {
        // console.log(item)
            return (  
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TransactionDetail", {
                    transaction: item,
                    
                  })
                }
              >
                <Spacer position="bottom" size="small">
                  <FadeInView>
                    <TransactionInfoCard index = {index + 1} count ={totalTransactionCount} transaction={item}  navigation = {navigation} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.transactionId}
          //extraData = {totalTransactionCount}
          onEndReached={()=>LoadMoreTransactionData(searchWord)}
          onEndReachedThreshold={0}
        />
      )}

        </TransactionContainer>
      {toggleFilterOptions &&<TransactionFilterOptionsComponent
      filterAction={filterButtonAction}
       filterOptions = {filterButtonOptions} 
       submitAction = {submitSearchQuery}
       filters = {filters}
        title = "Date Range" />}

    {toggleFilterDateOption &&<TransactionFilterDateComponent
          filterAction={subDateRangeAction}
          filterOptions = {[]} 
          submitAction = {subDateRangeAction}
            title = "Date Range" />}

    </SafeArea>
  );
};
