import React, { useState, createContext, useEffect, useMemo , useReducer} from "react";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import camelize from "camelize";

import { host, api_url, isMock , bearer_token} from "../../utils/env";

import { loginRequest, registerUser, loginUser } from "./authentication.service";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../utils/navigationRef';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = props => {
  // const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const [storeData, setStoreData] = useState(null);
  const [error, setError] = useState(null);

  const AUTHENTICATED = 'AUTHENTICATED';
  const LOGOUT = 'LOGOUT';
  const USER = 'USER';
  const ACCESSTOKEN = 'ACCESSTOKEN';
  const STORE = 'STORE';

 



  const [authState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        // Handle the AUTHENTICATED action and set the state to be authenticated
        case AUTHENTICATED:
          
          return {
            ...state,
            isAuthenticated: true,
            ...action.payload,
            
          };
        case LOGOUT:
          return {
            ...state,
            isAuthenticated: false,
            'accessToken':'',
            userData:null,
            user:null
          };
        default:
          throw new Error(`${action.type} is not a valid action type`);
      }
    },
    {
      isAuthenticated: false,
      initialized: false,
     userData:null,
     user:null,
     store:null,
     'userCurrencies':[],
     'availableCurrencies':[],
     'accessToken':'',

    },
  );
  
  


  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
  
      const userData = await service.post(Endpoints.AUTH['LOGIN'], {
        email,
        password,
      });
  
      console.log('User login response:', userData);
  
      if (!userData.error) {
        const { store, user,  accessToken } = userData.data;
  
        
        
        await SecureStore.setItemAsync(USER, JSON.stringify(user));
        await SecureStore.setItemAsync(STORE, JSON.stringify(store));
        await SecureStore.setItemAsync(ACCESSTOKEN, accessToken); // Access tokens are usually strings, no need to stringify
        
        dispatch({ type: AUTHENTICATED, payload: userData.data });
        
        // await SecureStore.setItemAsync('AVAILABLECURRENCIES', JSON.stringify(availableCurrencies));
        // await SecureStore.setItemAsync('USERCURRENCY', JSON.stringify(userCurrencies));
        setError("Please check email and password");
      }
  
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message || e.toString());
    }
  };
  

  // const onRegister = async(registerUserData) => {
  //   console.log('registerUserData=',registerUserData)
  //   setIsLoading(true);
  //   // if (registerUserData.password !== registerUserData.repeatedPassword) {
  //   //   setError("Error: Passwords do not match");
  //   //   return;
  //   // }
  //     const updatedUserData = transformUserDataForEndpoint(registerUserData);
  //     console.log('updatedUserData=',updatedUserData)
  //   try{
  //       setIsLoading(true);
  //      const userData = await registerUser(updatedUserData)
  //     // console.log(userData.errors)

  //     if(!userData.errors) {
  //         dispatch({ type: AUTHENTICATED, payload: userData.data});

  //         await SecureStore.setItemAsync(USER,  JSON.stringify(camelize(userData.data) ));
  //     }
      

  //      if(userData.errors) {
  //       // Concatenate all error arrays and join them into a single string
  //         const errorMessage = Object.values(userData.errors)
  //         .reduce((acc, errorArray) => acc.concat(errorArray), [])
  //         .join('\n');

  //       console.log('error messages=', errorMessage);

  //       // Set the error message state
  //       setError(errorMessage);

  //      } 
   
  //         setIsLoading(false);
   
  // }catch(e){
  //     setIsLoading(false);
  //     setError(e.toString());
  //   };
    
    
  // };

  const onRegister = async (registerUserData) => {

    setIsLoading(true);
    
    const updatedUserData = transformUserDataForEndpoint(registerUserData);

    try {
     // updateEndpoint = type === "status" ? Endpoints.MEMBER["STATUSUPDATE"] : Endpoints.MEMBER["ROLEUPDATE"];
      const response = await service.post(Endpoints.AUTH['REGISTER'], updatedUserData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { store, user,  accessToken } = response.data;

      console.log('User register response:', JSON.stringify(response.data, null, 2));
      await SecureStore.setItemAsync(USER, JSON.stringify(user));
      await SecureStore.setItemAsync(STORE, JSON.stringify(store));
      await SecureStore.setItemAsync(ACCESSTOKEN, accessToken);

           if(user) {
          dispatch({ type: AUTHENTICATED, payload: response.data});
          //await SecureStore.setItemAsync(USER,  JSON.stringify(camelize(response.data) ));
      }
      

       if(response?.errors) {
        // Concatenate all error arrays and join them into a single string
          const errorMessage = Object.values(response?.errors)
          .reduce((acc, errorArray) => acc.concat(errorArray), [])
          .join('\n');

        console.log('error messages=', errorMessage);

        // Set the error message state
        setError(errorMessage);

       } 
   
        setIsLoading(false);

      if (response?.status === 200) {
        Alert.alert("Success", "Report submitted successfully!");
      } 
     // navigate("TransactionList");
    } catch (error) {
      console.error("Error submitting update:", error);
      //Alert.alert("Error", "Failed to register user.");
      setIsLoading(false);
    }
  };

  const transformUserDataForEndpoint = (member) => {
    return {
      "first_name":member?.fname,
      "last_name":member?.lname,
      "middle_name":member?.mname,
      "password":member?.password,
      "password_confirmation":member?.cpassword,
      "dob":member?.dateOfBirth,
      "title":member?.title,
      "email":member?.email,
      "phone":member?.phone,
      "address": member?.metaData?.addressNo + " " + member?.metaData?.address1 + " " + member?.metaData?.address2 + " " + member?.metaData?.city + " " + member?.metaData?.country,
      "postcode": member?.postcode,
      "metadata": member?.metaData
     
       }
      }

  const clearUserData = async  () => {
  try{
    await SecureStore.deleteItemAsync(ACCESSTOKEN);
    await SecureStore.deleteItemAsync(USER);

    dispatch({ type: LOGOUT, payload: null });
  }catch(e){
    console.error(e);
  }
  };

 const onPasswordReset = async(email,oldPassword,newPassword,repeatedPassword, setError) => {
    setIsLoading(true);
    try{
        setIsLoading(true);
        console.log('url=',Endpoints.AUTH['PASSWORDRESET'])
       const responseData = await service.post(Endpoints.AUTH['PASSWORDRESET'], {
         email,
         old_password:oldPassword,
         new_password:newPassword,
         new_password_confirmation:repeatedPassword
       })
       
       console.log('password reset response=',responseData)
       
       const {data} = responseData

       if(data.errors) {
        const errorMessage = data?.errors || "something went wrong";
        setError(errorMessage);
       }

       if(!data.errors) {
        setIsLoading(false);
        clearUserData();
         Alert.alert("Success", "Successfully reset password, please login again");
        

        
      }
    }catch(e){
      setIsLoading(false);
      const errorMessage = e.response?.data?.message || e.toString();
      setError(errorMessage);
    }
    
  };
      // console.log(userData.errors)



  //log user out
  const onLogout =  async () => clearUserData();




// Fetch the token from storage then navigate to our appropriate place
const bootstrapAsync = async () => {
  try {
    const userDataStringify = await SecureStore.getItemAsync(USER);
    const userData = JSON.parse(userDataStringify);
   
    const accessToken = await SecureStore.getItemAsync(ACCESSTOKEN);
    const user = (await SecureStore.getItemAsync(USER)) ? JSON.parse(await SecureStore.getItemAsync(USER)) : null;
    const store = (await SecureStore.getItemAsync(STORE)) ? JSON.parse(await SecureStore.getItemAsync(STORE)) : null; // await SecureStore.getItemAsync('STORE');
    // const availableCurrencies = await SecureStore.getItemAsync('AVAILABLECURRENCIES');
    // const userCurrencies = await SecureStore.getItemAsync('USERCURRENCY');

    console.log('user data in bootstrap', user);
    console.log('store data in bootstrap', store);
    console.log('accessToken data in bootstrap', accessToken);

    // Check if userData contains the accessToken property
    if (accessToken) {
      dispatch({ type: AUTHENTICATED, payload: { store, accessToken,  user} });
     // dispatch({ type: LOGOUT, payload: null });
    } else {
      console.log('accessToken not found in userData');
    }
  } catch (error) {
    // Handle parsing error or getItemAsync error
    console.error('Error while parsing userData:', error);
  }

  // Other logic here if needed

  return; // Make sure to return properly
};







  const facade = useMemo(
    () => ({
      
      register: async () => {
        try {
          const result = await registerUser();

          console.log(`result`, result);

          await SecureStore.setItemAsync(USER_DATA, result.access_token);

        //  dispatch({type: AUTHENTICATED});
        } catch (error) {
          console.error(error);
        }
      },


      login: async () => {
        try {
          const result = await loginUser();
           //dispatch({type: AUTHENTICATED});

         // console.log(`result`, result);
          console.log(await SecureStore.getItemAsync(USER_DATA));
          const res = JSON.stringify(result)

          await SecureStore.setItemAsync(USER_DATA, res);
         
          // setUser(res);
          // setIsLoading(false);

         // console.log(authState)
          
        } catch (error) {
          console.error(error);
        }
      },



      //log user out
      logout: async () => {
        try {
         
          await SecureStore.deleteItemAsync(USER_DATA);

        // dispatch({type: AUTHENTICATED});
        } catch (error) {
          console.error(error);
        }
      },






      // First we're trying to fetch a token from encrypted storage here
      // Then we try to get the user associated with that token and resume the session
      resume: async () => {
        try {
          const user_data = await SecureStore.getItemAsync(USER_DATA);

          console.log(`token`,1);

          // When no token is found, don't try to fetch the user
          if (!user_data) {
            return;
          }

        //  await currentUser(user_data);

          //return dispatch({type: AUTHENTICATED});
        } catch (error) {
          console.error(error);
        }
      },
    }),
    [],
  );

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
       // isLogin: !!authState.user_data,
        user:authState.user,
        store:authState.store,
        accessToken:authState.accessToken,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        facade,
        bootstrapAsync,
        authState:authState,
        authData:authState,
        onPasswordReset,
        isAdmin:authState?.user?.userRoleType === "Admin",
        isCustomer:authState?.user?.userRoleType === "Customer",
        isAgent:authState?.user?.userRoleType === "Agent",
        isManager:authState?.user?.userRoleType === "Manager",
       
      }}
    >
       {props.children}
    </AuthenticationContext.Provider>
  );
};
