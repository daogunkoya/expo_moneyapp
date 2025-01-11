export const FilterDateOption = [
    { label: "All Date", value: "all" },
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last Week", value: "lastweek" },
    { label: "Last 30 Days", value: "month" },
    { label: "Date Range", value: "date-range" },
  ];
  
  export const FilterStatusOption = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Suspended", value: "suspended" },
    { label: "Deleted", value: "deleted" },
  ];
  
  export const TransactionFilterStatusOption = [
    { label: "All Status", value: "all" },
    { label: "Success", value: "paid" },
    { label: "Failed", value: "failed" },
    { label: "In Progress", value: "pending" },
  ];
  
  export const FilterCurrenciesOption = [
    { label: "All Currencies", value: "all" },
    { label: "NGN", value: "NGN" },
    { label: "USD", value: "USD" },
  ];

  export const FilterTypeOption = [
    { label: "Customer", value: "Customer" },
    { label: "Agent", value: "Agent" },
    { label: "Admin", value: "Admin" },
    { label: "Manager", value: "Manager" },
  ];

  export const FilterOutstandingTypeOption = [
    { label: "Pending Outstanding Payment", value: "Customer"},
    { label: "Pending Outstanding Commission", value: "Agent"},
    { label: "Paid Outstanding Payment", value: "Admin" },
    { label: "Paid Outstanding Commission", value: "Manager"},
  ];
  