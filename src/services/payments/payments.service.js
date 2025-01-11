import camelize from "camelize";
import { host, store_id, api_url, isMock , bearer_token} from "../../utils/env";



const param = {  
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearer_token
  }
}

const utilities = (cursor,limit, search)=> `${api_url}rates?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const calculateUrl =  (amount) =>`${api_url}transactions/calculate?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`



export const calculateTransactionRequest = (data) => {
 // console.log(utilities(lastKey,limit,search))
  return fetch(calculateUrl(data), {  
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



export const transactionTransform = (payments) => {
  
  // const mappedResults = payments.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });

  return camelize(payments);;
};
