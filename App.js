import { StyleSheet, Text, View } from 'react-native';

import Home from './components/home'
import ReportOverview from './components/reportOverview';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as eva from '@eva-design/eva';

import { default as theme } from './assets/custom-theme.json'; // <-- Import app theme
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {  Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins'

const Stack = createNativeStackNavigator();

export default function App() {
  const strictTheme = { ['text-font-family']: 'Poppins_400Regular' }; // <-- Your Font
  const customMapping = { strict: strictTheme };

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
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="ReportOverview" component={ReportOverview} />
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

