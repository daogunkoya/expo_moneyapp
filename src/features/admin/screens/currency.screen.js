import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import { SearchMenuComponent } from "../../../components/search/search-menu.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MemberListComponent } from "../../../components/member-list.component";
import { SectionRow, SectionRowVerticalCenter,Section, SpaceBetweenSection, SectionEnd,SectionBegin, CountryIcon } from "../../../styles/common.style";
import { CurrencyContext } from "../../../services/currency/currencies.context";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Button } from 'react-native-paper';


export const CurrencyScreen = ({ navigation, route }) => {

  const { isLoading, hasError, currencies, loadMoreCurrencyData, onCurrencyToggle, retrieveCurrencies,  onRefresh, refreshing, prevFilterParams } = useContext(CurrencyContext);

  const [search, setSearch] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(route.params?.currency);
  const [filters, setFilters] = useState(prevFilterParams || {});
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    const updatedFilters = { ...filters };
    setFilters(updatedFilters);

    retrieveCurrencies(false, updatedFilters);

  }, []);

  const toggleCurrencyStatus =  (currencyId) => {
    try {
      onCurrencyToggle(currencyId);
      Alert.alert('Success', 'Currency Status Updated Successfully');
      setReload(!reload); // Toggle the reload state to trigger useEffect
    } catch (error) {
      Alert.alert('Error', 'Failed to delete bank');
    }
  };

  const renderMember = useCallback((item) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <Spacer position="bottom" size="large"/>
        <FadeInView>
          <SectionRow>
              <SectionRowVerticalCenter>
                
                <CountryIcon isoCode={item?.currencySymbol} size={40} />
                <Spacer position="left" size="medium" />
                <Text variant="bodySmall">{item?.currencyCountry}</Text>
              </SectionRowVerticalCenter>
              <Section>
                <IconButton
                  icon={item?.currencyStatus === '1' ? 'toggle-switch' : 'toggle-switch-off-outline'} 
                  iconColor={MD3Colors.error40}
                  size={30}
                  onPress={() => toggleCurrencyStatus(item?.currencyId)}
                />
              </Section>
              
            </SectionRow>
        </FadeInView>
    </TouchableOpacity>
  ), [reload]);

  return (
    <Section>
      <Spacer size="large" />
      
      <Section>
        <Spacer size="large" />
        <Spacer position="left" size="medium" >
         <Text variant="titleMedium">Available Currencies</Text>
        </Spacer>
      </Section>

      <Spacer size="large" />
      <MemberListComponent
        hasError={hasError}
        isLoading={isLoading}
        members={currencies}
        memberKeyId="currencyId"
        loadMoreMemberData={() => loadMoreCurrencyData(filters)}
        renderMember={renderMember}
        refreshing={refreshing}
        onRefresh={() => onRefresh(filters)}
      />
    </Section>
  );
};
