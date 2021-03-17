import React from 'react';
import Buttons from './../../Buttons';
import CheckBox from './../../CheckBox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Navigation} from 'react-native-navigation';
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

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.modalItem}>
      <CheckBox
        checked={props.checked}
        currentId={props.item.id}
        handleChecked={props.handleChecked}
      />
      <Text style={styles.modalItemLabel}>{item.dropOffSites}</Text>
    </View>
  );
};

const JobSitesModal = ({
  modalVisible,
  onRequestClose,
  data,
  onSubmit,
  onExit,
}) => {
  const [checked, setChecked] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  const error = useSelector((state) => state.JobReducer.error);

  const dispatch = useDispatch();

  const handleChecked = (item) => {
    const isCheck = checked.filter((check) => check.id === item.id).length;
    if (!isCheck) {
      setChecked([...checked, {id: item.id, dropOffSites: item.dropOffSites}]);
    } else {
      const newTrucks = checked.filter((check) => check.id !== item.id);
      setChecked(newTrucks);
    }
  };

  const handleSearch = (text) => {
    console.log('text', text)
    if (text) {
      setSearchData(getSearchData(data, text, 'dropOffSites'));
      setSearch(text);
    } else {
      setSearchData(data);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    setSearchData(data);
  }, []);

 

  const renderItem = (props) => {
    return (
      <Item
        {...props}
        checked={checked}
        currentId={props.item.id}
        handleChecked={() => handleChecked(props.item)}
      />
    );
  };

  const onSubmitHandler = () => {
    dispatch(onSubmit(checked));
    onExit();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={onExit}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Select Pick-Up Site"
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          {error ? (
            <Text style={styles.errorContainer}>{error}</Text>
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
            onBack={() => {
              setChecked([]);
              onExit();
            }}
            onSubmit={onSubmitHandler}
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
    paddingVertical: 30,
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default JobSitesModal;
