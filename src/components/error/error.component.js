import React from "react";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

export const ErrorComponent = ({ error = "Something went wrong retrieving the data", hasError }) => {
  return (
    <>
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">{error}</Text>
        </Spacer>
      )}
    </>
  );
};
