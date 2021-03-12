import React from 'react';
import RadioButton from '../RadioButton';
import {Navigation} from 'react-native-navigation';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Stepper from './../Stepper';
import {firstStep, secondStep} from './../../../../../store/constants';
import {setStep} from './../../../../../store/actions/stepper.action';
import {useSelector, useDispatch} from 'react-redux';

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.item}>
      <View style={styles.leftPart}>
        <RadioButton
          radioPressHandler={props.radioPressHandler}
          selectedId={props.radioSelected}
          currentId={item.id}
          borderColor="#88888824"
        />
        <View style={styles.textInfo}>
          <Text style={styles.jobNumber}>{`#${item.id}`}</Text>
          <Text style={styles.projectName}>{`${item.payloadName}`}</Text>
        </View>
      </View>
      <View style={styles.rightPart}>
        <Text style={styles.cost}>
          <Text style={styles.greenText}>{`$${item.unitPrice}`}</Text> / Ton
        </Text>
        <Text style={styles.count}>{`${item.totalQuantity}`}</Text>
      </View>
    </View>
  );
};

const Payload = (props) => {
  const [radioSelected, setRadioSelected] = React.useState(null);

  const payloads = useSelector((state) => state.ProjectReducer.payloads);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({componentId: compId}) => {
        if (props.componentId === compId) {
          dispatch(setStep(firstStep));
        }
      },
    );

    return () => componentAppearListener.remove();
  }, []);

  const setStepper = () => {
    dispatch(setStep(secondStep));
  };

  const setPage = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'JobDetails',
      },
    });
  };

  const renderItem = (data) => {
    return (
      <Item
        radioSelected={radioSelected}
        radioPressHandler={() => {
          setRadioSelected(data.item.id);
          setPage();
          setStepper();
        }}
        {...data}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stepper />
      <Text style={styles.header}>Select Payload</Text>
      <FlatList
        data={payloads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 35,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
  },
  rightPart: {
    alignItems: 'flex-end',
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenText: {
    color: '#1cb11b',
  },
  jobNumber: {
    marginBottom: 10,
    fontSize: 12,
  },
  projectName: {
    fontSize: 15,
  },
  count: {
    fontSize: 15,
  },
  cost: {
    marginBottom: 10,
    fontSize: 12,
  },
});

export default Payload;
