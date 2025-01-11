import React, { useState } from 'react';
import TextInputWithIcon from './TextInputWithIcon'; // Adjust the import path accordingly

export const PasswordInput = ({ label, value, onChangeText, onBlur, error, touched }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <TextInputWithIcon
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      error={touched && error}
      secureTextEntry={secureText}
      icon={secureText ? 'eyeo' : 'eye'}
      onIconPress={() => setSecureText(!secureText)}
    />
  );
};

export default PasswordInput;
