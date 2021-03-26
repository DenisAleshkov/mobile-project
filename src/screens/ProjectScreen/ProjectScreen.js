import React from 'react';
import ProjectItem from './components/ProjectItem';
import Header from './../JobScreen/components/Header';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import {StyleSheet, Button, FlatList, SafeAreaView} from 'react-native';

const ProjectScreen = (props) => {
  const projects = useSelector((state) => state.ProjectReducer.createdProject);

  const renderProjects = (props) => {
    const {item} = props;
    return (
      <ProjectItem
        key={item.pickUpSites.id}
        id={item.payload.id}
        date={item.date}
        limit={item.limit}
        payloadName={item.payload.payloadName}
        companyName={item.pickUpSites.companyName}
        totalQuantity={item.payload.totalQuantity}
        unitPrice={item.quantity}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Created Project" />
      <FlatList
        data={projects}
        renderItem={renderProjects}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Create project"
        style={styles.button}
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'CreateProject',
            },
          });
        }}
      />
    </SafeAreaView>
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
  },
  button: {width: 100},
});

export default ProjectScreen;
