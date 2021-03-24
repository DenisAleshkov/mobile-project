import React from 'react';
import RadioButton from '../RadioButton';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {setNextStep} from './../../../../../store/actions/stepper.action';
import {useSelector, useDispatch} from 'react-redux';
import {Field} from 'redux-form';

const renderRadio = ({input: {checked, value, onChange}, ...props}) => {
  return (
    <RadioButton
      radioPressHandler={() => {
        onChange(value);
        props.setNextPage();
      }}
      borderColor="#88888824"
      value={value}
      isSelected={checked}
    />
  );
};

const Item = (props) => {
  const {item} = props;
  return (
    <View style={styles.item}>
      <View style={styles.leftPart}>
        <Field
          name="payload"
          component={renderRadio}
          type="radio"
          value={item}
          props={{
            setNextPage: props.setNextPage,
          }}
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
  const payloads = useSelector((state) => state.ProjectReducer.payloads);
  const step = useSelector((state) => state.StepperReducer.step);

  const dispatch = useDispatch();

  const renderItem = (props) => {
    return <Item setNextPage={() => dispatch(setNextStep(step))} {...props} />;
  };

  return (
    <SafeAreaView style={styles.container}>
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
