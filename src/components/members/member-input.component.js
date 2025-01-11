import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { AccountBackground, CustomerContainer, CustomerButton, ErrorContainer, ButtonContainer } from '../sender/sender-create.styles';
import { Text } from '../typography/text.component';
import { Spacer } from '../spacer/spacer.component';
import { AddressInputComponent } from '../address/address.component';
import { BioInputComponent } from '../input/bio.input.component';
import { ProgressBarComponent } from '../progressbar/progressbar.component';
import {NavigationButtonComponent} from '../button/navigation-button.component';
import { Summary} from '../summary/summary.component';
import { LoadingComponent } from "../../components/loading.component";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  
});

export const MemberInputComponent = ({ onSubmitData, actionType, error, isLoading, memberValue }) => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [pageHeaders, setPageHeaders] = useState(["Bio", "Address", "Summary"]);

 
  const initialValues = {
    fname: memberValue?.fname || "",
    lname: memberValue?.lname || "",
    email: memberValue?.email || "",
    phone: memberValue?.phone || "",
    dateOfBirth: memberValue?.dateOfBirth || "",

    addressNo: memberValue?.metaData?.addressNo || "",
    address1: memberValue?.metaData?.address1 || "",
    address2: memberValue?.metaData?.address2 || "",
    city: memberValue?.metaData?.city || "",
    country: memberValue?.metaData?.country || "",
    postcode:memberValue?.postcode || "",
    metaData: {
      addressNo: memberValue?.metaData?.addressNo || "",
      address1: memberValue?.metaData?.address1 || "",
      address2: memberValue?.metaData?.address2 || "",
      city: memberValue?.metaData?.city || "",
      postcode: memberValue?.metaData?.postcode || "",
      country: memberValue?.metaData?.country || "",
    }
  };

  const summaryData = (item) => ({
    "First Name": item?.fname,
    "Last Name": item?.lname,
    "Email": item?.email,
    "Date Of Birth": item?.dateOfBirth,
    "Phone": item?.phone,
    "Address": item?.address,
    "Postcode": item?.postcode,
  });

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);

    const updatedValues = {
      ...values,
      address: `${values.addressNo} ${values.address1} ${values.address2} ${values.city} ${values.postcode} ${values.country}`,
      metaData: {
        addressNo: values.addressNo || memberValue?.metaData?.addressNo,
        address1: values.address1 || memberValue?.metaData?.address1,
        address2: values.address2 || memberValue?.metaData?.address2,
        city: values.city || memberValue?.metaData?.city,
        postcode: values.postcode || memberValue?.metaData?.postcode,
        country: values.country || memberValue?.metaData?.country,
      }
    };
      
    onSubmitData(updatedValues);
  };

  return (
    <AccountBackground>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, validateForm }) => (
          <FlatList
            style={{ flex: 1, width: "100%", height: "100%" }}
            ListHeaderComponent={
              <>
                <View>
                  <ProgressBarComponent steps={pageHeaders} currentStep={page} />
                 
                 {page === 0 &&
                  <BioInputComponent
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />}
                  
                  {page === 1 &&
                      <AddressInputComponent
                      values={values}
                      errors={errors.address}
                      touched={touched.address}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    >
                   
                   
                  </AddressInputComponent>
                    }

                    { page === 2 &&
                      <Summary 
                      summaryItems={summaryData(values)} 
                      submitAction={null} 
                    />

                    } 

                     {error && (
                      <ErrorContainer size="large">
                        <Text variant="error">{error.errorMessage}</Text>
                      </ErrorContainer>
                    )}
                </View>
                <Spacer size="large">
                {isLoading? <LoadingComponent />
                :
                    <NavigationButtonComponent 
                      firstTitle="Back"
                      secondTitle="Continue" 
                      firstAction={ page > 0 ? () => setPage(page - 1) : () => navigation.goBack() }
                      secondAction={async () => {
                        const formErrors = await validateForm();
                        if (Object.keys(formErrors).length === 0) {
                          // No errors, proceed to next step
                          if (pageHeaders.length > page + 1) {
                            setPage(page + 1);
                          } else {
                            handleSubmit();
                          }
                        } else {
                          // Handle validation errors, e.g., show error message
                          console.log("Form validation errors:", formErrors);
                        }
                      }}
                    />
            }
                </Spacer>
              </>
            }
          />
        )}
      </Formik>
    </AccountBackground>
  );
};

