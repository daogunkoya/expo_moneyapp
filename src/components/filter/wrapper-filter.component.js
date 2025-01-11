import react from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import { colors } from "../../infrastructure/theme/colors";
import {AntDesign} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SearchTransactionOptionsContainer = styled.View`
position: absolute;
    z-index: 999;
    bottom: 0;
    width: 100%;
    padding: ${(props) => props.theme.space[3]};
   border-radius: ${(props) => props.theme.space[3]};
    background-color: rgba(255, 255, 255, 0.9);
    border: 0.2px solid ${colors.brand.primary};
`;

const SearchTransactionOptionsList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 10,
    },
})`
`

const FilterText = styled.Text`
    font-family: ${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.caption};
    padding: ${(props) => props.theme.space[2]};
`;

const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.body};
`;
const IconContainer = styled.View`
    margin-right: ${(props) => props.theme.space[3]};
`;


const SearchHeaderContainer = styled.View`
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  flex-direction: row;

`;

export const WrapperFilterComponent = ({children,title, filterAction}) => {
    return <SearchTransactionOptionsContainer>
        <SearchHeaderContainer>
                <IconContainer>
                     <TouchableOpacity onPress={() => filterAction('cancel')}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    </IconContainer>
            <Title>{title}</Title>
        </SearchHeaderContainer>
                {children}
    
    </SearchTransactionOptionsContainer>;
}