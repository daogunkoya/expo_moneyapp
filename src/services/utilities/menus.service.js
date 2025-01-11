import camelize from "camelize";
import { host, store_id, api_url, isMock , bearer_token} from "../../utils/env";


// const obj = {  
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     Authentication: bearer_token
//   },
//   body: JSON.stringify({
//     "process_store_id":"2bda0c37-4eac-44e5-a014-6c029d76dc62"
//   })
// }
const param = {  
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearer_token
  }
}
const utilities = (cursor,limit, search)=> `${api_url}rates?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const utilitiesUpdateUrl =  (utilitiesId) =>`${api_url}rates/${utilitiesId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
//const url = (customerId) => `${api_url}customer/${customerId}/receivers?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`


export const utilitiesFetchRequest = (lastKey,limit, search) => {
 // console.log(utilities(lastKey,limit,search))
  return fetch(utilities(lastKey,limit,search), {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    }
  }).then(
    (res) => {
   
      return res.json();
    }
  );
};


export const utilitiesRegisterRequest = (data) => {
  //console.log(data)
  return fetch(customer_url, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
    body:JSON.stringify(data)
  }).then(
    (res) => {
     
      return res.json();
    }
  );
};



export const utilitiesUpdateRequest = (data, utilitiesId) => {
  //console.log(data)
  //console.log(utilitiesId)
  return fetch(utilitiesUpdateUrl(utilitiesId), {  
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
    body:JSON.stringify(data)
  }).then(
    (res) => {
     
      return res.json();
    }
  );
};

export const utilitiesTransform = (utilities) => {
  
  // const mappedResults = utilities.map((customer) => {
  //   return {
  //     ...customer,
  //   };
  // });

  return camelize(utilities);;
};
