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
import JobSitesModal from './components/PickUpModal';
import DropOffModal from './components/DropOffModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setPrevStep,
  setNextStep,
} from './../../../../../store/actions/stepper.action';
import {
  setDropOfSites,
  setPickUpSites,
} from './../../../../../store/actions/project.action';
import {useSelector, useDispatch} from 'react-redux';

const JobSites = (props) => {
  const [pickupBtn, setPickupBtn] = React.useState(false);
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
  const error = useSelector((state) => state.JobReducer.error);
  const dropofSites = useSelector((state) => state.ProjectReducer.dropofSites);
  const pickupSites = useSelector((state) => state.ProjectReducer.pickupSites);
  const step = useSelector((state) => state.StepperReducer.step);

  const isDisable = () => {
    return dropofSites?.dropOffSites && pickupSites?.projectName;
  };

  const setNextPage = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'MyTrucks',
      },
    });
    dispatch(setNextStep(step));
  };

  const setPrevPage = () => {
    Navigation.pop(props.componentId);
    dispatch(setPrevStep(step));
  };

  const renderPickUpModal = () => {
    return (
      <JobSitesModal
        modalVisible={pickupModalVisible}
        onRequestClose={() => {
          setPickupModalVisible(!pickupModalVisible);
        }}
        data={jobs}
        onExit={() => setPickupModalVisible(!pickupModalVisible)}
        onSubmit={setPickUpSites}
      />
    );
  };

  const renderCountItems = () =>
    dropofSites &&
    dropofSites.map((item) => (
      <View style={[labelStyle(dropofBtn), styles.choosedItem]} key={item.id}>
        <Text style={styles.choosedItemName}>
          {dropofSites.length > 1
            ? `${dropofSites.length} items`
            : item.dropOffSites}
        </Text>
        <TouchableOpacity
          style={styles.choosedItemcons}
          onPress={() => {
            setDropofBtn(!dropofBtn);
            dispatch(setDropOfSites(null));
          }}>
          <Icon name="close" color="#5f5b57" size={20} />
        </TouchableOpacity>
      </View>
    ));

  const renderDropOffModal = () => {
    return (
      <DropOffModal
        modalVisible={dropofModalVisible}
        onRequestClose={() => setDropofModalVisible(!dropofModalVisible)}
        data={jobs}
        onExit={() => setDropofModalVisible(!dropofModalVisible)}
        onSubmit={setDropOfSites}
      />
    );
  };

  React.useEffect(() => {
    if (pickupSites) {
      setPickupBtn(true);
    }
  }, [pickupSites]);

  const renderPickUpBtn = () =>
    pickupBtn ? (
      <TouchableOpacity
        onPress={() => {
          setPickupBtn(!pickupBtn);
          dispatch(setPickUpSites(null));
        }}>
        <Icon name="close" size={25} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setPickupModalVisible(!pickupModalVisible);
        }}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );

  const renderDropOffBtn = () =>
    dropofSites ? null : (
      <TouchableOpacity
        onPress={() => {
          setDropofModalVisible(!dropofModalVisible);
        }}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
        <Buttons
          backName="back"
          hideSubmitBtn={true}
          hasBackIcon={true}
          onBack={setPrevPage}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stepper />
      {renderPickUpModal()}
      {renderDropOffModal()}
      <View style={styles.inner}>
        <Image
          style={styles.image}
          source={require('./../../../../assets/map.jpg')}
        />
        <Text style={styles.header}>Job Sites</Text>
        <View style={styles.actionGroup}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle(pickupBtn)}>Pick-Up Site</Text>
            <TextInput style={styles.input} value={pickupSites?.projectName} />
            {renderPickUpBtn()}
          </View>
          <Icon name="origin" size={40} />
        </View>
        <View style={styles.actionGroup}>
          <View style={[styles.inputContainerCount]}>
            <Text style={labelStyle(dropofSites)}>Drop-Off Site</Text>
            {renderDropOffBtn()}
            {renderCountItems()}
          </View>
          <Icon name="origin" size={40} />
        </View>
      </View>
      <Buttons
        backName="back"
        nextName="next"
        disabled={isDisable()}
        onBack={setPrevPage}
        onSubmit={setNextPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    width: 290,
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
