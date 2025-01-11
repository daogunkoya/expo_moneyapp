import react, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";
import { TouchableOpacity, Button as PaperButton, ImageBackground } from "react-native";
import { TransactionFilterWrapperComponent } from "./transaction-filter-wrapper.component";
import { DatePickerNoInComponent } from "../../../components/datetime/date-picker.component";
import { DatePickerNoInputComponent} from "../../../components/datetime/date-picker-noinput.component";
import {AntDesign} from "@expo/vector-icons";
import { Button } from "react-native-paper";

const DatePickerWrapper = styled.View`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
  `
const OptionContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const StartDateSection = styled.View`
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.space[2]};
  background-color: rgba(255, 255, 255, 0.9);
`;
const EndDateSection = styled.View`
flex: 1;
margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.space[2]};
  background-color: rgba(255, 255, 255, 0.9);

`;

const DateInput = styled.TextInput`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};

`;

const DateInputWrapper = styled.View`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.space[2]};
  background-color: rgba(255, 255, 255, 0.9);
  border: 0.2px solid ${colors.brand.primary};
`;
const StartEndDateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
  `
const FilterText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  padding: ${(props) => props.theme.space[2]};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  padding: ${(props) => props.theme.space[1]};
`;

const MenuIcon = styled(AntDesign)`
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: ${(props) => props.theme.fontSizes.caption};
  padding: ${(props) => props.theme.space[1]};
`;

const SubmitButton =styled(Button).attrs({
  mode: 'contained',
  contentStyle: {
      padding: 0.2
  },
labelStyle: {
  color: colors.ui.snow
},

})`
`


export const TransactionFilterDateComponent = ({
  filterOptions,
  title,
  filterAction,
  submitAction,
}) => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState(currentDate);
  const [startOrEnd, setStartOrEnd] = useState(currentDate);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const showDatePicker = (dateType) => {
    setStartOrEnd(dateType);

    setShowPicker(!showPicker);
    console.log("show date picker");
  };
  const updateDatePicker = (value) => {
      console.log("update date picker", value)

      setDateValue(value);
      startOrEnd == "startAt" ? setStartDate(value) : setEndDate(value);

      //setShowPicker(!showPicker);
  };

  return (
    <TransactionFilterWrapperComponent
      filterOptions={filterOptions}
      title={title}
      filterAction={filterAction}
      submitAction={submitAction}
    >
      <OptionContainer>
        <StartEndDateWrapper>
              <StartDateSection>
                <Title>Start Date</Title>
                <DateInputWrapper>
                    <DateInput
                    value={startDate}
                    onPressIn={() => showDatePicker('startAt')}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={() => showDatePicker()}
                  />
                  <MenuIcon name="down" size={24} color="black" />
                </DateInputWrapper>
              </StartDateSection>
              <EndDateSection>
                <Title>End Date</Title>
                <DateInputWrapper>
                    <DateInput
                    value={endDate}
                    onPressIn={() => showDatePicker('endAt')}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={() => showDatePicker()}
              />
              <MenuIcon name="down" size={24} color="black" />
                </DateInputWrapper>
              </EndDateSection>
        </StartEndDateWrapper>
        <SubmitButton onPress={() => submitAction({startDate,endDate})} >Apply Filter</SubmitButton>
      </OptionContainer>

     {showPicker && 
     <DatePickerWrapper>
        <DatePickerNoInputComponent 
          defaultDate={dateValue}
          setShowPicker = {setShowPicker}
          updateParentDate = {updateDatePicker}/>
      </DatePickerWrapper>
          }
    </TransactionFilterWrapperComponent>
  );
};
