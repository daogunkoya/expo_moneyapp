import camelize from "camelize";
import { host, api_url, isMock , bearer_token} from "../../utils/env";


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
const customer_url = (cursor,limit, search)=> `${api_url}senders?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const customer_update_url =  (customerId) =>`${api_url}senders/${customerId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
const customer_add_url = `${api_url}senders?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
//const url = (customerId) => `${api_url}customer/${customerId}/receivers?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`


export const sendersFetchRequest = (lastCustomerKey,limit, search) => {
  return fetch(customer_url(lastCustomerKey,limit,search), {  
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


export const sendersRegisterRequest = (data) => {
  ///console.log(data)
  return fetch(customer_add_url, {  
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



export const sendersUpdateRequest = (data, customerId) => {
  //console.log(data)
  //console.log(customerId)
  return fetch(customer_update_url(customerId), {  
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

export const sendersTransform = (customers) => {
  
  // const mappedResults = customers.map((customer) => {
  //   return {
  //     ...customer,
  //   };
  // });

  return camelize(customers);;
};
