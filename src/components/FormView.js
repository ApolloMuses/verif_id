import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem, Input, Button } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux'
import * as actions from '../actions';

class FormView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`,
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
    selectedIndex: 0,
  };

  componentWillMount() {
    console.log('the props', this.props);
    const { item: { color, course, grade, name, studentNumber, schoolName, verified }, studentTag} = this.props.navigation.state.params;
  }

  onApproveVerify = () => {
    this.props.verifiTranscript(this.props.navigation.state.params.item);
    this.props.navigation.popToTop();
  }

  onRejectVerify = () => {
    this.props.rejectTranscript(this.props.navigation.state.params.item);
    this.props.navigation.popToTop();
  }

  render() {
    const { item: { color, course, grade, name, studentNumber, schoolName, verified }, studentTag} = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text h2 style={{color, paddingBottom: 20}}>{schoolName}</Text>
        <Text style={{color: 'white', paddingBottom: 20, fontSize: 18}}>Student Number: {studentNumber}</Text>
        <Text style={{color, paddingBottom: 20, fontSize: 18}}>{name}</Text>

        <ListItem
          containerStyle={[styles.listItem, { borderLeftColor: color }]}
          title={`Course ${course}`}
          titleStyle={{ color: 'white' }}
          rightTitle={`Grade: ${grade}`}
          rightTitleStyle={{ color: verified ? '#36FA8E' : '#EBA808' }}
        />
        { studentTag ? null : (
          <View>
          <Button title="Approve Verification" onPress={this.onApproveVerify} buttonStyle={{ marginTop: 20 }}/>
          <Button title="Reject Verification" onPress={this.onRejectVerify} buttonStyle={{ marginTop: 20, backgroundColor: 'red' }}/>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C3039',
  },
  text: {
    color: 'white'
  },
  listItem: {
    backgroundColor: '#2C3039',
    borderLeftColor: '#36FA8E',
    borderLeftWidth: 4,
    borderColor: '#1B1D26',
    borderWidth: 1,
    paddingBottom: 20,
  },
  buttonGroup: {
    borderColor: '#1B1D26',
    backgroundColor: '#2C3039',
    marginBottom: 20,
  },
});

export default connect(null, actions)(FormView);
