import React, { useContext, useEffect } from "react";

import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { CommonContext } from "../../../services/utilities/common.context";
import { ScrollView, TouchableOpacity, FlatList } from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  SettingsBackground,
  ProfileContainer,
  ProfileImage,
  SectionContainer,
  Section,
  SectionItem,
  SectionItemRow,
  SectionRow,
  Item,
  ItemNumber,
  Numbering,
  TransparentSafeArea,
  SectionWrapper,
  Rounded,
  SendMoneyContainer,
} from "../components/home.styles";
import { TransactionsContext } from "../../../services/transactions/transactions.context";
import { HomeRecentTransaction } from "../components/home.recent-transaction.component";

export const HomeScreen = ({ navigation }) => {
  const { user, authData, bootstrapAsync } = useContext(AuthenticationContext);
  const {transactions} = useContext(CommonContext)
  
 
//console.log('userName in=', user.user.userName)
  // const { transactions } = useContext(TransactionsContext);


  useEffect(() => {
   //bootstrapAsync();
  
    
  }, [  ]);

  return (
    <SettingsBackground>
      <FlatList
        style={{ flex: 1, width: "100%", height: "100%" }}
        ListHeaderComponent={
          <>
            <TransparentSafeArea>
              <ProfileContainer onPress={() => navigation.navigate("HomeMenu")}>
                <ProfileImage
                  size={50}
                  source={{ uri: "https://via.placeholder.com/150" }}
                />
                <Text variant="label">
                  Welcome, {user.userName}
                </Text>
              </ProfileContainer>

              <SectionContainer>
                <SectionItem>
                  <Item>Total Sent</Item>
                  <SectionRow>
                    <ItemNumber>£ {user.totalSent}</ItemNumber>
                    <Rounded>
                      <Numbering>{user.countTotalSent}</Numbering>
                    </Rounded>
                  </SectionRow>
                </SectionItem>
                <SectionItem>
                  <Item>Total Pending</Item>
                  <SectionRow>
                    <ItemNumber>£ {user.totalPending}</ItemNumber>
                    <Rounded>
                      <Numbering>{user.countTotalPending}</Numbering>
                    </Rounded>
                  </SectionRow>
                </SectionItem>
                <SectionItem>
                  <Item>Total Paid</Item>
                  <SectionRow>
                    <ItemNumber>£ {user.totalPaid}</ItemNumber>
                    <Rounded>
                      <Numbering>{user.countTotalPaid}</Numbering>
                    </Rounded>
                  </SectionRow>
                </SectionItem>
              </SectionContainer>
{/* 
                 <HomeRecentTransaction transactions={transactions?.data} /> */}
            

              <SectionContainer>
                <TouchableOpacity
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: "Send",
                          params: { screen: "SendMoneyAmountCalculator" },
                        },
                      ],
                    })
                  }
                >
                  <SendMoneyContainer>
                    <SectionRow>
                      <MaterialCommunityIcons
                        name="bank"
                        size={28}
                        color="black"
                      />
                      <Item>Send Money</Item>
                    </SectionRow>
                    <Section>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={28}
                        color="black"
                      />
                    </Section>
                  </SendMoneyContainer>
                </TouchableOpacity>
              </SectionContainer>

              <SectionWrapper>
                <SectionItemRow>
                  <Avatar.Image
                    size={32}
                    source={{
                      uri: "https://monytransfer.com/stores/2bda0c37-4eac-44e5-a014-6c029d76dc62/images/nigeria.png",
                    }}
                  />
                  <Item>Nigeria</Item>
                </SectionItemRow>
                <Spacer position="top" size="medium">
                  <SectionItemRow>
                    <Item>1 GBP</Item>
                    <Item>=</Item>
                    <Item>{user.rate} NGN</Item>
                  </SectionItemRow>
                </Spacer>
              </SectionWrapper>
            </TransparentSafeArea>
          </>
        }
      />
    </SettingsBackground>
  );
};
