import camelize from "camelize";
import { host, api_url,process_store_id,  isMock , bearer_token} from "../../utils/env";




const param = {  
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearer_token
  }
}


const postRateUrl =  `${api_url}rates?${process_store_id}`
const todaysRateUrl = (cursor,limit, search)=> `${api_url}rates?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62&cursor=${cursor}&limit=${limit}&search=${search}`
const todaysRateUpdateUrl =  (todaysRateId) =>`${api_url}rates/${todaysRateId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
const todaysRateDeleteUrl =  (todaysRateId) =>`${api_url}rates/${todaysRateId}?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`
//const url = (customerId) => `${api_url}customer/${customerId}/receivers?process_store_id=2bda0c37-4eac-44e5-a014-6c029d76dc62`


export const todaysRateFetchRequest = (lastKey,limit, search) => {
 // console.log(todaysRate(lastKey,limit,search))
  return fetch(todaysRateUrl(lastKey,limit,search), {  
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
export const todaysRateAddRequest = (data) => {
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
export const todaysRateUpdateRequest = (data, todaysRateId) => {
  //console.log(data)
  //console.log(todaysRateId)
  return fetch(todaysRateUpdateUrl(todaysRateId), {  
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
export const todaysRateDeleteRequest = (rateId) => {
  //console.log(data)
  return fetch(todaysRateDeleteUrl(rateId), {  
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



export const todaysRateTransform = (todaysRate) => {
  
  // const mappedResults = todaysRate.map((customer) => {
  //   return {
  //     ...customer,
  //   };
  // });

  return camelize(todaysRate);;
};
