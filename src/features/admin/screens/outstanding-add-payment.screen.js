import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Section, ErrorText } from "../../../styles/common.style";
import { OptionsFilterComponent } from "../../../components/filter/options-filter.component";
import { MenuTextComponent } from "../../../components/menu/menu-text.component";
import { TextInputComponent } from "../../../components/input/text-input.component";
import { OutstandingContext } from "../../../services/outstanding/outstanding.context";
import { LoadingComponent } from "../../../components/loading.component";

// Validation Schema
const validationSchema = Yup.object().shape({
  paymentType: Yup.string().required("Payment Type is required"),
});

export const OutstandingAddPaymentScreen = ({ navigation, route }) => {
  const { makeOutstandingPayment,isLoading } = useContext(OutstandingContext);

  const { paymentType = "transaction", outstandingId = null, outstandingAmount = null, userId = null } = route?.params;
  const [outstandingPaymentId, setOutstandingPaymentId] = useState(outstandingId || null);
  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Outstanding Payment");
  const [filters, setFilters] = useState({});
  const [initialValues, setInitialValues] = useState({
    amount: outstandingAmount || 0,
    paymentType: paymentType || "transaction",
    outstandingId: outstandingId || null,
    userId: userId,
  });

  const onSubmitForm = (values) => {
    console.log('form submmitted', values);
    makeOutstandingPayment(values);
    navigation.goBack();
  };

  const onSelectAction = (selectedValue = null) => {
    setToggleFilterOptions(!toggleFilterOptions);
  };

  return (
    <SafeArea>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmitForm(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <Section>
              <MenuTextComponent
                selectedText={values.paymentType}
                onPressAction={() =>
                  setToggleFilterOptions(!toggleFilterOptions)
                }
              />

              {touched.paymentType && errors.paymentType && (
                <ErrorText>{errors.paymentType}</ErrorText>
              )}

              <Spacer size="medium" />
              <TextInputComponent
                label="Amount"
                disabled={!!outstandingId}
                value={values.amount}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("name")}
                onError={touched.amount && errors.amount}
                autoCapitalize="none"
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
              <Spacer size="medium" />

              {isLoading ? (
                <LoadingComponent size={20} />
              ) : (
                <Button mode="contained" onPress={handleSubmit}>
                  {" "}
                  Make Payment{" "}
                </Button>
              )}
            </Section>

            {toggleFilterOptions && (
              <OptionsFilterComponent
                filterAction={onSelectAction}
                filterOptions={[
                  { label: "Transaction", value: "Transaction" },
                  { label: "Commission", value: "Commission" },
                ]}
                submitAction={(selectedValue) => {
                  onSelectAction(selectedValue);
                  setFieldValue("paymentType", selectedValue?.value);
                  setSelectedMenuItem(selectedValue?.label);
                }}
                filters={filters}
                title="Outstanding Payments"
              />
            )}
          </>
        )}
      </Formik>
    </SafeArea>
  );
};
