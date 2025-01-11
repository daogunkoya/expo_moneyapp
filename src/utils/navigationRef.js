import { NavigationActions } from '@react-navigation/native';

let navigator;

export const setNavigator = nav => {
  navigator = nav;
};

// export const navigate = (routeName, params) => {
//   console.log(navigator)
//   navigator.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params
//     })
//   );
// };

export const navigate = (routeName,param = null) => {
 // console.log(navigator)
  // navigator.dispatch(
  //   NavigationActions.navigate({
  //     routeName,
  //     params
  //   })
  // );
  navigator.navigate(routeName, param)
};
