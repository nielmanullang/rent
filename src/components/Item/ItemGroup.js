import {Icon, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../../native-base-theme/variables/fonts';

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  iconCard: {
    color: '#000',
    alignSelf: 'center',
    fontSize: 40,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});

class ItemGroup extends React.Component {
  render() {
    let paddingImg = WIDTH * 0.024;
    let widthImg = WIDTH / 5;

    return (
      <TouchableOpacity
        onPress={() => this.props._actionItemGroup(this.props.item.screen)}>
        <View
          style={{
            backgroundColor: this.props.item.color,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#F0F0F0',
            width: widthImg,
            height: widthImg,
            marginLeft: paddingImg,
            marginRight: paddingImg,
            borderRadius: 15,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            style={styles.iconCard}
            type={this.props.item.type}
            name={this.props.item.icon}
          />
          <Text style={styles.title}>{this.props.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ItemGroup;
