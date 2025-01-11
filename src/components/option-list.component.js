import react, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Divider } from "react-native-paper";

import { SafeArea } from "./utility/safe-area.component";
import styled from "styled-components";

const MemberContainer = styled.View`
    flex: 1;
    flex-direction: column;
    `
    const MemberInfoCard = styled.View`
        margin-top: ${(props) => props.theme.space[2]};
        `
        const ListItem = styled.Text`
        padding: ${(props) => props.theme.space[2]};
            font-size: 12px;
            `

            const DividerStyled = styled(Divider)`
                margin-vertical: ${(props) => props.theme.space[2]};
                `;

export const OptionListComponent = ({ dataList, itemDisplayProps, itemKey,  onPressAction }) => {

    return (
        <SafeArea>
            <MemberContainer>
                    {dataList.length > 0 ?
                            <FlatList
                                data={dataList}
                                keyExtractor={(item) => item[itemKey]}
                                renderItem={({ item }) => (
                                        <TouchableOpacity onPress={ () =>  onPressAction(item) }>
                                            <MemberInfoCard>
                                                <ListItem>
                                                    {item[itemDisplayProps]?.toUpperCase()}
                                                </ListItem>
                                            </MemberInfoCard>
                                          
                                            <DividerStyled />
                                        </TouchableOpacity>
                                )} />
                    :<Text>No data found</Text>}

            </MemberContainer>
   </SafeArea>
    );
};


