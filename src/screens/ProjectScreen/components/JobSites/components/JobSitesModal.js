import React from 'react';
import RadioButton from './../../RadioButton';
import Buttons from './../../Buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.modalItem}>
      <RadioButton
        radioPressHandler={props.radioPressHandler}
        selectedId={props.radioSelected}
        currentId={item.id}
        borderColor="#88888824"
      />
      <Text>{item[`${props.field}`]}</Text>
    </View>
  );
};

const JobSitesModal = ({
  modalVisible,
  onRequestClose,
  data,
  onSubmit,
  onExit,
  field,
}) => {
  const [radioSelected, setRadioSelected] = React.useState(null);

  const error = useSelector(state => state.JobReducer.error)

  React.useEffect(() => {
    data[0] && setRadioSelected({[field]: data[0][`${field}`], id: data[0].id});
  }, [data]);

  const dispatch = useDispatch();

  const renderItem = (props) => {
    return (
      <Item
        radioPressHandler={() => {
          setRadioSelected({
            [field]: props.item[field],
            id: props.item.id,
          });
        }}
        radioSelected={radioSelected.id}
        field={field}
        {...props}
      />
    );
  };

  const onSubmitHandler = () => {
    dispatch(onSubmit(radioSelected));
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
            <TextInput placeholder="Select Pick-Up Site" />
            <Icon name="magnify" size={25} color="#000" />
          </View>
         {
           error ? <Text style={styles.errorContainer}>{error}</Text> :
           <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.modalList}
          />
         } 
          <Buttons
            backName="cancel"
            nextName="continue"
            onBack={onExit}
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
    marginVertical: Platform.OS === 'ios' ? 250 : 160,
  },
  modalView: {
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
    paddingVertical: 30,
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default JobSitesModal;
