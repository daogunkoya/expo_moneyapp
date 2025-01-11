import React, { useContext, useState } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";


import { FadeInView } from "../animations/fade.animation";
import { SafeArea } from "../utility/safe-area.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import { UtilitiesContext } from "../../services/utilities/utilities.context";
import { ReceiversContext } from "../../services/receivers/receivers.context";


 const MenuList = styled(FlatList).attrs({
   
  contentContainerStyle: {
    padding: 16,
   
  },
})``;

const MenuCover = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    
`;

export const Title = styled(Text)`
  font-size: 30px;
`;




export const MenuScreen = ({navigation,route}) => {

const {  updateMenu } = useContext(UtilitiesContext);
const {  retrieveReceivers, receiversWithKeyValue } = useContext(ReceiversContext);
 
const LoadMoreData = ()=>{
  
}


 const params = route.params || null;
 let {title, type, list,redirectTo }= params
 //console.log('menu-receivers = ',receiversWithKeyValue)

 //this fetch list of receivers for send payment -- call are made on 
if(type == 'PaymentReceiverSelect') list = receiversWithKeyValue
 
 


 const submitOption  = (key,value, all_item )=>{
  const item = {key,value};
  


  switch (type) {
    
    
    case 'PaymentSenderSelect':
      
      retrieveReceivers(key, null);
      updateMenu('PaymentReceiverSelect', {key:null, value:null});   //empty default values for payment receiver screen
      break;
     
   }



   //update utilities context for selected item to be used elsewhere
  updateMenu(type, all_item);
  navigation.navigate(redirectTo,{menuValue:value,key, item,type})
  return;
 }

  return (
    <SafeArea>

        <MenuCover>
  <Title>{title}</Title>
            <MenuList
              data={list}
              renderItem={( {item} ) => {
               const  key = typeof item === 'object'?item.key:item
                const value = typeof item === 'object'?item.value:item

                  return (
                    <TouchableOpacity
                      onPress={() => submitOption(key,value,item ) //type & menuValue are two obj properties
                      }
                    >
                      <Spacer position="bottom" size="large">
                        <FadeInView>
                  <Text>{value}</Text>
                        </FadeInView>
                      </Spacer>
                    </TouchableOpacity>
                  );
              }}
              keyExtractor={(item, index) => item.key?item.key:index}
              onEndReached={()=>LoadMoreData(type)}
              onEndReachedThreshold={0}
        />
  </MenuCover>
  
    </SafeArea>
  );
};
