import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [lifeGoals, setLifeGoals] = useState([]);
  const [addMode, setAddMode] = useState(false);
  

  const addGoal = goalTitle => {
    setLifeGoals(currentGoals => [...lifeGoals, { key: Math.random().toString(), value: goalTitle}]);
    setAddMode(false);
  };

  const removeGoalHandler = goalKey => {
    setLifeGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalKey);
    });
  }

  const cancelGoalAddHandler = () => {
    setAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setAddMode(true)} />
      <GoalInput visible={addMode} onAddGoal={addGoal} onCancel={cancelGoalAddHandler}/>
      <FlatList
        data={lifeGoals}
        renderItem={itemData =>( 
          <GoalItem 
            id={itemData.item.key} 
            onDelete={removeGoalHandler} 
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
