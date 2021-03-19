import React from 'react';
import Stepper from './components/Stepper';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setStep} from '../../../store/actions/stepper.action';

const StepperContainer = ({children}) => {
  const step = useSelector((state) => state.StepperReducer.step);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setStep(0));
  }, []);

  const renderScreen = () => {
    return children.filter((item, index) => index === step);
  };

  return (
    <View style={styles.container}>
      <Stepper />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StepperContainer;
