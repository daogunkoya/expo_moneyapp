import React, { useContext , useState, useEffect} from 'react';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { SafeArea } from '../utility/safe-area.component';
import {  Section,  ErrorText } from '../../styles/common.style';
import {OptionsFilterComponent} from '../../components/filter/options-filter.component';
import { MenuTextComponent } from '../../components/menu/menu-text.component';




// Validation Schema
const validationSchema = Yup.object().shape({
 status: Yup.string().required('Status is required'),  
});


export const UpdateStatusComponent = ({ onSubmit, optionList, defaultValue , isLoading }) => {


  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
  const [initialValues, setInitialValues] = useState({ status: defaultValue});

  const [selectedMenuItem, setSelectedMenuItem] = useState( defaultValue || 'Select Status');

  const [filters, setFilters] = useState({});

  useEffect(() => {  
  }, []);


  const onSelectAction = (selectedValue = null) => {
    
  setToggleFilterOptions(!toggleFilterOptions);
  };

  return (
    <SafeArea>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => onSubmit(values)} 
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                      <Section>
                         <MenuTextComponent selectedText={selectedMenuItem} onPressAction={() => setToggleFilterOptions(!toggleFilterOptions)} />
                          
                          {touched.status && errors.status && (
                            <ErrorText >{errors.status}</ErrorText>
                          )}
                         
                            {
                            isLoading ? <LoadingComponent size = {20} /> : 
                            <Button mode="contained"onPress={handleSubmit}> Update Status </Button>
                            } 
                      </Section>

                      {toggleFilterOptions && (
                    <OptionsFilterComponent
                      filterAction={onSelectAction}
                      filterOptions={optionList}
                      submitAction={(selectedValue) =>{ 
                        onSelectAction(selectedValue);
                        setFieldValue('status', selectedValue?.value)
                        setSelectedMenuItem(selectedValue?.label);
                      }}
                      filters={filters}
                      title= "Member Status"
                    />
                  )}
                </>
                
              )}
            </Formik>
         </SafeArea>
  );
};
