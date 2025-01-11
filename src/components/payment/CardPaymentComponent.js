import React, { useState, useContext, useEffect } from "react";
import { View, Button, Text } from "react-native";
import {CardField} from "@stripe/stripe-react-native";

export const CardPaymentComponent = ({
  createPaymentIntent, handlePayment, clientSecret
}) => {

  const [cardDetails, setCardDetails] = useState(null);
  // console.log('clientScrete', clientSecret)
  useEffect(()=>{
    console.log('clientScrete', clientSecret)
  }, [clientSecret])

  return (
    <View style={{ padding: 20 }}>
      {clientSecret && (
        <View style={{ padding: 5 }}>
          
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 20,
              marginVertical: 5,
            }}
            onCardChange={(cardDetails) => setCardDetails(cardDetails)}
          />
        </View>
      )}
    </View>
  );
};
