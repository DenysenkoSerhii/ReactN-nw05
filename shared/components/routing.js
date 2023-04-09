
import { createStackNavigator } from "@react-navigation/stack";


import RegistrationScreens from "../../Screens/auth/RegistrationScreen";
import LoginScreen from "../../Screens/auth/LoginScreen";

import HomeTabsScreen from "../../Screens/mainScreen/Home";

const AuthStack = createStackNavigator();


import useAuth from "../hooks/useAuth";

export const Routing = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <>
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreens}
          />
        </AuthStack.Navigator>
      </>
    );
  }
  return (
    <HomeTabsScreen/>
  );
};
