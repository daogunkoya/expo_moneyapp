import { host, api_url, isMock, bearer_token } from "../../utils/env";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";

// export const loginRequest = (email, password) =>
//   firebase.auth().signInWithEmailAndPassword(email, password);

const user = {
  process_store_id: "2bda0c37-4eac-44e5-a014-6c029d76dc62",
  access_type: 1,
  user_name: "sdasdfds",
  device_type: "1",
  device_code: "efscx",
  device_name: "fgg4324",
  user_email: "danielbillion@yahoo.com",
  user_password: "adbahjbsbdjhah",
};

// login user
export const loginRequest = (email, password) =>
  fetch(`${api_url}users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      process_store_id: "2bda0c37-4eac-44e5-a014-6c029d76dc62",
      access_type: 1,
      user_name: "sdasdfds",
      device_type: "1",
      device_code: "efscx",
      device_name: "fgg4324",
      email: email,
      password: password,
    }),
  }).then((response) => response.json());

// Create a wrapper function for communicating with the API
export const registerUser = (userData) => {
  const { fname, lname, email, password, repeatedPassword } = userData;
  return fetch(`${api_url}users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      process_store_id: "2bda0c37-4eac-44e5-a014-6c029d76dc62",
      access_type: 1,
      user_name: "boluwatife",
      device_type: "1",
      device_code: "efscx",
      device_name: "fgg4324",
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
      password_confirmation: repeatedPassword,
    }),
  }).then((response) => response.json());
};

const currentUser = (token) =>
  fetch(`${api_url}/users/login`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((result) => result.json());
