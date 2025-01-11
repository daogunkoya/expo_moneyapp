// SearchScreen.js
import React, { useState, useContext, useEffect } from 'react';
import {TouchableOpacity } from 'react-native';
import { Text, MD3Colors,IconButton, Divider } from 'react-native-paper';
import { CurrencyListComponent } from '../../../components/Currency/currency-list.component';
import { MembersContext } from '../../../services/members/members.context';
import { ListitemComponent } from '../../../components/list/list-item.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { MemberListComponent } from "../../../components/member-list.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Section, SectionRow , SectionRowCentered} from '../../../styles/common.style';

export const SettingUserSelectScreen = ({ route, navigation }) => {
  const { members,retrieveMembers,LoadMoreData, error,isLoading, hasError } = useContext(MembersContext);
  const [memberList, setMemberList] = useState(members);
  
 

  useEffect(() => {
    retrieveMembers();
    if (members) {
      const allOption = { userName: "All", userId: "" }; // Assuming userId is nullable for "All"
      setMemberList([allOption, ...members]);
    }
  }, [members]);

  
  const renderMember = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate(route.params?.routeTo, { member: item })}>
      <Spacer  size="large">
        <FadeInView>
          <Spacer  size="large">
            <SectionRowCentered>
            <IconButton
                    icon="account"
                    iconColor={MD3Colors.error50}
                    size={20}
                    mode='outlined'
                    onPress={() => console.log('Pressed')}
                  />
                  <Text>{item?.userName}</Text>  
              </SectionRowCentered>
               <Divider/>
          </Spacer>
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
  );

  return (
    <>
   <MemberListComponent
          hasError={hasError}
          isLoading={isLoading}
          members={memberList}
          memberKeyId = {`userId`}
          retriveMembers={retrieveMembers}
          loadMoreMemberData={() => LoadMoreData({})}
          filterParam={{}}
          totalMemberCount={0}
          lastCustomerId={""}
          renderMember={renderMember}
          addSearchComponent = {false}
        />
    </>
  );
};

