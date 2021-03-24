import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, TouchableOpacity} from 'react-native';

const CheckBox = ({checked, handleChecked, currentId, isCheckedAll}) => {
  const isChecked =
    checked && checked.filter((item) => item.id === currentId).length;
  return (
    <View style={checkBoxStyle(isChecked || isCheckedAll)}>
      <TouchableOpacity
        style={checkBoxInnerStyle(isChecked || isCheckedAll)}
        onPress={handleChecked}>
        <Icon name="check-bold" size={15} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const checkBoxStyle = (checked) => ({
  borderWidth: checked ? 0 : 2,
  borderColor: '#4c4e4b82',
  borderRadius: 3,
  width: 25,
  height: 25,
});
const checkBoxInnerStyle = (checked) => ({
  backgroundColor: checked ? '#1cb11b' : '#fff',
  width: checked ? 25 : 21,
  height: checked ? 25 : 21,
  justifyContent: 'center',
  alignItems: 'center',
});

export default CheckBox;
