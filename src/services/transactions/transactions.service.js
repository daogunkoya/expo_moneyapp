import camelize from "camelize";
import { host, api_url,process_store_id,  isMock , bearer_token} from "../../utils/env";


const param = {  
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearer_token
  }
}
const fetchUrl = (query, cursor, limit) => `${api_url}transactions?${process_store_id}&cursor=${cursor}&limit=${limit}&query=${query}`
//const fetchUrl = (query, cursor, limit, search) => api_url +'transactions?' + new URLSearchParams({process_store_id, cursor:cursor, limit:limit, search:search,query:query})
const postUrl =  `${api_url}transactions?${process_store_id}`
const updateUrl = (transactionId) => `${api_url}transactions/${transactionId}?{process_store_id}`




//fetch transaction
export const transactionsFetchRequest = (query, cursor, limit) => {
  
  if(query){
   query =  JSON.stringify(query);
  }
  
 
  return fetch(fetchUrl(query, cursor, limit), {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
   
  }).then(
    (res) => {
     
      return res.json();
    }
  );
};

// register
export const transactionsRegisterRequest = (data) => {
  //console.log(data)
  return fetch(postUrl, {  
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
  ).catch(e=>{
    console.log(e)
  });
};


//update 
export const transactionsUpdateRequest = ( transactionId, transactionUpdateData) => {
  //console.log(updateUrl(senderId, transactionId))
 // console.log(data)
  return fetch(updateUrl(transactionId), {  
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
    body:JSON.stringify(transactionUpdateData)
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







// register transform
export const transactionsTransform = (transactions) => {
  
  // const mappedResults = transactions.map((sender) => {
  //   return {
  //     ...sender,
  //   };
  // });

  return camelize(transactions);;
};



// register bank transform
export const banksTransform = (banks) => {
  

  return camelize(banks);;
};
