import React from 'react';
import Buttons from './../Buttons';
import {StyleSheet, TextInput, Switch, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {
  setPrevStep,
  setNextStep,
} from './../../../../../store/actions/stepper.action';
import {Field} from 'redux-form';

const renderInput = ({input: {onChange, value}, ...props}) => {
  return (
    <TextInput
      style={[styles.input, styles.bigInput]}
      onChangeText={onChange}
      value={value}
      {...props}
    />
  );
};

const renderInputWithCheckbox = ({input: {onChange, value}, ...props}) => {
  return (
    <>
      <TextInput
        style={[
          styles.input,
          styles.inputWithCheckbox,
          {
            backgroundColor: props.limit ? '#93959657' : '#fff',
            borderColor: props.error ? 'red' : '#000',
          },
        ]}
        keyboardType = 'numeric'
        onChangeText={onChange}
        value={value}
        {...props}
      />
      {props.error && <Text style={{color: 'red'}}>{props.error}</Text>}
    </>
  );
};

const renderDateInput = ({input: {onChange, value}, ...props}) => {
  return (
    <DatePicker
      mode="datetime"
      date={value}
      style={{height: 135}}
      onDateChange={onChange}
      {...props}
    />
  );
};

const renderSwitch = ({input: {onChange, value}, ...props}) => {
  return (
    <Switch
      trackColor={{false: '#767577a6', true: '#de8a1d99'}}
      thumbColor={value ? '#de8a1d' : '#f4f3f4'}
      ios_backgroundColor="#d0c9c114"
      onValueChange={(value) => onChange(value)}
      value={value}
      {...props}
    />
  );
};

const JobDetails = (props) => {
  const {error} = props;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.actionContainer}>
          <Text style={styles.header}>Job Details</Text>
          <View style={styles.action}>
            <View style={styles.actionGroup}>
              <Field name="extRef" component={renderInput} />
            </View>
            <View style={styles.actionGroup}>
              <View>
                <Field
                  name="quantity"
                  component={renderInputWithCheckbox}
                  props={{
                    error: error,
                  }}
                />
              </View>
              <View style={styles.switchColumn}>
                <Text style={styles.label}>Unlimited</Text>
                <Field component={renderSwitch} name="limit" />
              </View>
            </View>
            <View style={styles.actionGroup}>
              <View style={styles.switchRow}>
                <Text style={[styles.label, styles.rowLabel]}>Notify</Text>
                <Field component={renderSwitch} name="notify" />
              </View>
              <View style={styles.switchRow}>
                <Text style={[styles.label, styles.rowLabel]}>Overnight</Text>
                <Field component={renderSwitch} name="overnight" />
              </View>
            </View>
            <View style={[styles.actionGroup]}>
              <Field name="date" component={renderDateInput} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  actionContainer: {
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  action: {
    alignItems: 'flex-end',
  },
  actionGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 60,
    fontSize: 20,
    paddingHorizontal: 15,
  },
  inputWithCheckbox: {
    marginRight: 15,
  },
  bigInput: {
    width: 330,
  },
  label: {
    fontSize: 15,
  },
  rowLabel: {
    marginRight: 15,
  },
  switchColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
});

export default JobDetails;
