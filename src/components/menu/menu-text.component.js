import React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "react-native-paper";
import { Spacer } from "../../components/spacer/spacer.component"
import { BorderedRowWrapper, ChevronDownIcon } from "../../styles/common.style";

export const MenuTextComponent = ({selectedText, onPressAction}) => {
    return (
        <>
             <Spacer size="medium" />
                              <TouchableOpacity onPress={onPressAction}> 
                                  <BorderedRowWrapper>
                                      <Text>{selectedText}</Text>
                                      <ChevronDownIcon name="chevron-down" size={30} color="green" />
                                  </BorderedRowWrapper>
                              </TouchableOpacity>
                         <Spacer size="large" />  
        </>
    )
}