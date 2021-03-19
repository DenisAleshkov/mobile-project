import React from 'react';
import Stepper from './../Stepper';
import Buttons from './../Buttons';
import {StyleSheet, TextInput, Switch, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {
  setPrevStep,
  setNextStep,
} from './../../../../../store/actions/stepper.action';
import {
  setJobDetails,
} from './../../../../../store/actions/project.action';

const JobDetails = (props) => {
  const [inputs, setInputs] = React.useState({
    street: 'Ext. Ref. (Optional)',
    name: 'Job Quantity',
    date: new Date(),
  });
  const [switches, setSwitches] = React.useState({
    overnight: false,
    limit: false,
    notify: true,
  });

  const dispatch = useDispatch();

  const step = useSelector((state) => state.StepperReducer.step);
  const activeError = useSelector((state) => state.ProjectReducer.activeError);

  const handleChange = (value, name) => {
    setInputs({...inputs, [name]: value});
  };

  const toggleSwitch = (value, name) => {
    setSwitches({...switches, [name]: value});
  };

  const submitHandler = () => {
    dispatch(
      setJobDetails({
        inputs,
        switches,
      }),
    );
    dispatch(setNextStep(step));
  };

  const setPrevPage = () => {
    dispatch(setPrevStep(step));
  };

  const renderError = () =>
    activeError &&
    activeError.quantity && (
      <Text style={{color: 'red'}}>{activeError.quantity}</Text>
    );

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.actionContainer}>
          <Text style={styles.header}>Job Details</Text>
          <View style={styles.action}>
            <View style={styles.actionGroup}>
              <TextInput
                style={[styles.input, styles.bigInput]}
                onChangeText={(value) => handleChange(value, 'street')}
                value={inputs.street}
              />
            </View>
            <View style={styles.actionGroup}>
              <View>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputWithCheckbox,
                    {backgroundColor: switches.limit ? '#93959657' : '#fff'},
                  ]}
                  onChangeText={(value) => handleChange(value, 'name')}
                  value={inputs.name}
                />
                {renderError()}
              </View>
              <View style={styles.switchColumn}>
                <Text style={styles.label}>Unlimited</Text>
                <Switch
                  trackColor={{false: '#767577a6', true: '#de8a1d99'}}
                  thumbColor={switches.limit ? '#de8a1d' : '#f4f3f4'}
                  ios_backgroundColor="#d0c9c114"
                  onValueChange={(value) => toggleSwitch(value, 'limit')}
                  value={switches.limit}
                />
              </View>
            </View>
            <View style={styles.actionGroup}>
              <View style={styles.switchRow}>
                <Text style={[styles.label, styles.rowLabel]}>Notify</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#de8a1d99'}}
                  thumbColor={switches.notify ? '#de8a1d' : '#f4f3f4'}
                  ios_backgroundColor="#d0c9c114"
                  onValueChange={(value) => toggleSwitch(value, 'notify')}
                  value={switches.notify}
                />
              </View>
              <View style={styles.switchRow}>
                <Text style={[styles.label, styles.rowLabel]}>Overnight</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#de8a1d99'}}
                  thumbColor={switches.overnight ? '#de8a1d' : '#f4f3f4'}
                  ios_backgroundColor="#d0c9c114"
                  onValueChange={(value) => toggleSwitch(value, 'overnight')}
                  value={switches.overnight}
                />
              </View>
            </View>
            <View style={[styles.actionGroup]}>
              <DatePicker
                mode="datetime"
                date={inputs.date}
                style={{height: 135}}
                onDateChange={(value) => handleChange(value, 'date')}
              />
            </View>
          </View>
        </View>
        <Buttons
          backName="back"
          nextName="next"
          hasBackIcon={true}
          disabled={!switches.limit}
          onSubmit={submitHandler}
          onBack={setPrevPage}
        />
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
