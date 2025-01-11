import React from 'react';
import styled from 'styled-components';
import CountryFlag from "react-native-country-flag";


 const CountryIcon = styled(CountryFlag)`
  width: ${(props) => props.theme.sizes[2]};
  height: ${(props) => props.theme.sizes[2]};
  border-radius: ${(props) => parseInt(props.theme.sizes[2]) / 2}px;
`;


export const CurrencyIconComponent = ({countryCode, size = 80, ...props}) => {
  return (
    <CountryIcon
      size={size}
      isoCode={countryCode} 
      style={{margin: 0, padding: 0}}   
      />)    
};
