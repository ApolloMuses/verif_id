import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Divider, ButtonGroup } from 'react-native-elements';
import HeaderButtons from 'react-navigation-header-buttons';
import _ from 'lodash';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from '../actions';

const BUTTONS = ['Student', 'University'];


class Main extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Transcripts',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={25} color="#36FA8E">
        <HeaderButtons.Item
          title="add"
          iconName="ios-add-circle-outline"
          onPress={() => {
            navigation.navigate('pairSelector');
          }}
        />
      </HeaderButtons>
    ),
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

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  componentWillMount() {
    console.log('main page loading', this.props);
 }

  renderTranscript = () => {
    const data = this.props.entryData;
    if (!_.isEmpty(data)) {
      return (
        <ListItem
          containerStyle={styles.listItem}
          title="Transcript"
          titleStyle={{ color: 'white' }}
          rightTitle={`status: ${data.verified}`}
          rightTitleStyle={{ color: '#EBA808' }}
        />
      );
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  statusHelper = (rejected, verified) =>  {
    if (rejected) return 'rejected';
    return verified ? 'verified' : 'pending'
  }

  colorHelper = (rejected, verified) => {
    if (rejected) return '#FB3640';
    return verified ? '#36FA8E' : '#EBA808'
  }

  renderStudentItem = (data, studentTag) => {
    return data.map((item, index) => {
      //if (item.verified) return console.log('item already verified');

      return (
        <ListItem
          key={index}
          containerStyle={[styles.listItem, { borderLeftColor: item.color }]}
          title={`${item.schoolName} Transcript`}
          titleStyle={{ color: 'white' }}
          rightTitle={this.statusHelper(item.rejected, item.verified)}
          rightTitleStyle={{ color: this.colorHelper(item.rejected, item.verified) }}
          onPress={() => {
            this.props.navigation.navigate('formView', {
              item,
              studentTag
            });
          }}
        />
      )
    });
  }

  renderSchoolItem = (data, studentTag) => {
    return data.map((item, index) => {
      if (item.verified) return console.log('item already verified');
      if (item.rejected) return console.log('item already rejected');

      return (
        <ListItem
          key={index}
          containerStyle={[styles.listItem, { borderLeftColor: item.color }]}
          title={`Student Number: ${item.studentNumber}`}
          titleStyle={{ color: 'white' }}
          rightTitle={`status: ${item.verified ? 'verified' : 'unverified' }`}
          rightTitleStyle={{ color: item.verified ? '#36FA8E' : '#EBA808' }}
          onPress={() => {
            this.props.navigation.navigate('formView', {
              item,
              studentTag
            });
          }}
        />
      )
    });
  }

  renderLists = () => {
    if (this.state.selectedIndex === 0) {
      const data = this.props.entryData;
      if (_.isEmpty(data)) return console.log('no data');
      const studentTag = true;
      return (
        <View style={{ padding: 10 }}>
          <Text h4 style={{ color: 'white', marginBottom: 20, }}>My Transcripts</Text>
          {this.renderStudentItem(data, studentTag)}
        </View>
      )

    }

    if (this.state.selectedIndex === 1) {
      const data = this.props.entryData;
        if (!_.isEmpty(data)) {
        return (
          <View style={{ flex: 1, padding: 10 }}>
          <Text h4 style={{ color: 'white', marginBottom: 20, }}>Verification Requests:</Text>
            {this.renderSchoolItem(data)}
          </View>
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={BUTTONS}
          containerStyle={styles.buttonGroup}
          selectedButtonStyle={{ backgroundColor: '#20252B' }}
          selectedTextStyle={{ color: '#36FA8E' }}
          textStyle={{ color: 'white' }}
        />

        {this.renderLists()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 8,
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

  },
  buttonGroup: {
    borderColor: '#1B1D26',
    backgroundColor: '#2C3039',
    marginBottom: 20,
  },

});

const mapStateToProps = ({ entryData }) => {
  return { entryData };
}

export default connect(mapStateToProps, actions)(Main);
