import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const RadioButton = ({
  radioPressHandler,
  borderColor,
  isSelected
}) => {
  return (
    <View style={radioButtonStyle(isSelected, borderColor)}>
      <TouchableOpacity
        style={radioButtonInnerStyle(isSelected)}
        onPress={radioPressHandler}
      />
    </View>
  );
};

const radioButtonInnerStyle = (isSelected) => ({
  height: 20,
  width: 20,
  borderWidth: 2,
  borderColor: '#fff',
  borderRadius: 60,
  backgroundColor: isSelected ? '#32a00f' : '#fff',
});

const radioButtonStyle = (isSelected, borderColor) => ({
  height: 25,
  width: 25,
  backgroundColor: borderColor,
  borderWidth: 5,
  borderColor: isSelected ? '#32a00f' : borderColor,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
});

export default RadioButton;
