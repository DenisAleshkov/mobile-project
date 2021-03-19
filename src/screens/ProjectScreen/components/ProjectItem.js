import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFormatDate} from './../services/functions.service';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const ProjectItem = ({id, inputs, payload, switches}) => {
  const isOpen = () => (switches.notify ? 'open' : 'close');
  return (
    <View style={styles.item}>
      <View style={styles.rightPart}>
        <Text style={styles.jobNumber}>Proejct #{id}</Text>
        <Text style={styles.projectName}>{inputs.name}</Text>
        <Text style={styles.bigText}>{payload.totalQuantity}</Text>
        <Text style={styles.payloadName}>{inputs.street}</Text>
      </View>
      <View style={styles.leftPart}>
        <Text style={styles.startDate}>{getFormatDate(inputs.date)}</Text>
        <Text
          style={[
            styles.status,
            {backgroundColor: switches.notify ? '#1cb11b' : '#b1681b'},
          ]}>
          {isOpen()}
        </Text>
        <Text style={styles.unitPrice}>
          <Text style={styles.greenText}>{payload.unitPrice}</Text> / TON
        </Text>
        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.closedTicketsCount}>{payload.unitPrice}</Text>
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

export default ProjectItem;
