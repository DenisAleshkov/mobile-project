import React from 'react';
import Stepper from './../Stepper';
import Buttons from './../Buttons';
import {
  StyleSheet,
  TextInput,
  Switch,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import DatePicker from 'react-native-date-picker';
import {setStep} from './../../../../../store/actions/stepper.action';
import {setJobDetails} from './../../../../../store/actions/project.action';
import {firstStep, thirdStep} from './../../../../../store/constants';

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

  const handleChange = (value, name) => {
    setInputs({...inputs, [name]: value});
  };

  const toggleSwitch = (value, name) => {
    setSwitches({...switches, [name]: value});
  };

  const dispatch = useDispatch();

  const setBackStep = () => {
    dispatch(setStep(firstStep));
  };

  const submitHandler = () => {
    dispatch(
      setJobDetails({
        inputs,
        switches,
      }),
    );
    Navigation.push(props.componentId, {
      component: {
        name: 'JobSites',
      },
    });
    dispatch(setStep(thirdStep));
  };

  const isNext = switches.limit === false;

  return (
    <View style={styles.container}>
      <Stepper />
      <View style={styles.inner}>
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
            <TextInput
              style={[
                styles.input,
                styles.inputWithCheckbox,
                {backgroundColor: switches.limit ? '#93959657' : '#fff'},
              ]}
              onChangeText={(value) => handleChange(value, 'name')}
              value={inputs.name}
            />
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
        <View style={{position: 'absolute', bottom: 0}}>
          <Buttons
            backName="Back"
            nextName="next"
            disabled={isNext}
            onSubmit={submitHandler}
            onBack={() => {
              Navigation.pop(props.componentId, {
                options: {
                  animations: {
                    push: {
                      enabled: false,
                    },
                  },
                },
              });
              setBackStep();
            }}
          />
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
    justifyContent: 'flex-start',
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
