import react, { useState, useEffect } from "react";
import { View, TouchableOpacity , ScrollView, FlatList} from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";

import {
    CenteredView,

    OptionCover,
    Title,
  } from "./input-create.styles";


export const TitleOptionComponent = ({ title, titleOptionState, updateTitleValue }) => {
    const [showTitle, setShowTitle] = useState(titleOptionState);

    const toggleOptionView = () => {
        setShowTitle(false)
    }

    useEffect(() => {
        setShowTitle(titleOptionState)
    }, [titleOptionState])

    return (
        <>
        {showTitle && 
            <OptionCover >
               <Title>{title}</Title>
               
                          <CenteredView>

                          <FlatList 
                              data={["Miss", "Mr", "Mrs"]}
                              renderItem={({ item }) => (
                                  <TouchableOpacity onPress={() => {
                                      updateTitleValue(item);
                                      toggleOptionView(false)}
                                  }>
                                      <Text onPressIn={(p) => setShowTitle(false)} > {item} </Text>
                                  </TouchableOpacity>
                              )}
                              keyExtractor={(item) => item}
                            />
    
                          </CenteredView>
                  
            </OptionCover> }
            </>
    )
}