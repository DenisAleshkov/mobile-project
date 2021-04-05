import React from 'react';
import Payload from './components/Payload/Payload';
import JoDetails from './components/JobDetails/JobDetails';
import JobSites from './components/JobSites/JobSites';
import MyTrucks from './components/MyTrucks/MyTrucks';
import Haulers from './components/Haulers/Haulers';
import StepperContainer from './StepperContainer';
import DropdownAlert from 'react-native-dropdownalert';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setCreatedProject} from '../../../store/actions/project.action';
import {reduxForm, SubmissionError} from 'redux-form';
import {Navigation} from 'react-native-navigation';

const CreateProject = (props) => {
  const {componentId, handleSubmit, initialValues, form, error} = props;

  const dropDownAlertRef = React.useRef(null);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const errors = useSelector((state) => state.ProjectReducer.errors);

  const getRandomError = (max) => {
    return errors[getRandomInt(max)];
  };

  const dispatch = useDispatch();

  const showError = (randomError) => {
    const errorKey = Object.keys(randomError)[0];
    const valueKey = Object.keys(initialValues).filter(
      (item) => item === errorKey,
    )[0];
    return randomError[valueKey];
  };

  const submit = (values) => {
    console.log('values', values);
    const random = Math.random();
    if (random < 0.5) {
      dispatch(setCreatedProject(values));
      Navigation.pop(componentId);
      dropDownAlertRef.current.alertWithType(
        'success',
        'Success',
        'project created',
      );
    } else {
      const randomError = getRandomError(errors.length);
      dropDownAlertRef.current.alertWithType(
        'error',
        'Error',
        showError(randomError),
      );
      throw new SubmissionError({_error: randomError});
    }
  };

  return (
    <View style={styles.container}>
      <StepperContainer error={error} form={form} submit={handleSubmit(submit)}>
        <Payload />
        <JoDetails error={error && error.quantity} />
        <JobSites form={form} error={error && error.site} />
        <MyTrucks form={form} error={error && error.trucks} />
        <Haulers form={form} />
      </StepperContainer>
      <DropdownAlert closeInterval={3000} ref={dropDownAlertRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default reduxForm({
  form: 'CreateProject',
  initialValues: {
    extRef: '',
    quantity: 0,
    date: new Date(),
    notify: true,
    overnight: false,
    limit: false,
    site: null,
    dropOffSites: null,
    pickUpSites: null,
    trucks: null,
    message: '',
  },
})(CreateProject);
