import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#20759C',
    marginVertical: 10,
  },
  answerText: {
    fontSize: 18,
    color: '#fff',
    padding: 20,
  },
});

type AnswerProps = {
  answer: string;
  handleClick: () => void;
};

function Answer({answer, handleClick}: AnswerProps) {
  return (
    <View style={styles.option}>
      <TouchableOpacity onPress={handleClick}>
        <Text style={styles.answerText}>{answer}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Answer;
