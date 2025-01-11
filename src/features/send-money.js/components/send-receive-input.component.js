import react from "react";
import {
  CountryIcon,
  SendMoneyContainer,
  SectionLeft,
  SectionRight,
  SendWrapper,
  TextItem,
  AmountInput,
  TextInfo,
} from "./send-money.styles";

import { CurrencySelectComponent } from "./currency-select.component";

export const SendReceiveInputComponent = ({
  InputTitle,
  inputValue,
  currencySelectInfo = "",
  handleInputChange,
  currencyTransferType,
  currencyCode,
  currencyTitle,
}) => {
  return (
    <SendWrapper>
      <SectionLeft>
        <TextItem>{InputTitle}</TextItem>
        <AmountInput
          value={inputValue}
          placeholder="0.00"
          onChangeText={(u) => handleInputChange(u)}
        />
      </SectionLeft>
      <SectionRight>
        <CurrencySelectComponent
          currencyType={currencyTransferType}
          countryCode={currencyCode}
          currencyTitle={currencyTitle}
        />
        <TextInfo>{currencySelectInfo}</TextInfo>
      </SectionRight>
    </SendWrapper>
  );
};
