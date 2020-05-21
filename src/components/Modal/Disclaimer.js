import {Footer, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  contentDisModal: {
    backgroundColor: '#fff',
    width: WIDTH * 0.9,
  },
  titleDisModal: {
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: WIDTH * 0.075,
  },
  descDisModal: {
    marginLeft: WIDTH * 0.075,
    marginRight: WIDTH * 0.05,
  },
  descDisListModal: {
    marginBottom: 15,
    marginLeft: WIDTH * 0.075,
    marginRight: WIDTH * 0.05,
  },
  footerDisModal: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerDisBtnModal: {
    marginRight: WIDTH * 0.075,
  },
  footerDisText: {
    color: '#CE9D3C',
  },
  footerDisModal2: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
  },
  footerDisText2: {
    color: '#000',
  },
});

class Disclaimer extends React.Component {
  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}>
        <View style={styles.contentDisModal}>
          <View>
            <View style={styles.titleDisModal}>
              <Text title>{this.props.title.toUpperCase()}</Text>
            </View>
            <View padderBottom>
              <Text style={styles.descDisModal}>{this.props.desc}</Text>
            </View>
          </View>
          <Footer>
            <TouchableOpacity
              onPress={() => this.props._isVisible(false)}
              style={styles.footerDisModal2}>
              <Text autoCapitalize="words" style={styles.footerDisText2}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props._goToApiDone()}
              style={styles.footerDisModal2}>
              <Text autoCapitalize="words" style={styles.footerDisText2}>
                Confirm
              </Text>
            </TouchableOpacity>
          </Footer>
        </View>
      </Modal>
    );
  }
}

export default Disclaimer;
