import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard/Dashboard';
import ActivePolicies from './screens/Policies/ActivePolicies';
import Claims from './screens/Claims/Claims';
import UpcomingPayments from './screens/Payments/UpcomingPayments';
import AlertsReminders from './screens/Alerts/Alerts';
import ClaimSubmission from './screens/Claims/ClaimSubmission';
import Login from './screens/Auth/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
      } else {
        // User is logged out
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    // While checking the auth state, show a loading screen or nothing
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Dashboard" : "Login"}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Active Policies" component={ActivePolicies} />
            <Stack.Screen name="Claims" component={Claims} />
            <Stack.Screen name="Upcoming Payments" component={UpcomingPayments} />
            <Stack.Screen name="Alerts Reminders" component={AlertsReminders} />
            <Stack.Screen name="ClaimSubmission" component={ClaimSubmission} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
