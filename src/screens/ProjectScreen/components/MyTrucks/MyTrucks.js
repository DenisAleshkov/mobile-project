import React, {useState} from 'react';
import Buttons from '../Buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyTrucksModal from './components/MyTrucksModal';
import DropdownAlert from 'react-native-dropdownalert';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTrucks} from '../../../../../store/actions/project.action';
import {
  setNextStep,
  setPrevStep,
} from '../../../../../store/actions/stepper.action';

const MyTrucks = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dropDownAlertRef = React.useRef(null);
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

  const jobs = useSelector((state) => state.JobReducer.jobs);
  const step = useSelector((state) => state.StepperReducer.step);
  const trucks = useSelector((state) => state.ProjectReducer.trucks);
  const activeError = useSelector((state) => state.ProjectReducer.activeError);

  const isDisable = () => {
    return trucks;
  };

  const setNextPage = () => {
    dispatch(setNextStep(step));
  };

  const setPrevPage = () => {
    dispatch(setPrevStep(step));
  };

  const deleteItem = (currentId) => {
    const newTrucks = trucks.filter((truck) => truck.id !== currentId);
    if (newTrucks.length === 0) {
      dispatch(setTrucks(null));
    } else {
      dispatch(setTrucks(newTrucks));
    }
  };

  const renderTrucks = () =>
    trucks &&
    trucks.map((item) => (
      <View style={styles.choosedItem} key={item.id}>
        <Text style={styles.choosedItemName}>{item.companyName}</Text>
        <TouchableOpacity
          style={styles.choosedItemcons}
          onPress={() => deleteItem(item.id)}>
          <Icon name="close-thick" color="#5f5b57" size={20} />
        </TouchableOpacity>
      </View>
    ));

  const renderError = () =>
    activeError &&
    activeError.trucks && (
      <Text style={{color: 'red'}}>{activeError.trucks}</Text>
    );
  return (
    <View style={styles.container}>
      <MyTrucksModal
        data={jobs}
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.inner}>
        <View style={styles.actionContainer}>
          <Text style={styles.header}>Trucks Assigned</Text>
          <View style={styles.action}>
            <View style={styles.inputContainer}>
              <Text style={labelStyle(trucks)}>Trucks From Fleet</Text>
              <View style={styles.chosedItems}>{renderTrucks()}</View>
            </View>

            <TouchableOpacity
              style={styles.openModal}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>View All</Text>
            </TouchableOpacity>
          </View>
          {renderError()}
        </View>
        <Buttons
          nextName="next"
          backName="back"
          disabled={!isDisable()}
          onBack={setPrevPage}
          onSubmit={setNextPage}
        />
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
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
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    alignItems: 'flex-end',
  },
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#e4ad71',
    top: 15,
    margin: 3,
  },
  choosedItemName: {
    marginRight: 15,
  },
});

export default MyTrucks;
