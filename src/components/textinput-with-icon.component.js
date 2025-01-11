import React, { useState } from 'react';
import { View } from 'react-native';
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

export const TextInputWithIcon = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  icon,
  onIconPress
}) => {
  return (
    <InputContainer>
      <StyledTextInput
        label={label}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={touched && error}
        mode="outlined"
      />
      {icon && (
        <IconWrapper onPress={onIconPress}>
          <AntDesign name={icon} size={24} color="grey" />
        </IconWrapper>
      )}
    </InputContainer>
  );
};

export default TextInputWithIcon;
