import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Stepper from './../Stepper';
import Buttons from './../Buttons';
import {Navigation} from 'react-native-navigation';
import JobSitesModal from './components/JobSitesModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setStep} from './../../../../../store/actions/stepper.action';
import {
  setDropOfSites,
  setPickUpSites,
} from './../../../../../store/actions/project.action';
import {secondStep} from './../../../../../store/constants';
import {useSelector, useDispatch} from 'react-redux';

const JobSites = (props) => {
  const [pickup, setPickup] = React.useState(false);
  const [dropofBtn, setDropofBtn] = React.useState(false);

  const labelStyle = (value) => ({
    position: 'absolute',
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
    left: 10,
    top: !value ? 20 : -10,
    fontSize: !value ? 16 : 12,
  });

  const [pickupModalVisible, setPickupModalVisible] = React.useState(false);
  const [dropofModalVisible, setDropofModalVisible] = React.useState(false);

  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.JobReducer.jobs);

  const dropofSites = useSelector((state) => state.ProjectReducer.dropofSites);
  const pickupSites = useSelector((state) => state.ProjectReducer.pickupSites);

  const onBack = () => {
    dispatch(setStep(secondStep));
    Navigation.pop(props.componentId);
  };

  const renderPickUpModal = () => {
    return (
      <JobSitesModal
        modalVisible={pickupModalVisible}
        onRequestClose={() => {
          setPickupModalVisible(!pickupModalVisible);
        }}
        data={jobs}
        field={'projectName'}
        onExit={() => setPickupModalVisible(!pickupModalVisible)}
        onSubmit={setPickUpSites}
      />
    );
  };

  const renderCountItems = () => {
    return (
      dropofSites && (
        <View style={[labelStyle(dropofBtn), styles.choosedItem]}>
          <Text style={styles.choosedItemName}>{dropofSites.dropOffSites}</Text>
          <TouchableOpacity
            style={styles.choosedItemcons}
            onPress={() => {
              setDropofBtn(!dropofBtn);
              dispatch(setDropOfSites(null));
            }}>
            <Icon name="close-thick" color="#5f5b57" size={20} />
          </TouchableOpacity>
        </View>
      )
    );
  };

  const renderDropOffModal = () => {
    return (
      <JobSitesModal
        modalVisible={dropofModalVisible}
        onRequestClose={() => {
          setDropofModalVisible(!dropofModalVisible);
        }}
        data={jobs}
        field={'dropOffSites'}
        onExit={() => setDropofModalVisible(!dropofModalVisible)}
        onSubmit={setDropOfSites}
      />
    );
  };

  React.useEffect(() => {
    if (pickupSites) {
      setPickup(true);
    }
  }, [pickupSites]);

  const renderBtn = () =>
    pickup ? (
      <TouchableOpacity
        onPress={() => {
          setPickup(!pickup);
          dispatch(setPickUpSites(null));
        }}>
        <Icon name="close-thick" size={25} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setPickupModalVisible(!pickupModalVisible);
        }}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );

  const renderBtn2 = () =>
    dropofSites ? null : (
      <TouchableOpacity
        onPress={() => {
          setDropofModalVisible(!dropofModalVisible);
        }}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Stepper />
      {renderPickUpModal()}
      {renderDropOffModal()}
      <View style={styles.inner}>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 4,
          }}
          source={require('./../../../../assets/map.jpg')}
        />
        <Text style={styles.header}>Job Sites</Text>
        <View style={styles.actionGroup}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle(pickup)}>Pick-Up Site</Text>
            <TextInput style={styles.input} value={pickupSites?.projectName} />
            {renderBtn()}
          </View>
          <Icon name="origin" size={40} />
        </View>
        <View style={styles.actionGroup}>
          <View style={[styles.inputContainerCount]}>
            <Text style={labelStyle(dropofSites)}>Drop-Off Site</Text>
            {renderBtn2()}
            {renderCountItems()}
          </View>
          <Icon name="origin" size={40} />
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 0}}>
        <Buttons backName="Back" nextName="next" onBack={onBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    width: 290,
    textAlign: 'left',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    height: 60,
    paddingVertical: 28,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 5,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
  },
  inputContainerCount: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 250,
    height: 60,
    paddingVertical: 28,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 5,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
  },
  choosedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 18,
    paddingVertical: 5,
    backgroundColor: '#e4ad71',
    top: 15,
  },
  choosedItemName: {
    marginRight: 15,
  },
});

export default JobSites;
