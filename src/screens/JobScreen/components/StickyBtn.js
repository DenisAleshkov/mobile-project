import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';
const StickyBtn = () => {
  return (
    <TouchableOpacity style={styles.stickyBtn}>
      <Icon name="plus" size={35} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stickyBtn: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#c37b30',
    right: 20,
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
});

export default StickyBtn;
