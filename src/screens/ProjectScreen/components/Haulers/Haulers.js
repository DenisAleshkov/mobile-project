import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setHaulers} from '../../../../../store/actions/project.action';
import {Navigation} from 'react-native-navigation';
import {change} from 'redux-form';

const Haulers = (props) => {
  const {form} = props;

  const labelStyle = (value) => ({
    position: 'absolute',
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
    left: 10,
    top: !value ? 20 : -10,
    fontSize: !value ? 16 : 12,
  });

  const dispatch = useDispatch();

  const haulers = useSelector((state) => state.ProjectReducer.haulers);

  const deleteItem = (currentId) => {
    const newHaulers = haulers.filter((hauler) => hauler.id !== currentId);
    if (newHaulers.length === 0) {
      dispatch(setHaulers(null));
      changeHaulers(null)
    } else {
      dispatch(setHaulers(newHaulers));
      changeHaulers(newHaulers)
    }
  };

  const showModal = () => {
    Navigation.showOverlay({
      component: {
        name: 'HaulersModal',
        passProps: {
          changeHaulers,
        },
        options: {
          layout: {
            componentBackgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  };

  const changeHaulers = (value) => dispatch(change(form, 'haulers', value));

  const renderHaulers = () =>
    haulers &&
    haulers.map((item) => (
      <View style={styles.choosedItem} key={item.id}>
        <Text style={styles.choosedItemName}>
          {item.projectName} - {item.count} Req.
        </Text>
        <TouchableOpacity
          style={styles.choosedItemcons}
          onPress={() => deleteItem(item.id)}>
          <Icon name="close" color="#5f5b57" size={20} />
        </TouchableOpacity>
      </View>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.actionContainer}>
          <Text style={styles.header}>Select Haulers (Optional)</Text>
          <View style={styles.action}>
            <TouchableOpacity style={styles.inputContainer} onPress={showModal}>
              <Text style={labelStyle(haulers && haulers.length)}>
                Select Haulers
              </Text>
              <View style={styles.chosedItems}>{renderHaulers()}</View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputContainer} onPress={() => {}}>
              <Text>Job Notes - Optional</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContainer: {},
  inputContainer: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  action: {},
  textStyle: {
    color: '#b1681b',
    textDecorationLine: 'underline',
    fontWeight: '300',
    textAlign: 'center',
  },
  chosedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choosedItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#e4ad71',
    top: 15,
    margin: 3,
    maxWidth: 280,
  },
  choosedItemName: {
    marginRight: 15,
  },
});

export default Haulers;
