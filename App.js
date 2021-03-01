/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getJobs} from './store/actions/job.action';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';

const Item = (props) => {
  const {item} = props;

  const isOpen = () => {
    return item.grantedAccess ? 'open' : 'closed';
  };

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.jobNumber}>Job #{item.id}</Text>
        <Text
          style={
            styles.projectName
          }>{`${item.projectExternalJobNumber}-${item.projectName}`}</Text>
        <Text style={styles.payloadName}>{item.payloadName}</Text>
      </View>
      <View>
        <Text style={styles.startDate}>{item.startDate}</Text>
        <Text style={styles.startDate}>{isOpen()}</Text>
        <Text style={styles.unitPrice}>{item.unitPrice}/TON</Text>
        <TouchableOpacity style={styles.TicketButton}>
          <Text style={styles.closedTicketsCount}>
            {item.closedTicketsCount}
          </Text>
          <Icon name="checksquare" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.JobReducer.jobs);

  React.useEffect(() => {
    dispatch(getJobs());
  }, []);

  const renderItem = (props) => <Item {...props} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  TicketButton: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
});

export default App;
