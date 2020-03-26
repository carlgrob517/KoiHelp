import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon, Image } from "@components";
import * as Utils from "@utils";
import { store } from "app/store";

/* Bottom Screen */
import Home from "@screens/Home";
import Profile from "@screens/Profile";

/* Modal Screen only affect iOS */
import SignUp from "@screens/SignUp";
import SignIn from "@screens/SignIn";

/* Stack Screen */
import ChangeLanguage from "@screens/ChangeLanguage";
import Verify from "@screens/Verify"
import Explain from "@screens/Explain"
import { Images } from "../config/images";

// Transition for navigation by screen name
const handleCustomTransition = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1].route.routeName;
  switch (nextScene) {
    case "PreviewImage":
      Utils.enableExperimental();
      return Utils.zoomIn();
    default:
      return false;
  }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
  initialRouteName: "Home",
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: BaseColor.primaryColor,
    inactiveTintColor: BaseColor.grayColor,
    style: BaseStyle.tabBar,
    labelStyle: {
      fontSize: 12
    }
  }
};


// Tab bar navigation
const routeConfigs = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Services",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon color={tintColor} name="compass" size={20} solid />;
      }
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: "Profile",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon solid color={tintColor} name="user-circle" size={20} />;
      }
    })
  }
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
  routeConfigs,
  bottomTabNavigatorConfig
);

// Main Stack View App
const StackNavigator = createStackNavigator(
  {
    BottomTabNavigator: {
      screen: BottomTabNavigator
    },
    
    Profile: {
      screen: Profile
    },
    SignUp: {
      screen: SignUp
    },
    SignIn: {
      screen: SignIn
    },
    
    
    
    ChangeLanguage: {
      screen: ChangeLanguage
    },
    

    Verify: {
      screen: Verify
    },
    Explain:{
      screen : Explain
    }

  },
  {
    headerMode: "none",
    initialRouteName: "BottomTabNavigator"
  }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {  
    StackNavigator: {
      screen: StackNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "StackNavigator",
    transitionConfig: screen => {
      return handleCustomTransition(screen);
    },
    transparentCard: true
  }
);

/* Permistion check authenticate*/
const defaultGetStateForAction = StackNavigator.router.getStateForAction;
const screenPermission = ["Profile"];

StackNavigator.router.getStateForAction = (action, state) => {
  
  const login = store.getState().auth.login.success;
  
  // if (state && screenPermission.indexOf(action.routeName) > -1 && !login) {
  //   console.log("start profile");
  //   const routes = [...state.routes, { key: "profile", routeName: "Profile" }];
  //   return {
  //     ...state,
  //     routes,
  //     index: routes.length - 1
  //   };
  // }
  return defaultGetStateForAction(action, state);
};

export default RootStack;
