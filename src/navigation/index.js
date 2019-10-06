import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import Explore from '../screens/Explore';
import Browse from '../screens/Browse';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import Brand from '../screens/Brand';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  Forgot: {
    screen: Forgot,
  },
  Explore: {
    screen: Explore,
  },
  Browse: {
    screen: Browse,
  },
  Product: {
    screen: Product,
  },
  Settings: {
    screen: Settings,
  },
  Brand: {
    screen: Brand,
  },
},
);
 

export default createAppContainer(AppNavigator);
