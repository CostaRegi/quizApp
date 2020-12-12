import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {useQuizContext} from '../quizContext/QuizContext';
import Question from '../components/Question';
import Animated, {
  useValue,
  Clock,
  timing,
  useCode,
  startClock,
  clockRunning,
  cond,
  divide,
  Easing,
  stopClock,
  call,
  not,
  set,
  and,
  multiply,
} from 'react-native-reanimated';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.95;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  question: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 30,
  },
  questionValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },

  answerView: {
    marginTop: 20,
    flexDirection: 'row',
  },
  progressBar: {
    position: 'absolute',
    width: ITEM_WIDTH,
    top: 80,
    left: 0,
    right: 0,
    height: 20,
  },
  bar: {
    borderRadius: 20,
    height: '100%',
    backgroundColor: '#E01A4F',
  },
});

const QuizScreen = () => {
  const {results} = useQuizContext();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionListRef = useRef<FlatList<any>>(null);
  const progress = useValue(0);
  const clock = useRef(new Clock()).current;
  const finished = useValue<number>(0);
  const widthAnimation = useValue<number>(0);
  const shouldMove = useValue<number>(0);

  const handleAnswer = () => {
    shouldMove.setValue(1);
  };

  const moveToNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useCode(
    () => [
      startClock(clock),
      cond(and(clockRunning(clock), shouldMove), [
        timing(
          clock,
          {
            frameTime: new Animated.Value(0),
            finished: finished,
            position: widthAnimation,
            time: new Animated.Value(0),
          },
          {
            toValue: multiply(
              currentIndex + 1,
              divide(ITEM_WIDTH, results.length),
            ),
            duration: 300,
            easing: Easing.linear,
          },
        ),
      ]),
      cond(finished, [
        stopClock(clock),
        set(finished, new Animated.Value(0)),
        set(shouldMove, new Animated.Value(0)),
      ]),
      cond(not(clockRunning(clock)), [call([], moveToNextQuestion)]),
    ],
    [moveToNextQuestion],
  );

  useEffect(() => {
    if (questionListRef.current) {
      questionListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [questionListRef, currentIndex, progress]);

  useEffect(() => {
    if (results.length > 0) {
      setLoading(false);
    }
  }, [results]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.bar, {width: widthAnimation}]} />
          </View>
          <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.question}>{`Question ${
              currentIndex + 1
            }`}</Text>
          </View>
          <View style={{width: ITEM_WIDTH}}>
            <FlatList
              ref={questionListRef}
              data={results}
              horizontal
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({item}) => (
                <Question
                  key={item.question}
                  question={item.question!}
                  choices={[item.correct_answer!, ...item.incorrect_answers!]}
                  handleAnswer={handleAnswer}
                />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default QuizScreen;
