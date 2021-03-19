import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons/';

const Buttons = (props) => {
  return props.hide ? null : (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={props.onBack}>
        {props.hasBackIcon && (
          <Icon name="arrow-left" size={30} color="#de8a1d" />
        )}
        <Text style={styles.backButtonLabel}>{props.backName}</Text>
      </TouchableOpacity>
      {!props.hideSubmitBtn && (
        <TouchableOpacity
          style={[
            styles.nextButton,
            {backgroundColor: props.disabled ? '#927f67cf' : '#f1b156'},
          ]}
          onPress={props.onSubmit}
          disabled={props.disabled}>
          <Text style={styles.nextButtonLabel}>{props.nextName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  backButton: {
    width: 150,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#de8a1d',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  nextButton: {
    width: 150,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  backButtonLabel: {
    color: '#de8a1d',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nextButtonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default Buttons;
