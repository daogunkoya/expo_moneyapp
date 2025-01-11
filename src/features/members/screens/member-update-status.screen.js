import React, { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { UpdateStatusComponent } from "../../../components/members/update-status.component";

import { MembersContext } from "../../../services/members/members.context";

export const MemberUpdateStatusScreen = ({ navigation, route }) => {
  const { onMemberUpdate, isLoading, error } = useContext(MembersContext);

  const { member } = route.params || {};

  const filterButtonOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Suspended", value: "suspended" },
    { label: "Deleted", value: "deleted" },
  ];

  submitAction = (values) => {
    console.log(values, member?.userId);
    onMemberUpdate("status", { status: values?.status }, member?.userId);
    navigation.pop(2);
  };

  return (
    <>
      <UpdateStatusComponent
        onSubmit={(values) => submitAction(values)}
        optionList={filterButtonOptions}
        defaultValue={member?.userStatus}
        isLoading={isLoading}
      />
    </>
  );
};
