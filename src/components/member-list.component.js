import React, { useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { LoadingComponent } from "./loading.component";

const MemberList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const MemberListComponent = ({
  members,
  memberKeyId,
  loadMoreMemberData,
  hasError,
  renderMember,
  isLoading,
  refreshing,
  onRefresh,
  addSearchComponent = true
}) => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <>
      {!hasError && (
        <MemberList
          data={members}
          renderItem={({ item }) => renderMember(item)}
          keyExtractor={(item, index) => `${item?.[memberKeyId].toString()}-${index}`}
          onEndReached={ loadMoreMemberData}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={ onRefresh} // Adjust this as necessary
          ListFooterComponent = {isLoading ? <LoadingComponent /> : null}
          initialNumToRender={10} // Adjust the initial number of items to render
          getItemLayout={(data, index) => (
            { length: 100, offset: 100 * index, index } // Adjust the length to match item height
          )}
        />
      )}
    </>
  );
};
