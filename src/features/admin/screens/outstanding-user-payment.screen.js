import React, { useContext,useState,useCallback , useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Divider, IconButton,Button,  MD3Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { MemberListComponent } from "../../../components/member-list.component";
import { MainFilterComponent } from "../../../components/filter/main-filter.component";
import { userAsSender } from "../../../components/utilities.component";

import { FilterDateOption, TransactionFilterStatusOption , FilterOutstandingTypeOption} from "../../../components/filter/constants";
import {ContainerCard, PaddedView, Section, SectionBegin,SectionEnd, TextItem, TextGrayBackground, SectionRow, SectionRowCentered, RowOnlySection, SuccessText, ErrorText, Icon } from "../../../styles/common.style";
import { OutstandingContext } from "../../../services/outstanding/outstanding.context";
export const OutstandingUserPaymentScreen = ({ navigation,route }) => {

  const { member } = route.params;

  const [transactionFilters, setTransactionFilters ] = useState({});
  const [outstandingFilters, setOutstandingFilters ] = useState({userId: member?.userId});
  
  const buttonFilterValues = {"type":FilterOutstandingTypeOption, "date": FilterDateOption}
  const filterOptions = ['date', 'type'];
  

  

    const {outstandings, retrieveOutstandings, isLoading, hasError , refreshing, onRefresh, loadMoreOutstandingData} = useContext(OutstandingContext);


    const navigateToPayment = (userId, type, outstandingId, amount) =>{
      navigation.navigate('OutstandingAddPayment', 
        {
          userId: userId,
        outstandingAmount: amount,
        paymentType: type,
        outstandingId: outstandingId
      });
    }

  const renderMember = useCallback((item) => (
    <TouchableOpacity onPress={() => navigation.navigate("TransactionDetail")}>
      <Spacer position="bottom" size="large">
        <FadeInView>
        <ContainerCard  elevation={2}>
            <PaddedView>
                <TextGrayBackground variant="small">{item?.createdAt}</TextGrayBackground>
                <RowOnlySection>
                  <SectionRowCentered>
                        <TextItem variant="titleMedium">{item?.receiverName}</TextItem> 
                        <TextItem variant="bodySmall"> / {item?.senderName}</TextItem> 
                  </SectionRowCentered>
                 
                </RowOnlySection>



                <RowOnlySection>

                    <Section>
                        <SectionBegin>
                            {/* <TextItem variant="titleSmall">£{item?.totalAmount} Payment </TextItem> 
                            <Button icon = {item.transactionPaidStatus ? 'ellipse' : 'ellipse-outline'} mode="text" onPress={() => console.log('Pressed')}>{item.transactionPaidStatus ? 'Paid' : 'Pay'}</Button> */}
                          
                            { item.transactionPaidStatus === 0 && item.totalAmount > 0 && (
                            <Button mode="outlined" onPress={() => navigateToPayment(item?.userId, 'Transaction', item?.outstandingPaymentId, item?.totalAmount)}>
                                Pay £{item?.totalAmount} Payment
                            </Button>
                          ) }

                     
                        </SectionBegin>
                        <Spacer size="medium" />
                        <SectionBegin>
                            {/* <TextItem variant="titleSmall">£{item?.totalCommission} Commission </TextItem> 
                            <Button icon = {item.commissionPaidStatus ? 'ellipse' : 'ellipse-outline'} mode="text" onPress={() => console.log('Pressed')}>{item.commissionPaidStatus ? 'Paid' : 'Pay'}</Button> */}
                        
                            { item.commissionPaidStatus === 0 &&  item.totalCommission > 0 &&(
                            <Button mode="outlined" onPress={() => navigateToPayment(item?.userId, 'Commission', item?.outstandingPaymentId, item?.totalCommission)}>
                                Pay £{item?.totalCommission} Commission
                            </Button>
                          ) }
                        </SectionBegin>
                            
                      </Section>
                  
                </RowOnlySection>
            

              <Spacer size="large" />
              <Divider />    
            </PaddedView>
          </ContainerCard>
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

  useEffect(() => {
    retrieveOutstandings(true, {userId: member?.userId}, 1);
  }, []);


  return (
    <MainFilterComponent  onFilterSubmit = {onSubmitFilter} filterButtonValues = {buttonFilterValues} filterButtons = {filterOptions} >
        <SectionRow>
            
              <RowOnlySection>
                    <Icon name="briefcase" size={24} color="green" />
                    
                    <ErrorText variant="bodySmall" > £{member?.outstanding?.amountSentSum} </ErrorText>
                </RowOnlySection>
                <RowOnlySection>
                    <Icon name="content-cut" size={24} color="green" />
                    <ErrorText variant="bodySmall" > £{member?.outstanding?.totalCommissionSum}</ErrorText>
                </RowOnlySection>
        </SectionRow>
        <Spacer size="medium" />
        <MemberListComponent
          hasError={hasError}
          isLoading={isLoading}
          members={outstandings}
          memberKeyId = {`outstandingPaymentId`}
          retriveMembers={retrieveOutstandings}
          filterParam={""}
          totalMemberCount={"0"}
          lastCustomerId={""}
          renderMember={renderMember}
          addSearchComponent = {false}
          loadMoreMemberData={() => loadMoreOutstandingData(outstandingFilters)} 
          refreshing={refreshing}
          onRefresh={() => onRefresh(outstandingFilters)}
        />
    </MainFilterComponent>
  );
};
