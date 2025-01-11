import React, { useContext,useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Text, Card,Divider } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { MemberListComponent } from "../../../components/member-list.component";
import  { OutstandingInfoCard } from "../components/outstanding-info-card.component";
import { MainFilterComponent } from "../../../components/filter/main-filter.component";
import { userAsSender } from "../../../components/utilities.component";
import { LoadingComponent } from "../../../components/loading.component";
import { Search } from "../../../components/search.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SectionRow, SpaceBetweenSection,SectionEnd, TextGrayBackground, RowOnlySection, SuccessText as PaidText, ErrorText as PendingText, ContainerCard, PaddedView, TextItem, Icon } from "../../../styles/common.style";


import { MembersContext } from "../../../services/members/members.context";

export const OutstandingOverviewScreen = ({ navigation }) => {

  const [memberFilters, setMemberFilters ] = useState({type:'Agent,Manager'});


  

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

  const navigateToPayment = (itemMember, type, amount) =>{
    navigation.navigate('OutstandingAddPayment', 
      {
        userId: itemMember?.userId,
      outstandingAmount: amount,
      paymentType: type,
      outstandingId: null
    });
  }

  const navigateToOutstandingList = (itemMember, amountTransaction, amountCommission) =>{
    if(amountTransaction > 0 || amountCommission > 0){
      navigation.navigate('UserOutstandingPayment', { member: itemMember, type: 1 });
      return;
    }
  }

  const renderMember = useCallback((item) => (
      <Spacer position="bottom" size="large">
        <FadeInView>
              <ContainerCard  elevation={2}>
                <PaddedView>
                <TouchableOpacity onPress={ () => navigateToOutstandingList(item, item?.outstanding?.amountSentSum, item?.outstanding?.totalCommissionSum)}> 
                    <TextGrayBackground variant="small">{item?.userRole}</TextGrayBackground>
                <SectionRow>
                  <TextItem variant="titleMedium">{`${item?.userFname} ${item?.userLname}`}</TextItem>
                  <SectionEnd>
                      <TextItem variant="bodyMedium">count : {item?.outstanding?.count} </TextItem>
                      </SectionEnd>
                  </SectionRow>
                  <Spacer size="medium" />
                  <SectionRow>
                      {/* <Section>
                            <Section>
                                  <RowOnlySection>
                                    <Icon name="briefcase" size={24} color="green" /> 
                                      <TextItem>  £{item?.outstanding?.amountSentSum} </TextItem>
                                    </RowOnlySection>
                                
                            </Section>
                            <Spacer size="large" />
                            <Section>
                                  <RowOnlySection>
                                    <Icon name="content-cut" size={24} color="green" /> 
                                    <TextItem>  £{item?.outstanding?.totalCommissionSum} </TextItem>
                                    </RowOnlySection>
                            </Section>
                      </Section> */}
                      <SpaceBetweenSection>
                        <Button disabled = {item?.outstanding?.amountSentSum <=0} icon ="briefcase" mode="outlined" onPress={() => navigateToPayment(item, 'Transaction', item?.outstanding?.amountSentSum)}>Pay £{item?.outstanding?.amountSentSum}</Button>
                        <Button disabled = {item?.outstanding?.totalCommissionSum <=0} icon ="content-cut" mode="outlined" onPress={() => navigateToPayment(item, 'Commission', item?.outstanding?.totalCommissionSum)}>Pay  £{item?.outstanding?.totalCommissionSum}</Button>
                      </SpaceBetweenSection>
                    
                  </SectionRow>
                  <Spacer size="large" />
                  <Divider /> 
                  </TouchableOpacity>   
                </PaddedView>
              </ContainerCard>
        </FadeInView>
      </Spacer>
  ));


  
  useEffect(() => {

    retrieveMembers( false, memberFilters);
    
  }, [memberFilters]);

  return (
    <SafeArea>
        {isLoading && <LoadingComponent />}
        <Search
          buttonIcon="account-multiple-plus"
          buttonTitle=""
          onSearch={(params) => retrieveMembers(false, params)}
          filterParam={memberFilters}
          navigateToScreen={() => navigation.navigate("ReceiverCreate",{sender: sender})}
        /> 

        {!isLoading && 
        <>
         <SectionRow>
            
              <RowOnlySection>
                  <Icon name="briefcase" size={24} color="green" />
                  <PaidText variant="bodySmall" >Payment</PaidText>  
              </RowOnlySection>
              <RowOnlySection>
                  <Icon name="content-cut" size={24} color="green" />
                  <PaidText variant="bodySmall" > Commission</PaidText>
              </RowOnlySection>
      </SectionRow>
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
        </>
        }
    </SafeArea>
  );
};
