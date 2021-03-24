import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Buttons from '../../Buttons';
import CheckBox from '../../CheckBox';
import {
  StyleSheet,
  Modal,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTrucks} from './../../../../../../store/actions/project.action';
import {getSearchData} from '../../../services/functions.service';
import {Navigation} from 'react-native-navigation';
import {Field, reduxForm} from 'redux-form';

const renderCheckBox = ({input: {value, onChange}, ...props}) => {
  return (
    <CheckBox
      handleChecked={() => onChange(props.checkBoxHandler(value))}
      currentId={props.item.id}
      checked={value}
    />
  );
};

const renderMainCheckBox = ({input: {value, onChange}, ...props}) => {
  return <CheckBox />;
};

const Item = (props) => {
  const {item} = props;

  const checkBoxHandler = (value) => {
    const isChecked =
      value && value.filter((item) => item.id === props.item.id).length;
    if (!isChecked) {
      return [
        ...value,
        {id: props.item.id, companyName: props.item.companyName},
      ];
    }
    return value.filter((item) => item.id !== props.item.id);
  };

  return (
    <View style={styles.item}>
      <Field
        name="trucks"
        component={renderCheckBox}
        type="checkbox"
        props={{
          item,
          checkBoxHandler,
        }}
      />
      <View style={styles.textInfo}>
        <Text style={{fontSize: 20}}>{item.companyName}</Text>
        <Text style={{fontSize: 10}}>{item.projectName}</Text>
      </View>
    </View>
  );
};

const MyTrucksModal = (props) => {
  const {handleSubmit, pristine, submitting, changeTrucks} = props;
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const jobs = useSelector((state) => state.JobReducer.jobs);

  const dispatch = useDispatch();

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(data, text, 'companyName'));
      setSearch(text);
    } else {
      setSearchData(data);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const renderItem = (props) => {
    return <Item {...props} jobs={jobs} />;
  };

  const clear = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  const submit = (values) => {
    const {trucks} = values;
    dispatch(setTrucks(trucks));
    changeTrucks(trucks);
    clear();
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={clear}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={clear}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text>Trucks from Fleet</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Select Trucks from fleet"
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          <View style={styles.changeAllItems}>
            <Field name="chooseAll" component={renderMainCheckBox} />
            <View style={styles.textInfo}>
              <Text style={{fontSize: 20}}>Use All My Trucks</Text>
            </View>
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
            />
          )}
          <Buttons
            backName="clear"
            nextName="done"
            onBack={clear}
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
    height: 480,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  changeAllItems: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  textInfo: {
    marginLeft: 15,
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default reduxForm({
  form: 'MyTrucksModal',
})(MyTrucksModal);
