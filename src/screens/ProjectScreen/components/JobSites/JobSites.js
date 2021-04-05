import React from 'react';
import Buttons from '../Buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {change, getFormValues, formValueSelector, reset} from 'redux-form';
import {
  setNextStep,
  setPrevStep,
} from '../../../../../store/actions/stepper.action';

const JobSites = (props) => {
  const {error, pickUpSites, dropOffSites, form} = props;

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

  const dispatch = useDispatch();

  const step = useSelector((state) => state.StepperReducer.step);

  const setNextPage = () => {
    dispatch(setNextStep(step));
  };

  const setPrevPage = () => {
    dispatch(setPrevStep(step));
  };

  const changePickUpSites = (value) => {
    dispatch(change(form, 'pickUpSites', value));
  };

  const changeDropOffSites = (value) => {
    dispatch(change(form, 'dropOffSites', value));
  };

  const showModal = (name) => {
    Navigation.showOverlay({
      component: {
        name: name,
        passProps: {
          changePickUpSites,
          changeDropOffSites,
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

  const renderError = () =>
    error && (
      <View>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );

  const renderCountItems = () => {
    const siteItems =
      dropOffSites && Object.values(dropOffSites).filter((item) => item);
    return siteItems ? (
      <View style={[labelStyle(dropofBtn), styles.choosedItem]}>
        <Text style={styles.choosedItemName}>
          {siteItems.length > 1
            ? `${siteItems.length} items`
            : siteItems[0].dropOffSites}
        </Text>
        <TouchableOpacity
          style={styles.choosedItemcons}
          onPress={() => {
            setDropofBtn(!dropofBtn);
            changeDropOffSites(null);
            dispatch(reset('DropOffModal'));
          }}>
          <Icon name="close" color="#5f5b57" size={20} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  React.useEffect(() => {
    if (pickUpSites) {
      setPickupBtn(true);
    }
  }, [pickUpSites]);

  const renderPickUpBtn = () =>
    pickupBtn ? (
      <TouchableOpacity
        onPress={() => {
          setPickupBtn(!pickupBtn);
          changePickUpSites(null);
          dispatch(reset('PickUpModal'));
        }}>
        <Icon name="close" size={25} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          showModal('PickUpModal');
        }}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );

  const renderDropOffBtn = () =>
    dropOffSites ? null : (
      <TouchableOpacity onPress={() => showModal('DropOffModal')}>
        <Icon name="chevron-down" size={25} />
      </TouchableOpacity>
    );
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image
          style={styles.image}
          source={require('./../../../../assets/map.jpg')}
        />
        <Text style={styles.header}>Job Sites</Text>
        <View style={styles.actionGroup}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle(pickupBtn)}>Pick-Up Site</Text>
            <Text>{pickUpSites?.projectName}</Text>
            {renderPickUpBtn()}
          </View>
          <Icon name="origin" size={40} />
        </View>
        <View style={styles.actionGroup}>
          <View style={[styles.inputContainerCount]}>
            <Text style={labelStyle(dropOffSites)}>Drop-Off Site</Text>
            {renderDropOffBtn()}
            {renderCountItems()}
          </View>
          <Icon name="origin" size={40} />
        </View>
        {renderError()}
      </View>
      <Buttons
        backName="back"
        nextName="next"
        hasBackIcon={true}
        disabled={!pickUpSites || !dropOffSites}
        onSubmit={setNextPage}
        onBack={setPrevPage}
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

const selectorPickUp = formValueSelector('PickUpModal');
const selectorDropOff = getFormValues('DropOffModal');

export default connect((state) => ({
  pickUpSites: selectorPickUp(state, 'pickUpSites'),
  dropOffSites: selectorDropOff(state),
}))(JobSites);
