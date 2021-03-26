import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Buttons from '../../Buttons';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getSearchData} from '../../../services/functions.service';
import {Navigation} from 'react-native-navigation';
import {Field, reduxForm} from 'redux-form';

const renderHauler = ({input: {onChange, value}, ...props}) => {
  const {item} = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.haulersName}>134</Text>
        <View style={styles.action}>
          <TouchableOpacity
            disabled={value.count === 0 || !value}
            style={styles.counter}
            onPress={() => onChange({...item, count: value.count - 1})}>
            <Text style={styles.counterLabel}>-</Text>
          </TouchableOpacity>
          <View style={styles.label}>
            <Text style={styles.labelText}>{value ? value.count : 0}</Text>
          </View>
          <TouchableOpacity
            disabled={value.count >= 10}
            style={styles.counter}
            onPress={() =>
              onChange({...item, count: value ? value.count + 1 : 1})
            }>
            <Text style={styles.counterLabel}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Item = (props) => {
  const {item} = props;
  return (
    <Field name={`hauler${item.id}`} props={{item}} component={renderHauler} />
  );
};

const HaulersModal = (props) => {
  const {handleSubmit, pristine, submitting, changeHaulers, getHaulers} = props;

  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const jobs = useSelector((state) => state.JobReducer.jobs);

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(jobs, text, 'projectName'));
      setSearch(text);
    } else {
      setSearchData(jobs);
      setSearch(text);
    }
  };

  const submit = (values) => {
    const haulers = getHaulers(values);
    changeHaulers(haulers);
    clear();
  };

  const clear = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  const renderItem = (props) => <Item {...props} />;

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={clear}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={clear}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text>Select Haulers</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for Haulers"
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          <FlatList
            data={searchData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
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
  footerContainer: {
    width: Dimensions.get('window').width,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
    borderTopWidth: 3,
    borderTopColor: '#a9aaad',
    paddingHorizontal: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {},
  item: {
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
  },
  haulersName: {
    maxWidth: 70,
  },
  label: {
    borderWidth: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  labelText: {
    fontSize: 25,
    fontWeight: '200',
  },
  counter: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e4ad71',
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  counterLabel: {
    color: '#e4ad71',
    fontSize: 35,
    fontWeight: '500',
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default reduxForm({
  form: 'HaulersModal',
  destroyOnUnmount: false,
})(HaulersModal);
