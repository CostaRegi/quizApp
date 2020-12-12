import React from 'react';
import {Text, FlatList, View, StyleSheet, Dimensions} from 'react-native';
import Answer from './Answer';

const styles = StyleSheet.create({
  answerView: {
    marginTop: 20,
    flexDirection: 'row',
  },
  questionView: {},

  question: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 30,
  },
  questionValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

type QuestionProps = {
  question: string;
  choices: string[];
  handleAnswer: () => void;
};
const {width} = Dimensions.get('window');
const Question = ({question, choices, handleAnswer}: QuestionProps) => {
  return (
    <View style={{padding: 8, width: width * 0.95, alignContent: 'center'}}>
      <View style={styles.questionView}>
        <Text style={[styles.questionValue]}>{question}</Text>
      </View>
      <View style={styles.answerView}>
        <FlatList
          data={choices}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          bounces={false}
          renderItem={({item}) => (
            <Answer answer={item!} handleClick={handleAnswer} />
          )}
        />
      </View>
    </View>
  );
};

export default Question;
