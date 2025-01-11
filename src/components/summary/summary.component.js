import React from "react";
import { FlatList, View } from "react-native";
import { Divider } from "react-native-paper";
import styled from "styled-components/native"; // use styled-components/native for React Native
import { NavigationButtonComponent } from "../button/navigation-button.component";

const ProfileContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

const SectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[2]};
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

const Label = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-left: ${(props) => props.theme.space[2]};
`;

const Value = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.small};
`;



const SummaryItem = ({ item }) => {
  return (
    <SectionRow>
      <Section>
        <Label>{item.label}</Label>
      </Section>
      <Section>
        <Value>{item.value}</Value>
      </Section>
    </SectionRow>
  );
};

const flattenSummaryItem = (summaryItem) => {
  let items = [];

  Object.keys(summaryItem).forEach((key) => {
    const value = summaryItem[key];
    if (typeof value === "object" && value !== null) {
      // Spread the object's keys into the items array
      items = [
        ...items,
        ...Object.keys(value).map((nestedKey) => ({
          label: `${key}.${nestedKey}`,
          value: value[nestedKey],
        })),
      ];
    } else {
      items.push({ label: key, value });
    }
  });

  return items;
};




export const Summary = ({ summaryItems, submitAction = null, toggleVisiblity = () => {} }) => {
  console.log('summaryitrems = ',summaryItems);
  const items = flattenSummaryItem(summaryItems);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <SummaryItem item={item} />}
        ItemSeparatorComponent={() => <Divider />}
      />
        {submitAction &&
          <NavigationButtonComponent
            firstTitle="Back"
            secondTitle="Submit" 
            secondAction={submitAction} 
            firstAction={toggleVisiblity} />}
    </View>
  );
};
