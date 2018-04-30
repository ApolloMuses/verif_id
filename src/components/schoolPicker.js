import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SCHOOL = [
  { privateKey: '11110000', schoolName: 'UBC', color: '#2895F9' },
  { privateKey: '22220000', schoolName: 'SFU', color: '#FB3640' },
  { privateKey: '33330000', schoolName: 'UVIC', color: '#b8b8b8' },
  { privateKey: '44440000', schoolName: 'UofT', color: '#36FA8E' },
  { privateKey: '55550000', schoolName: 'Waterloo', color: '#EBA808' },
];

export default class PairSelector extends React.Component {
  static navigationOptions = {
    title: 'Select your school',
    headerStyle: {
      backgroundColor: '#20252B',
      borderBottomColor: '#1B1D26',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  };

  renderItem() {
    return SCHOOL.map((school, index) => {
      const { schoolName, privateKey, color } = school;
      return (
        <TouchableOpacity
          key={school.privateKey}
          style={[styles.pairStyle, { backgroundColor: school.color }]}
          onPress={() => {
            this.props.navigation.navigate('inputView', { schoolName, privateKey, color });
          }}>
          <Text style={styles.pairText}>{school.schoolName}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return <View style={styles.container}>{this.renderItem()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3039',
    paddingBottom: 30
  },
  pairStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.6,
  },
  pairText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15,
  },
});
