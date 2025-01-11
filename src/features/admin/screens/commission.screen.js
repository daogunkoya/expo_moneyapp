import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import { SearchMenuComponent } from "../../../components/search/search-menu.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MemberListComponent } from "../../../components/member-list.component";
import { SectionRow, Section, SpaceBetweenSection, SectionBegin, SectionEnd, DateGrayBackground, CountryIcon } from "../../../styles/common.style";
import { FadeInView } from "../../../components/animations/fade.animation";
import { CurrencySelectMenuComponent } from "../../../components/Currency/currency-select-menu.component";
import { RateContext } from "../../../services/rates/rates.context";
import { CommissionContext } from "../../../services/commissions/commissions.context";

export const CommissionScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(route.params?.member);
  const [selectedCurrency, setSelectedCurrency] = useState(route.params?.currency);
  const [filters, setFilters] = useState({});
  const [reload, setReload] = useState(false);

  const { isLoading, hasError, commissions, loadMoreCommissionData, retrieveCommissions, onCommissionDelete, onRefresh, refreshing } =
   useContext(CommissionContext);

  useEffect(() => {
    const currencyId = route.params?.currency?.currencyId;
    const userId = route.params?.member?.userId;

    if(route.params?.currency) setSelectedCurrency(route.params?.currency);
   if(route.params?.member) setSelectedMember(route.params?.member);

    const updatedFilters = { ...filters };
    if(currencyId) updatedFilters.currencyId = currencyId;
    if(userId) updatedFilters.userId = userId;

    setFilters(updatedFilters);

    retrieveCommissions(reload, updatedFilters);


    if(commissions.length > 0) {
      console.log('commission 0=',commissions[0]?.currency)
      setSelectedCurrency(commissions[0]?.currency);
    }
    // if(currencyId){
    //   setSelectedCurrency(route.params?.currency);
    // }

    // if(userId){
    //   setSelectedMember(route.params?.member);
    // }

  }, [route.params?.currency?.currencyId, route.params?.member?.userId, reload, commissions[0]?.currency]);

  const handleCommissionDelete =  (commissiondId) => {
    try {
       onCommissionDelete(commissiondId);
      Alert.alert('Success', 'Rate Deleted Successfully');
      setReload(!reload); // Toggle the reload state to trigger useEffect
    } catch (error) {
      Alert.alert('Error', 'Failed to delete rate');
    }
  };

  const renderMember = useCallback((item) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <Spacer position="bottom" size="large">
        <FadeInView>
          <Section>
            <SectionBegin>
            
            </SectionBegin>
            <SpaceBetweenSection>
              <Section>
                <Text variant="titleSmall">From</Text>
                <Text variant="bodySmall">{item?.startFrom}</Text>
              </Section>
              <Section>
                <Text variant="titleSmall">To</Text>
                <Text variant="bodySmall">{item?.endAt}</Text>
              </Section>
              <Section>
                <Text variant="titleSmall">Value</Text>
                <Text variant="bodySmall">{item?.value}</Text>
              </Section>
              <Section>
                <Text variant="titleSmall">Agent %</Text>
                <Text variant="bodySmall">{item?.agentQuota}</Text>
              </Section>
              <Section>
                <IconButton
                  icon="delete-circle"
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => handleCommissionDelete(item?.commissionId)}
                />
              </Section>
            </SpaceBetweenSection>
          </Section>
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
  ), [reload]);

  return (
    <Section>
      <Spacer size="large" />
      <SectionRow>
        <>
          <Spacer position="left" size="medium" />
          <CurrencySelectMenuComponent 
            navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "Commission" })}
            currencyCode={selectedCurrency?.currencySymbol} 
            countryTitle={selectedCurrency?.currencyCountry}
          />
          <SearchMenuComponent
            onSearchClick={() => navigation.navigate("SettingUserSelect", { routeTo: "Commission" })}
            searchPlaceholder={selectedMember?.userName || "Search User"}
            iconName="account" 
          />
        </>
        <SectionEnd>
          <IconButton
            icon="plus-circle"
            iconColor={MD3Colors.primary30}
            size={30}
            onPress={() => navigation.navigate("CommissionCreate")}
          />
        </SectionEnd>
      </SectionRow>

      <Spacer size="large" />
      <MemberListComponent
        hasError={hasError}
        isLoading={isLoading}
        members={commissions}
        memberKeyId="commissionId"
        loadMoreMemberData={() => loadMoreCommissionData(filters)}
        renderMember={renderMember}
        refreshing={refreshing}
        onRefresh={() => onRefresh(filters)}
      />
    </Section>
  );
};
