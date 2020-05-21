import {Icon, Input, Picker, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colorBlack, colorPrimary} from './../../../app.json';

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

class Filter extends React.Component {
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
                FILTER
              </Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props._clearFilter()}>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Filter Harga Tertinggi dan Terendah */}
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Input
              keyboardType={'numeric'}
              placeholderTextColor={'#868686'}
              placeholder={'Harga Terendah'}
              onChangeText={value => this.props._changeHargaAwal(value)}
              value={this.props.formItem.hargaRangeAwal.text}
              maxLength={50}
              style={{
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 10,
                width: WIDTH / 2 - 15,
              }}
            />
            <Text
              bold
              style={{
                justifyContent: 'center',
                fontSize: 15,
                alignContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                marginLeft: 5,
                marginRight: 5,
              }}>
              {'-'}
            </Text>
            <Input
              keyboardType={'numeric'}
              placeholderTextColor={'#868686'}
              placeholder={'Harga Tertinggi'}
              onChangeText={value => this.props._changeHargaAkhir(value)}
              value={this.props.formItem.hargaRangeAkhir.text}
              maxLength={50}
              style={{
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 10,
                width: WIDTH / 2 - 15,
              }}
            />
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Picker
              mode="dropdown"
              style={{
                width: WIDTH / 2 - 15,
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 10,
              }}
              selectedValue={this.props.formItem.provinsi}
              onValueChange={value => {
                this.props.onValueChangeProvinsi(value);
              }}
              placeholder="Pilih Provinsi">
              <Picker.Item label="Pilih Provinsi" value="0" />
              {this.props.listProvinsi.map((data, i) => {
                return (
                  <Picker.Item
                    key={i}
                    label={data.namaProvinsi}
                    value={data.id}
                  />
                );
              })}
            </Picker>
            <Picker
              mode="dropdown"
              style={{
                width: WIDTH / 2 - 15,
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 10,
              }}
              selectedValue={this.props.formItem.kabupaten}
              onValueChange={value => {
                this.props.onValueChangeKabupaten(value);
              }}
              placeholder="Pilih Kabupaten">
              <Picker.Item label="Pilih Kabupaten" value="0" />
              {this.props.listKabupaten.map((data, i) => {
                return (
                  <Picker.Item
                    key={i}
                    label={data.namaKabupaten}
                    value={data.id}
                  />
                );
              })}
            </Picker>
          </View>
          {/* Pilih Service Type (Vermak/Jahit) */}
          <View style={{padding: 10}}>
            <Picker
              mode="dropdown"
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 10,
              }}
              selectedValue={this.props.formItem.serviceType}
              onValueChange={value => {
                this.props.onValueChangeServiceType(value);
              }}
              placeholder="Pilih Service Type (Vermak/Jahit)">
              <Picker.Item
                label="Pilih Service Type (Vermak/Jahit)"
                value="0"
              />
              {this.props.serviceType.map((data, i) => {
                return (
                  <Picker.Item key={i} label={data.text} value={data.value} />
                );
              })}
            </Picker>
          </View>
          {/* Rating 4 Keatas */}
          {/* <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', width: WIDTH / 2 }}>
                        <Text style={{ justifyContent: 'center', fontSize: 15, alignContent: 'center', textAlign: 'left', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>{'Rating: '}</Text>
                        <TouchableOpacity
                            onPress={() => this.props._applyFilter()}
                            style={{ padding: 10, alignItems: 'center', borderRadius: 10, borderColor: colorBlack, borderWidth: 1.5, justifyContent: 'center', alignContent: 'center' }}
                        >
                            <Text style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center' }}><Icon name="star" style={{ color: colorBlack, fontSize: 15 }} />{' 4 Keatas'}</Text>
                        </TouchableOpacity>
                    </View> */}
          <View style={{padding: 10, marginTop: HEIGHT * 0.25}}>
            <View
              style={{
                alignContent: 'center',
                flexDirection: 'row',
                borderTopColor: '#FCFCFC',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => this.props._applyFilter()}
                style={{
                  backgroundColor: colorPrimary,
                  width: '100%',
                  padding: 15,
                  alignItems: 'center',
                  borderRadius: 10,
                  borderColor: colorBlack,
                  borderWidth: 1.5,
                }}>
                <Text style={{color: colorBlack, fontWeight: 'bold'}}>
                  Tampilkan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Filter;
