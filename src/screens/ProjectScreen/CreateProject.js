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
import {setStep} from '../../../store/actions/stepper.action';
import {
  setActiveError,
  setCreatedProject,
} from '../../../store/actions/project.action';
import {
  ProjectErrorContainer,
  SiteError,
  TrucksError,
  ServerError,
  JobDetailsError,
} from './services/classes.service';
import {Navigation} from 'react-native-navigation';

const CreateProject = (props) => {
  const dropDownAlertRef = React.useRef(null);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const dispatch = useDispatch();

  const errors = useSelector((state) => state.ProjectReducer.errors);
  const project = useSelector((state) => state.ProjectReducer);

  const getRandomError = (max) => {
    return errors[getRandomInt(max)];
  };

  const submit = () => {
    const random = Math.random();
    if (random < 0.5) {
      dispatch(setCreatedProject(project));
      dispatch(setActiveError(null));
      Navigation.pop(props.componentId);
      dropDownAlertRef.current.alertWithType(
        'success',
        'success',
        'Project created',
      );
    } else {
      const error = getRandomError(errors.length);
      const ProjectErrors = new ProjectErrorContainer(
        [
          new TrucksError(error),
          new ServerError(error),
          new JobDetailsError(error),
          new SiteError(error),
        ],
        setErrorPage,
      );
      ProjectErrors.getError();
      dispatch(setActiveError(error));
    }
  };

  const setErrorPage = (errorStep, message) => {
    dispatch(setStep(errorStep));
    dispatch(setActiveError());
    dropDownAlertRef.current.alertWithType('error', 'Error', message);
  };

  return (
    <View style={styles.container}>
      <StepperContainer>
        <Payload />
        <JoDetails />
        <JobSites />
        <MyTrucks />
        <Haulers submit={submit} />
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

export default CreateProject;
