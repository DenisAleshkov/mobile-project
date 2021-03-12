import React from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stepper = () => {
  const steps = useSelector((state) => state.StepperReducer.steps);

  const renderSteps = () =>
    steps.map((step) => (
      <View style={styles.step} key={step.label}>
        {step.renderLine && <View style={fillLines(step.filLine, steps)}></View>}
        <View style={fillCircle(step.fillCircle)}>
          {renderIcon(step.renderIcon)}
          <Text style={fillLabel(step.fillLabel)}>{step.label}</Text>
        </View>
      </View>
    ));

  return <View style={styles.stepper}>{renderSteps()}</View>;
};

const fillLines = (done, steps) => ({
  backgroundColor: done ? '#de8a1d' : '#a0999963',
  width: Dimensions.get('window').width / (steps.length + 1),
  height: 4,
});

const fillCircle = (done) => ({
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: done ? '#de8a1d' : '#a0999963',
  borderRadius: 50,
  width: 20,
  height: 20,
});

const fillLabel = (done) => ({
  textAlign: 'center',
  fontSize: 10,
  fontWeight: '700',
  width: 80,
  height: 15,
  color: done ? '#de8a1d' : '#000',
});

const renderIcon = (done) => {
  return done ? (
    <Icon name="check" style={styles.icon} color="#fff" size={20} />
  ) : (
    <Text style={styles.icon} />
  );
};

const styles = StyleSheet.create({
  stepper: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    paddingVertical: 30,
    alignItems: 'center',
  },
  icon: {
    marginBottom: Platform.OS === 'android' ? 2 : 0,
    marginTop: Platform.OS === 'android' ? 18 : 0,
    paddingTop: Platform.OS === 'ios' ? 22 : 0,
    paddingBottom: Platform.OS === 'ios' ? 24 : 0,
  },
  step: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stepper;
