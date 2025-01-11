import React from 'react';
import { TextInputWithIcon } from './textinput-with-icon.component'; // Adjust the import path accordingly. TextInputWithIcon
export const RegularInput = ({ label, value, onChangeText, onBlur, error, touched }) => {
  return (
    <TextInputWithIcon
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      error={touched && error}
      secureTextEntry={false}
    />
  );
};

export default RegularInput;
