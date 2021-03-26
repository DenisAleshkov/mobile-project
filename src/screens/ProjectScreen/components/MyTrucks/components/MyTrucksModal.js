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
import {useSelector} from 'react-redux';
import {getSearchData} from '../../../services/functions.service';
import {Navigation} from 'react-native-navigation';
import {Field, reduxForm} from 'redux-form';

const renderCheckBox = ({input: {checked, onChange}, ...props}) => {
  return (
    <CheckBox
      handleChecked={() => onChange(checked ? null : props.item)}
      checked={checked}
    />
  );
};

const renderMainCheckBox = ({jobs, change}) => {
  const [checked, setChecked] = React.useState(false);

  const changeAll = () => {
    jobs.forEach((item) => {
      !checked
        ? change(`truck${item.id}`, item)
        : change(`truck${item.id}`, null);
    });
  };

  return (
    <CheckBox
      handleChecked={() => {
        setChecked(!checked);
        changeAll();
      }}
      checked={checked}
    />
  );
};

const Item = (props) => {
  const {item, change} = props;
  return (
    <View style={styles.item}>
      <Field
        name={`truck${item.id}`}
        component={renderCheckBox}
        type="checkbox"
        props={{
          item,
          change,
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
  const {
    handleSubmit,
    pristine,
    change,
    initialize,
    submitting,
    changeTrucks,
  } = props;
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const jobs = useSelector((state) => state.JobReducer.jobs);

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(jobs, text, 'companyName'));
      setSearch(text);
    } else {
      setSearchData(jobs);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const renderItem = (props) => {
    return <Item {...props} change={change} jobs={jobs} />;
  };

  const clear = () => {
    initialize(null);
    Navigation.dismissOverlay(props.componentId);
  };

  const submit = (values) => {
    const trucks = Object.values(values).filter((item) => item);
    changeTrucks(trucks);
    Navigation.dismissOverlay(props.componentId);
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
              autoCapitalize="none"
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          <View style={styles.changeAllItems}>
            <Field
              name="chooseAll"
              type="checkbox"
              props={{jobs, change}}
              component={renderMainCheckBox}
            />
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
  destroyOnUnmount: false,
})(MyTrucksModal);
