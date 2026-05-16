import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

export default function AddHabitScreen({ navigation, onAddHabit }) {
  const [title, setTitle] = useState('');

  const handleAddHabit = () => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      Alert.alert('Ошибка', 'Введите название привычки');
      return;
    }

    onAddHabit(trimmedTitle);
    setTitle('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название привычки"
        value={title}
        onChangeText={setTitle}
      />

      <Button
        title="Сохранить"
        onPress={handleAddHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});