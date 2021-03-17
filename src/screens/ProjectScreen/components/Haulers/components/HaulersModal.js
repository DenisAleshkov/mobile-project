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
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setHaulers} from './../../../../../../store/actions/project.action';
import {getJobs} from './../../../../../../store/actions/job.action';
import {getSearchData} from '../../../services/functions.service';

const Item = (props) => {
  const [count, setCount] = React.useState('0')
  const {item} = props;
  const countItem = props.checked.filter((item) => {
    
    return item.id === props.currentId;
  })[0];
  console.log('countItem', countItem)
  const handeChange = () => {
    setCount(`${countItem}`)
  }
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.haulersName}>{item.dropOffSites}</Text>
        <View style={styles.action}>
          <TouchableOpacity style={styles.counter} onPress={props.handleDelete}>
            <Text style={styles.counterLabel}>-</Text>
          </TouchableOpacity>
          <View style={styles.label}>
            <TextInput editable={false} value={count} onChangeText={handeChange} style={styles.labelText} />
          </View>
          <TouchableOpacity style={styles.counter} onPress={props.handleAdd}>
            <Text style={styles.counterLabel}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HaulersModal = ({modalVisible, handleClose}) => {
  const [checked, setChecked] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);
  console.log('checked', checked);

  const error = useSelector((state) => state.JobReducer.error);
  const jobs = useSelector((state) => state.JobReducer.jobs);
  const page = useSelector((state) => state.JobReducer.page);
  const loading = useSelector((state) => state.LoadingReducer.loading);
  const refreshing = useSelector((state) => state.LoadingReducer.refreshing);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setSearchData(jobs);
  }, []);

  const handleAdd = (props) => {
    const {item} = props;
    const isCheck = checked.filter((check) => check.id === item.id).length;
    if (!isCheck) {
      setChecked([
        ...checked,
        {id: item.id, dropOffSites: item.dropOffSites, count: 1},
      ]);
    } else {
      const newTrucks = checked.filter((check) => check.id !== item.id);
      const newItem = checked.filter((check) => check.id === item.id);
      setChecked([
        ...newTrucks,
        {
          id: item.id,
          dropOffSites: item.dropOffSites,
          count: newItem[0].count + 1,
        },
      ]);
    }
  };

  const handleDelete = (props) => {
    const {item} = props;
    const isCheck = checked.filter((check) => check.id === item.id).length;
    if (!isCheck) {
      setChecked([
        ...checked,
        {id: item.id, dropOffSites: item.dropOffSites, count: 1},
      ]);
    } else {
      const newTrucks = checked.filter((check) => check.id !== item.id);
      const newItem = checked.filter((check) => check.id === item.id);
      setChecked([
        ...newTrucks,
        {
          id: item.id,
          dropOffSites: item.dropOffSites,
          count:
            newItem[0].count === 0 ? newItem[0].count : newItem[0].count - 1,
        },
      ]);
    }
  };

  const handleSearch = (text) => {
    if (text) {
      setSearchData(getSearchData(jobs, text, 'dropOffSites'));
      setSearch(text);
    } else {
      setSearchData(jobs);
      setSearch(text);
    }
  };

  const onSubmit = () => {};

  const onClear = () => {
    setChecked([]);
    handleClose();
  };

  const isDisable = () => {
    return false;
  };

  const renderItem = (props) => {
    return (
      <Item
        {...props}
        checked={checked}
        currentId={props.item.id}
        handleAdd={() => handleAdd(props)}
        handleDelete={() => handleDelete(props)}
      />
    );
  };

  const handleRefresh = () => {
    dispatch(getJobs(1));
  };

  const handleLoad = () => {
    dispatch(getJobs(page));
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating color="#848d95" size="large" />
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text>Select Haulers</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for Haulers"
              value={searchData}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          {error ? (
            <View style={styles.errorContainer}>
              <Text>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={searchData}
              renderItem={renderItem}
              refreshing={refreshing}
              onEndReached={handleLoad}
              onRefresh={handleRefresh}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.5}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          )}
          <Buttons
            backName="clear"
            nextName="done"
            onBack={onClear}
            onSubmit={onSubmit}
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
  list: {
    marginTop: 10,
    borderTopWidth: 3,
    borderTopColor: '#a9aaad',
    paddingHorizontal: 10,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 30,
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

export default HaulersModal;
