import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
`;

const IconWrapper = styled.TouchableOpacity`
  padding: 8px;
`;

export const PasswordInput = ({ label, value, onChangeText, onBlur, error, touched }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <InputContainer>
      <StyledTextInput
        label={label}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={touched && error}
        mode="outlined"
      />
      <IconWrapper onPress={() => setSecureText(!secureText)}>
        <AntDesign name={secureText ? 'eyeo' : 'eye'} size={24} color="grey" />
      </IconWrapper>
    </InputContainer>
  );
};

export default PasswordInput;
