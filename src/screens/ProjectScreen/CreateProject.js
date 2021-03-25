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
  const {componentId, handleSubmit, clearSubmitErrors, form, error} = props;

  const dropDownAlertRef = React.useRef(null);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const errors = useSelector((state) => state.ProjectReducer.errors);

  const getRandomError = (max) => {
    return errors[getRandomInt(max)];
  };

  const dispatch = useDispatch();

  const submit = (values) => {
    // const random = Math.random();
    // if (random < 0.5) {
    //   Navigation.pop(componentId);
    //   dispatch(setCreatedProject(values));
    //   dropDownAlertRef.current.alertWithType(
    //     'success',
    //     'Success',
    //     'project created',
    //   );
    // } else {
      const randomError = getRandomError(errors.length);
      dropDownAlertRef.current.alertWithType('error', 'Error', randomError);
      // throw new SubmissionError({_error: randomError});
    // }
  };

  return (
    <View style={styles.container}>
      <StepperContainer
        error={error}
        dropDownAlertRef={dropDownAlertRef}
        clearSubmitErrors={clearSubmitErrors}
        submit={handleSubmit(submit)}>
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
    quantity: '',
    date: new Date(),
    notify: true,
    overnight: false,
    limit: false,
  },
})(CreateProject);
