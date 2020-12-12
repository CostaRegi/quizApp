import React from 'react';
import {QuizProvider} from './quizContext/QuizContext';
import QuizScreen from './screens/QuizScreen';
import {StyleSheet, SafeAreaView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002841',
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QuizProvider>
        <QuizScreen />
      </QuizProvider>
    </SafeAreaView>
  );
};

export default App;
