import React, { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import { UpdateStatusComponent } from "../../../components/members/update-status.component";

import { MembersContext } from "../../../services/members/members.context";

export const MemberUpdateRoleScreen = ({ navigation, route }) => {
  const { onMemberUpdate, isLoading } = useContext(MembersContext);

  const { member } = route.params || {};

  const filterButtonOptions = [
    { label: "Customer", value: "Customer" },
    { label: "Agent", value: "Agent" },
    { label: "Manager", value: "Manager" },
    { label: "Admin", value: "Admin" },
  ];

  submitAction = (values) => {
    console.log(values, member?.userId);
    onMemberUpdate("role", { role: values?.status }, member?.userId);
    navigation.pop(2);
  };

  return (
    <>
      <UpdateStatusComponent
        onSubmit={(values) => submitAction(values)}
        optionList={filterButtonOptions}
        defaultValue={member?.userRole}
        isLoading={isLoading}
      />
    </>
  );
};
