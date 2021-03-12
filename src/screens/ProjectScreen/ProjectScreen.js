import React from 'react';
import {StyleSheet} from 'react-native';
import Payload from './components/Payload/Payload';
import MyTrucks from "./components/MyTrucks/MyTrucks"

const ProjectScreen = () => {
  return <MyTrucks />;
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

export default ProjectScreen;
