import React, { useState, useContext, useMemo } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { MembersContext } from "../../../services/members/members.context";
import { Summary } from "../../../components/summary/summary.component";
import { LoadingComponent } from "../../../components/loading.component";
import { MemberInputComponent } from "../../../components/members/member-input.component";


export const MemberUpdateScreen = ({ route, navigation }) => {

  const { onMemberUpdate,transformMemberDataForEndpoint, isLoading, error, showErrorBorder } = useContext(MembersContext);

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [updatedMemberData, setUpdatedMemberData] = useState({});

  const { member, sender } = route.params;

console.log('member',JSON.stringify(member,null,2))

  const memberValue = {
    title: member?.userTitle || "",
    fname: member?.userFname || "",
    lname: member?.userLname || "",
    email: member?.userEmail || "",
    phone: member?.userPhone || "",
    dateOfBirth: member?.userDob || "",

    addressNo: member?.userMetadata?.addressNo || "",
    address1: member?.userMetadata?.address1 || "",
    address2: member?.userMetadata?.address2 || "",
    city: member?.userMetadata?.city || "",
    country: member?.userMetadata?.country || "",
    postcode:member?.userPostcode || "",
    metaData: {
      addressNo: member?.userMetadata?.addressNo || "",
      address1: member?.userMetadata?.address1 || "",
      address2: member?.userMetadata?.address2 || "",
      city: member?.userMetadata?.city || "",
      postcode: member?.userMetadata?.postcode || "",
      country: member?.userMetadata?.country || "",
    }
  };

  const summaryData = useMemo(() => ({
    "First Name": updatedMemberData?.fname,
    "Last Name": updatedMemberData?.lname,
    "Email": updatedMemberData?.email,
    "Date Of Birth": updatedMemberData?.dateOfBirth,
    "Phone": updatedMemberData?.phone,
    "Address": updatedMemberData?.address,
    "Postcode": updatedMemberData?.postcode,
  }), [updatedMemberData]);


  

const handleSubmitMemberData = (data) => {
  setUpdatedMemberData(data);
  setIsSummaryVisible(true);
};

const handleUpdate = () => {
    const memberData = transformMemberDataForEndpoint(updatedMemberData);
    onMemberUpdate('member', memberData, member.userId);
  if(!error){
    navigation.pop(1)
  };
};

return (
  <SafeArea>
    {isSummaryVisible ? (
      <>
        {isLoading && <LoadingComponent />}
        <Summary 
          summaryItems={summaryData} 
          submitAction={handleUpdate} 
        />
      </>
    ) : (
      <MemberInputComponent 
        headerTitle="Update Customer"
        error={error}
        isLoading={isLoading}
        showErrorBorder={showErrorBorder}
        memberValue={memberValue}
        actionType="update"
        onSubmitData={handleSubmitMemberData}
        showSummaryPage={() => setIsSummaryVisible(true)}
      />
    )}
  </SafeArea>
);
};
