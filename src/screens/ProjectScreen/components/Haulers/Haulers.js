import React, {useState} from 'react';
import Buttons from '../Buttons';
import Stepper from '../Stepper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HaulersModal from './components/HaulersModal';
import {Navigation} from 'react-native-navigation';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setHaulers} from '../../../../../store/actions/project.action';
import {setPrevStep} from '../../../../../store/actions/stepper.action';

const Haulers = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  const state = useSelector(state => state)
  const haulers = useSelector((state) => state.ProjectReducer.haulers);
  const step = useSelector((state) => state.StepperReducer.step);

  const setPrevPage = () => {
    Navigation.pop(props.componentId);
    dispatch(setPrevStep(step));
  };

  const deleteItem = (currentId) => {
    const newHaulers = haulers.filter((hauler) => hauler.id !== currentId);
    if (newHaulers.length === 0) {
      dispatch(setHaulers(null));
    } else {
      dispatch(setHaulers(newHaulers));
    }
  };

  const submit = () => {
    console.log('state', state.ProjectReducer)
  }

  const renderHaulers = () =>
    haulers &&
    haulers.map((item) => (
      <View style={styles.choosedItem} key={item.id}>
        <Text style={styles.choosedItemName}>
          {item.data.dropOffSites} - {item.data.count} Req.
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
      <Stepper />
      <HaulersModal
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.inner}>
        <View style={styles.actionContainer}>
          <Text style={styles.header}>Select Haulers (Optional)</Text>
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setModalVisible(true)}>
              <Text style={labelStyle(haulers && haulers.length)}>Select Haulers</Text>
              <View style={styles.chosedItems}>{renderHaulers()}</View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputContainer} onPress={() => {}}>
              <Text>Job Notes - Optional</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Buttons
          hasBackIcon={true}
          nextName="done"
          backName="back"
          onBack={setPrevPage}
          onSubmit={submit}
        />
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
