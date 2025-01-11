import React from "react";
import {  StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
   

export const ErrorMessage = ({ error, touched }) => {
    return (
        <>
            { 
                touched && error && 
                <Text style={styles.errorText}>{error}</Text>
            }
        </>
            
    );
}

const styles = StyleSheet.create({
    input: {
      marginBottom: 16,
    },
    errorText: {
      fontSize: 12,
      color: 'red',
      marginTop: 4,
    },
  });
  
  export default DateInput;