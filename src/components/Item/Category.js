import { View } from "native-base";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "../../../native-base-theme/variables/fonts";

const WIDTH = Dimensions.get("window").width;
const paddingImg = WIDTH * 0.024;
const widthImg = WIDTH * 0.38;

const styles = StyleSheet.create({
  cardItem: {
    marginBottom: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    // flex: .3
  },
  iconCard: {
    color: "#000",
    alignSelf: "center",
    fontSize: 50,
    marginTop: 10,
  },
  iconCardOther: {
    color: "#3D3D3D",
    alignSelf: "center",
    fontSize: 30,
    marginTop: 10,
  },
  iconTitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: moderateScale(14),
    marginTop: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: widthImg,
    height: widthImg,
    resizeMode: "cover",
    borderRadius: 15,
    // position: 'absolute',
    // left: 0,
    // top: 0
  },
});

class Category extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props._actionKategory(this.props.item)}
      >
        <View
          style={{
            marginBottom: 24,
            borderWidth: 1,
            borderColor: "#F0F0F0",
            width: widthImg,
            height: widthImg,
            marginLeft: paddingImg,
            marginRight: paddingImg,
            borderRadius: 15,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={{ uri: this.props.item.image }} style={styles.image} />
          {/* <Icon style={styles.iconCard} type="FontAwesome" name='android' /> */}
          {/* <Text style={styles.iconTitle}>{this.props.item.kategoryName}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default Category;
