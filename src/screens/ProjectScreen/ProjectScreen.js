import React from 'react';
import {Navigation} from 'react-native-navigation';
import {setStep} from './../../../store/actions/stepper.action';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Button} from 'react-native';

const ProjectScreen = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({componentId: compId}) => {
        if (props.componentId === compId) {
          dispatch(setStep(0));
        }
      },
    );
    return () => componentAppearListener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Create project"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'Payload',
            },
          });
        }}
      />
    </View>
  );
};

ProjectScreen.options = {
  topBar: {
    title: {
      text: 'DISPATCH JOB',
    },
  },
  bottomTab: {
    text: 'Projects',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProjectScreen;
