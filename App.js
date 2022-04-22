import { StyleSheet, Text, View } from 'react-native';

import Home from './components/Home/home'
import ReportOverview from './components/ReportOverview/reportOverview';
import Sandbox from './components/sandbox';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as eva from '@eva-design/eva';

import { default as theme } from './assets/custom-theme.json'; // <-- Import app theme
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {  Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins'

const Stack = createNativeStackNavigator();

export default function App() {
  const strictTheme = { 
    ['text-font-family']: 'Poppins_400Regular'
  }; // <-- Your Font
  const customMapping = { strict: strictTheme };

  const themeForNavigator = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: 'red'
    },
  };

  /* FONTS LOADING */
  let [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
  });

  if(!fontsLoaded){
    return(<>
      <Text>Loading</Text>
    </>)
  }
  else{
    return(
      <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}  customMapping={customMapping}>
            <NavigationContainer theme={themeForNavigator} >
              <Stack.Navigator initialRouteName="Home"
                  
                  screenOptions={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    contentStyle: {
                      backgroundColor: '#FFFFFF'
                    }
                  }}
                  >

                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="ReportOverview" component={ReportOverview} />
                  <Stack.Screen name="Sandbox" component={Sandbox} />

              </Stack.Navigator>
          </NavigationContainer>
          </ApplicationProvider>
      </>
  
    );
  }

/*
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ReportOverview" component={ReportOverview} />
          </Stack.Navigator>
      </NavigationContainer>


  );
  */
}

