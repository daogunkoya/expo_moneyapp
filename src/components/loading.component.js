import react from "react";
import {  View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator,MD2Colors  } from "react-native-paper";


const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const LoadingComponent = ({size = 50}) => {
    return (
           <LoadingContainer>
              <Loading size={size} animating={true} color={MD2Colors.red800} />
            </LoadingContainer>
          )
    
}