import React, {useState} from 'react';
import Buttons from '../Buttons';
import Stepper from '../Stepper';
import CheckBox from '../CheckBox';
import MyTrucksModal from './components/MyTrucksModal';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getJobs} from '../../../../../store/actions/job.action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyTrucks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [focused, setFocused] = React.useState(false);

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

  const trucks = useSelector((state) => state.ProjectReducer.trucks);
  console.log('trucks', trucks)

  const renderTrucks = () => {
    return trucks && trucks.map(item=>{
      return <View style={styles.choosedItem} key={item.id}>
          <Text style={styles.choosedItemName}>{item.projectName}</Text>
          <TouchableOpacity
            style={styles.choosedItemcons}
            onPress={() => {}}>
            <Icon name="close-thick" color="#5f5b57" size={20} />
          </TouchableOpacity>
        </View>
    })
  }

  return (
    <View style={styles.container}>
      <Stepper />
      <MyTrucksModal data={jobs} modalVisible={modalVisible} handleClose={()=>setModalVisible(!modalVisible)} />
      <View style={styles.inner}>
        <Text style={styles.header}>Trucks Assigned</Text>
        <View style={styles.action}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle(focused)}>Trucks From Fleet</Text>
            {renderTrucks()}
          </View>
          <TouchableOpacity
            style={styles.openModal}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <Buttons nextName="next" backName="back" />
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
    flexWrap: "wrap"
  },
  textStyle: {
    color: '#b1681b',
    textDecorationLine: 'underline',
    fontWeight: '300',
    textAlign: 'center',
  },
  choosedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#e4ad71',
    top: 15,
  },
  choosedItemName: {
    marginRight: 15,
  },
});

export default MyTrucks;
