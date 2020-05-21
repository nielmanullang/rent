import {Icon, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colorBlack} from './../../../app.json';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  marked: {
    marginBottom: 10,
    marginBottom: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: WIDTH / 5,
    height: 45,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#CC9E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    marginBottom: 10,
    marginBottom: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: WIDTH / 5,
    height: 45,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: '#000', fontSize: 12, textAlign: 'center'},
});

class SortBy extends React.Component {
  render() {
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => this.props._isVisible(false)}
        onRequestClose={() => this.props._isVisible(false)}
        style={{
          justifyContent: 'flex-end',
          height: '100%',
          margin: 0,
        }}>
        <View style={{backgroundColor: '#fff', height: HEIGHT}}>
          <View
            padderTop
            style={{
              flexDirection: 'row',
              borderTopColor: '#F8F8F8',
              borderTopWidth: 1,
            }}>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props._isVisible(false)}>
                <Icon name="arrow-back" style={{color: colorBlack}} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.6}}>
              <Text bold style={{textAlignVertical: 'center'}}>
                Sort By
              </Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props._simpanSortBy()}>
                <Text>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.props.sortBy.map((data, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => this.props._applySortBy(data, i)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#F6F6F6',
                  width: '100%',
                  padding: 15,
                  borderBottomColor: colorBlack,
                  borderBottomWidth: 0.5,
                }}>
                <Text style={{color: colorBlack}}>{data.text}</Text>
                {data.picked == true && (
                  <Icon
                    type="FontAwesome"
                    style={{fontSize: 14, color: 'green'}}
                    name="check"
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    );
  }
}

export default SortBy;
