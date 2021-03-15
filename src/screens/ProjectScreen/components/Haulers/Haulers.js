import React, {useState} from 'react';
import Buttons from '../Buttons';
import Stepper from '../Stepper';
import CheckBox from '../CheckBox';
import HaulersModal from './components/HaulersModal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setHaulers} from '../../../../../store/actions/project.action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Haulers = () => {
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

  const haulers = useSelector((state) => state.ProjectReducer.haulers);

  const deleteItem = (currentId) => {
    const newHaulers = haulers.filter((hauler) => hauler.id !== currentId);
    if (newHaulers.length === 0) {
      dispatch(setHaulers(null));
    } else {
      dispatch(setHaulers(newHaulers));
    }
  };

  const renderTrucks = () =>
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
        <Text style={styles.header}>Select Haulers (Optional)</Text>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}>
            <Text style={labelStyle(haulers)}>Select Haulers</Text>
            <View style={styles.chosedItems}>{renderTrucks()}</View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputContainer} onPress={() => {}}>
            <Text>Job Notes - Optional</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons hasBackIcon={true} nextName="done" backName="back" />
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
    justifyContent: 'flex-start',
  },
  action: {
    alignItems: 'flex-end',
  },
  inputContainer: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: '#b1681b',
    textDecorationLine: 'underline',
    fontWeight: '300',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  chosedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choosedItem: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#e4ad71',
    top: 15,
    margin: 3,
    maxWidth: 280
  },
  choosedItemName: {
    marginRight: 15,
  },
});

export default Haulers;
