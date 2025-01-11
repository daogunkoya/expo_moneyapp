import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import { SearchMenuComponent } from "../../../components/search/search-menu.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MemberListComponent } from "../../../components/member-list.component";
import { SectionRow, Section, SpaceBetweenSection, SectionBegin, SectionEnd, DateGrayBackground, CountryIcon } from "../../../styles/common.style";
import { RateContext } from "../../../services/rates/rates.context";
import { FadeInView } from "../../../components/animations/fade.animation";
import { CurrencySelectMenuComponent } from "../../../components/Currency/currency-select-menu.component";

export const RateScreen = ({ navigation, route }) => {

  const { isLoading, hasError, rates, loadMoreRateData, retrieveRates, onRateDelete, onRefresh, refreshing, prevFilterParams } = useContext(RateContext);

  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(route.params?.member ); ;
  const [selectedCurrency, setSelectedCurrency] = useState(route.params?.currency);
  const [filters, setFilters] = useState(prevFilterParams || {});
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    const currencyId = route.params?.currency?.currencyId;
    const userId = route.params?.member?.userId;

   if(route.params?.currency) setSelectedCurrency(route.params?.currency);
   if(route.params?.member) setSelectedMember(route.params?.member);

    const updatedFilters = { ...filters };
    if(currencyId) updatedFilters.currencyId = currencyId;
    if(userId) updatedFilters.userId = userId;

    setFilters(updatedFilters);

    retrieveRates(reload, updatedFilters);

    if(rates.length > 0) setSelectedCurrency(rates?.[0]?.currency);

  }, [route.params?.currency?.currencyId, route.params?.member?.userId, reload,rates?.[0]?.currency]);

  const handleRateDelete =  (rateId) => {
    try {
       onRateDelete(rateId);
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
              <DateGrayBackground>{item?.createdAt}</DateGrayBackground>
            </SectionBegin>
            <SpaceBetweenSection>
              <Section>
                <Text variant="titleSmall">Main Rate</Text>
                <Text variant="bodySmall">{item?.mainRate}</Text>
              </Section>
              <Section>
                <Text variant="titleSmall">Sold Rate</Text>
                <Text variant="bodySmall">{item?.soldRate}</Text>
              </Section>
              <Section>
                <Text variant="titleSmall">Bou Rate</Text>
                <Text variant="bodySmall">{item?.bouRate}</Text>
              </Section>
              <Section>
                <IconButton
                  icon="delete-circle"
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => handleRateDelete(item?.rateId)}
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
            navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "Rate" })}
            currencyCode={selectedCurrency?.currencySymbol} 
            countryTitle={selectedCurrency?.currencyCountry}
          />
          <SearchMenuComponent
            onSearchClick={() => navigation.navigate("SettingUserSelect", { routeTo: "Rate" })}
            searchPlaceholder={selectedMember?.userName || "Search User"}
            iconName="account" 
          />
        </>
        <SectionEnd>
          <IconButton
            icon="plus-circle"
            iconColor={MD3Colors.primary30}
            size={30}
            onPress={() => navigation.navigate("RateCreate")}
          />
        </SectionEnd>
      </SectionRow>

      <Spacer size="large" />
      <MemberListComponent
        hasError={hasError}
        isLoading={isLoading}
        members={rates}
        memberKeyId="rateId"
        loadMoreMemberData={() => loadMoreRateData(filters)}
        renderMember={renderMember}
        refreshing={refreshing}
        onRefresh={() => onRefresh(filters)}
      />
    </Section>
  );
};
