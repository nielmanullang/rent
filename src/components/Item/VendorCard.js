import {Icon, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../../native-base-theme/variables/fonts';
import {colorBlack, colorPrimary} from './../../../app.json';

const WIDTH = Dimensions.get('window').width;

class VendorCard extends React.Component {
  render() {
    let paddingImg = WIDTH * 0.012;
    let widthImg = WIDTH * 0.4;

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
      <TouchableOpacity onPress={() => this.props._action(this.props.item)}>
        <View
          style={{
            marginBottom: 10,
            marginBottom: 24,
            padding: 8,
            borderWidth: 1,
            borderColor: colorBlack,
            width: widthImg,
            height: widthImg,
            marginLeft: paddingImg,
            marginRight: paddingImg,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              marginTop: 5,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 50,
              justifyContent: 'center',
              backgroundColor: colorPrimary,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Icon style={{fontSize: 65}} name="md-person" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            {rating.map((item, i) => {
              return (
                <Icon
                  key={i}
                  type="FontAwesome"
                  name={item.picked ? 'star' : 'star-o'}
                  style={{color: colorBlack, fontSize: 15}}
                />
              );
            })}
          </View>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: moderateScale(9),
              marginTop: 4,
              fontWeight: 'bold',
            }}>
            {this.props.item.vendorName}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: moderateScale(9),
              marginTop: 2,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {this.props.item.kabupaten.namaKabupaten}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default VendorCard;
