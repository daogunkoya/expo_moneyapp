import { FilterDateOption, FilterStatusOption , FilterCurrenciesOption} from "./constants";
export const filterButtonActionProcessor = (
  option = null,
  data = null,
  filterButtonValues = {},
  setFilters,
  toggleFilterOptions,
  setSelectedFilter,
  setFilterButtonOptions,
  setToggleFilterOptions,
  setToggleFilterDateOption,
  setCancelAllFilters
) => {
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

// export const submitSearchQueryProcessor = (
//   selected,
//   filters,
//   selectedFilter,
//   toggleFilterDateOption,
//   setToggleFilterDateOption,
//   setToggleFilterOptions,
//   setFilters,
//   retrieveMembers
// ) => {
//   const { label, value: selectedValue } = selected;

//   console.log("submiting ---", selectedValue);

//   if (selectedValue === "date-range") {
//     setToggleFilterDateOption(!toggleFilterDateOption);
//     setToggleFilterDateOption(!toggleFilterDateOption);
//   } else {
//     const filterObj = { ...filters, [selectedFilter]: selectedValue };

//     const updatedFilter = Object.fromEntries(
//       Object.entries(filterObj).filter(([key, value]) => value !== "all")
//     );

//     setFilters(updatedFilter);

//     retrieveMembers(false, updatedFilter);
//   }

//   setToggleFilterOptions(false);
// };



