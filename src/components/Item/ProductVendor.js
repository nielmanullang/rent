import {Icon, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colorBlack} from '../../../app.json';
import {
  convertNumber,
  convertToLetterCase,
} from '../../../native-base-theme/variables/convert';
import {moderateScale} from '../../../native-base-theme/variables/fonts';

const WIDTH = Dimensions.get('window').width;
const paddingImg = WIDTH * 0.024;
const widthImg = WIDTH * 0.4;
const heightImg = WIDTH * 0.6;

const styles = StyleSheet.create({
  cardItem: {
    marginBottom: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // flex: .3
  },
  iconCard: {
    color: '#000',
    alignSelf: 'center',
    fontSize: 100,
    marginTop: 10,
  },
  iconCardOther: {
    color: '#3D3D3D',
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 10,
  },
  iconTitle: {
    fontSize: moderateScale(14),
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    textAlign: 'left',
    fontSize: moderateScale(11),
    marginLeft: 5,
  },
  iconHarga: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: widthImg,
    height: widthImg - 30,
    resizeMode: 'cover',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // position: 'absolute',
    // left: 0,
    // top: 0
  },
});

class ProductVendor extends React.Component {
  render() {
    let index = this.props.item.rating;
    let rating = [];
    let i;
    if (index !== undefined && index !== null) {
      for (i = 0; i < 5; i++) {
        if (i < index) {
          rating.push({
            picked: true,
          });
        } else {
          rating.push({
            picked: false,
          });
        }
      }
    } else {
      for (i = 0; i < 5; i++) {
        rating.push({
          picked: false,
        });
      }
    }

    return (
      <TouchableOpacity
        onPress={() => this.props._actionDetail(this.props.item)}>
        <View
          style={{
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#F0F0F0',
            width: widthImg,
            height: heightImg,
            marginLeft: paddingImg,
            marginRight: paddingImg,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0.5},
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}>
          {/* <Icon style={styles.iconCard} type="FontAwesome" name='android' /> */}
          <Image
            source={{uri: this.props.item.image[0].fileUrl}}
            style={styles.image}
          />
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {rating.map((data, i) => {
              return (
                <Icon
                  key={i}
                  type="FontAwesome"
                  name={data.picked ? 'star' : 'star-o'}
                  style={{color: colorBlack, fontSize: 20}}
                />
              );
            })}
          </View>
          <View>
            <Text style={styles.title}>
              {this.props.item.vendorVO.vendorName}
            </Text>
            <Text style={styles.title}>
              {convertToLetterCase(this.props.item.serviceType) +
                ' ' +
                convertToLetterCase(this.props.item.kategory)}
            </Text>
            <Text style={styles.title}>
              {'Rp.' +
                convertNumber(this.props.item.hargaRangeAwal) +
                ' - Rp.' +
                convertNumber(this.props.item.hargaRangeAkhir)}
            </Text>
            <Text style={styles.title}>
              {this.props.item.vendorVO.kecamatan.namaKecamatan}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductVendor;
