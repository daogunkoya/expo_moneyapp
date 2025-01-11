import React, { useContext } from "react";
import styled from "styled-components/native";

import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ScrollView } from "react-native";

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;
 const SettingContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[4]};
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
 
  background-color: rgba(255, 255, 255, 0.4);
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
///pass, bank de, contact us, notific, faqs,communi prefee
export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SettingsBackground>
      <ScrollView>
          <TransparentSafeArea>
            <AvatarContainer>
              <Avatar.Icon
                size={180}
                icon="human"
                backgroundColor={colors.brand.primary}
              />
              <Spacer position="top" size="large">
                <Text variant="label">email is here</Text>
              </Spacer>
            </AvatarContainer>
              <SettingContainer>
              <Spacer position="top" size="large">
                <Text variant="label">Profile Setting</Text>
              </Spacer>
                <List.Section>
                  <SettingsItem
                    title="Change Address "
                    description="Update Addres Details here"
                    left={(props) => (
                      <List.Icon {...props} color={colors.ui.error} icon="heart" />
                    )}
                    onPress={() => navigation.navigate("Favourites")}
                  />
                  <Spacer />
                  <SettingsItem
                    title="Update Contact Details"
                    left={(props) => (
                      <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="Password Update"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="ID Documents"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  </List.Section>
              </SettingContainer>



              <SettingContainer>
              <Spacer position="top" size="large">
                <Text variant="label"> Support and Security</Text>
              </Spacer>
               <List.Section>
                  <SettingsItem
                    title="Communication Preference"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="Bank Details"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="FAQs"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="Notifications"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.ui.secondary}
                        icon="history"
                      />
                    )}
                    onPress={() => null}
                  />
                  <Spacer />
                  <SettingsItem
                    title="Logout"
                    left={(props) => (
                      <List.Icon {...props} color={colors.ui.secondary} icon="door" />
                    )}
                    onPress={onLogout}
                  />
                </List.Section>
              </SettingContainer>
          </TransparentSafeArea>
       </ScrollView>
    </SettingsBackground>
  );
};
