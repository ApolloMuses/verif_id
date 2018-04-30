import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem, Input, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import { connect } from 'react-redux'
import * as actions from '../actions';


const COURSE_DATA = [
  { value: 'COMPSCI_101' },
  { value: 'COMPSCI_201' },
  { value: 'COMPSCI_202' },
  { value: 'COMPSCI_308' },
  { value: 'COMPSCI_400' },
  { value: 'PSYC_101' },
  { value: 'PSYC_102' },
  { value: 'PSYC_200' },
  { value: 'PSYC_304' },
  { value: 'PSYC_400' },
  { value: 'CHEM_101' },
  { value: 'ENG_101' }
];

class InputView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add a Transcript',
    headerStyle: {
      backgroundColor: '#20252B',
      borderBottomColor: '#1B1D26',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  });


  state = {
    name: null,
    studentNumber: null,
    course: '',
    grade: null,

    nameError: null,
    numError: null,
    gradeError: null,

    timeStamp: moment().unix(),
  };


  onVerificationSubmit = () => {
    const { name, studentNumber, course, grade,
      nameError, numError, gradeError, timeStamp } = this.state;
    const { color, schoolName, privateKey } = this.props.navigation.state.params;
    const verified = false;
    //verifiy inputs
    this.validateName(name);
    this.validateStuNum(studentNumber);
    this.validateGrade(grade);

    if (!nameError && !numError && !gradeError && name !== null
      && studentNumber !== null && course !== null && grade !== null
    ) {
      this.props.submitTranscriptForVerification({
        name, studentNumber, course, grade, verified,
        color, schoolName, privateKey, timeStamp
      });

      this.props.navigation.popToTop();
    }
  }


  validateName = name => {
    if (name === null || name === undefined || name === '') {
      this.clientNameInput.shake(); //visual feedback
      return new Promise((resolve, reject) =>
        reject(this.setState({ nameError: 'Your name is required' }))
      ).catch(err => console.log(err));
    }
    return this.setState({ nameError: null });
  };

  validateStuNum = studentNumber => {
    if (studentNumber === null || studentNumber === undefined || studentNumber === '') {
      this.studentInput.shake(); //visual feedback
      return new Promise((resolve, reject) =>
        reject(this.setState({ numError: 'Your student number is required' }))
      ).catch(err => console.log(err));
    }
    return this.setState({ numError: null });
  };

  validateGrade = grade => {
    if (grade === null || grade === undefined || grade === '') {
      this.gradeInput.shake(); //visual feedback
      return new Promise((resolve, reject) =>
        reject(this.setState({ gradeError: 'Your student number is required' }))
      ).catch(err => console.log(err));
    }
    return this.setState({ gradeError: null });
  };


  render() {
    const { color, schoolName, privateKey } = this.props.navigation.state.params;

    console.log('the timestamp is', this.state.timeStamp)
    return (
      <View style={styles.container}>
        <Input
          label="Full name:"
          ref={input => (this.clientNameInput = input)}
          placeholder="Barack Obama"
          placeholderTextColor="#86888F"
          containerStyle={styles.inputContainer}
          labelStyle={[styles.inputLabels, { color }]}
          inputStyle={{ color: 'white' }}
          onChangeText={name => this.setState({ name, nameError: null })}
          value={this.state.name}
          errorMessage={this.state.nameError}
        />

        <Input
          label="Student #"
          ref={input => (this.studentInput = input)}
          placeholder="111-111-111"
          placeholderTextColor="#86888F"
          containerStyle={styles.inputContainer}
          labelStyle={[styles.inputLabels, { color }]}
          inputStyle={{ color: 'white' }}
          onChangeText={studentNumber => this.setState({ studentNumber, numError: null })}
          value={this.state.studentNumber}
          errorMessage={this.state.numError}
        />

        <Dropdown
          label="Course"
          data={COURSE_DATA}
          onChangeText={(course) =>{
            this.setState({ course });
          }}
          value={this.state.course}
          fontSize={18}
          labelFontSize={14}
          textColor={color}
          itemColor="white"
          baseColor={color}
          containerStyle={styles.dropDownButton}
          pickerStyle={styles.pickerStyle}
          itemTextStyle={{ color: 'white' }}
        />

        <Input
          label="Grade"
          ref={input => (this.gradeInput = input)}
          placeholder="A+"
          placeholderTextColor="#86888F"
          containerStyle={styles.inputContainer}
          labelStyle={[styles.inputLabels, { color }]}
          inputStyle={{ color: 'white' }}
          onChangeText={grade => this.setState({ grade, gradeError: null })}
          value={this.state.grade}
          errorMessage={this.state.gradeError}
        />

        <Button
          title="Submit for Verification"
          onPress={this.onVerificationSubmit}
          buttonStyle={{ backgroundColor: color, padding: 20, marginLeft: 10, marginRight: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3039',
    justifyContent: 'space-around',
    paddingBottom: 30
  },

  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    paddingTop: 20,
  },

  inputLabels: {
    color: '#36FA8E',
    fontSize: 22
  },

  noTokenText: {
    textAlign: 'center',
    color: '#36FA8E',
    fontSize: 18,
    padding: 20,
  },

  dropDownButton: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    flex: 0.1,
  },

  pickerStyle: {
    borderColor: '#2C3039',
    backgroundColor: '#2C3039',
  },

});

export default connect(null, actions)(InputView);
