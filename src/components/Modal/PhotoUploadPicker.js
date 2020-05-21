import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  coverBtn: {
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 3,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 3,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnNext: {
    flexDirection: 'row',
    padding: 10,
  },
  btnNextLink: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnNextText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

class PhotoUploadPicker extends React.Component {
  renderListPhotoUpload = () => {
    return this.props.listPhotoUpload.map((data, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => this.props._linkToUploadMethod(data)}
          style={styles.btnNextLink}>
          <Text style={styles.btnNextText}>{data.value}</Text>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}
        style={{
          justifyContent: 'flex-end',
        }}>
        <View horizontalColumn style={{alignItems: 'center'}}>
          <View style={styles.content}>
            {/* <View style={styles.header}>
                            <Text style={styles.btnNextText}>Select Photo</Text>
                        </View> */}
            {this.renderListPhotoUpload()}
          </View>
          <View style={styles.coverBtn}>
            <View style={styles.btnNext}>
              <TouchableOpacity
                onPress={() => this.props._isVisible(false)}
                style={styles.btnNextLink}>
                <Text style={styles.btnNextText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PhotoUploadPicker;
