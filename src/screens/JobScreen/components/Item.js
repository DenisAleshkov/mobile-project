import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getFormatDate} from '../services/functions.services';

const Item = (props) => {
  const {item} = props;

  const isOpen = () => (item.grantedAccess ? 'open' : 'closed');

  return (
    <View style={styles.item}>
      <View style={styles.rightPart}>
        <Text style={styles.jobNumber}>Job #{item.id}</Text>
        <Text
          style={
            styles.projectName
          }>{`${item.projectExternalJobNumber}-${item.projectName}`}</Text>
        <Text style={styles.bigText}>0 / 0</Text>
        <Text style={styles.payloadName}>{item.payloadName}</Text>
      </View>
      <View style={styles.leftPart}>
        <Text style={styles.startDate}>{getFormatDate(item.startDate)}</Text>
        <Text style={styles.status}>{isOpen()}</Text>
        <Text style={styles.unitPrice}>
          <Text style={styles.greenText}>${item.unitPrice}</Text> / TON
        </Text>
        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.closedTicketsCount}>
            {item.closedTicketsCount || 0}
          </Text>
          <Icon name="clipboard-check" size={25} color="#2d2b2b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderColor: '#8c8080',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  ticketButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startDate: {
    marginBottom: 8,
  },
  Text: {
    color: '#fff',
  },
  status: {
    textAlign: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    color: '#fff',
    backgroundColor: '#b1681b',
    color: '#fff',
    borderRadius: 9,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  closedTicketsCount: {
    marginRight: 6,
  },
  projectName: {
    maxWidth: 200,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  unitPrice: {
    fontSize: 15,
  },
  greenText: {
    color: '#1cb11b',
    fontWeight: 'bold',
  },
  rightPart: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  leftPart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});

export default Item;
