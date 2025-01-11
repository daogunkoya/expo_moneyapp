import camelize from "camelize";
import { host, api_url,process_store_id,  isMock , bearer_token} from "../../utils/env";




const param = {  
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearer_token
  }
}


const postRateUrl =  `${api_url}commissions?${process_store_id}`
const CommissionUrl = (cursor,limit, search)=> `${api_url}commissions?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const CommissionUpdateUrl =  (CommissionId) =>`${api_url}commissions/${CommissionId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
const CommissionDeleteUrl =  (CommissionId) =>`${api_url}commissions/${CommissionId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
//const url = (customerId) => `${api_url}customer/${customerId}/receivers?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`


export const CommissionFetchRequest = (lastKey,limit, search) => {
 // console.log(Commission(lastKey,limit,search))
  return fetch(CommissionUrl(lastKey,limit,search), {  
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



//Add a new Rate
export const CommissionAddRequest = (data) => {
  //console.log(data)
  return fetch(postRateUrl, {  
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




//Update Rate
export const CommissionUpdateRequest = (data, CommissionId) => {
  //console.log(data)
  //console.log(CommissionId)
  return fetch(CommissionUpdateUrl(CommissionId), {  
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



//Delete a Rate
export const CommissionDeleteRequest = (commissionId) => {
  //console.log(data)
  return fetch(CommissionDeleteUrl(commissionId), {  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer_token
    },
    body:JSON.stringify({})
  }).then(
    (res) => {
     
      return res.json();
    }
  );
};



export const CommissionTransform = (Commission) => {
  
  // const mappedResults = Commission.map((customer) => {
  //   return {
  //     ...customer,
  //   };
  // });

  return camelize(Commission);;
};
