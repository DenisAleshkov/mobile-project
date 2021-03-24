import React from 'react';
import Stepper from './components/Stepper';
import Buttons from './components/Buttons';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setNextStep,
  setPrevStep,
  setStep,
} from '../../../store/actions/stepper.action';

const StepperContainer = ({children, submit, error}) => {
  const step = useSelector((state) => state.StepperReducer.step);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setStep(0));
  }, []);

  React.useEffect(() => {
    findErrorScreen();
  }, [error]);

  const setNextPage = () => {
    dispatch(setNextStep(step));
  };
  const setPrevPage = () => {
    dispatch(setPrevStep(step));
  };

  const renderScreen = () => {
    return children.filter((item, index) => index === step);
  };

  const renderButton = () => {
    if (step !== 0 && step !== children.length - 1) {
      return (
        <Buttons
          backName="back"
          nextName="next"
          hasBackIcon={true}
          onSubmit={setNextPage}
          onBack={setPrevPage}
        />
      );
    }
    if (step === children.length - 1) {
      return (
        <Buttons
          backName="back"
          nextName="done"
          hasBackIcon={true}
          onSubmit={submit}
          onBack={setPrevPage}
        />
      );
    }
  };

  const findErrorScreen = () => {
    children.forEach((item, index) => {
      if (item.props.error && item.props.error.length) {
        dispatch(setStep(index));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Stepper />
      {renderScreen()}
      {renderButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StepperContainer;
