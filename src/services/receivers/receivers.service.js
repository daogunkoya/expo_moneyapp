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
const url = (customerId, cursor, limit, search) => `${api_url}customer/${customerId}/receivers?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const url_update = (customerId,receiverId) => `${api_url}customer/${customerId}/receivers/${receiverId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
const bank_fetch_url = `${api_url}bank/list?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
//https://7d83-88-144-2-14.ngrok.io/v1/customer/0091f799-a862-4dc2-80e5-cf2a63550064/receivers


//fetch receiver
export const receiversFetchRequest = (customerId, cursor, limit, search) => {
 
  return fetch(url(customerId, cursor, limit, search), {  
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

// register
export const receiversRegisterRequest = (data, customerId) => {
  //console.log(data)
  return fetch(url(customerId), {  
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


//update 
export const receiversUpdateRequest = (data, customerId, receiverId) => {
  //console.log(url_update(customerId, receiverId))
 // console.log(data)
  return fetch(url_update(customerId, receiverId), {  
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
    body:JSON.stringify(data)
  }).then(
    (res) => {
      // console.log('service')
      return res.json();
    }
  )
  .catch(e=>{
    console.log(e)
  });
};






//fetch banks
export const banksFetchRequest = () => {
 
  return fetch(bank_fetch_url, {  
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

// register transform
export const receiversTransform = (receivers) => {
  
  // const mappedResults = receivers.map((customer) => {
  //   return {
  //     ...customer,
  //   };
  // });

  return camelize(receivers);;
};



// register bank transform
export const banksTransform = (banks) => {
  

  return camelize(banks);;
};
