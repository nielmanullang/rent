import {Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from '../../../native-base-theme/variables/fonts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  contentDisModal: {
    backgroundColor: '#fff',
    width: WIDTH * 0.9,
  },
  title: {
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: WIDTH * 0.075,
  },
  desc: {
    marginLeft: WIDTH * 0.075,
    marginRight: WIDTH * 0.05,
    color: '#868686',
  },
  footer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footerText: {
    fontSize: moderateScale(14),
    color: '#CE9D3C',
    fontWeight: 'bold',
  },
  footerTextCancel: {
    fontSize: moderateScale(14),
    color: '#868686',
    fontWeight: 'bold',
  },
});

class Confirmation extends React.Component {
  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}>
        <View style={styles.contentDisModal}>
          <View>
            <View style={styles.title}>
              <Text title>{this.props.item.title}</Text>
            </View>
            <View padderBottom>
              <Text style={styles.desc}>{this.props.item.desc}</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#000'}}>
            <TouchableOpacity
              onPress={() => this.props._submit()}
              style={styles.footer}>
              <Text autoCapitalize="words" style={styles.footerText}>
                {this.props.item.btnSubmit}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props._cancel()}
              style={styles.footer}>
              <Text autoCapitalize="words" style={styles.footerTextCancel}>
                {this.props.item.btnCancel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Confirmation;
