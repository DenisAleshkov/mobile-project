import React from 'react';
import Buttons from './../../Buttons';
import CheckBox from './../../CheckBox';
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
import {useDispatch, useSelector} from 'react-redux';
import {getSearchData} from '../../../services/functions.service';
import {Navigation} from 'react-native-navigation';
import {Field, reduxForm} from 'redux-form';
import {setDropOfSites} from '../../../../../../store/actions/project.action';

const renderCheckBox = ({input: {value, checked, onChange}, ...props}) => {
  return (
    <CheckBox
      handleChecked={() => onChange(checked ? null : props.item)}
      checked={checked}
    />
  );
};

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.modalItem}>
      <Field
        name={`dropOfSite${item.id}`}
        component={renderCheckBox}
        type="checkbox"
        props={{item}}
      />
      <Text style={styles.modalItemLabel}>{item.dropOffSites}</Text>
    </View>
  );
};

const JobSitesModal = (props) => {
  const {handleSubmit, pristine, submitting} = props;

  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const jobs = useSelector((state) => state.JobReducer.jobs);

  const dispatch = useDispatch();

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(jobs, text, 'dropOffSites'));
      setSearch(text);
    } else {
      setSearchData(jobs);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const cancel = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  const renderItem = (props) => {
    return <Item {...props} />;
  };

  const submit = (values) => {
    const dropOffSites = Object.values(values).filter((item) => item);
    dispatch(setDropOfSites(dropOffSites));
    cancel();
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={cancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={cancel}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text style={styles.header}>Select Drop-Off Site</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Select Drop-Off Site"
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
    borderTopColor: '#88888824',
    borderTopWidth: 2,
    borderBottomColor: '#88888824',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  modalItemLabel: {
    marginLeft: 15,
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
