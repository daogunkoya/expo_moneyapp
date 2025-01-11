import React, { useContext , useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import * as Yup from 'yup';

import { LoadingComponent } from '../../../components/loading.component';
import { SpaceBetweenSection, Section, SectionRow, ChevronDownIcon, ErrorText } from '../../../styles/common.style';
import  {BankContext} from '../../../services/banks/banks.context';
import { Spacer } from '../../../components/spacer/spacer.component';;
import { SafeArea } from '../../../components/utility/safe-area.component';
import {WrapperFilterComponent} from '../../../components/filter/wrapper-filter.component';


const OptionContainer = styled(TouchableOpacity)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.space[0]};
    margin: ${(props) => props.theme.space[1]};
    `
const OptionList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 10,
  },
})``;

const SelectText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  padding: ${(props) => props.theme.space[2]};
`;

const OptionsFilterComponent = ({
  filterOptions,
  title,
  filterAction,
  submitAction,
  filters,
}) => {
    isOptionActive = (itemLabel) => Object.values(filters).includes(itemLabel)

  return (
    <WrapperFilterComponent
      title="Transaction Status"
      filterAction={filterAction}
    >
      <OptionList
        data={[{ label: 'Pending', value: 'Pending'},{ label: 'Paid', value: 'Paid'},{ label: 'Failed', value: 'Failed'}]}
        renderItem={({ item }) => {
          return (
            <OptionContainer onPress={() => submitAction(item)}>
              <SelectText>{item.label}</SelectText>
              {
                isOptionActive(item.value) && <AntDesign name="check" size={14} color="black" />
              }
             
            </OptionContainer>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </WrapperFilterComponent>
  );
};


export const IconWrapper = styled.View`
  flex-direction: row;
  border-width: 1px;
 border-radius: ${(props) => parseInt(props.theme.sizes[4]) / 4}px;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  width:${(props) => props.theme.sizes[4]};
  padding: ${(props) => props.theme.space[2]};
`;




// Validation Schema
const validationSchema = Yup.object().shape({
 name: Yup.string().required('Bank name is required'),  
 currencyId: Yup.string().required('Currency is required'),
 bankCategory: Yup.string().required('Bank Category is required'),

});


export const MenuList = ({ navigation, route }) => {

  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
  const [filterButtonOptions, setFilterButtonOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);

  
  const { onBankAdd, isLoading } = useContext(BankContext);
  const [category, setCategory] = useState('b'); // Default format
  const [initialValues, setInitialValues] = useState({
    name: '',
    currencyId: route.params?.currency?.currencyId || '',
    bankCategory:category
  });
  const [error, setError] = useState('');

  useEffect(() => {  
  }, []);


  const filterButtonAction = (option = null, data = null) => {
    setToggleFilterOptions(!toggleFilterOptions);
  };

  const submitSearchQuery = (selected) => {
    onFilterSubmit(
      selected,
      filters,
      selectedFilter,
      toggleFilterDateOption,
      setToggleFilterDateOption,
      setToggleFilterOptions,
      setFilters,
    );
  };



  return (
    <SafeArea>
          <Section>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                  console.log('submitted values',values);
                  onBankAdd(values)
                  if(error){
                    Alert.alert('Error', error);
                  }else{
                    navigation.navigate("Bank");
                  }
                
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, π }) => (
                <View>
                  <Spacer size="medium" />
                        <TouchableOpacity onPress={() => setToggleFilterOptions(!toggleFilterOptions)}> 
                            <IconWrapper>
                                <Text>Select</Text>
                                <ChevronDownIcon name="chevron-down" size={30} color="green" />
                            </IconWrapper>
                        </TouchableOpacity>
                
                  {touched.bankCategory && errors.bankCategory && (
                    <ErrorText >{errors.bankCategory}</ErrorText>
                  )}

                    {error ? <ErrorText >{error}</ErrorText> : null}

                  {
                  isLoading ? <LoadingComponent size = {20} /> : 
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                   
                  > Update Status </Button>
                  }

                    
                </View>
              )}
            </Formik>
          </Section>

          {toggleFilterOptions && (
                    <OptionsFilterComponent
                      filterAction={filterButtonAction}
                      filterOptions={filterButtonOptions}
                      submitAction={submitSearchQuery}
                      filters={filters}
                      title={`${selectedFilter?.charAt(0)?.toUpperCase()}${selectedFilter?.slice(1)} Options `}
                    />
                  )}
         </SafeArea>
  );
};
