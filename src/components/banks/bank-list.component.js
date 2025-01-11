import React, {  useState, useCallback } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import { Spacer } from "../spacer/spacer.component";
import { MemberListComponent } from "../member-list.component";
import { Search } from "../search.component";
import {
  SectionRow,
  Section,
  SectionBegin,
} from "../../styles/common.style";
import { FadeInView } from "../../components/animations/fade.animation";
import { useNavigation } from "@react-navigation/native";

export const BankListComponent = ({
  retrieveBanks,
  isLoading,
  hasError,
  banks,
  loadMoreMemberData,
  onBankDelete,
  onRefresh,
  refreshing,
  filters,
  userRole,
  navigateTo
}) => {
  const navigation = useNavigation();

  // const [filters, setFilters] = useState(prevFilterParams || {});
  const [reload, setReload] = useState(false);

  const handleBankDelete = (bankId) => {
    try {
      onBankDelete(bankId);
      Alert.alert("Success", "Bank Deleted Successfully");
      setReload(!reload); // Toggle the reload state to trigger useEffect
    } catch (error) {
      Alert.alert("Error", "Failed to delete bank");
    }
  };

  const routeTo = (bank) => {
    if(navigateTo)  navigation.navigate(navigateTo, { bank: bank }); 
  }

  const renderMember = useCallback(
    (item) => (
      <TouchableOpacity onPress={() => routeTo(item)}>
        <Spacer position="bottom" size="large" />
        <FadeInView>
          <SectionRow>
            <SectionBegin>
              {/* <Text variant="titleSmall">Bank Name</Text> */}
              <Text variant="bodySmall">{item?.name}</Text>
            </SectionBegin>

            {userRole === "Admin" && (<Section>
              <IconButton
                icon="pen"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() =>
                  navigation.navigate("BankUpdate", { bank: item })
                }
              />
            </Section>)}

            {userRole === "Admin" && (<Section>
              <IconButton
                icon="delete-circle"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => handleBankDelete(item?.id)}
              />
            </Section>)}

          </SectionRow>
        </FadeInView>
      </TouchableOpacity>
    ),
    [reload]
  );

  return (
    <Section>
      <Search
      onSearch={(updatedFilter) => retrieveBanks(false, updatedFilter, 1)}
      filterParam={filters}
      />
      <Spacer size="large" />
      <MemberListComponent
        hasError={hasError}
        isLoading={isLoading}
        members={banks}
        memberKeyId="id"
        loadMoreMemberData={() => loadMoreMemberData(filters)}
        renderMember={renderMember}
        refreshing={refreshing}
        onRefresh={() => onRefresh(filters)}
      />
    </Section>
  );
};
