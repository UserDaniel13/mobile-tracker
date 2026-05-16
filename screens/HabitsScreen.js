import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function HabitsScreen({ navigation, habits }) {
  return (
    <View style={styles.container}>
      <Button
        title="Добавить привычку"
        onPress={() => navigation.navigate('AddHabit')}
      />

      {habits.length === 0 ? (
        <Text style={styles.emptyText}>
          Пока нет привычек. Добавьте первую привычку.
        </Text>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.habitItem}>
              <Text style={styles.habitTitle}>
                {item.title}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  list: {
    marginTop: 20,
  },
  emptyText: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
  habitItem: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  habitTitle: {
    fontSize: 18,
  },
});