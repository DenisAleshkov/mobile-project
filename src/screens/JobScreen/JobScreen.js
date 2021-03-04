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
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.JobReducer.jobs);
  const error = useSelector((state) => state.JobReducer.error);
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Something wrong</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={jobs}
        style={{
          backgroundColor: '#dbd6dc',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        refreshing={refreshing}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={handleLoad}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
      <StickyBtn />
    </SafeAreaView>
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
    backgroundColor: '#312f2f',
  },
});

JobScreen.options = {
  bottomTab: {
    text: 'My Jobs'
  }
};

export default JobScreen;
