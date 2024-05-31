import { Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategorieScreen from "./screens/Categories";
import { RootStackScreen } from "./types";
import FavoriteScreen from "./screens/Favorites";
import QuoteScreen from "./screens/Quotes";
import Loading from "./components/Loading";
import useInterstitialAds from "./hooks/useInterstitialAds";
import AdsProvider from "./store/AdsCtx";

const Stack = createNativeStackNavigator<RootStackScreen>();
const Drawer = createDrawerNavigator();

const DraweNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          paddingTop: 84,
        },
      }}
    >
      <Drawer.Screen name="Categories" component={CategorieScreen} />
      <Drawer.Screen name="Favorites" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  useInterstitialAds();
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="store.db"
        assetSource={{ assetId: require("./assets/store.db") }}
        useSuspense
      >
        <AdsProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="drawer"
                component={DraweNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="quotes" component={QuoteScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AdsProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
