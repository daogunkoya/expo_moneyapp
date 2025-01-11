import { useCallback } from "react";
import { debounce } from 'lodash';


export const listHelper = {
  // Method to change one item in an array based on a unique id
  changeItem: (array, updatedItem, idKey) => {
    return array.map(item => 
      item[idKey] === updatedItem[idKey] 
        ? { ...item, ...updatedItem } 
        : item
    );
  },

  // Method to add a new item to the beginning of the array
  addItem: (array, newItem) => {
    return [newItem, ...array];  // Adds the new item to the beginning of the array
  }
};


export const combineList = (existingList, newList, filterKey) => {
  return existingList.concat(newList).filter((item, index, self) => {
    return (
      item &&
      item[filterKey] &&
      self.findIndex((r) => r && r[filterKey] === item[filterKey]) === index
    );
  });
};

export const replaceItemFromList = (existingList, replacingItem, filterKey) => {
    return existingList.map((item, index) => {
      if (item && item[filterKey] === replacingItem[filterKey]) {
        return replacingItem;
      } else {
        return item;
      }
    });
  };


  export const deepEqual = (obj1, obj2) =>
    {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 == null || typeof obj1 !== 'object' ||
        obj2 == null || typeof obj2 !== 'object') {
        return false;
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}


export const handleError =  (error) =>  {
  let errorMessage;
  if (error.response && error.response.data) {
    // Server error response
    errorMessage = error.response.data.message;
  } else if (error instanceof Error) {
    // General JavaScript Error
    errorMessage = error.message;
  } else {
    // Fallback for any other errors
    errorMessage = "An unexpected error occurred";
  }

return errorMessage
}

export const userAsSender =  user => {
  return {
      senderId: user.userId,
      senderFname: user.userFname,
      senderLname: user.userLname,
      senderEmail: user.userEmail,
      senderRole: user.userRole,
  }
}
  
