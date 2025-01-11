import React, { useContext, useState, useEffect , useCallback} from "react";

import { SafeArea } from "../utility/safe-area.component";
import { SearchWithHeaderComponent } from "../search-with-header.component";
import { LoadingComponent } from "../loading.component";
import {filterButtonActionProcessor} from "./utilities";

import { ListFilter } from "./list-filter.component";
import { OptionsFilterComponent } from "./options-filter.component";
import { DateFilterComponent } from "./date-filter.component";


export const MainFilterComponent = ({children, onFilterSubmit, filterButtons, filterButtonValues}) => {

  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
  const [toggleFilterDateOption, setToggleFilterDateOption] = useState(false);
  const [filterButtonOptions, setFilterButtonOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {}, []);

  const setCancelAllFilters = ()  => {
    onFilterSubmit(
      {},
      filters,
      selectedFilter,
      toggleFilterDateOption,
      setToggleFilterDateOption,
      setToggleFilterOptions,
      setFilters,
    );
  }

  const filterButtonAction = (option = null, data = null) => {
    setSelectedFilter(option);
    
  if (filterButtonValues[option]) {
    setFilterButtonOptions(filterButtonValues[option]);
    setToggleFilterOptions(!toggleFilterOptions);
  } else if (option === "cancel") {
    // Reset all filters if 'cancel' option is selected
    setFilterButtonOptions([]);
    setFilters({});
    setSelectedFilter(null);
    setToggleFilterOptions(false);
    setToggleFilterDateOption(false);
    setCancelAllFilters({});
  }
  };

  const submitSearchQuery = (selected) => {
    onFilterSubmit(
      selected,
      filters,
      selectedFilter,
      toggleFilterDateOption,
      setToggleFilterDateOption,
      setToggleFilterOptions,
      setFilters,
      //retrieveMembers,
    );
  };

  const subDateRangeAction = (selected) => {
    const { startDate, endDate } = selected;

    setToggleFilterOptions(false);
    setToggleFilterDateOption(!toggleFilterDateOption);

    submitSearchQuery({
      label: "date",
      value: { from: startDate, to: endDate },
    });
  };

  console.log('selected', selectedFilter)
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      
      <SearchWithHeaderComponent
       
        onSearch={(searchParams) => {
          submitSearchQuery(searchParams)
          setSelectedFilter('search')
        }
         }
        filterAction={() => true}
      />
    

      <ListFilter
        filterButtons={filterButtons}
        selectedFilter={selectedFilter}
        filters = {filters}
        filterAction = {filterButtonAction}
        color="red"
      />

       {children}
     
      {toggleFilterOptions && (
        <OptionsFilterComponent
          filterAction={filterButtonAction}
          filterOptions={filterButtonOptions}
          submitAction={submitSearchQuery}
          filters={filters}
          title={`${selectedFilter?.charAt(0)?.toUpperCase()}${selectedFilter?.slice(1)} Options `}
        />
      )}

      {toggleFilterDateOption && (
        <DateFilterComponent
          filterAction={subDateRangeAction}
          filterOptions={[]}
          submitAction={subDateRangeAction}
          title="Date Range"
        />
      )}
    </SafeArea>
  );
};
