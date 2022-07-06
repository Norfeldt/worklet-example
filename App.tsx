import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { ReText } from 'react-native-redash';
import { format, parseISO } from 'date-fns'

const someWorklet = (year: string, displayFormat = 'dd.MM.yyyy') => {
  'worklet';

  console.log('worklet log');
  const formattedDate = format(parseISO(`${year}-01-01`), displayFormat);

  return formattedDate;
};

export default function App() {
  const year = useSharedValue('2022');
  const randomDate = useSharedValue('N/A');

  const tapGesture = Gesture.Tap().onStart(() => {
    console.log('getsture logging');
    randomDate.value = someWorklet(year.value);
  });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.gestureArea}>
        <GestureDetector gesture={tapGesture} style={styles.gestureArea}>
          <Animated.View style={styles.gestureArea}>
            <Text>Static Text</Text>
            <ReText text={randomDate} style={styles.text} />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  gestureArea: {
    flex: 1,
    width: '100%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'red',
  },
  text: {
    color: 'black',
  },
});
