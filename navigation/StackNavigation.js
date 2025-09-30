import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signup } from '../screen/Signup';
import { Login } from '../screen/Login';
import { CreateProfileScreen } from '../screen/CreateProfileScreen';
import { Home } from '../screen/Home';
import { WorkersList } from '../screen/WorkersList';
import { WorkerProfile } from '../screen/WorkerProfile';
import { HireForm } from '../screen/HireForm';
import { HiredWorkers } from '../screen/HiredWorkers';
import { ComplaintScreen } from '../screen/ComplaintScreen';
import { UserSelection } from '../screen/UserSelection';
import { StartingPage } from '../screen/StartingPage';
import { InterestScreen } from '../screen/InterestScreen';
import { RegisterWorker } from '../screen/RegisterWorker';
import { AdminLogin } from '../screen/AdminLogin';
import { AdminDashboard } from '../screen/AdminDashboard';
import { LaborProfile } from '../screen/LaborProfile';
import { ViewAndEditProfiles } from '../screen/ViewAndEditProfiles';
import { HiredWorker} from '../screen/HiredWorker';





const StackNavigation = () => {

    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName='StartingPage'>

<Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
<Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
<Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} options={{headerShown: false}} />
<Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
<Stack.Screen name="WorkersList" component={WorkersList} options={{headerShown: false}} />
<Stack.Screen name="WorkerProfile" component={WorkerProfile} options={{headerShown: false}} />
<Stack.Screen name="HireForm" component={HireForm} options={{headerShown: false}} />
<Stack.Screen name="HiredWorkers" component={HiredWorkers} options={{headerShown: false}} />
<Stack.Screen name="ComplaintScreen" component={ComplaintScreen} options={{headerShown: false}} />
<Stack.Screen name="UserSelection" component={UserSelection} options={{headerShown: false}} />
<Stack.Screen name="StartingPage" component={StartingPage} options={{headerShown: false}} />
<Stack.Screen name="InterestScreen" component={InterestScreen} options={{headerShown: false}} />
<Stack.Screen name="RegisterWorker" component={RegisterWorker} options={{headerShown: false}} />
<Stack.Screen name="AdminLogin" component={AdminLogin} options={{headerShown: false}} />
<Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{headerShown: false}} />
<Stack.Screen name="LaborProfile" component={LaborProfile} options={{headerShown: false}} />
        <Stack.Screen name='ViewAndEditProfiles' component={ViewAndEditProfiles} options={{ headerShown: false }} />
        <Stack.Screen name='HiredWorker' component={HiredWorker} options={{ headerShown: false }} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigation