import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>
        <Icon style={styles.headerIcon} name="check" size={20} color="#fff" />
        <Text style={styles.headerLabel}>{title}</Text>
      </View>
      <View style={styles.headerSide}>
        <TouchableOpacity>
          <Icon
            style={styles.headerIcon}
            name="account-search"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={styles.headerIcon}
            name="magnify"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={styles.headerIcon}
            name="chevron-down"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    height: 40,
    color: '#fff',
    backgroundColor: '#312f2f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    paddingHorizontal: 8,
  },
});

export default Header;
