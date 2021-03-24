import React from 'react';
import ProjectItem from './components/ProjectItem';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Button} from 'react-native';

const ProjectScreen = (props) => {
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
    alignItems: 'center',
  },
});

export default ProjectScreen;
