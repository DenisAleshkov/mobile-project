import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getJobs} from '../../../store/actions/job.action';
import StickyBtn from './components/StickyBtn';
import Header from './components/Header';
import Item from './components/Item';

const JobScreen = (props) => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.JobReducer.jobs);
  const error = useSelector((state) => state.JobReducer.error);
  const loading = useSelector((state) => state.LoadingReducer.isLoading);
  const refreshing = useSelector((state) => state.LoadingReducer.refreshing);
  const page = useSelector((state) => state.JobReducer.page);

  React.useEffect(() => {
    dispatch(getJobs(page));
  }, []);

  const handleLoad = () => {
    dispatch(getJobs(page));
  };

  const handleRefresh = () => {
    dispatch(getJobs(1));
  };

  const renderItem = (props) => <Item {...props} />;

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating color="#848d95" size="large" />
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Comlpeted Jobs" />
      <FlatList
        data={jobs}
        style={styles.list}
        refreshing={refreshing}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          handleLoad();
        }}
        extraData={false}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
      />
      <StickyBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#312f2f',
  },
  list: {
    flex: 1,
    backgroundColor: '#dbd6dc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footer: {
    width: Dimensions.get('window').width,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});

JobScreen.options = {
  bottomTab: {
    text: 'My Jobs',
  },
};

export default JobScreen;
