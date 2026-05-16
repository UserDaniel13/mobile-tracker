import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitsScreen from './screens/HabitsScreen';
import AddHabitScreen from './screens/AddHabitScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [habits, setHabits] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Habits"
          options={{ title: 'Мои привычки' }}
        >
          {(props) => (
            <HabitsScreen
              {...props}
              habits={habits}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="AddHabit"
          options={{ title: 'Добавить привычку' }}
        >
          {(props) => (
            <AddHabitScreen
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}