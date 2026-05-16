// App.js
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitsScreen from './screens/HabitsScreen';
import AddHabitScreen from './screens/AddHabitScreen';

const Stack = createNativeStackNavigator();

const STORAGE_KEY = '@habits';

export default function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    saveHabits();
  }, [habits]);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedHabits !== null) {
        setHabits(JSON.parse(savedHabits));
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить привычки');
    }
  };

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить привычки');
    }
  };

  const addHabit = (title) => {
    const newHabit = {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };

    setHabits((currentHabits) => [...currentHabits, newHabit]);
  };

  const toggleHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  };

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
              onToggleHabit={toggleHabit}
              onDeleteHabit={deleteHabit}
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
              onAddHabit={addHabit}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}