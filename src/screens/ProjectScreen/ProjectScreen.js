import React from 'react';
import {Navigation} from 'react-native-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Button} from 'react-native';

const ProjectScreen = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({componentId: compId}) => {
        if (props.componentId === compId) {
          // dispatch(setStep(0));
        }
      },
    );
    return () => componentAppearListener.remove();
  }, []);

  // const renderProjects = () => {
  //   return (
  //     createdProjects &&
  //     createdProjects.map((item, index) => {
  //       return (
  //         <ProjectItem
  //           key={index}
  //           id={index}
  //           payload={item.payloads[0]}
  //           inputs={item.jobDetails.inputs}
  //           switches={item.jobDetails.switches}
  //         />
  //       );
  //     })
  //   );
  // };

  return (
    <View style={styles.container}>
      <Button
        title="Create project"
        style={{width: 100}}
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'CreateProject',
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
    alignItems: "center"
  },
});

export default ProjectScreen;
