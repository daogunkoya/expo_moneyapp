import React, { useContext, useState, useEffect, useCallback } from "react";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import { SearchMenuComponent } from "../../components/search/search-menu.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { SectionRow, Section, SpaceBetweenSection, SectionEnd,SectionBegin, SectionCenter } from "../../styles/common.style";
import { BankContext } from "../../services/banks/banks.context";
import { CurrencySelectMenuComponent } from "../../components/Currency/currency-select-menu.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { BankListComponent } from "../../components/banks/bank-list.component";

export const BankScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthenticationContext);
  const { isLoading, hasError, banks, loadMoreBankData, retrieveBanks, onBankDelete, onRefresh, refreshing, prevFilterParams } = useContext(BankContext);

  const [search, setSearch] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(route.params?.currency);
  const [filters, setFilters] = useState(prevFilterParams || {});
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    const currencyId = route.params?.currency?.currencyId;


   if(route.params?.currency) setSelectedCurrency(route.params?.currency);
 

    const updatedFilters = { ...filters };
    if(currencyId) updatedFilters.currencyId = currencyId;
  

    setFilters(updatedFilters);

    retrieveBanks(reload, updatedFilters);

    if(banks.length > 0) setSelectedCurrency(banks?.[0]?.currency);

  }, [route.params?.currency?.currencyId, reload]);

  

  return (
    <Section>
      <Spacer size="large" />
      {user?.userRoleType === "Admin" && (
        <SectionRow>
            <SectionCenter>
              <Spacer position="left" size="medium" />
              <CurrencySelectMenuComponent 
                navigateTo={() => navigation.navigate("SettingCurrencySelect", { routeTo: "Bank" })}
                currencyCode={selectedCurrency?.currencySymbol} 
                countryTitle={selectedCurrency?.currencyCountry}
                />
              
            </SectionCenter>
            <SectionEnd>
              <IconButton
                icon="plus-circle"
                iconColor={MD3Colors.primary30}
                size={30}
                onPress={() => navigation.navigate("BankCreate")}
                />
            </SectionEnd>
          </SectionRow>
              )}

      <BankListComponent
        hasError={hasError}
        retrieveBanks={retrieveBanks}
        isLoading={isLoading}
        banks={banks}
        memberKeyId="id"
        onBankDelete={onBankDelete}
        loadMoreMemberData={loadMoreBankData}
        filters={filters}
        refreshing={refreshing}
        onRefresh={() => onRefresh(filters)}
        userRole = {user?.userRoleType}
        navigateTo = {route.params?.navigateTo}
      />
     
    </Section>
  );
};
