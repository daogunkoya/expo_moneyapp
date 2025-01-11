import React, { useState, useContext, useMemo } from "react";
import { MemberInputComponent } from "../../../components/members/member-input.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { Summary } from "../../../components/summary/summary.component";
import { LoadingComponent } from "../../../components/loading.component";

export const SenderCreateScreen = ({ route, navigation }) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [newSenderData, setNewSenderData] = useState({});
  
  const { onCustomerRegister, isLoading, error, showErrorBorder } = useContext(CustomersContext);

  // Memoizing summary data to avoid recalculating on every render
  const summaryData = useMemo(() => ({
    "First Name": newSenderData?.fname,
    "Last Name": newSenderData?.lname,
    "Email": newSenderData?.email,
    "Date Of Birth": newSenderData?.dateOfBirth,
    "Phone": newSenderData?.phone,
    "Address": newSenderData?.address,
    "Postcode": newSenderData?.postcode,
  }), [newSenderData]);

  // Handler functions
  // const handleSubmitSenderData = (data) => {
  //   setNewSenderData(data);
  //   setIsSummaryVisible(true);
  // };

  const handleRegister = (newSenderData) => {
    onCustomerRegister(newSenderData);
  };

  return (
    <SafeArea>
      {isSummaryVisible ? (
        <>
          {isLoading && <LoadingComponent />}
          <Summary 
            summaryItems={summaryData} 
            submitAction={handleRegister} 
          />
        </>
      ) : (
        <MemberInputComponent
          headerTitle="New Customer"
          route={route}
          navigation={navigation}
          error={error}
          isLoading={isLoading}
          showErrorBorder={showErrorBorder}
          sender={null}
          actionType="create"
          onSubmitData={handleRegister}
          showSummaryPage={() => setIsSummaryVisible(true)}
        />
      )}
    </SafeArea>
  );
};
