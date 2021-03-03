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
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getJobs} from './store/actions/job.action';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

const Item = (props) => {
  const {item} = props;

  const isOpen = () => {
    return (
      <Text styles={styles.table}>
        {item.grantedAccess ? 'open' : 'closed'}
      </Text>
    );
  };

  const getFormatDate = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const time = date.getHours();
    return `${month + 1}/${day}/${year.toString().replace(20, '')}  ${time}`;
  };

  return (
    <View style={styles.item}>
      <View style={styles.rightPart}>
        <Text style={styles.jobNumber}>Job #{item.id}</Text>
        <Text
          style={
            (styles.projectName, {maxWidth: 200})
          }>{`${item.projectExternalJobNumber}-${item.projectName}`}</Text>
        <Text style={styles.bigText}>0 / 0</Text>
        <Text style={styles.payloadName}>{item.payloadName}</Text>
      </View>
      <View style={styles.leftPart}>
        <Text style={styles.startDate}>{getFormatDate(item.startDate)}</Text>
        <View style={styles.grantedAccess}>{isOpen()}</View>
        <Text style={styles.unitPrice}>
          <Text style={styles.greenText}>${item.unitPrice}</Text>/TON
        </Text>
        <TouchableOpacity style={styles.TicketButton}>
          <Text style={styles.closedTicketsCount}>
            {item.closedTicketsCount}
          </Text>
          <Icon name="checksquare" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.JobReducer.jobs);
  const loading = useSelector((state) => state.LoadingReducer.isLoading);
  const page = useSelector((state) => state.JobReducer.page);

  React.useEffect(() => {
    dispatch(getJobs(page));
  }, []);

  const handleLoad = () => {
    dispatch(getJobs(page + 1));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getJobs(1));
    setRefreshing(false);
  };

  const renderItem = (props) => <Item {...props} />;

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating color="#848d95" size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.headerIcon} name="check" size={20} color="#fff" />
          <Text
            style={{
              color: '#fff',
              marginLeft: 10,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Comlpeted Jobs
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon
              style={styles.headerIcon}
              name="user"
              size={23}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              style={styles.headerIcon}
              name="search1"
              size={23}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              style={styles.headerIcon}
              name="down"
              size={23}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={jobs}
        style={{
          backgroundColor: '#dbd6dc',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        refreshing={refreshing}
        renderItem={renderItem}
        keyExtractor={(item) => '' + item.id}
        onEndReached={handleLoad}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
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
  headerIcon: {
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#312f2f',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8c8080',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  TicketButton: {
    flexDirection: 'row',
  },
  startDate: {
    marginBottom: 8,
  },
  table: {
    color: '#fff',
  },
  grantedAccess: {
    backgroundColor: '#b1681b',
    width: 90,
    color: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  unitPrice: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  greenText: {
    color: '#1cb11b',
    fontWeight: 'bold',
  },
  rightPart: {},
  leftPart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 32,
  },
});

App.options = {};

export default App;
