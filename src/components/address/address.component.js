import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { TextInput as AddressInput } from "../input/input-create.styles";
import { SearchOptionComponent } from "../input/search-options.component";
import { CommonContext } from "../../services/utilities/common.context";
import { TextInputComponent } from '../input/text-input.component';

const AddressWrapper = styled(View)`
  flex: 1;
`;

export const ToggleButton = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

export const AddressInputComponent = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const { addressList, fetchAddress } = useContext(CommonContext);
  const [toggleAddress, setToggleAddress] = useState(false);

  console.log("add values", JSON.stringify(values, null, 2));

  const onClickToggleAddress = (addressitem) => {
    setToggleAddress(!toggleAddress);

    const { addressNo, address1, address2, postCode, city, country } =
      addressitem || {};
    setFieldValue("addressNo", addressNo);
    setFieldValue("address1", address1);
    setFieldValue("address2", address2);
    setFieldValue("city", city);
    setFieldValue("postcode", postCode);
    setFieldValue("country", country);
    setFieldValue("metaData", addressitem);
    
    setFieldValue(
      "address",
      `${addressNo} ${address1} ${address2} ${city}  ${country}`
    );
    setFieldValue("postcode", postCode);
  };

  useEffect(() => {}, []);

  return (
    <View>
      <SearchOptionComponent
        label="Search Address"
        inputValue={values?.metaData}
        showAddManually={true}
        toggleListItemView={() => setToggleAddress(!toggleAddress)}
        searchWordInObject="address"
        onClickListItem={onClickToggleAddress}
        list={addressList}
        onFetch={fetchAddress}
      />

      {toggleAddress && (
        <AddressWrapper>
          <Spacer size="large">
            <TextInputComponent
              label="Number"
              value={values.addressNo}
              onChangeText={handleChange("addressNo")}
              onBlur={handleBlur("addressNo")}
              onError={touched?.addressNo && errors?.addressNo}
            />
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="Address 1"
              value={values.address1}
              onChangeText={handleChange("address1")}
              onBlur={handleBlur("address1")}
              onError={touched?.address1 && errors?.address1}
            />
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="Address 2"
              value={values.address2}
              onChangeText={handleChange("address2")}
              onBlur={handleBlur("values.address2")}
            />
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="City"
              value={values.city}
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              onError={touched?.city && errors?.city}
            />
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="Post Code"
              value={values.postcode}
              onChangeText={handleChange("postcode")}
              onBlur={handleBlur("postcode")}
              onError={touched?.postcode && errors?.postcode}
            />
          </Spacer>
          <Spacer size="large">
            <TextInputComponent
              label="Country"
              value={values.country}
              onChangeText={handleChange("country")}
              onBlur={handleBlur("country")}
              onError={touched?.country && errors?.country}
            />
          </Spacer>
        </AddressWrapper>
      )}
    </View>
  );
};
