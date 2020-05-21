import {Icon, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../../native-base-theme/variables/fonts';

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  leftSide: {
    flex: 0.4,
    paddingLeft: 20,
  },
  rightSide: {
    flex: 0.6,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: moderateScale(13),
  },
  desc: {
    color: '#868686',
    fontSize: moderateScale(13),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#CE9D3C',
    fontSize: moderateScale(18),
    paddingLeft: 10,
  },
});

class LinkDetail extends React.Component {
  renderDesc = () => {
    if (this.props.isLink) {
      return (
        <TouchableOpacity
          onPress={() => this.props._pickItem()}
          style={styles.rightSide}>
          <Text style={styles.desc}>{this.props.item.desc}</Text>
          <Icon style={styles.icon} type="FontAwesome" name="angle-right" />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.rightSide}>
          <Text style={styles.desc}>{this.props.item.desc}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <View style={styles.leftSide}>
            <Text style={styles.title}>{this.props.item.title}</Text>
          </View>
          {this.renderDesc()}
        </View>
      </View>
    );
  }
}

export default LinkDetail;
