import React from 'react';
import Stepper from './components/Stepper';
import Buttons from './components/Buttons';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setPrevStep, setStep} from '../../../store/actions/stepper.action';
import {reset} from 'redux-form';

const StepperContainer = ({children, submit, error}) => {
  const step = useSelector((state) => state.StepperReducer.step);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setStep(0));
    dispatch(reset('PickUpModal'));
    dispatch(reset('DropOffModal'));
    dispatch(reset('MyTrucksModal'));
    dispatch(reset('HaulersModal'));
  }, []);

  React.useEffect(() => {
    findErrorScreen();
  }, [error]);

  const setPrevPage = () => {
    dispatch(setPrevStep(step));
  };

  const renderScreen = () => {
    return children.filter((item, index) => index === step);
  };

  const renderButton = () => {
    if (step !== 0 && step === children.length - 1) {
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
