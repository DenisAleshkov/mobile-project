import React from 'react';
import RadioButton from '../../RadioButton';
import Buttons from '../../Buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {getSearchData} from '../../../services/functions.service';
import {useDispatch, useSelector} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {Field, reduxForm} from 'redux-form';
import {setPickUpSites} from '../../../../../../store/actions/project.action';

const renderRadio = ({input: {checked, value, onChange}}) => {
  return (
    <RadioButton
      radioPressHandler={() => onChange(value)}
      borderColor="#88888824"
      value={value}
      isSelected={checked}
    />
  );
};

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.modalItem}>
      <Field
        name="pickUpSites"
        component={renderRadio}
        type="radio"
        value={item}
      />
      <Text>{item.projectName}</Text>
    </View>
  );
};

const JobSitesModal = (props) => {
  const {handleSubmit, pristine, submitting, changePickUpSites} = props;

  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const jobs = useSelector((state) => state.JobReducer.jobs);

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const dispatch = useDispatch();

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(jobs, text, 'projectName'));
      setSearch(text);
    } else {
      setSearchData(jobs);
      setSearch(text);
    }
  };

  const cancel = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  const renderItem = (props) => {
    return <Item {...props} />;
  };

  const submit = (values) => {
    const {pickUpSites} = values;
    dispatch(setPickUpSites(pickUpSites));
    changePickUpSites(pickUpSites);
    cancel();
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={cancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={cancel}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text style={styles.header}>Select Pick-Up Site</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Select Pick-Up Site"
              autoCapitalize='none'
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          {jobs && jobs.length === 0 ? (
            <View style={styles.errorContainer}>
              <Text>data not found</Text>
            </View>
          ) : (
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.modalList}
            />
          )}
          <Buttons
            backName="cancel"
            nextName="continue"
            onBack={cancel}
            disabled={pristine || submitting}
            onSubmit={handleSubmit(submit)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    height: 450,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  modalList: {
    marginVertical: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 15,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#88888824',
  },
  errorContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default reduxForm({
  form: 'JobSitesModal',
})(JobSitesModal);
