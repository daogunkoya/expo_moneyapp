import React, { useContext } from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { MembersScreen } from "../../features/members/screens/members.screen";
import { MemberDetailScreen } from "../../features/members/screens/member-detail.screen";
import { MemberUpdateScreen } from "../../features/members/screens/member-update.screen";
import { MemberSendersScreen } from "../../features/members/screens/member-senders.screen";
import {MemberSenderDetailScreen} from "../../features/members/screens/member-sender-detail.screen";
import { MemberSenderReceiversScreen } from "../../features/members/screens/member-sender-receivers.screen";
import { MemberSenderUpdateScreen } from "../../features/members/screens/member-sender-update.screen";
import { MemberReceiverDetailScreen } from "../../features/members/screens/member-receiver-detail.screen";
import { MemberSenderReceiverUpdateScreen } from "../../features/members/screens/member-sender-receiver-update.screen";
import {MemberUpdateStatusScreen} from "../../features/members/screens/member-update-status.screen";
import {MemberUpdateRoleScreen} from "../../features/members/screens/member-update-role.screen";


import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { IconButton } from "react-native-paper";

const MemberStack = createStackNavigator();

export const MembersNavigator = () => {
  const { user } = useContext(AuthenticationContext);

  const headerLeft = () => (
    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
  );

  const fetchTitle = (route) => {
    const { sender = {} } = route.params || {};
    return sender
      ? `${sender?.senderFname?.toUpperCase() ?? ""} ${
          sender?.senderLname?.toUpperCase() ?? ""
        }`
      : "";
  };

  return (
    <MemberStack.Navigator>
      <MemberStack.Screen
        name="MemberList"
        component={MembersScreen}
        options={({ navigation, route }) => {
          const title = fetchTitle(route);
          return {
            title: `${title} Member List` || title,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <MemberStack.Screen
        name="MemberDetail"
        component={MemberDetailScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.member?.userFname} ${ route?.params?.member?.userLname} Details`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<MemberStack.Screen
        name="MemberUpdate"
        component={MemberUpdateScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.member?.userFname} ${ route?.params?.member?.userLname} Update`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
<MemberStack.Screen
        name="MemberUpdateStatus"
        component={MemberUpdateStatusScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.member?.userFname} ${ route?.params?.member?.userLname} Update`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <MemberStack.Screen
        name="MemberUpdateRole"
        component={MemberUpdateRoleScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.member?.userFname} ${ route?.params?.member?.userLname} Update`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <MemberStack.Screen
        name="MemberSenderList"
        component={MemberSendersScreen}
        options={({ navigation, route }) => ({
          title: `${route?.params?.member?.userFname} ${route?.params?.member?.userLname} Senders`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

    <MemberStack.Screen
        name="MemberSenderDetail"
        component={MemberSenderDetailScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.sender?.senderFname} ${ route?.params?.sender?.senderLname} Member Details`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<MemberStack.Screen
        name="MemberSenderReceiverList"
        component={MemberSenderReceiversScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.sender?.senderFname} ${ route?.params?.sender?.senderLname} Receivers`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<MemberStack.Screen
        name="MemberSenderUpdate"
        component={MemberSenderUpdateScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.sender?.senderFname} ${ route?.params?.sender?.senderLname} Update`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />


<MemberStack.Screen
        name="MemberReceiverDetail"
        component={MemberReceiverDetailScreen}
        options={({ navigation,route }) => ({
          title: `${ route?.params?.receiver?.receiverFname} ${ route?.params?.receiver?.receiverLname} ( ${route?.params?.sender?.senderFname?.toUpperCase()} ${route?.params?.sender?.senderLname?.toUpperCase()} )`,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />


<MemberStack.Screen
        name="MemberSenderReceiverUpdate"
        component={MemberSenderReceiverUpdateScreen}
        options={({ navigation,route }) => ({
        //  title: `${route?.params?.receiver?.receiverFname} ${route?.params?.receiver?.receiverLname} `,
          title: `${route?.params?.receiver?.receiverFname} ${route?.params?.receiver?.receiverLname} `,
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

    </MemberStack.Navigator>
  );
};
