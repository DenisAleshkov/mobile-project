import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Buttons from '../../Buttons';
import CheckBox from '../../CheckBox';
import {StyleSheet, Modal, TextInput, Text, View, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {setTrucks} from './../../../../../../store/actions/project.action';
import {getSearchData} from '../../../services/functions.service';

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.item}>
      <CheckBox
        checked={props.checked}
        currentId={props.currentId}
        handleChecked={props.handleChecked}
      />
      <View style={styles.textInfo}>
        <Text style={{fontSize: 20}}>{item.companyName}</Text>
        <Text style={{fontSize: 10}}>{item.projectName}</Text>
      </View>
    </View>
  );
};

const MyTrucksModal = ({modalVisible, handleClose, data}) => {
  const [checked, setChecked] = React.useState([]);
  const [checkedAll, setCheckedAll] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);
  const dispatch = useDispatch();

  const handleChecked = (item) => {
    const isCheck = checked.filter((check) => check.id === item.id).length;
    if (!isCheck) {
      setChecked([...checked, {id: item.id, companyName: item.companyName}]);
    } else {
      const newTrucks = checked.filter((check) => check.id !== item.id);
      setChecked(newTrucks);
    }
  };

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
    setSearchData(data);
  }, []);

  const onSubmit = () => {
    dispatch(setTrucks(checked));
    handleClose();
  };

  const onClear = () => {
    dispatch(setTrucks(null));
    setChecked([]);
    setCheckedAll(false);
    handleClose();
  };

  const chooseAll = () => {
    if (!checkedAll) {
      setChecked(data);
    } else {
      setChecked([]);
    }
    setCheckedAll(!checkedAll);
  };

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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Trucks from Fleet</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Select Pick-Up Site"
              value={search}
              onChangeText={(text) => handleSearch(text)}
            />
            <Icon name="magnify" size={25} color="#000" />
          </View>
          <View style={styles.changeAllItems}>
            <CheckBox handleChecked={chooseAll} isCheckedAll={checkedAll} />
            <View style={styles.textInfo}>
              <Text style={{fontSize: 20}}>Use All My Trucks</Text>
            </View>
          </View>
          <FlatList
            data={searchData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
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
    height: 450,
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
});

export default MyTrucksModal;
