import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import store from "./src/store/store";

import { Home } from "./src/screens/home";
import { Game } from "./src/screens/game";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
